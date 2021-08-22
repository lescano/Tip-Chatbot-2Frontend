import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../Clases/asignatura';
import { AsignaturaService } from '../../Services/asignatura.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Horario } from '../../Clases/horario';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-editar-horario',
  templateUrl: './editar-horario.component.html',
  styleUrls: ['./editar-horario.component.css']
})
export class EditarHorarioComponent implements OnInit {
  horario:Horario;
  horarioEditar:Horario;
  profileForm = new FormGroup({
    semestre: new FormControl('',[
    Validators.required//,
    //Validators.minLength(8)
    ]),
    dia: new FormControl('',
    Validators.required
    ),
    horaD: new FormControl('',
    Validators.required
    ),
    horaH: new FormControl('',
    Validators.required
    )
  });
  constructor(private router:Router,
    private asignaturaService:AsignaturaService,
    private _location: Location,
    private toastr: ToastrService) {

    const navigation = this.router.getCurrentNavigation();
    this.horario= navigation.extras.state.horario;


   this.horarioEditar=this.horario;
     }

  ngOnInit(): void {
    //alert(this.horarioEditar.dia);
  }
  editarHorario(){
    
    this.horarioEditar.semestre=this.profileForm.value.semestre;
    this.horarioEditar.dia=this.profileForm.value.dia;
    this.horarioEditar.horaDesde=this.profileForm.value.horaD;
    this.horarioEditar.horaHasta=this.profileForm.value.horaH;

    this.asignaturaService.editarHorario(this.horarioEditar)
    .subscribe(data =>{
      this.toastr.success(data.data);
    });
    this._location.back();
    
  }
  cancelar(){
    this._location.back();
  }
}
