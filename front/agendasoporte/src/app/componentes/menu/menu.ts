import { Component, OnInit } from '@angular/core';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { Authservices } from '../../auth/service/authservices';
@Component({
  selector: 'app-menu',
  imports: [MegaMenuModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  constructor(private authServie: Authservices, private router: Router) { }

  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/inicio'
      },
      {
        label: 'Administracion',
        icon: 'pi pi-book',
        items: [
          [
            {
              label: 'Administracion y Configuracion',
              items: [{ label: 'Registro Usuarios', routerLink: '/administracion/usuarios' }, { label: 'Permiso de Usuario', routerLink: '/administracion/permisos' }, { label: 'Roles', routerLink: '/administracion/roles' }]
            }
          ],
        ]
      },
      {
        label: 'Clientes y Empresas',
        icon: 'pi pi-user',
        items: [
          [
            {
              items: [{ label: 'Empresas', routerLink: '/clientes' }]
            }
          ],
        ]
      },
      {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      },
    ];
  }

  logout() {
    this.authServie.delete_token();
    this.router.navigate(['/'])
  }

}