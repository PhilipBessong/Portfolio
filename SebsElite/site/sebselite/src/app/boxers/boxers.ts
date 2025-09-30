import { Component } from '@angular/core';
import { Boxer, MembershipService } from '../services/membership';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-boxers',
  imports: [CommonModule],
  templateUrl: './boxers.html',
  styleUrl: './boxers.css'
})
export class Boxers {
  boxers: Boxer[] = [];
  constructor(private membershipService: MembershipService) {
    this.boxers = this.membershipService.getBoxers();
  }
}
