import { Component, OnInit } from '@angular/core';
import { FeriadoService } from '../../Services/feriado.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feriado',
  templateUrl: './feriado.component.html',
  styleUrls: ['./feriado.component.css']
})
export class FeriadoComponent implements OnInit {
  listado = [];
  constructor(private feriadoService: FeriadoService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void{
    this.feriadoService.listar().subscribe(data => {
     // console.log(data.data);
      for(var i=0;i<data.data.length;i++){
        let f = new Date(data.data[i].fecha);
        let dia = (f.getDate()+1).toString();
        let fecha =  dia + "/" + (f.getMonth() +1) + "/" +f.getFullYear() ;
        this.listado.push({id:data.data[i]._id, motivo:data.data[i].motivo,fecha:fecha});
      }
    });
  }

  borrarFeriado(id): void{
   
    if(confirm("Estas seguro que desea eliminar este feriado? esta accion es permantente")){
      this.feriadoService.borrar(id).subscribe(data => {
        this.toastr.success("Feriado borrado con éxito");
        this.listado = [];
        this.listar();
      })
      
    }
  
}
}
