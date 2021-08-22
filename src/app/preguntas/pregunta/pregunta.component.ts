import { Component, OnInit, OnDestroy } from '@angular/core';
import { PreguntaService } from '../../Services/pregunta.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
 
@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit, OnDestroy{
  listado = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  constructor( private preguntaService: PreguntaService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.listar();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      retrieve: true,
      language:{
        url:'//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  listar(): void{
    this.preguntaService.listar().subscribe(data => {
      for(var i=0;i<data.Reply[0].length;i++){
        var identificador = data.Reply[0][i].name.split("/");
        this.listado.push({id:identificador[4], nombre:data.Reply[0][i].displayName});
        this.dtTrigger.next();
      }
    });
  }

  borrarPregunta(id): void{
   
      if(confirm("Estas seguro que desea eliminar la cuenta? esta accion es permantente")){
        this.preguntaService.borrar(id).subscribe(data => {
          this.toastr.success("Pregunta borrar con éxito");
          this.listado = [];
          this.listar();
        })
        
      }
    
  }
}
