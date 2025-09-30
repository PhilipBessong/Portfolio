import { Injectable } from '@angular/core';

export interface Membership {
  plan_id: number;
  plan_name: string;
  description: string;
  price: number;
  duration: string; // e.g., '1 month', '12 months'
    plan_img: string;
  is_recurring: boolean;
}
// models/boxer.model.ts
export interface Boxer {
  name: string;
  nickname: string;
  weightClass: string;
  record: string;
  image: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  BoxRec?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private plans: Membership[] = [];
  private boxers: Boxer[] = [];
  constructor() {
    // Initialize with some default plans
    this.plans = [
 {
    plan_id: 1,
    plan_name: 'Monthly',
    description: 'Access to all classes and facilities for one month.',
    price: 50,
    duration: '1 month',
    plan_img: 'assets/monthly-min.png',
    is_recurring: true,
  },
  {
    plan_id: 2,
    plan_name: 'Annual',
    description: 'Full access for a year with a discounted rate.',
    price: 500,
    duration: '12 months',
    plan_img: 'assets/annual-min.png',
    is_recurring: true,
  },
  {
    plan_id: 3,
    plan_name: 'One-Time Pass',
    description: 'Single day access to all facilities.',
    price: 10,
    duration: '1 day',
    plan_img: 'assets/onetimepass-min.png',
    is_recurring: false,
  }
    ];
    this.boxers = [
      {
        name: 'Seun Adigun',
        nickname: 'The Panther',
        weightClass: 'Lightweight',
        record: '15-2-0',
        image: 'assets/boxers/seun_adigun.jpg',
        instagram: 'https://www.instagram.com/seunadigun/',
        facebook: 'https://www.facebook.com/seunadigun',
        twitter: 'https://twitter.com/seunadigun',
        BoxRec: 'https://boxrec.com/en/proboxer/123456',
      },
      {
        name: 'Chinonso "Nosa" Offor',
        nickname: 'The Bull',
        weightClass: 'Middleweight',
        record: '20-1-0',
        image: 'assets/boxers/nosa_offor.jpg',
        instagram: 'https://www.instagram.com/nosaoffor/',
        facebook: 'https://www.facebook.com/nosaoffor',
        twitter: 'https://twitter.com/nosaoffor',
        BoxRec: 'https://boxrec.com/en/proboxer/123457',
      },
      {
        name: 'Ifeanyi "The Hammer" Okonkwo',
        nickname: 'The Hammer',
        weightClass: 'Heavyweight',
        record: '18-3-0',
        image: 'assets/boxers/ifeanyi_okonkwo.jpg',
        instagram: 'https://www.instagram.com/ifeanyiokonkwo/',
        facebook: 'https://www.facebook.com/ifeanyiokonkwo',
        twitter: 'https://twitter.com/ifeanyiokonkwo',
        BoxRec: 'https://boxrec.com/en/proboxer/123458',
      },
      {
        name: 'Adewale "The Lion" Adebayo',
        nickname: 'The Lion',
        weightClass: 'Welterweight',
        record: '22-5-0',
        image: 'assets/boxers/adewale_adebayo.jpg',
        instagram: 'https://www.instagram.com/adewaleadebayo/',
        facebook: 'https://www.facebook.com/adewaleadebayo',
        twitter: 'https://twitter.com/adewaleadebayo',
        BoxRec: 'https://boxrec.com/en/proboxer/123459',
      }

    ];  
  }

  // Membership plan methods
  getPlans(): Membership[] {
    return this.plans;
  }

  addPlan(plan: Membership): void {
    this.plans.push(plan);
  }

  updatePlan(updatedPlan: Membership): void {
    const index = this.plans.findIndex(plan => plan.plan_id === updatedPlan.plan_id);
    if (index !== -1) {
      this.plans[index] = updatedPlan;
    }
  }

  deletePlan(plan_id: number): void {
    this.plans = this.plans.filter(plan => plan.plan_id !== plan_id);
  }

  // Boxer methods
  getBoxers(): Boxer[] {
    return this.boxers;
  }
  addBoxer(boxer: Boxer): void {
    this.boxers.push(boxer);
  }
  updateBoxer(updatedBoxer: Boxer): void {
    const index = this.boxers.findIndex(boxer => boxer.name === updatedBoxer.name);
    if (index !== -1) {
      this.boxers[index] = updatedBoxer;
    }
  }

  deleteBoxer(name: string): void {
    this.boxers = this.boxers.filter(boxer => boxer.name !== name);
  }
}
