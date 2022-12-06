// import { Component, OnInit } from '@angular/core';

<<<<<<< HEAD
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { EquipmentsService } from '../../store/services/inventory/equipments/equipments.service'
=======
// @Component({
//   selector: 'app-reports',
//   templateUrl: './reports.component.html',
//   styleUrls: ['./reports.component.scss']
// })
// export class ReportsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

import { Component, ViewChild } from '@angular/core';
>>>>>>> parent of 1165ea2 (working on activity log and report)

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
<<<<<<< HEAD
export class ReportsComponent implements OnInit{

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  displayedColumns = ['serialNumber', 'equipment', 'category', 'status'];
  dataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);

  constructor(private equipmentsService: EquipmentsService) {
 
  }
  ngOnInit(): void {
    this.equipmentsService.onFetchEquipments();
    this.refresh();
    this.dataSource.paginator = this.paginator;
  }
=======
export class ReportsComponent {
  editing: any[] = [];
  rows: any[] = [];
  temp = [...data];

  loadingIndicator = true;
  reorderable = true;

  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  @ViewChild(ReportsComponent, { static: true }) table: ReportsComponent = Object.create(null);
  constructor() {
    this.rows = data;
    this.temp = [...data];
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }
>>>>>>> parent of 1165ea2 (working on activity log and report)

  print(){
    window.print();
  }
  
  refresh(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
}

<<<<<<< HEAD

=======
>>>>>>> parent of 1165ea2 (working on activity log and report)

