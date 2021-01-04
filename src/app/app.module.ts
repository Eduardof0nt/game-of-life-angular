import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NpnSliderModule } from 'npn-slider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NpnSliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
