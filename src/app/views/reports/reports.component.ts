import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Equipment } from 'src/app/Models/equipment.model';
import { selectEquipment } from 'src/app/store/equipments/equipments.selectors';
import jsPDF from 'jspdf';

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
    //  const doc = new jsPDF();
     const elementHTML = document.querySelector('#printContent') as HTMLElement;
    //  doc.text('Hello world!', 20, 20);
    //  doc.text('This is client-side Javascript to generate a PDF.', 20, 30);

    const doc = new jsPDF({
      unit: 'px',
      format: [842, 1191]// this.pdfOptions.value.pageFormat === 'A4' ? [595, 842] : [842, 1191]
    });

    // doc.html(elementHTML, {
    //   callback: function(doc){
    //     doc.save('document-html.pdf');
    //   },
    //   // margin: [10, 10, 10, 10],
    //   // autoPaging: 'text',
    //   // x: 0,
    //   // y: 0,
    //   // width: 190, 
    //   // windowWidth: 675
    // },
    // )
     const pages = document.querySelector('.all-pages') as HTMLElement;
    // this.workspaceService.exportAllToPDF(pages);
     doc.html(pages, {
      callback: (doc: jsPDF) => {
        doc.deletePage(doc.getNumberOfPages());
        doc.save('pdf-export');
      }
    });

    //  doc.save("table.pdf");

    
  }

  refresh() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
  }
}
