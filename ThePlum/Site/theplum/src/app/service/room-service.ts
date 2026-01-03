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
  sleeping: string[]; // Beds, AC, heating, linens
  kitchen: string[]; // Appliances, dining, coffee
  bathroom: string[]; // Shower, bath, toiletries, laundry
  tech: string[]; // WiFi, TV, power backup, workspace
  outdoor: string[]; // BBQ, views, garden, parking
  safety: string[]; // Security, alarms, services, rules
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
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Free Parking',
        'Solar Power',
      ],
      images: ['/assets/AffShot.jpg', '/assets/croom.jpg'],
      description:
        'This is an exclusive, spacious, serene room; with a queen, comfortable bed for total occupancy of two. You have a writing desk, ergonomic chair, and high speed internet to support your business activities, or stay in contact with family and friends while on the move. You can follow current affairs, and business news, or just relax with the DSTV Compact bouquet. For your exclusive use, there are heat-and-eat facilities - fridge, microwave, electric kettle; with mugs, cutlery, and plates to go with. There is complimentary tea and coffee, and  prepared water.',
      features: {
        sleeping: [
          'One large double bed with cotton linens',
          'Split-type ductless Air Conditioning',
          'Electric blankets for winter',
          'Wardrobe/closet with hangers',
          'Garden and inner courtyard views',
        ],
        kitchen: [
          'No stove or oven (Mini-kitchen)',
          'Hisense bar fridge & Microwave',
          'Electric kettle & Coffee station',
          'Wine glasses provided',
          'Private BBQ (braai) facility',
        ],
        bathroom: [
          'Private en-suite bathroom',
          'Walk-in shower',
          'Hairdryer & hot water',
          'Shower gel & towels provided',
        ],
        tech: [
          'Solar Power (WiFi/TV works during load shedding)',
          'Free high-speed WiFi',
          'Dedicated workspace with door for privacy',
          '32-inch HDTV with DSTV/Satellite',
        ],
        outdoor: [
          'Ground floor with private entrance',
          'Private BBQ area',
          'Free parking on premises',
          'Outdoor dining furniture',
        ],
        safety: [
          'Exterior security cameras',
          'Smoke alarm & fire extinguisher',
          'Window guards',
          'Non-smoking property',
          'Not suitable for children',
        ],
      },
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
      description:
        'This is an exclusive, spacious, serene room; with a queen, comfortable bed for total occupancy of two (slightly larger than its sister unit). You have a writing desk, ergonomic chair, and high speed internet to support your business activities, or stay in contact with family and friends while on the move. You can follow current affairs, and business news, or just relax with the DSTV Compact bouquet. For your exclusive use, there are heat-and-eat facilities - fridge, microwave, electric kettle; with mugs, cutlery, and plates to go with. There is complimentary tea and coffee, and  prepared water.',
      features: {
        sleeping: [
          'Queen-size bed with quality linens',
          'Split-type ductless AC',
          'Electric blankets & portable fans',
          'Wardrobe/closet',
          'Tiled/marble flooring',
        ],
        kitchen: [
          'No stove or oven (Light self-catering)',
          'Microwave & Mini-fridge',
          'Electric kettle & Full tableware',
          'Indoor desk doubles as dining surface',
          'Private charcoal BBQ grill',
        ],
        bathroom: [
          'Private bathroom',
          'Clothes drying rack',
          'Iron and ironing board',
        ],
        tech: [
          'Free high-speed WiFi',
          'Dedicated workspace/desk',
          'Flat-screen HDTV with DSTV',
          'Socket near the bed',
        ],
        outdoor: [
          'View of garden & inner courtyard',
          'Private entrance',
          'Outdoor dining area',
          'Free parking on premises',
        ],
        safety: [
          'Smoke alarm & fire extinguisher',
          'Exterior security cameras',
          'Host greets guests personally',
          'Strictly non-smoking',
        ],
      },
    },
    {
      id: '3',
      name: 'Bush Mango',
      capacity: 2, // Note: Text says 2 adults + baby, mapped to capacity 2 usually
      bedNum: 1,
      bathNum: 1,
      price: 1000,
      amenities: [
        'Free Wi-Fi',
        'Air Conditioning',
        'Family Friendly',
        'Barbeque Facilities',
      ],
      images: ['/assets/BushShot2.jpg', '/assets/BushShot.jpg'],
      description:
        'This air-conditioned, spacious one-bed room apartment consists of a queen bed, an exercise bike, and one ensuite bathroom with a shower. The well-fitted kitchenette comprises a stovetop, a refrigerator, kitchenware and a microwave. There is a washing machine, flat-screen TV with satellite channels, patio, garden views; high speed internet connection and  a dedicated writing desk. There is a barbecue stand on request.',
      features: {
        sleeping: [
          'Queen-size bed with cotton linens',
          'Air conditioning & portable fans',
          'Electric blankets for colder nights',
          'Wardrobe & clothes rack',
        ],
        kitchen: [
          'Well-fitted kitchenette (Stovetop, Fridge, Micro)',
          'Toaster, Blender & Kettle',
          'Pots, pans, oil, salt & pepper',
          'Dining area with dishes & silverware',
        ],
        bathroom: [
          'En-suite with shower',
          'In-unit Washing Machine & Dryer',
          'Hairdryer & toiletries provided',
          'Iron & ironing board',
        ],
        tech: [
          'Solar panel system (Backup power)',
          'Fast property-wide WiFi',
          'Dedicated desk/workspace',
          'Flat-screen TV with DSTV',
          'Stationary fitness bike',
        ],
        outdoor: [
          'Private entrance & patio',
          'Backyard/garden access',
          'Private BBQ grill with utensils',
          'Outdoor dining area',
        ],
        safety: [
          'Crib & High chair available',
          'Baby bath & window guards',
          'Smoke alarm & fire extinguisher',
          'Exterior security cameras',
        ],
      },
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
      description:
        'The Plum is fully furnished and suitable for families and groups of up to 8 individuals sharing. With a fully equipped kitchen and barbecue facilities, guests are able to prepare their own meals, with the option of enjoying their meals in the dining area or outdoors. The host provides complimentary tea and coffee; and 5L of prepared portable water daily to guests of two or less, and 10L to groups of three or more. Children of three years and below will enjoy a cot to sleep on, and a high chair to eat and bond with parents. The copious wardrobe space allows for the storage of belongings without things getting in the way. The lounge, with sofas and satellite television, allows guests to keep abreast with national and international current affairs and business news, or just to relax with any of the drama or movie channels. Guests traveling for business have a dedicated work area with an ergonomic chair. High speed internet is available in all areas of the property.',
      features: {
        sleeping: [
          'Bedroom 1: Queen bed + Crib',
          'Bedroom 2: Double bed + Single bed',
          'Bedroom 3: Double bed + Single bed',
          'Electric blankets & cotton linens',
        ],
        kitchen: [
          'Full Kitchen (Gas Stove, Oven, Dishwasher)',
          'Large Refrigerator & Microwave',
          'Toaster, Blender & Kettle',
          'Full set of cookware & baking sheets',
          'Dining table with children’s dinnerware',
        ],
        bathroom: [
          '2.5 Bathrooms (Master Ensuite + Shared + Guest WC)',
          'Bathtub & Shower',
          'Hairdryer & Body soap',
          'Cleaning products provided',
        ],
        tech: [
          'Solar Power (No load shedding)',
          'Fast Free WiFi (90 Mbps)',
          '42-inch HDTV with DSTV',
          'Workspace with ergonomic chair',
        ],
        outdoor: [
          'Fully fenced private backyard',
          'Private charcoal BBQ grill',
          'Outdoor furniture & dining area',
          'Free private parking',
        ],
        safety: [
          'Family friendly: High chair, Baby bath, Games',
          'Smoke & Carbon monoxide alarms',
          'Ground floor (No stairs)',
          'Luggage drop-off allowed',
        ],
      },
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
