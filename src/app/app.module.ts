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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    InicioSesionUsuarioComponent,
    RegistrateComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
