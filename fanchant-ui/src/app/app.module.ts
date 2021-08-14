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
import { KaraokeComponent } from './components/karaoke/karaoke.component';
import {ChunkDirective, LyricEngineComponent} from './components/karaoke/lyric-engine/lyric-engine.component';
import { ChunkComponent } from './components/karaoke/lyric-engine/chunk/chunk.component';
import { LineComponent } from './components/karaoke/lyric-engine/line/line.component';
import { KaraokeChunkDirective } from './directives/karaoke-chunk.directive';
import {MatProgressBar, MatProgressBarModule} from "@angular/material/progress-bar";
import { WelcomeComponent } from './components/welcome/welcome.component';
import {ScrollingModule} from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    AppComponent,
    McComponent,
    EventSummaryComponent,
    FanComponent,
    KaraokeComponent,
    LyricEngineComponent,
    ChunkComponent,
    LineComponent,
    ChunkDirective,
    KaraokeChunkDirective,
    WelcomeComponent
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
        MatProgressBarModule,
        CountdownModule,
        ScrollingModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ChantApiInterceptor, multi: true, }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
