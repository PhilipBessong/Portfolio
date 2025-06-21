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
  amenityIcons: { [key: string]: string } = {
  'Free Wi-Fi': 'fas fa-wifi',
  'Air Conditioning': 'fas fa-snowflake',
  'Free Parking': 'fas fa-parking',
  'Solar Power': 'fas fa-sun',
 'Family Friendly': 'fas fa-users',
  'Barbeque Facilities': 'fas fa-utensils',
};

  constructor(private roomService: RoomService) {}
  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
  }

}
