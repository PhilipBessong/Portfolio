import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { RoomService, Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
   showBookNow = false;
  rooms: Room[] = [];
  selectedRoom: Room | undefined;
  roomImages: string[] = [];
  carouselItems: { image: string; name: string; id: string }[] = [];

  constructor(private router: Router, private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
    this.roomImages = this.rooms.flatMap(room => room.images);
    this.carouselItems = this.rooms.map(room => ({
      image: room.images[0],
      name: room.name,
      id: room.id
    }));
  }
  navigateToRoomDetails(roomId: string) {
    this.router.navigate(['/room-details', roomId]);
  }
  navigateToRooms() {
    this.router.navigate(['/rooms']);
  }

  navigateToAbout() {
    this.router.navigate(['/about']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
  onSubmit(form: NgForm) {
  if (form.valid) {
    console.log('Form Submitted:', form.value);
    // Send to backend or email service here
    form.reset();
  }
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
}
