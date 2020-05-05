import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {errorsMessages} from '../errors';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.less']
})
export class ErrorMessagesComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() controlName: string;
  messages: any;

  constructor() { }

  ngOnInit(): void {
    this.messages = errorsMessages[this.controlName];
  }

  showErrors() {
    return this.control.touched && this.control.invalid;
  }
}
