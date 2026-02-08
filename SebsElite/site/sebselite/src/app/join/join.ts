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
    idValidationError = '';

validateSAID(id: string): boolean {
  // 1. Basic length check
  if (!id || id.length !== 13 || isNaN(Number(id))) {
    this.idValidationError = 'ID must be exactly 13 digits.';
    return false;
  }

  // 2. Date of Birth check (YYMMDD)
  const year = id.substring(0, 2);
  const month = id.substring(2, 4);
  const day = id.substring(4, 6);

  const tempDate = new Date(Number(year), Number(month) - 1, Number(day));
  if (!((tempDate.getMonth() + 1 === Number(month)) && (tempDate.getDate() === Number(day)))) {
    this.idValidationError = 'Invalid Date of Birth in ID.';
    return false;
  }

  // 3. Luhn Algorithm (The "Authentication" Checksum)
  let sum = 0;
  for (let i = 0; i < id.length; i++) {
    let digit = parseInt(id.charAt(i));
    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  if (sum % 10 !== 0) {
    this.idValidationError = 'Invalid ID Number (Checksum failed).';
    return false;
  }

  this.idValidationError = ''; // Clear error if all checks pass
  return true;
}

fileSizeError = false;

onFileSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      this.fileSizeError = true;
      event.target.value = ''; // Clear the input
    } else {
      this.fileSizeError = false;
      // Proceed with your upload logic here
    }
  }
}

promoApplied = false;

applyPromo() {
  const code = (document.getElementById('promoCode') as HTMLInputElement).value;
  if (code.trim().length > 0) {
    // Here you would typically call your service to check the code
    console.log('Applying promo:', code);
    this.promoApplied = true;
  }
}
}
