import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Accomodations } from './accomodations/accomodations';
import { ContactComponent } from './contact/contact';
export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'accommodations', component: Accomodations},
    {path: 'contact', component: ContactComponent},
];
