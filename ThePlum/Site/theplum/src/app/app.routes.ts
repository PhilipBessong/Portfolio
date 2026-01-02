import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Accomodations } from './accomodations/accomodations';
import { ContactComponent } from './contact/contact';
import { About } from './about/about';
import { RoomDetails } from './room-details/room-details';
import { Privacypolicy } from './privacypolicy/privacypolicy';
export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'accommodations', component: Accomodations},
    {path: 'about', component: About},
    {path: 'contact', component: ContactComponent},
    { path: 'room/:id', component: RoomDetails },
    { path: 'privacy-policy', component: Privacypolicy }
];
