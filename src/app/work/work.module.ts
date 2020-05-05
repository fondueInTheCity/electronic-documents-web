import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkRoutingModule } from './work-routing.module';
import { GeneralComponent } from './general/general.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    WorkRoutingModule,
    HttpClientModule
  ]
})
export class WorkModule { }
