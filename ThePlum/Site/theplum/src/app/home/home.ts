import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import emailjs from '@emailjs/browser';
import { RoomService, Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  showBookNow = false;
  rooms: Room[] = [];
  selectedRoom: Room | undefined;
  roomImages: string[] = [];
  carouselItems: { image: string; name: string; id: string }[] = [];

  contactForm!: FormGroup;
  buttonText = 'Send Message';
  submitting = false;
  successMessage = false;
  errorMessage = false;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private roomService: RoomService,
    private fb: FormBuilder
  ) {}

   get f() {
    return this.contactForm.controls;
  }
  ngOnInit(): void {
    this.roomService.getRooms()
      .pipe(takeUntil(this.destroy$))
      .subscribe((rooms) => {
        this.rooms = rooms;
        this.roomImages = this.rooms.flatMap((room) => room.images);
        this.carouselItems = this.rooms.map((room) => ({
          image: room.images[0],
          name: room.name,
          id: room.id,
        }));
      });

    this.contactForm = this.fb.group({
      name: ['', [Validators.maxLength(50)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(254)],
      ],
        phone: ['', [Validators.pattern(/^[+0-9\s\-()]{7,20}$/)]],
      subject: ['', [Validators.required, Validators.maxLength(120)]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(2000),
        ],
      ],
      roomId: [null],
      newsletter: [true],
    });
  }

  navigateToRooms() {
    this.router.navigate(['/accommodations']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
  onSubmit() {
    this.contactForm.markAllAsTouched();

    if (this.contactForm.invalid) {
      return;
    }

    this.submitting = true;
    this.errorMessage = false;
    this.buttonText = 'Sending...';

    const serviceID = 'service_tp';
    const templateID = 'template_tpCon';
    const publicKey = 'JwFbIhfAob3-rPEnJ';

    const formData = {
      from_name: this.contactForm.value.name,
      from_firstName: this.contactForm.value.firstName,
      from_email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message,
      phone: this.contactForm.value.phone || 'N/A',
    };

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then((response: any) => {
        console.log('SUCCESS!', response.status, response.text);
        this.successMessage = true;
        this.submitting = false;
        this.contactForm.reset();
        this.buttonText = 'Sent';

        // ✅ Hide success message after 5 seconds
        setTimeout(() => {
          this.successMessage = false;
          this.buttonText = 'Send Message';
        }, 5000);
      })
      .catch((error: any) => {
        console.error('FAILED...', error);
        this.errorMessage = true;
        this.submitting = false;
        this.buttonText = 'Send Message';

        // ✅ Hide error message after 5 seconds
        setTimeout(() => {
          this.errorMessage = false;
        }, 5000);
      });
  }
  onReset(form: NgForm) {
    form.reset();
  }

  booking = {
    fName: '',
    lName: '',
    email: '',
    phone: '',
    roomId: '',
    checkin: '',
    checkout: '',
    adults: 1,
    children: 0,
  };

  ngDoCheck() {
    const newRoom = this.roomService.getRoomById(this.booking.roomId);
    if (newRoom && newRoom !== this.selectedRoom) {
      this.selectedRoom = newRoom;

      // Optional: Clamp values if they exceed the new limits
      if (this.booking.adults > newRoom.capacity) {
        this.booking.adults = newRoom.capacity;
      }
    }
  }

  submitBooking() {
    const selectedRoom = this.roomService.getRoomById(this.booking.roomId);
    console.log('Booking submitted:', {
      ...this.booking,
      roomName: selectedRoom?.name,
    });
    // You can send this to Firebase or a backend here.
    alert(`Booking submitted for ${selectedRoom?.name}`);
  }

  openBookNow() {
    this.showBookNow = true;
  }

  closeBookNow() {
    this.showBookNow = false;
  }

  confirmBooking() {
    alert('Booking confirmed!');
    this.showBookNow = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
