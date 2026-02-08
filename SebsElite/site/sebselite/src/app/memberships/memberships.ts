import { Component } from '@angular/core';
import { CommonModule,} from '@angular/common';
import { RouterLink } from '@angular/router';
import { Membership, MembershipService } from '../services/membership';
@Component({
  selector: 'app-memberships',
  imports: [CommonModule, RouterLink],
  templateUrl: './memberships.html',
  styleUrl: './memberships.css'
})
export class Memberships {
  membershipPlans: Membership[] = [];
    constructor(private membershipService: MembershipService) {
      this.membershipPlans = this.membershipService.getPlans();
    }

    toMemberships() {
      // Navigate to the membership plans section of the site
    }
}
