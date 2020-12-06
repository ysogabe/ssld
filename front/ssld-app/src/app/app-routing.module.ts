import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPointComponent } from './components/add-point/add-point.component';

const routes: Routes = [{ path: 'add', component: AddPointComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
