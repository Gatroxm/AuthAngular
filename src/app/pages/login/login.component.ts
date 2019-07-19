import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModule } from '../../models/usuario.module';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModule();

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login( loginForm: NgForm ){
    if( loginForm.invalid ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.logIn(this.usuario).subscribe(data =>{
      console.log(data);
      Swal.close();
      this.router.navigateByUrl('home')
    }, (err) => {
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
      console.log(err.error.error.message);
    });
  }

}
