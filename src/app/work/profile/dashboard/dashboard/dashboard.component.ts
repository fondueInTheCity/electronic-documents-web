import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserDashboard} from '../models/UserDashboard';
import {map, mergeMap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';

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
  updateSubscription: Subscription;


  constructor(private service: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getSubscription = this.activatedRoute.parent.parent.params.pipe(
      map((params: Params) => params.username),
      mergeMap((username: string) => this.service.getDashboard(username))
    ).subscribe((data: UserDashboard) => {
      this.username = data.username;
      this.dashboardForm.reset(data);
    });
  }

  onSubmit(): void {
    this.service.updateDashboard(this.username, this.dashboardForm.value).subscribe();
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
    this.updateSubscription.unsubscribe();
  }
}
