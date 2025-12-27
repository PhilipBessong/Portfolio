import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomService, Room, Booking } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  providers: [RoomService],
})
export class Navbar {
  showBookNow = false;
  rooms: Room[] = [];
  selectedRoom: Room | undefined;
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

  constructor(private roomService: RoomService) {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  // This is triggered automatically when [(ngModel)]="booking.roomId" changes
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
    if (!selectedRoom) {
      alert('Please select a room');
      return;
    }
    const newBooking: Booking = {
      room_id: selectedRoom.id,
      first_name: this.booking.fName,
      last_name: this.booking.lName,
      email: this.booking.email,
      phone: this.booking.phone,
      adult_guests: this.booking.adults,
      child_guests: this.booking.children,
      total_guests: this.booking.adults + this.booking.children,
      start_date: this.booking.checkin,
      end_date: this.booking.checkout,
      total_price: this.calculateTotalPrice(selectedRoom),
      status: 'pending',
      source: 'website',
      created_at: new Date(),
    };
    console.log('Booking submitted:', newBooking);
    // You can send this to Firebase or a backend here.
    alert(`Booking submitted for ${selectedRoom?.name}`);
  }

  calculateTotalPrice(room: Room): number {
    if (!this.booking.checkin || !this.booking.checkout) return 0;
    const start = new Date(this.booking.checkin);
    const end = new Date(this.booking.checkout);
    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return nights > 0 ? nights * room.price : room.price;
  }

  openBookNow() {
    this.showBookNow = true;
  }

  closeBookNow() {
    this.showBookNow = false;
  }
}
