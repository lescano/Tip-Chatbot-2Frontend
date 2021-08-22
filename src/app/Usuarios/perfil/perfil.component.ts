import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public id:string;
  nombre:string;
  apellido:string;
  cedula:string;
  editando:boolean;

  cambiandoContrasenia:boolean;
  editandoPerfil:boolean;

  //contraseña
  actual:string;
  nueva:string;
  confirmar:string;
  noCoinciden:boolean;
  actualIncorrecta:boolean;


profileForm = new FormGroup({
    cedula: new FormControl('',[
    Validators.required,
    Validators.minLength(8)
    ]),
    nombre: new FormControl('',
    Validators.required
    ),
    apellido: new FormControl('',
    Validators.required
    ),
  });
  passwdForm = new FormGroup({
    actual: new FormControl('',[
    Validators.required,
    ]),
    nueva: new FormControl('',[
    Validators.required,
    Validators.minLength(6)
  ]),
    confirmar: new FormControl('',
    Validators.required
    ),
  });
  constructor(private authService:AuthService,private toastr: ToastrService) { 
    this.cambiandoContrasenia=false;
    this.id=this.authService.getActualUser();
    this.obtenerDatos();
    
  }

  ngOnInit(): void {
    this.editando=false;
    this.id=this.authService.getActualUser();
    this.obtenerDatos();
    this.noCoinciden=false;
    this.actualIncorrecta=false;
    
    
  }
  obtenerDatos(){
    this.authService.getUser().subscribe(data => {
      this.nombre=data.usuario.nombre;
      this.apellido=data.usuario.apellido;
      this.cedula=data.usuario.cedula;
    })
  }
  editar(){
    this.authService.updateUser(this.profileForm.value.cedula,this.profileForm.value.nombre,this.profileForm.value.apellido).subscribe(data => {
      if(data.data=="Usuario modificado con exito"){
        this.habilitarEditarPerfil();
        this.toastr.success(data.data);    
      }else{
        this.toastr.success(data.data);
      }
    })
  }
  habilitarCambiarContrasenia(){
    this.cambiandoContrasenia=!this.cambiandoContrasenia;
    //this.editandoPerfil=!this.cambiandoContrasenia;
  }
  habilitarEditarPerfil(){
    this.obtenerDatos();
    this.editandoPerfil=!this.editandoPerfil;
  }
  cambiarContrasenia(){
    if(this.passwdForm.value.nueva==this.passwdForm.value.confirmar){
      this.noCoinciden=false;

    this.authService.updateContrasenia(this.passwdForm.value.actual,this.passwdForm.value.nueva).subscribe(data => {
      if(data.data == "La contraseña actual es incorrecta"){
        this.actualIncorrecta = true;
        this.cambiandoContrasenia=true;
      }else{
        this.toastr.success(data.data);
        this.noCoinciden=false;
        this.actualIncorrecta = false;
        this.cambiandoContrasenia=false;
        this.confirmar = "";
        this.actual = "";
        this.nueva = "";
      }
         
    })
    
    
    }else{
      this.actualIncorrecta = false;
      this.noCoinciden=true;
    }
  }
  eliminarUsuario(){
    if(confirm("Estas seguro que desea eliminar la cuenta? esta accion es permantente")){
      this.authService.eliminarUsuario().subscribe(data => {
        this.toastr.success(data.data);
        this.authService.logOut();
      })
    }
  }

}
