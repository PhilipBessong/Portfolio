import { Component, Input } from '@angular/core';
import { Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { RoomService } from '../service/room-service';
@Component({
  selector: 'app-accomodations',
  imports: [CommonModule],
  templateUrl: './accomodations.html',
  styleUrl: './accomodations.css'
})
export class Accomodations {
  rooms: Room[] = [];
  constructor(private roomService: RoomService) {}
  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

}
