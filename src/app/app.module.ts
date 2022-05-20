import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { RegionSelectComponent } from './components/region-select/region-select.component';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingModule.components,
    NavBarComponent,
    SearchBarComponent,
    CountryCardComponent,
    RegionSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
