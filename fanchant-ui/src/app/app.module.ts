import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { McComponent } from './components/mc/mc.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexModule} from "@angular/flex-layout";
import {MatSelectModule} from "@angular/material/select";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ChantApiInterceptor} from "./interceptors/chant-api.interceptor";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { EventSummaryComponent } from './components/event-summary/event-summary.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CountdownModule} from "ngx-countdown";
import { FanComponent } from './components/fan/fan.component';

@NgModule({
  declarations: [
    AppComponent,
    McComponent,
    EventSummaryComponent,
    FanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CountdownModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ChantApiInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
