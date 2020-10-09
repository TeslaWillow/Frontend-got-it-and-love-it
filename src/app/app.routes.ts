import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioSesionUsuarioComponent } from './components/inicio-sesion-usuario/inicio-sesion-usuario.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { PlanesComponent } from './components/planes/planes.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
// Cliente/usuario
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
// Empresa
import { BancoArchivosComponent } from './components/banco-archivos/banco-archivos.component';
import { PlanActualComponent } from './components/plan-actual/plan-actual.component';
import { PaginaEmpresaComponent } from './components/pagina-empresa/pagina-empresa.component';
// Admin
import { GestionPlanesComponent } from './components/gestion-planes/gestion-planes.component';
import { GestionEmpresasComponent } from './components/gestion-empresas/gestion-empresas.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';

const APP_ROUTES: Routes = [
    {path: 'landing-page', component : LandingPageComponent},
    {path: 'inicio-sesion-usuario', component : InicioSesionUsuarioComponent},
    {path: 'registrate', component : RegistrateComponent},
    {path: 'planes', component : PlanesComponent},
    {path: 'empresas', component : EmpresasComponent},
    {path: 'admin', component : AdminComponent},
    {path: '404', component : NotFoundComponent},
    {path: 'dashboard', component : DashboardComponent},
    {path: 'carrito', component : CarritoComprasComponent},
    {path: 'historial-compras', component : HistorialComprasComponent},
    {path: 'banco-archivos', component : BancoArchivosComponent},
    {path: 'pagina-empresa', component : PaginaEmpresaComponent},
    {path: 'plan-actual', component : PlanActualComponent},
    {path: 'gestion-planes', component : GestionPlanesComponent},
    {path: 'gestion-empresas', component : GestionEmpresasComponent},
    {path: 'gestion-usuarios', component : GestionUsuariosComponent},
    {path: '**', pathMatch: 'full', redirectTo: '404'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});