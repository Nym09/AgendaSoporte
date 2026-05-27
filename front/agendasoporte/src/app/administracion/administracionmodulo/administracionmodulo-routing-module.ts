import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Registro } from '../componentes/registro/registro';
import { Permisos } from '../componentes/permisos/permisos';
import { Roles } from '../componentes/roles/roles';

const routes: Routes = [
  {path: 'usuario', component: Registro, title: 'Regisrar Usuario'},
  {path: 'permisos', component: Permisos, title: 'Permisos'},
  {path: 'roles', component: Roles, title: 'Roles Usuario'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracionmoduloRoutingModule {}
