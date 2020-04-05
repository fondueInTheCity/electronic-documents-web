import {Component, OnInit} from '@angular/core';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {OrganizationService} from '../../../services/organization.service';
import {OrganizationView} from '../../../models/organization-view';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.less']
})
export class OrganizationViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
