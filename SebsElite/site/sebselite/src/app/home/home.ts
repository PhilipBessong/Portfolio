import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    this.membershipPlans = this.membershipService.getPlans();
  }

}
