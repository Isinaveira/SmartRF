import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/login/login.component';
import { DevicesComponent } from '@/pages/devices/devices.component';
import { DeviceDetailComponent } from '@/pages/devices/device-detail/device-detail.component';
import { UsersComponent } from '@/pages/users/users.component';
import { AlertsComponent } from '@/pages/alerts/alerts.component';
import { ConstellationsComponent } from './pages/constellations/constellations.component';
import { ConstellationsDetailComponent } from './pages/constellations/constellations-detail/constellations-detail.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
export const routes: Routes = [
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [authGuard] },
    { path: 'devices', pathMatch: 'full', component: DevicesComponent, canActivate: [authGuard] },
    { path: 'devices/:id', pathMatch: 'full', component: DeviceDetailComponent, canActivate: [authGuard] },
    { path: 'users', pathMatch: 'full', component: UsersComponent , canActivate: [authGuard, adminGuard] },
    { path: 'alerts', pathMatch: 'full', component: AlertsComponent, canActivate: [authGuard] },
    { path: 'constellations', pathMatch: 'full', component: ConstellationsComponent, canActivate: [authGuard, adminGuard] },
    { path: 'constellations/:id', pathMatch: 'full', component: ConstellationsDetailComponent, canActivate: [authGuard, adminGuard] },
    { path: 'charts', pathMatch: 'full', component: ChartsComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
