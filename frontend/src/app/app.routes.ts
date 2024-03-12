import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/login/login.component';
import { DevicesComponent } from '@/pages/devices/devices.component';
import { DeviceDetailComponent } from '@/pages/devices/device-detail/device-detail.component';
import { UsersComponent } from '@/pages/users/users.component';
import { ProfileComponent } from '@/pages/profile/profile.component';
import { AlertsComponent } from '@/pages/alerts/alerts.component';
export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', pathMatch: 'full', component: LoginComponent},
    {path: 'devices', pathMatch: 'full', component: DevicesComponent},
    {path: 'devices/:id', pathMatch: 'full', component: DeviceDetailComponent},
    {path: 'home', pathMatch: 'full', component: HomeComponent},
    {path: 'users', pathMatch: 'full', component: UsersComponent},
    {path: 'profile', pathMatch: 'full', component: ProfileComponent},
    {path: 'alerts', pathMatch: 'full', component: AlertsComponent}
];
