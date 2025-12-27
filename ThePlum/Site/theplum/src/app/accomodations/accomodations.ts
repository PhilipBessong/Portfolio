import { Component, Input } from '@angular/core';
import { Room } from '../service/room-service';
import { CommonModule } from '@angular/common';
import { RoomService } from '../service/room-service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-accomodations',
  imports: [CommonModule, RouterLink],
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
   this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    });
  }

}
