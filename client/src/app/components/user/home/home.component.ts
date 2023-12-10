import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authServices = inject(AuthService)
  showFiller = false;

  logout(){
    this.authServices.deleteToken()
    window.location.reload()
  }
}
