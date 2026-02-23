import { Routes } from '@angular/router';
import { Login } from './paginas/auth/login/login';
import { Inicio } from './paginas/inicio/inicio';

export const routes: Routes = [
    {
        path: '',
        component:Login
    },
    {
        path:'inicio',
        component:Inicio
    }

];
