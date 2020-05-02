import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserDashboard} from '../models/UserDashboard';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardForm = new FormGroup({
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    middleName: new FormControl(),
    publicInfo: new FormControl(),
    email: new FormControl()
  });
  username: string;
  getSubscription: Subscription;


  constructor(private service: UserService,
              private tokenStorageService: TokenStorageService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUsername();
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.service.getDashboard(this.username).subscribe((data: UserDashboard) => {
      this.dashboardForm.reset(data);
    });
  }

  onSubmit(): void {
    this.service.updateDashboard(this.username, this.dashboardForm.value).subscribe();
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }
}
