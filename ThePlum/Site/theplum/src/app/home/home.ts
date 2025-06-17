import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService, Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  rooms: Room[] = [];
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

}
