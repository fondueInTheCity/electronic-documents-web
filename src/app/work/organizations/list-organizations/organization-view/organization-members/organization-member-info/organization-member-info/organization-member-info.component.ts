import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-organization-member-info',
  templateUrl: './organization-member-info.component.html',
  styleUrls: ['./organization-member-info.component.less']
})
export class OrganizationMemberInfoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
