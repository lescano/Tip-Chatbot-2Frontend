import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { FeriadoService } from '../../Services/feriado.service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nuevo-feriado',
  templateUrl: './nuevo-feriado.component.html',
  styleUrls: ['./nuevo-feriado.component.css']
})
export class NuevoFeriadoComponent implements OnInit {
  profileForm = new FormGroup({
    fecha: new FormControl('',[
      Validators.required,
    ]),
    motivo: new FormControl('',[
      Validators.required,
      ])
  });
  constructor(private feriadoService: FeriadoService,
    private fb: FormBuilder,
    private _location: Location,
    private router: Router,
    private toastr:ToastrService) {
      const navigation = this.router.getCurrentNavigation();

    }

  ngOnInit(): void {
  }
  addFeriado():void {
    this.feriadoService.nuevoFeriado(
      this.profileForm.value.fecha,
      this.profileForm.value.motivo
      ).subscribe(data => {
        this.toastr.success("Nuevo feriado agregado con éxito");
        this.router.navigateByUrl('/feriados');
  
      });
  }

}
