import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService, Room, ContactPayload } from '../service/room-service';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./contact.css'] // ✅ corrected plural
})
export class ContactComponent implements OnInit {
  @Input() rooms: Room[] = []; // optional list of rooms, passed from parent or fetched
  contactForm!: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private roomService: RoomService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      phone: ['', [Validators.pattern(/^[+0-9\s\-()]{7,20}$/)]],
      subject: ['', [Validators.required, Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      roomId: [null],
      newsletter: [false]
    });
  }

  // ✅ safer getter
  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload: ContactPayload = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      phone: this.f['phone'].value,
      subject: this.f['subject'].value,
      message: this.f['message'].value,
      roomId: this.f['roomId'].value || null,
      newsletter: this.f['newsletter'].value
    };

    this.submitting = true;

    this.roomService.sendContactMessage(payload) // ✅ fixed service name
      .pipe(finalize(() => (this.submitting = false)))
      .subscribe({
        next: () => {
          this.successMessage = '✅ Thank you — your message has been sent. We will respond within 24 hours.';
          this.contactForm.reset({ roomId: null, newsletter: false });
        },
        error: (err: any) => {
          console.error('Contact send error', err);
          this.errorMessage = '❌ Sorry, something went wrong while sending your message. Please try again or call us.';
        }
      });
  }
}
