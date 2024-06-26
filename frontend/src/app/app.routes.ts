import { Routes } from '@angular/router';
import { HomeComponent } from '@/pages/home/home.component';
import { LoginComponent } from '@/pages/login/login.component';
import { DevicesComponent } from '@/pages/devices/devices.component';
import { DeviceDetailComponent } from '@/pages/devices/device-detail/device-detail.component';
import { UsersComponent } from '@/pages/users/users.component';
import { AlertsComponent } from '@/pages/alerts/alerts.component';
import { ConstellationsComponent } from './pages/constellations/constellations.component';
import { ConstellationsDetailComponent } from './pages/constellations/constellations-detail/constellations-detail.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { WorkspaceDetailComponent } from './pages/workspace/workspace-detail/workspace-detail.component';
import { MeasurementDetailComponent } from './pages/workspace/workspace-detail/measurement-detail/measurement-detail.component';
export const routes: Routes = [
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'home', pathMatch: 'full', component: HomeComponent, canActivate: [authGuard] },
    { path: 'devices', pathMatch: 'full', component: DevicesComponent, canActivate: [authGuard] },
    { path: 'devices/:station_id', pathMatch: 'full', component: DeviceDetailComponent, canActivate: [authGuard] },
    { path: 'users', pathMatch: 'full', component: UsersComponent , canActivate: [authGuard, adminGuard] },
    { path: 'alerts', pathMatch: 'full', component: AlertsComponent, canActivate: [authGuard] },
    { path: 'constellations', pathMatch: 'full', component: ConstellationsComponent, canActivate: [authGuard] },
    { path: 'constellations/:id', pathMatch: 'full', component: ConstellationsDetailComponent, canActivate: [authGuard] },
    { path: 'documentation', pathMatch: 'full', component: DocumentationComponent, canActivate: [authGuard]},
    { path: 'workspaces', pathMatch: 'full', component: WorkspaceComponent, canActivate: [authGuard]},
    { path: 'workspaces/:id', pathMatch: 'full', component: WorkspaceDetailComponent, canActivate: [authGuard]},
    { path: 'workspaces/measurement/:id', pathMatch: 'full', component: MeasurementDetailComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
