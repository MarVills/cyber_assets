
import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

declare var require: any;
const data: any = require('src/assets/company.json');
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements AfterViewInit{

  displayedColumns = ['activity', 'user-name', 'user-role', 'date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          ['activity', 'user-name', 'user-role', 'date']:
          ['activity', 'user-name', 'user-role', 'date'];
  });
  const users: UserData[] = [];
  for (let i = 1; i <= 100; i++) {
      users.push(createNewUser(i));
  }
  this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
<<<<<<< HEAD

  print(){
    window.print();
  }

  refresh(){
   setTimeout(() => {
    this.dataSource = new MatTableDataSource(ACTIVITY_LOG_DATA);
   }, 1000);
  }
=======
>>>>>>> parent of 1165ea2 (working on activity log and report)
}

function createNewUser(id: number): UserData {

  return {
    activity: "idididi",
    userName: 'name',
    userRole: "100%",
    date: "corl"
  };
}

export interface UserData {
  activity: string;
  userName: string;
  userRole: string;
  date: string;
}


