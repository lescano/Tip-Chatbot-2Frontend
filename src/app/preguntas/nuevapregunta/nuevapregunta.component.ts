import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { PreguntaService } from '../../Services/pregunta.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevapregunta',
  templateUrl: './nuevapregunta.component.html',
  styleUrls: ['./nuevapregunta.component.css']
})
export class NuevapreguntaComponent implements OnInit {
  profileForm = new FormGroup({
    nombre: new FormControl('',[
      Validators.required,
    ]),
    respuesta: new FormControl('',[
      Validators.required,
      ])
  });
  secondForm = new FormGroup({
    pregunta: new FormControl('',[
      
      ])
  });
  formasPregunta = new Array();
 
  constructor(private preguntaService: PreguntaService,
    private fb: FormBuilder,
    private _location: Location,
    private router: Router,
    private toastr:ToastrService) {
      const navigation = this.router.getCurrentNavigation();
      this.formasPregunta = new Array();
     
     }

  ngOnInit(): void {
  }
  agregarForma(): void{
    this.formasPregunta.push(this.secondForm.value.pregunta);
    
    this.secondForm.get('pregunta').setValue("");
    
  //  console.log(this.formasPregunta);
  }
  quitar(): void{
    this.formasPregunta.pop();
  }
  addPregunta() : void{
   // console.log(this.formasPregunta);
    
    if(this.formasPregunta.length == 0){
      this.toastr.error("No has agregado ninguna forma de preguntar");
    }else{
      this.preguntaService.nuevaPregunta(
        this.profileForm.value.nombre,
        this.formasPregunta,
        this.profileForm.value.respuesta
        ).subscribe(data => {
          this.toastr.success("Nueva pregunta registrada con éxito");
          this.router.navigateByUrl('/preguntas');
    
        });
    }
    
    

  }
}
