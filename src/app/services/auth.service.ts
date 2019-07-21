import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModule } from '../models/usuario.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url ='https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyC2QG5r4Pqg5dXCbxbjImz6YLVpDvB5miQ';
  userToken: string;
  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logIn( user: UsuarioModule){
    const authData = {
      ...user,
      returnSecureToken: true
    };
    return this.http.post(`${ this.url }/accounts:signInWithPassword?key=${this.apiKey}`, authData).pipe(map( data =>{
      this.guardarToken(data['idToken']);
      return data;
    }));
  }

  logOut() {
    localStorage.removeItem('token');
  }

  register( user: UsuarioModule) {
    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/accounts:signUp?key=${this.apiKey}`, authData).pipe(map( data =>{
      this.guardarToken(data['idToken']);
      return data;
    }));
  }

  guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem( 'expira', hoy.getTime().toString() );

  }

  leerToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));

    const expiraDate = new Date();

    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ){
      return true;
    } else {
      return false;
    }

  }
}
