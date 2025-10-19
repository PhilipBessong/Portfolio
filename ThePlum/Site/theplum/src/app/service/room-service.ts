import {
  Injectable,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { BookNow } from '../book-now/book-now';
import { Observable } from 'rxjs';



// room.model.ts
export interface Room {
id: string;
name: string;
capacity: number;
bedNum: number;
bathNum: number;
price: number;
amenities: string[];
images: string[];
status?: string; // optional: available, occupied, maintenance
}


// booking.model.ts
export interface Booking {
id?: string; // uuid
room_id: string;
first_name: string;
last_name: string;
email: string;
phone: string;
adult_guests: number;
child_guests: number;
total_guests: number;
start_date: string; // ISO date string
end_date: string; // ISO date string
total_price: number;
status: 'pending' | 'confirmed' | 'cancelled' | 'checked_in' | 'checked_out';
source: 'website' | 'phone' | 'OTA';
created_at: Date;
}


// payment.model.ts
export interface Payment {
id: string; // uuid
booking_id: string;
amount: number;
currency: string;
provider: 'stripe' | 'paypal';
provider_reference: string;
status: 'pending' | 'succeeded' | 'refunded';
processed_at: Date;
}


// cal-event.model.ts
export interface CalEvent {
id: string; // uuid
booking_id: string;
google_event_id: string;
synced_at: Date;
sync_status: 'created' | 'updated' | 'failed';
}

export interface Rooms {
  id: string;
  name: string;
  acapacity: number;
  bcapacity: number;
  bedNum: number;
  bathNum: number;
  price: number;
  amenities: string[];
  images: string[];
  status?: string; // Optional property for room status
}
export interface ContactPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  roomId?: string | null;
  newsletter?: boolean;
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
      capacity: 1,
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
      name: 'The Affectionate Two',
      capacity: 2,
      bedNum: 1,
      bathNum: 1,
      price: 850,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/AffShot2.jpg'],
    },
    {
      id: '3',
      name: 'Bush Mango',
      capacity: 4,
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
      id: '4',
      name: 'The Plum',
      capacity: 8,
      bedNum: 1,
      bathNum: 1,
      price: 1400,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: [
        '/assets/Lounge.jpg',
        '/assets/Kitchen.jpg',
        '/assets/RoomShot.jpg',
        '/assets/RoomShot2.jpg',
        '/assets/RoomShot3.jpg',
        '/assets/RoomShot4.jpg',
        '/assets/RoomShot5.jpg',
      ],
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
 sendContactMessage(payload: ContactPayload): Observable<any> {
    console.log('Contact message payload:', payload);
    // Here you would typically make an HTTP request to your backend API.
    // For demonstration, we'll return an observable that simulates a successful response.
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({ success: true });
        observer.complete();
      }, 1000); // Simulate network delay
    }); 
  }
}
