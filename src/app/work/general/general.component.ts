import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../auth/services/token-storage.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less']
})
export class GeneralComponent implements OnInit {

  username: string;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.username = this.tokenService.getUsername();
  }

}
