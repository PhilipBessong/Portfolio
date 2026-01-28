import { Component } from '@angular/core';
import { CommonModule,} from '@angular/common';
import { Membership, MembershipService } from '../services/membership';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  membershipPlans: Membership[] = [];
  constructor(private membershipService: MembershipService) {
   const specificIds = [1, 3, 5];

  this.membershipPlans = this.membershipService.getPlans()
    .filter(plan => specificIds.includes(plan.plan_id));
  }

  toMemberships() {
    // Navigate to the membership plans section of the site
  }


}
