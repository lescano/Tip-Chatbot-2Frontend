import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {AsignaturaService} from '../../Services/asignatura.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-nueva-asignatura',
  templateUrl: './nueva-asignatura.component.html',
  styleUrls: ['./nueva-asignatura.component.css']
})
export class NuevaAsignaturaComponent implements OnInit {
  profileForm = new FormGroup({
    codigo: new FormControl('', [
      Validators.required
    ]),
    nombre: new FormControl('', [
      Validators.required
    ]),
    creditos: new FormControl('', [
      Validators.required
    ]),
    apruebaPor: new FormControl('', [
      Validators.required
    ]),
    nombreDocente: new FormControl('', [
      Validators.required
    ]),
    correoDocente: new FormControl('', [
      Validators.required
    ]),
    fechaInscripcion: new FormControl('', [
      Validators.required
    ]),
  });
  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private asignaturaService: AsignaturaService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  addAsig(){
    //alert(this.profileForm.value.apruebaPor);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(this.profileForm.value.correoDocente).toLowerCase())){
      this.toastr.error("No has ingresado un correo electrónico válido");
    }else{
      this.asignaturaService.nuevaAsignatura(
        this.profileForm.value.codigo,
        this.profileForm.value.nombre,
        this.profileForm.value.creditos,
        this.profileForm.value.programa,
        this.profileForm.value.apruebaPor,
        this.profileForm.value.nombreDocente,
        this.profileForm.value.correoDocente,
        this.profileForm.value.fechaInscripcion
        )
      .subscribe(data => {
        //alert(data.data);
        this.toastr.success(data.data);
        this.router.navigate(['/asignaturasAdmin']);
      }
      );
    }

    
    
  }
  cancelar(){
    /*this.nombre:string;
    this.cedula:string;
    this.apellido:string;
    this.password:string;
    this.admin:boolean;*/
    this.router.navigate(['/asignaturasAdmin']);
  }
}
