import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService, Room } from '../service/room-service';

@Component({
  selector: 'app-book-now',
  imports: [ CommonModule,
    FormsModule,],
  templateUrl: './book-now.html',
  styleUrl: './book-now.css'
})
export class BookNow implements OnInit {
   @Input() roomName: string = '';
  @Input() visible: boolean = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onBook = new EventEmitter<void>();
  rooms: Room[] = [];

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

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
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
    close() {
    this.onClose.emit();
  }
}
