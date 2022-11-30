
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Equipment, EQUIPMENT_DATA } from 'src/app/Models/equipment.model';
import { EquipmentsService } from '../../store/services/inventory/equipments/equipments.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
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

  print(){
    window.print();
  }
  
  refresh(){
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
}



