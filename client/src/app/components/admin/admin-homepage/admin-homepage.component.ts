import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { adminLogout } from 'src/app/app-state/auth/auth.actions';
import { AuthStateInterface } from 'src/app/models/state.models';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent {
  
store =inject(Store<{auth:AuthStateInterface}>)
  logout(){
    // console.log('logout admin');
this.store.dispatch(adminLogout())
  }
}
