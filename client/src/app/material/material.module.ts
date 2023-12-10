import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';



const materials=[MatInputModule,MatButtonModule,MatDividerModule
,MatFormFieldModule,MatIconModule,MatCardModule,MatRadioModule,MatSidenavModule]

@NgModule({
  imports: [materials],
  exports:[materials]
})
export class MaterialModule { }
