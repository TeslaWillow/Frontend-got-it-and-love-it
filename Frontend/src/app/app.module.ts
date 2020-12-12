import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { registerLocaleData } from '@angular/common'; //para que las fechas salgan en español
import  localeEs  from '@angular/common/locales/es'; //para que las fechas salgan en español
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators'; //Validaciones para los inputs de tipo file
import { HttpClientModule } from '@angular/common/http';
//Routes
import { APP_ROUTING } from './app.routes';
//Pipes
import { ActivoPipe } from './pipes/activo.pipe';
import { PesoArchivosPipe } from './pipes/peso-archivos.pipe';
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
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { ListaPaginasEmpresaComponent } from './components/lista-paginas-empresa/lista-paginas-empresa.component';
import { GestionPlantillasComponent } from './components/gestion-plantillas/gestion-plantillas.component';
import { BancoImagenesComponent } from './components/banco-imagenes/banco-imagenes.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { NgDropFilesDirective } from './directives/ng-drop-files.directive';
import { NgDropGenericfilesDirective } from './directives/ng-drop-genericfiles.directive';
import { ExtensionPipe } from './pipes/extension.pipe';



registerLocaleData(localeEs);

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
    PaginaEmpresaComponent,
    ActivoPipe,
    EditarPerfilComponent,
    ListaPaginasEmpresaComponent,
    GestionPlantillasComponent,
    BancoImagenesComponent,
    GestionProductosComponent,
    NgDropFilesDirective,
    PesoArchivosPipe,
    NgDropGenericfilesDirective,
    ExtensionPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    APP_ROUTING,
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    RxReactiveFormsModule
  ],
  providers: [
    ArchivosService,
    UsuariosService,
    TipoUsuarioService,
    PlanesService,
    ComprasService,
    ProductosService,
    CategoriasService,
    EmpresasService, 
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
