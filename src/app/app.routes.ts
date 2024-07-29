import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users/components/users/users.component').then((component) => component.UsersComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((component) => component.HomeComponent)
  }
];
