import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//Routes
import { APP_ROUTING } from './app.routes';

//Services
import { ArchivosService } from './services/archivos.service';
import { UsuariosService } from './services/usuarios.service';
import { TipoUsuarioService } from './services/tipo-usuario.service';
import { PlanesService } from './services/planes.service';
import { ComprasService } from './services/compras.service';
import { ProductosService } from './services/productos.service';
import { CategoriasService } from './services/categorias.service';
import { EmpresasService } from './services/empresas.service';
//Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { InicioSesionUsuarioComponent } from './components/inicio-sesion-usuario/inicio-sesion-usuario.component';
import { RegistrateComponent } from './components/registrate/registrate.component';
import { PlanesComponent } from './components/planes/planes.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/shared/dashboard/dashboard.component';
import { CarritoComprasComponent } from './components/carrito-compras/carrito-compras.component';
import { HistorialComprasComponent } from './components/historial-compras/historial-compras.component';
import { BancoArchivosComponent } from './components/banco-archivos/banco-archivos.component';
import { PlanActualComponent } from './components/plan-actual/plan-actual.component';
import { GestionEmpresasComponent } from './components/gestion-empresas/gestion-empresas.component';
import { GestionPlanesComponent } from './components/gestion-planes/gestion-planes.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { PaginaEmpresaComponent } from './components/pagina-empresa/pagina-empresa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    InicioSesionUsuarioComponent,
    RegistrateComponent,
    PlanesComponent,
    EmpresasComponent,
    NotFoundComponent,
    AdminComponent,
    DashboardComponent,
    CarritoComprasComponent,
    HistorialComprasComponent,
    BancoArchivosComponent,
    PlanActualComponent,
    GestionEmpresasComponent,
    GestionPlanesComponent,
    GestionUsuariosComponent,
    PaginaEmpresaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    APP_ROUTING, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    ArchivosService,
    UsuariosService,
    TipoUsuarioService,
    PlanesService,
    ComprasService,
    ProductosService,
    CategoriasService,
    EmpresasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
