import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../auth/services/token-storage.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.less']
})
export class OrganizationsComponent implements OnInit {
  username: string;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
  }

}
