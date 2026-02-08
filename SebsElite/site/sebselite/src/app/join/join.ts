import { Component } from '@angular/core';
import { CommonModule,} from '@angular/common';
import { Membership, MembershipService } from '../services/membership';
@Component({
  selector: 'app-join',
  imports: [CommonModule],
  templateUrl: './join.html',
  styleUrl: './join.css'
})
export class Join  {

  membershipPlans: Membership[] = [];
    constructor(private membershipService: MembershipService) {
      this.membershipPlans = this.membershipService.getPlans();
    }
 


}
