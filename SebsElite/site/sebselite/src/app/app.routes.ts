import { Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { About } from './about/about';
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
];
