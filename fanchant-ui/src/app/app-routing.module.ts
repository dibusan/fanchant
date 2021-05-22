import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {McComponent} from "./components/mc/mc.component";

const routes: Routes = [
  { path: '', redirectTo: '/mc', pathMatch: 'full' },
  { path: 'mc', component: McComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
