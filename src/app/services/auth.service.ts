import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environnement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  login(formData:any) {

    formData  ={
      email:"admin@gmail.com",
      password:"adminadmin"
    }
    return this.http.post(`${this.url}/login`, formData, { observe: 'response' });

  }
}


