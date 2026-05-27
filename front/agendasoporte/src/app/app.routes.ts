import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { guardsGuard } from './guards/guards-guard';
import { Inicio } from './inicio/inicio';
import { Administracion } from './administracion/administracion';
import { Clientes } from './clientes/clientes';

export const routes: Routes = [
 { path: '', component: Auth },
    { path: 'inicio', component: Inicio, canActivate: [guardsGuard]},
    {   path: 'administracion',
        loadChildren: () =>
            import('./administracion/administracionmodulo/administracionmodulo-module').then((m) => m.AdministracionmoduloModule),canActivate: [guardsGuard]
    },
    { path: 'clientes', component: Clientes, canActivate: [guardsGuard] },
    { path: '**', component: Auth }

];
