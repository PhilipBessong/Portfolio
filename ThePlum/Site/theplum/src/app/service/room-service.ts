import { Injectable, createComponent, EnvironmentInjector } from '@angular/core';
import { BookNow } from '../book-now/book-now';

export interface Room {
  id: string;
  name: string;
  acapacity: number;
  bcapacity: number;
  bedNum: number;
  bathNum: number;
  price: number;
  amenities: string[];
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private injector: EnvironmentInjector) {}

  private rooms: Room[] = [
    {
      id: '1',
      name: 'The Affectionate One',
      acapacity: 2,
      bcapacity: 1,
      bedNum: 1,
      bathNum: 1,
      price: 800,
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Free Parking',
        'Solar Power',
      ],
      images: ['/assets/AffShot.jpg', '/assets/croom.jpg'],
    },
    {
      id: '2',
      name: 'Bush Mango',
      acapacity: 4,
      bcapacity: 2,
      bedNum: 2,
      bathNum: 1,
      price: 1000,
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Family Friendly',
        'Barbeque Facilities',
      ],
      images: ['/assets/BushShot2.jpg', '/assets/BushShot.jpg'],
    },
    {
      id: '3',
      name: 'The Affectionate Two',
      acapacity: 2,
      bcapacity: 1,
      bedNum: 1,
      bathNum: 1,
      price: 100,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/AffShot2.jpg'],
    },
    {
      id: '4',
      name: 'The Plum',
      acapacity: 2,
      bcapacity: 1,
      bedNum: 1,
      bathNum: 1,
      price: 1400,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/Lounge.jpg', '/assets/Kitchen.jpg', '/assets/RoomShot.jpg', '/assets/RoomShot2.jpg', '/assets/RoomShot3.jpg', '/assets/RoomShot4.jpg', '/assets/RoomShot5.jpg'],
    },
  ];

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }

  openBookNowModal() {
    const modal = document.createElement('div');
    modal.id = 'book-now-modal';
    document.body.appendChild(modal);

    const compRef = createComponent(BookNow, {
      environmentInjector: this.injector,
      hostElement: modal,
    });
  }
}
