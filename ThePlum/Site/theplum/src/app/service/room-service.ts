import { Injectable } from '@angular/core';

export interface Room {
  id: string;
  name: string;
  capacity: number;
  price: number;
  amenities: string[];
  images: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor() {}

  private rooms: Room[] = [
    {
      id: '1',
      name: 'The Affectionate One',
      capacity: 2,
      price: 120,
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Free Parking',
        'Solar Power',
      ],
      images: ['/assets/AffShot.jpg'],
    },
    {
      id: '2',
      name: 'Bush Mango',
      capacity: 4,
      price: 220,
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Family Friendly',
        'Barbeque Facilities',
      ],
      images: ['/assets/BushShot2.jpg'],
    },
    {
      id: '3',
      name: 'The Affectionate Two',
      capacity: 2,
      price: 100,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/AffShot2.jpg'],
    },
    {
      id: '4',
      name: 'The Plum',
      capacity: 2,
      price: 100,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/Lounge.jpg'],
    },
  ];

  getRooms(): Room[] {
    return this.rooms;
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find((room) => room.id === id);
  }
}
