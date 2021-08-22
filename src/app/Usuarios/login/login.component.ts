import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Clases/usuario';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';
import { FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { variablesGlobales } from "../../Services/variablesGlobales";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datosMal:boolean;
  enviados:boolean;
  profileForm = new FormGroup({
    cedula: new FormControl('',[
    Validators.required//,
    //Validators.minLength(8)
    ]),
    password: new FormControl('',
    Validators.required
    ),
  });
  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder) {
      this.datosMal=false;
      this.enviados=false;
     }

  ngOnInit(): void {
  }

  login(){
    this.enviados = true;
    this.auth.loginUser(this.profileForm.value.cedula,this.profileForm.value.password)
    .subscribe(data => {
      this.enviados = false;
      if(data.ok){
        //alert(data.usuario.id);
        //variablesGlobales.setActualUser(data.usuario.id);
        //this.auth.setActualUser("aloja");
        
        this.auth.setActualUser(data.usuario.id);
        localStorage.setItem("token",data.token);
        this.router.navigate(['/chat']);      
      }else{
        
        this.datosMal=true;
      }
    }
    ); 
    }
   
}
