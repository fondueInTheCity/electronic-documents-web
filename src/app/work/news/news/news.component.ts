import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {Subscription} from 'rxjs';
import {UtilService} from '../../../utils/util.service';
import {NotificationInfo} from '../../../utils/models/notification-info';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit, OnDestroy {
  getSubscription: Subscription;
  notifications: NotificationInfo[];

  constructor(private notificationService: NotificationService,
              private spinner: NgxSpinnerService,
              private tokenStorageService: TokenStorageService,
              private utilService: UtilService) {
  }

  ngOnInit(): void {
    this.spinner.show();
    this.utilService.unsubscribe(this.getSubscription);
    this.getSubscription = this.notificationService.getUserNotifications(this.tokenStorageService.getId())
      .subscribe((data) => {
        this.notifications = data.notifications;
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.utilService.unsubscribe(this.getSubscription);
  }
}
