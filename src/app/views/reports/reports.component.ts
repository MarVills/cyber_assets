import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Equipment } from 'src/app/Models/equipment.model';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  displayedColumns = ['serialNumber', 'equipment', 'category', 'status'];
  equipmentSubscription$!: Subscription;
  dataSource = new MatTableDataSource<Equipment>([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.refresh();
    this.dataSource.paginator = this.paginator;
    this.equipmentSubscription$ = this.store
      .select(selectEquipment)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Equipment>(response);
      });
  }

  print() {
    window.print();
  }

  refresh() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
}
