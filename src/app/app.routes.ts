import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioSesionUsuarioComponent } from './components/inicio-sesion-usuario/inicio-sesion-usuario.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { PlanesComponent } from './components/planes/planes.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';

const APP_ROUTES: Routes = [
    {path: 'landing-page', component : LandingPageComponent},
    {path: 'inicio-sesion-usuario', component : InicioSesionUsuarioComponent},
    {path: 'registrate', component : RegistrateComponent},
    {path: 'planes', component : PlanesComponent},
    {path: 'empresas', component : EmpresasComponent},
    {path: 'admin', component : AdminComponent},
    {path: '404', component : NotFoundComponent},
    {path: 'dashboard', component : DashboardComponent},
    {path: '**', pathMatch: 'full', redirectTo: '404'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});