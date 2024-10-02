import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecovertpasswordComponent } from './recovertpassword/recovertpassword.component';
const routes: Routes = [
  {path : 'resetPass',component:RecovertpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecovertRoutingModule { }
