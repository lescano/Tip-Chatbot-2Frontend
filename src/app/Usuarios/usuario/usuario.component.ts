import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { UsuarioService } from '../../Services/usuario.service';
import { Location } from '@angular/common';
import {AuthService} from '../../Services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit,OnDestroy {
  usuarios :Usuario[];
  //selectedUser: Usuario;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor(private usuarioSevice: UsuarioService,
     private route: ActivatedRoute,
     private location: Location,
     private authService:AuthService,
     private toastr:ToastrService) {}
     

  ngOnInit() {
    this.getUsuarios();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      language:{
        url:'//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  /*onSelect(user: Usuario): void {
      this.selectedUser = user;
      this.messageService.add(`UsuarioComponent: Selected usuario id=${user.id}`);
  }*/
  getUsuarios(): void {
    this.usuarioSevice.getUsuarios()
    .subscribe(usuarios =>{
    this.usuarios = usuarios.data;
    this.dtTrigger.next();
    });
  }
  goBack(): void {
    this.location.back();
  }
  borrarUsuario(id){
    if(confirm("Estas seguro que desea eliminar la cuenta? esta accion es permantente")){
      this.usuarioSevice.borrarUsuario(id).subscribe(data => {
        this.toastr.success(data.data);
        this.getUsuarios();
      })
      if(id==this.authService.getActualUser()){
        this.toastr.success("Elimino su propia cuenta, volviendo al menu proncipal");
        this.authService.logOut();
      }
    }
  }
}
