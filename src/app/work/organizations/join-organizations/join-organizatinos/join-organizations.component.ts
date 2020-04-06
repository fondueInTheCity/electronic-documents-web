import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';

@Component({
  selector: 'app-join-organizations',
  templateUrl: './join-organizations.component.html',
  styleUrls: ['./join-organizations.component.less']
})
export class JoinOrganizationsComponent implements OnInit {
  joinForm = new FormGroup({
    organizationToken: new FormControl(),
    username: new FormControl()
  });

  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    
  }

  onSubmit() {

  }
}
