import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Routes
import { APP_ROUTING } from './app.routes';

//Services

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
    HistorialComprasComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
