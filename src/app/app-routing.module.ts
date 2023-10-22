import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './imprint/imprint.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: 'imprint', component: ImprintComponent },
  { path: 'start-screen', component: StartScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
