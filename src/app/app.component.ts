import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './auth/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'electronic-documents-web';
  username: string;

  constructor(private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUsername();
  }

  logged(): boolean {
    return this.tokenStorageService.isAuthorised();
  }
}
