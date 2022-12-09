import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  ActivityLog,
  ACTIVITY_LOG_DATA,
} from 'src/app/Models/activity-log-model';
import { ActivityLogService } from '../../store/services/activity-log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
})
export class ActivityLogComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  displayedColumns = ['activity', 'user-name', 'user-role', 'date'];
  dataSource: MatTableDataSource<ActivityLog>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private logService: ActivityLogService
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['activity', 'user-name', 'user-role', 'date']
        : ['activity', 'user-name', 'user-role', 'date'];
    });
    this.logService.onFetchActivityLogs();
    this.dataSource = new MatTableDataSource(ACTIVITY_LOG_DATA);
  }
  ngOnInit(): void {
    this.refresh();
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

  print() {
    window.print();
  }

  refresh() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(ACTIVITY_LOG_DATA);
    }, 1000);
  }
}
