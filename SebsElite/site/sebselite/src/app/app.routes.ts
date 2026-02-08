import { Routes } from '@angular/router';

import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Boxers } from './boxers/boxers';
import { Memberships } from './memberships/memberships';
import { Class } from './class/class';
import { Join } from './join/join';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'boxers', component: Boxers },
  { path: 'memberships', component: Memberships },
  { path: 'classes', component: Class },
  {path: 'join', component: Join}
];
