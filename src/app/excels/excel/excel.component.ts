import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../../Services/excel.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private excelService: ExcelService,
    private toastr:ToastrService,
    private fb: FormBuilder,
    private _location: Location,
    private router: Router,) {
      const navigation = this.router.getCurrentNavigation();
     }

  ngOnInit(): void {
    this.fileToUpload = null;
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}
 upload(): void{
   if(this.fileToUpload == null){
    this.toastr.error("No has seleccionado ningun archivo");
   }else{
    let formData = new FormData();
    //formData.append('filetoupload', )
    
    formData.append('filetoupload', this.fileToUpload, this.fileToUpload.name);
    //alert(formData['filetoupload']);
  
    this.excelService.subir(formData).subscribe(data => {
      if(data.data == "Archivo subido!"){
        this.excelService.alta().subscribe(data =>{
          if(data.data != "Todo legal"){
            this.toastr.error(data.data);
          }else{
            this.toastr.success("Los datos fueron actualizados exitosamente");
          }
        });
      }else{
        this.toastr.error("Ocurrió un error en la carga del archivo");
      }
    });
   }
   }

}
