import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoomService,Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule,CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  providers: [RoomService]
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
    this.rooms = this.roomService.getRooms();
  }

   // This is triggered automatically when [(ngModel)]="booking.roomId" changes
  ngDoCheck() {
    const newRoom = this.roomService.getRoomById(this.booking.roomId);
    if (newRoom && newRoom !== this.selectedRoom) {
      this.selectedRoom = newRoom;

      // Optional: Clamp values if they exceed the new limits
      if (this.booking.adults > newRoom.acapacity) {
        this.booking.adults = newRoom.acapacity;
      }
      if (this.booking.children > newRoom.bcapacity) {
        this.booking.children = newRoom.bcapacity;
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
}

