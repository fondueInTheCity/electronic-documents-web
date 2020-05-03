import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserDashboard} from '../models/UserDashboard';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardForm: FormGroup;
  username: string;
  getSubscription: Subscription;


  constructor(private service: UserService,
              private tokenStorageService: TokenStorageService,
              private utilService: UtilService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    await this.spinner.show();
    this.username = this.tokenStorageService.getUsername();
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.service.getDashboard(this.username).subscribe((data: UserDashboard) => {
      this.dashboardForm = this.fb.group({
        username: [data.username, this.utilService.getUsernameValidators()],
        firstName: [data.firstName, this.utilService.getFirstNameValidators()],
        lastName: [data.lastName, this.utilService.getLastNameValidators()],
        middleName: [data.middleName, this.utilService.getMiddleNameValidators()],
        email: [data.email, this.utilService.getEmailValidators()]
      });
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  onSubmit(): void {
    this.service.updateDashboard(this.username, this.dashboardForm.value).subscribe(_ => {
      this.getData();
    });
  }

  canUpdate(): boolean {
    return this.dashboardForm.valid;
  }

  needUpdate(): boolean {
    return this.dashboardForm.dirty;
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }
}
