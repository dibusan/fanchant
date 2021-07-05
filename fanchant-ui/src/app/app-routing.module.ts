import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {McComponent} from "./components/mc/mc.component";
import {FanComponent} from "./components/fan/fan.component";
import {KaraokeComponent} from "./components/karaoke/karaoke.component";
import {WelcomeComponent} from "./components/welcome/welcome.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'mc', component: McComponent },
  { path: 'fan', component: FanComponent },
  { path: 'karaoke', component: KaraokeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
