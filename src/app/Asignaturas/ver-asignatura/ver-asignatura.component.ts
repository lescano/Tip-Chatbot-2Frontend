import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location  } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ver-asignatura',
  templateUrl: './ver-asignatura.component.html',
  styleUrls: ['./ver-asignatura.component.css']
})
export class VerAsignaturaComponent implements OnInit {
  asignatura:Asignatura;
  asignaturaEditar:Asignatura;
  fecha:String;
  profileForm = new FormGroup({
    codigo: new FormControl('',
    Validators.required
    ),
    nombre: new FormControl('',
      Validators.required
      ),
    creditos: new FormControl('',
      Validators.required
      ), 
    apruebaPor: new FormControl('',
      Validators.required
      ),
    nombreDocente: new FormControl('',
       Validators.required
      ), 
      correoDocente: new FormControl('',
        Validators.required
       ),
       fechaInscripcion: new FormControl('',
        Validators.required
       )
  });
  constructor(private router:Router,
    private asignaturaService:AsignaturaService,
    private toastr:ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    this.asignatura= navigation.extras.state.asignatura;

    this.asignaturaEditar=this.asignatura;
   
    let f = new Date(this.asignaturaEditar.fechaInscripcion);
    let dia = (f.getDate()+1).toString();
    if(parseInt(dia)<10){
      dia = "0"+dia;
    }
    this.fecha =  f.getFullYear() + "-" + (f.getMonth() +1) + "-" + dia;
   
   }

  ngOnInit(): void {
    //alert(this.fecha);
  }
  editarAsignatura(){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(String(this.profileForm.value.correoDocente).toLowerCase())){
      this.toastr.error("No has ingresado un correo electrónico válido");
    }else{
      this.asignaturaEditar.codigo=this.profileForm.value.codigo;
      this.asignaturaEditar.nombre=this.profileForm.value.nombre;
      this.asignaturaEditar.creditos=this.profileForm.value.creditos;
      this.asignaturaEditar.apruebaPor=this.profileForm.value.apruebaPor;
      this.asignaturaEditar.nombreDoc=this.profileForm.value.nombreDocente;
      this.asignaturaEditar.correoDoc=this.profileForm.value.correoDocente;
      this.asignaturaEditar.fechaInscripcion=this.profileForm.value.fechaInscripcion;
      //alert(this.profileForm.value.fechaInscripcion);
      this.asignaturaService.editarAsignatura(this.asignaturaEditar).subscribe(data => {
          this.toastr.success(data.data);
          this.router.navigateByUrl('/asignaturasAdmin');
      })
    }
       
  }
  editarHorarios(){
    this.router.navigateByUrl('/horarios', { state: { asignatura: this.asignaturaEditar } });
  }
  volver(){
    this.router.navigateByUrl('/asignaturasAdmin');
  }
}
