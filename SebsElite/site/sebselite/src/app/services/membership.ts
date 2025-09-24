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

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private plans: Membership[] = [];

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
  }

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
}


