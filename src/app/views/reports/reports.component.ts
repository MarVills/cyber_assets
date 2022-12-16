import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Equipment } from 'src/app/Models/equipment.model';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import jsPDF from 'jspdf';
// import pdf
// import pdf
// import pdfFonts from 'pdfmake/build/vfs_fonts';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
   @ViewChild('content') content!: ElementRef;
  displayedColumns = ['serialNumber', 'equipment', 'category', 'status'];
  equipmentSubscription$!: Subscription;
  dataSource = new MatTableDataSource<Equipment>([]);
  

  constructor(private store: Store) {
    
  }

  ngOnInit(): void {
    this.refresh();
    this.dataSource.paginator = this.paginator;
    this.equipmentSubscription$ = this.store
      .select(selectEquipment)
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource<Equipment>(response.equipment);
      });
  }

  print() {
    // window.print();
     let doc = new jsPDF();
    //  autoTable(doc, "#basic-table");
    doc.save("table.pdf");
    //  doc.addPage(this.content.nativeElement, "protrait")
    // doc.addPage(this.content.nativeElement, () {
    //    doc.save("obrz.pdf");
    // });
  }

  refresh() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
}
