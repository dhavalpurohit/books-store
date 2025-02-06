import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent, NavbarComponent],
})
export class AppModule {}
