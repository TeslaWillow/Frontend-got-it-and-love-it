import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioSesionUsuarioComponent } from './components/inicio-sesion-usuario/inicio-sesion-usuario.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { PlanesComponent } from './components/planes/planes.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';

// Cliente/usuario
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
// Empresa
import { BancoArchivosComponent } from './components/banco-archivos/banco-archivos.component';
import { PlanActualComponent } from './components/plan-actual/plan-actual.component';
import { PaginaEmpresaComponent } from './components/pagina-empresa/pagina-empresa.component';
import { ListaPaginasEmpresaComponent } from './components/lista-paginas-empresa/lista-paginas-empresa.component';
import { BancoImagenesComponent } from './components/banco-imagenes/banco-imagenes.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
// Admin
import { GestionPlanesComponent } from './components/gestion-planes/gestion-planes.component';
import { GestionEmpresasComponent } from './components/gestion-empresas/gestion-empresas.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionPlantillasComponent } from './components/gestion-plantillas/gestion-plantillas.component';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { IsEmpresaGuard } from './guards/is-empresa.guard';
import { IsAdminGuard } from './guards/is-admin.guard';

const APP_ROUTES: Routes = [
    {path: 'landing-page', component : LandingPageComponent},
    {path: 'inicio-sesion-usuario', component : InicioSesionUsuarioComponent},
    {path: 'registrate', component : RegistrateComponent},
    {path: 'planes', component : PlanesComponent},
    {path: 'empresas', component : EmpresasComponent},
    {path: 'admin', component : AdminComponent},
    {path: '404', component : NotFoundComponent},
    //--------------- Rutas que requieren autenticacion ------------------------------
    {path: 'dashboard', component : DashboardComponent, canActivate: [ AuthGuard ]},
    {path: 'editar-perfil', component : EditarPerfilComponent, canActivate: [ AuthGuard ]},
    //Cliente
    {path: 'carrito', component : CarritoComprasComponent, canActivate: [ AuthGuard ]},
    {path: 'historial-compras', component : HistorialComprasComponent, canActivate: [ AuthGuard ]},
    //Empresa
    {path: 'admin-companies/banco-archivos', component : BancoArchivosComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    {path: 'admin-companies/pagina-empresa', component : PaginaEmpresaComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    {path: 'admin-companies/plan-actual', component : PlanActualComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    {path: 'admin-companies/lista-paginas', component : ListaPaginasEmpresaComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    {path: 'admin-companies/gestion-productos', component : GestionProductosComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    {path: 'admin-companies/banco-imagenes', component : BancoImagenesComponent, canActivate: [ AuthGuard, IsEmpresaGuard ]},
    //Admin
    {path: 'gestion-planes', component : GestionPlanesComponent, canActivate: [ AuthGuard, IsAdminGuard ]},
    {path: 'gestion-empresas', component : GestionEmpresasComponent, canActivate: [ AuthGuard, IsAdminGuard ]},
    {path: 'gestion-usuarios', component : GestionUsuariosComponent, canActivate: [ AuthGuard, IsAdminGuard ]},
    {path: 'gestion-plantillas', component : GestionPlantillasComponent, canActivate: [ AuthGuard, IsAdminGuard ]},
    //Ruta por default
    {path: '**', pathMatch: 'full', redirectTo: 'landing-page'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});