import { Component, OnInit } from '@angular/core';
import { UsuarioModule } from '../../models/usuario.module';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router"

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModule;

  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModule();
  }
  onSubmit( form: NgForm) {
    if(form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.register(this.usuario).subscribe( data =>{
      console.log(data);
      Swal.close();
      this.router.navigateByUrl('home')
    }, (err) =>{
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
      console.log(err.error.error.message);
    })
  }


}
