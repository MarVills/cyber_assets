
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';


export interface ExampleTab {
    label: string;
    content: string;
}

declare var require: any;
const data: any = require('src/assets/company.json');
@Component({
  selector: 'app-recieve-equipment',
  templateUrl: './recieve-equipment.component.html',
  styleUrls: ['./recieve-equipment.component.scss']
})
export class RecieveEquipmentComponent implements OnInit {
    
    tabs:string[] = [];
    selected = new FormControl(0);
    tabLoadTimes: Date[] = [];
    asyncTabs: Observable<ExampleTab[]>;
    links = ['First', 'Second', 'Third'];
    activeLink = this.links[0];
    background = '';
    editing: any[] = [];
    rows: any[] = [];
    temp = [...data];
    loadingIndicator = true;
    reorderable = true;
    columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
    // columns = [{ prop: 'Sender' }, { name: 'Request' }, { name: 'Description' }];
 
    @ViewChild(RecieveEquipmentComponent, { static: true }) table: RecieveEquipmentComponent = Object.create(null); 

    ngOnInit(): void {}

    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New');

        if (selectAfterAdding) {
            console.log("execccc");
            this.selected.setValue(this.tabs.length - 1);
        }
    }

    removeTab(index: number) {
        this.tabs.splice(index, 1);
    }

    getTimeLoaded(index: number) {
        if (!this.tabLoadTimes[index]) {
            this.tabLoadTimes[index] = new Date();
        }

        return this.tabLoadTimes[index];
    }

    constructor() {

        // this.asyncTabs = Observable.create((observer: Observer<ExampleTab[]>) => {
        this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
            setTimeout(() => {
                
                observer.next([
                    { label: 'First', content: 'Content 1' },
                    { label: 'Second', content: 'Content 2' },
                    { label: 'Third', content: 'Content 3' }
                ]);
            }, 1000);
        });
        this.rows = data;
        this.temp = [...data];
        setTimeout(() => {
            this.loadingIndicator = false;
          }, 1500);
        
    }
 
    toggleBackground() {
        this.background = this.background ? '' : 'primary';
    }

    updateFilter(event: any) {
        const val = event.target.value.toLowerCase();
    
        // filter our data
        const temp = this.temp.filter(function (d) {
          return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table = data;
      }
      updateValue(event: any, cell: string, rowIndex: number) {
        console.log('inline editing rowIndex', rowIndex);
       // // // this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
      }
    
}

