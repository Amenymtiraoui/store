import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{


  constructor (private authservice:AuthService){}
  ngOnInit(): void {
    this.authservice.login("").subscribe((res:any)=>{
      localStorage.setItem("token",res.body.access_token)
    })
  }


}
