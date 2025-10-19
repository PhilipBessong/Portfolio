import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService, Room } from '../service/room-service';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./contact.css'],
})
export class ContactComponent implements OnInit {
  @Input() rooms: Room[] = [];
  contactForm!: FormGroup;
  buttonText = 'Send Message';
  submitting = false;
  successMessage = false;
  errorMessage = false;

  constructor(private fb: FormBuilder, private roomService: RoomService) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      phone: ['', [Validators.pattern(/^[+0-9\s\-()]{7,20}$/)]],
      subject: ['', [Validators.required, Validators.maxLength(120)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
      roomId: [null],
      newsletter: [true],
    });
  }

  get f() {
    return this.contactForm.controls;
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

    emailjs.send(serviceID, templateID, formData, publicKey)
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
}
