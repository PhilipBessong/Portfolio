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
    plan_name: 'Pay as You Go',
    description: 'Pay per session and enjoy full access to classes and facilities for the day.',
    price: 200,
    duration: '1 month',
    plan_img: 'assets/monthly-min.png',
    is_recurring: true,
  },
  {
    plan_id: 2,
    plan_name: '3 x Week',
    description: 'Train up to three times a week with full access to classes and facilities.',
    price: 900,
    duration: '12 months',
    plan_img: 'assets/annual-min.png',
    is_recurring: true,
  },
  {
    plan_id: 3,
    plan_name: 'Monthly Membership',
    description: 'Unlimited access to all facilities and classes for one month.',
    price: 1500,
    duration: '1 month',
    plan_img: 'assets/onetimepass-min.png',
    is_recurring: false,
  },
   {
    plan_id: 4,
    plan_name: '3 Months Membership',
    description: 'Unlimited access to all facilities and classes for three months.',
    price: 4000,
    duration: '3 months',
    plan_img: 'assets/onetimepass-min.png',
    is_recurring: false,
  },
    {
    plan_id: 5,
    plan_name: 'Yearly Membership',
    description: 'Full access to all facilities and classes for a whole year.',
    price: 15000,
    duration: '1 year',
    plan_img: 'assets/onetimepass-min.png',
    is_recurring: false,
  }
    ];
    this.boxers = [
      {
        name: 'Jabulani Makhense',
        nickname: '',
        weightClass: 'Welterweight',
        record: '16-3-0',
        image: 'assets/jabu-min.png',
        instagram: 'https://www.instagram.com/jabulanimakhense/',
        facebook: 'https://web.facebook.com/jabulani.makhense/',
        twitter: '',
        BoxRec: 'https://boxrec.com/en/box-pro/781633/',
      },
      {
        name: 'Cowin Ray',
        nickname: '',
        weightClass: 'Super Middleweight',
        record: '9-1-0',
        image: 'assets/cowin-min.png',
        instagram: 'https://www.instagram.com/cowin.ray/',
        facebook: 'https://web.facebook.com/cowinray/',
        twitter: '',
        BoxRec: 'https://boxrec.com/en/box-pro/760071/',
      },
      {
        name: 'Talent Baloyi',
        nickname: '',
        weightClass: 'Lightweight',
        record: '7-2-1',
        image: 'assets/tbBoxer-min.png',
        instagram: 'https://www.instagram.com/talentbaloyibox/',
        facebook: 'https://web.facebook.com/talenza.baloyi/',
        twitter: '',
        BoxRec: 'https://boxrec.com/en/box-pro/850113/',
      },
      {
        name: 'John Paul Kganane',
        nickname: '',
        weightClass: 'Welterweight',
        record: '1-1-1',
        image: 'assets/jp-min.png',
        instagram: 'https://www.instagram.com/jp_tabola_10/',
        facebook: 'https://web.facebook.com/jptabola.kganane/',
        twitter: '',
        BoxRec: 'https://boxrec.com/en/box-pro/1247215/',
      },
      {
        name: 'Talent Moyo',
        nickname: '',
        weightClass: 'Bantamweight',
        record: '2-0-0',
        image: 'assets/jp-min.png',
        instagram: 'https://www.instagram.com/man.tee5/',
        facebook: 'https://web.facebook.com/tman.moyo.758/',
        twitter: '',
        BoxRec: 'https://boxrec.com/en/box-pro/1159408/',
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
