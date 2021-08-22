import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {AuthService} from '../../Services/auth.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {AsignaturaService} from '../../Services/asignatura.service';
import { Horario } from '../../Clases/horario';
import { Asignatura } from '../../Clases/asignatura';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-nuevo-horario',
  templateUrl: './nuevo-horario.component.html',
  styleUrls: ['./nuevo-horario.component.css']
})
export class NuevoHorarioComponent implements OnInit {
  asignatura:Asignatura;
  asignaturas :Asignatura[];

  profileForm = new FormGroup({
    semestre: new FormControl('',[
      Validators.required,
    ]),
    dia: new FormControl('',[
      Validators.required,
      ]),
    horaDesde: new FormControl('',[
      Validators.required,
      ]), 
    horaHasta: new FormControl('',[
      Validators.required,
      ]),
  });
  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private asignaturaService:AsignaturaService,
    private _location: Location,
    private toastr:ToastrService) { 
      const navigation = this.router.getCurrentNavigation();
      this.asignatura= navigation.extras.state.asignatura;

    }

  ngOnInit(): void {
  }
  addHorario(){
    this.asignaturaService.nuevoHorario(
      this.profileForm.value.semestre,
      this.profileForm.value.dia,
      this.profileForm.value.horaDesde,
      this.profileForm.value.horaHasta,
      this.asignatura
      ).subscribe(data => {
      this.toastr.success(data.data);
    //  this._location.back();
    this.asignaturaService.getAsignaturas()
    .subscribe(asignaturas =>{
    this.asignaturas = asignaturas.data;
    for(let i=0;i<this.asignaturas.length;i++){
      if(this.asignaturas[i].id == this.asignatura.id){
        this.asignatura = this.asignaturas[i];
        this.router.navigateByUrl('/horarios', { state: { asignatura: this.asignatura } });
      }
    }
       // this.router.navigateByUrl('/evaluaciones', { state: { asignatura: this.asignatura } });
      });
      
    }
    );
    
  }
  cancelar(){
    this._location.back();
  }
}
