import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../../../../services/organization.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-organizations-documents',
  templateUrl: './organizations-documents.component.html',
  styleUrls: ['./organizations-documents.component.less']
})
export class OrganizationsDocumentsComponent implements OnInit {

  constructor(private organizationService: OrganizationService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
