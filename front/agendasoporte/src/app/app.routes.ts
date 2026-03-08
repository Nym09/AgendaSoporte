import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Inicio } from './inicio/inicio';
import { authGuard } from './guards/auth-guard';
import { Aside } from './componentes/aside/aside';
import { Usuarios } from './usuarios/usuarios';
import { Calendario } from './calendario/calendario';

export const routes: Routes = [
    {path: '',component:Login},
    {path: '',component:Aside,children: [
        {path:'inicio',component:Inicio, canActivate:[authGuard]},
        {path:'usuarios',component:Usuarios,canActivate:[authGuard]},
        {path:'calendario', component:Calendario,canActivate:[authGuard]}
    ]},
    {path:'**',component:Login}

];
