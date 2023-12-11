import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLogout } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  authServices = inject(AuthService)
  store = inject(Store<{auth:AuthStateInterface}>);
  showFiller = false;

  logout(){
    this.store.dispatch(userLogout())
  }
}
