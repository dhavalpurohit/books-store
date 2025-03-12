import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route
  { path: 'profile', component: ProfileComponent }, // Default route
  { path: '**', redirectTo: '/' }, // Redirect to home
];