
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {   path: '**', 
        redirectTo: 'home' } //Cambiarlo por login más adelante


];
