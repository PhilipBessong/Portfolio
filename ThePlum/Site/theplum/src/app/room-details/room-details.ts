import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomService } from  '../service/room-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-room-details',
  imports: [CommonModule],
  templateUrl: './room-details.html',
  styleUrl: './room-details.css'
})
export class RoomDetails implements OnInit {

  room: Room | undefined;
  // Map amenities to specific icons
  amenityIcons: { [key: string]: string } = {
    'Free Wi-Fi': 'fa-solid fa-wifi',
    'Air Conditioning': 'fa-solid fa-snowflake',
    'Free Parking': 'fa-solid fa-car',
    'Solar Power': 'fa-solid fa-solar-panel',
    'Family Friendly': 'fa-solid fa-child-reaching',
    'Barbeque Facilities': 'fa-solid fa-fire-burner'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.room = this.roomService.getRoomById(id);
    }
  }
  goBack() {
    this.router.navigate(['/accommodations']); // Or wherever your list is
  }

}
