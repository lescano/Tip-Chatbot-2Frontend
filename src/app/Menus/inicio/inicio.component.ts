import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/auth.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }
  islogin(){
    return this.authService.loggedIn();
  }
}
