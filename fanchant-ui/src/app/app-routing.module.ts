import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {McComponent} from "./components/mc/mc.component";
import {FanComponent} from "./components/fan/fan.component";

const routes: Routes = [
  { path: '', redirectTo: '/mc', pathMatch: 'full' },
  { path: 'mc', component: McComponent },
  { path: 'fan', component: FanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
