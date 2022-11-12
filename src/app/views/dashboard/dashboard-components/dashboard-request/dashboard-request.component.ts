
import { Component, OnInit } from '@angular/core';
import { TEXTS } from '../../dashboardTexts';
@Component({
  selector: 'app-dashboard-request',
  templateUrl: './dashboard-request.component.html',
  styleUrls: ['./dashboard-request.component.scss']
})
export class DashboardRequestComponent implements OnInit {

  texts = TEXTS;
  mycomments = [
    {
      name: 'James Anderson',
      content:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      profile: 'assets/images/users/1.jpg',
      status: 'Pending',
      class: 'info',
      date: 'April 14, 2016'
    },
    {
      name: 'Michael Jorden',
      content:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      profile: 'assets/images/users/2.jpg',
      status: 'Approved',
      class: 'light-success',
      date: 'April 14, 2016'
    },
    {
      name: 'James Anderson',
      content:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      profile: 'assets/images/users/3.jpg',
      status: 'Pending',
      class: 'danger',
      date: 'April 14, 2016'
    },
    {
      name: 'Johnathan Doeting',
      content:
        'Lorem Ipsum is simply dummy text of the printing and type setting industry.',
      profile: 'assets/images/users/1.jpg',
      status: 'Pending',
      class: 'info',
      date: 'April 14, 2016'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

