import {
  Injectable,
  createComponent,
  EnvironmentInjector,
} from '@angular/core';
import { BookNow } from '../book-now/book-now';
import { Observable, of } from 'rxjs';



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
 description?: string;
status?: string; // optional: available, occupied, maintenance
features?: RoomFeatures;
}
export interface RoomFeatures {
  sleeping: string[];    // Beds, AC, heating, linens
  kitchen: string[];     // Appliances, dining, coffee
  bathroom: string[];    // Shower, bath, toiletries, laundry
  tech: string[];        // WiFi, TV, power backup, workspace
  outdoor: string[];     // BBQ, views, garden, parking
  safety: string[];      // Security, alarms, services, rules
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
      capacity: 2,
      bedNum: 1,
      bathNum: 1,
      price: 800,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Free Parking', 'Solar Power'],
      images: ['/assets/AffShot.jpg', '/assets/croom.jpg'],
      description: 'The Affectionate One is a 17 m² double room designed for two adults. It is an ideal space for business travelers due to its dedicated workspace and solar-powered infrastructure.',
      features: {
        sleeping: [
          'One large double bed with cotton linens',
          'Split-type ductless Air Conditioning',
          'Electric blankets for winter',
          'Wardrobe/closet with hangers',
          'Garden and inner courtyard views'
        ],
        kitchen: [
          'No stove or oven (Mini-kitchen)',
          'Hisense bar fridge & Microwave',
          'Electric kettle & Coffee station',
          'Wine glasses provided',
          'Private BBQ (braai) facility'
        ],
        bathroom: [
          'Private en-suite bathroom',
          'Walk-in shower',
          'Hairdryer & hot water',
          'Shower gel & towels provided'
        ],
        tech: [
          'Solar Power (WiFi/TV works during load shedding)',
          'Free high-speed WiFi',
          'Dedicated workspace with door for privacy',
          '32-inch HDTV with DSTV/Satellite'
        ],
        outdoor: [
          'Ground floor with private entrance',
          'Private BBQ area',
          'Free parking on premises',
          'Outdoor dining furniture'
        ],
        safety: [
          'Exterior security cameras',
          'Smoke alarm & fire extinguisher',
          'Window guards',
          'Non-smoking property',
          'Not suitable for children'
        ]
      }
    },
    {
      id: '2',
      name: 'The Affectionate One 2',
      capacity: 2,
      bedNum: 1,
      bathNum: 1,
      price: 850,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/AffShot2.jpg'],
      description: 'This unit is a cozy, 18 m² double room (slightly larger than its sister unit) with a private entrance. It is a single-level space located on the ground floor.',
      features: {
        sleeping: [
          'Queen-size bed with quality linens',
          'Split-type ductless AC',
          'Electric blankets & portable fans',
          'Wardrobe/closet',
          'Tiled/marble flooring'
        ],
        kitchen: [
          'No stove or oven (Light self-catering)',
          'Microwave & Mini-fridge',
          'Electric kettle & Full tableware',
          'Indoor desk doubles as dining surface',
          'Private charcoal BBQ grill'
        ],
        bathroom: [
          'Private bathroom',
          'Clothes drying rack',
          'Iron and ironing board'
        ],
        tech: [
          'Free high-speed WiFi',
          'Dedicated workspace/desk',
          'Flat-screen HDTV with DSTV',
          'Socket near the bed'
        ],
        outdoor: [
          'View of garden & inner courtyard',
          'Private entrance',
          'Outdoor dining area',
          'Free parking on premises'
        ],
        safety: [
          'Smoke alarm & fire extinguisher',
          'Exterior security cameras',
          'Host greets guests personally',
          'Strictly non-smoking'
        ]
      }
    },
    {
      id: '3',
      name: 'Bush Mango',
      capacity: 2, // Note: Text says 2 adults + baby, mapped to capacity 2 usually
      bedNum: 1,
      bathNum: 1,
      price: 1000,
      amenities: ['Free Wi-Fi', 'Air Conditioning', 'Family Friendly', 'Barbeque Facilities'],
      images: ['/assets/BushShot2.jpg', '/assets/BushShot.jpg'],
      description: 'Bush Mango is a modern, 40 m² one-bedroom apartment designed for up to two adults and a baby. It features a spacious layout with a separate living area and a fully equipped kitchenette.',
      features: {
        sleeping: [
          'Queen-size bed with cotton linens',
          'Air conditioning & portable fans',
          'Electric blankets for colder nights',
          'Wardrobe & clothes rack'
        ],
        kitchen: [
          'Well-fitted kitchenette (Stovetop, Fridge, Micro)',
          'Toaster, Blender & Kettle',
          'Pots, pans, oil, salt & pepper',
          'Dining area with dishes & silverware'
        ],
        bathroom: [
          'En-suite with shower',
          'In-unit Washing Machine & Dryer',
          'Hairdryer & toiletries provided',
          'Iron & ironing board'
        ],
        tech: [
          'Solar panel system (Backup power)',
          'Fast property-wide WiFi',
          'Dedicated desk/workspace',
          'Flat-screen TV with DSTV',
          'Stationary fitness bike'
        ],
        outdoor: [
          'Private entrance & patio',
          'Backyard/garden access',
          'Private BBQ grill with utensils',
          'Outdoor dining area'
        ],
        safety: [
          'Crib & High chair available',
          'Baby bath & window guards',
          'Smoke alarm & fire extinguisher',
          'Exterior security cameras'
        ]
      }
    },
    {
      id: '4',
      name: 'The Plum',
      capacity: 8,
      bedNum: 5,
      bathNum: 2, // 2.5 baths rounded up or kept as 3
      price: 1400,
      amenities: ['Free Wi-Fi', 'Solar Power', 'Free Parking'],
      images: ['/assets/Lounge.jpg', '/assets/Kitchen.jpg'],
      description: 'This property is a spacious, single-level three-bedroom apartment designed for up to 8 guests. Perfect for large groups and family-friendly environment.',
      features: {
        sleeping: [
          'Bedroom 1: Queen bed + Crib',
          'Bedroom 2: Double bed + Single bed',
          'Bedroom 3: Double bed + Single bed',
          'Electric blankets & cotton linens'
        ],
        kitchen: [
          'Full Kitchen (Gas Stove, Oven, Dishwasher)',
          'Large Refrigerator & Microwave',
          'Toaster, Blender & Kettle',
          'Full set of cookware & baking sheets',
          'Dining table with children’s dinnerware'
        ],
        bathroom: [
          '2.5 Bathrooms (Master Ensuite + Shared + Guest WC)',
          'Bathtub & Shower',
          'Hairdryer & Body soap',
          'Cleaning products provided'
        ],
        tech: [
          'Solar Power (No load shedding)',
          'Fast Free WiFi (90 Mbps)',
          '42-inch HDTV with DSTV',
          'Workspace with ergonomic chair'
        ],
        outdoor: [
          'Fully fenced private backyard',
          'Private charcoal BBQ grill',
          'Outdoor furniture & dining area',
          'Free private parking'
        ],
        safety: [
          'Family friendly: High chair, Baby bath, Games',
          'Smoke & Carbon monoxide alarms',
          'Ground floor (No stairs)',
          'Luggage drop-off allowed'
        ]
      }
    },
  ];


getRooms(): Observable<Room[]> {
    return of(this.rooms);
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
