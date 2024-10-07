import { Injectable } from '@angular/core';
import { environment } from '../../environnement';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstagrameursService {

  url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getListInstagrammeurs() {

    let token = localStorage.getItem("token"); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get(`${this.url}/users/intagrammeur`, { headers : headers ,observe: 'response' });

  }


  add(newUser:any) {

    let token = localStorage.getItem("token"); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.post(`${this.url}/users/save`, newUser, { headers : headers ,observe: 'response' });

  }
  edit(userId: number,form:any) {

    let token = localStorage.getItem("token"); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.post(`${this.url}/users/update/${userId}`,form, { headers : headers ,observe: 'response' });

  }

}
