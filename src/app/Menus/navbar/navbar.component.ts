import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    idAdmin = false;
    userSesion: String;

    constructor(private authService: AuthService,
        private router: Router) {
        this.pedirAdmin();
    }

    ngOnInit(): void {
        this.pedirAdmin();
        this.userSesion = this.authService.getUserName();   
    }

    islogin() {
        return this.authService.loggedIn();
    }

    logOut() {
        this.authService.logOut();
    }

    isAdmin() {
        return this.idAdmin;
    }

    pedirAdmin() {
        if (this.islogin()) {
            this.authService.isAdmin().subscribe(data => {
                this.idAdmin = data.data;
            })
        }
    }

}
