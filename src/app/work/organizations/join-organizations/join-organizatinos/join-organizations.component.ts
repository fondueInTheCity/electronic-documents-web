import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-join-organizations',
  templateUrl: './join-organizations.component.html',
  styleUrls: ['./join-organizations.component.less']
})
export class JoinOrganizationsComponent implements OnInit {
  joinForm = new FormGroup({
    name: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
