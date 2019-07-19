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

  logOut() {}

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

  }

  leerToken(){
    if( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token')
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
