import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectActivityLog } from 'src/app/store/activity-log/activity-log.selectors';
import { ActivityLogService } from '../../store/services/activity-log.service';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
})
export class ActivityLogComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  displayedColumns = ['activity', 'date'];
  dataSource$!:Observable<[]> 
  _searchLogForm!: FormGroup;

  constructor(
    breakpointObserver: BreakpointObserver,
    private logService: ActivityLogService,
     private formBuilder: FormBuilder,
    private store: Store
  ) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['activity', 'date']
        : ['activity', 'date'];
    });
    this.searchLogForm();
  }

  ngOnInit(): void {
     this.store.select(selectActivityLog).subscribe((response)=>{
     this.dataSource$ = of(response.activityLogs)
    })
  }

  searchLogForm() {
    this._searchLogForm = this.formBuilder.group({
      searchLog: new FormControl(''),
    });
  }

  print() {
    window.print();
  }

}
