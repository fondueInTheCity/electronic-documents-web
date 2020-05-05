import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserDashboard} from '../models/UserDashboard';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../../../auth/services/token-storage.service';
import {UtilService} from '../../../../utils/util.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {tc} from '../../../../utils/tc';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardForm: FormGroup;
  username: string;
  getSubscription: Subscription;
  updateSubscription: Subscription;
  inProgress = false;


  constructor(private service: UserService,
              private tokenStorageService: TokenStorageService,
              private utilService: UtilService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {
  }

  async ngOnInit() {
    this.getData();
  }

  async getData() {
    this.inProgress = false;
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
    this.spinner.show();
    this.inProgress = true;
    this.utilService.unsubscribe(this.updateSubscription);
    this.updateSubscription = this.service.updateDashboard(this.username, this.dashboardForm.value).subscribe((data) => {
        this.spinner.hide();
        this.toast.success(tc.updateDashboardSuccess.message);
        this.getData();
      },
      error => {
        this.inProgress = false;
        this.spinner.hide();
        this.toast.error(tc.updateDashboardError.message);
      });
  }

  disableUpdateButton() {
    return this.inProgress || this.dashboardForm.invalid;
  }

  needUpdate(): boolean {
    return this.dashboardForm.dirty;
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
    this.utilService.unsubscribe(this.updateSubscription);
  }
}
