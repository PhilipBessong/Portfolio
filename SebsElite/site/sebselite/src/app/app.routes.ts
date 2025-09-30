import { Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Boxers } from './boxers/boxers';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'boxers', component: Boxers }
];
