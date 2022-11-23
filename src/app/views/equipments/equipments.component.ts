import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, } from '@angular/forms';
import { ModifyEquipmentDialogComponent } from './components/modify-equipment-dialog/modify-equipment-dialog.component';
import { MatDialog} from '@angular/material/dialog';
import { EquipmentsService } from 'src/app/store/services/inventory/equipments/equipments.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Equipment,
         EquipmentDTO,
         Category,
         EQUIPMENT_DATA} 
         from 'src/app/Models/equipment.model';



@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.scss']
})
export class EquipmentsComponent implements OnInit {
  
  displayedColumns = [ 'equipment', 'status', 'category', 'action'];
  equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  _categoryForm!: FormGroup;
  toEditData!:EquipmentDTO;
  panelOpenState = false;
  equipments!: Equipment[];
  constructor(
    breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private equipmentService: EquipmentsService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
    ) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'equipment', 'status', 'category', 'action'] :
          [ 'equipment', 'status', 'category', 'action'];
    });
  }

  ngOnInit(): void {
    this.equipmentService.onFetchEquipments();
    this.categoryForm();
    this.refresh();
  }

  categoryForm(){
    this._categoryForm = this.formBuilder.group({
      searchEquipment: new FormControl(""),
     });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.equipmentDataSource.filter = filterValue;
  }

  onDelete(data: EquipmentDTO){
    let isDelete = this.sharedService.openAlertDialog("Delete Equipment", "Are you sure you want to delete this equipment?", "Delete")
    isDelete.subscribe((response)=>{
      switch (response){
        case "confirm":
          this.equipmentService.onDeleteEquipment(data)
          this.refresh();
          break;
        case "cancel": 
          this.sharedService.openSnackBar("Deleting equipment canceld !");
          break;
        default: break;
      }
    })
  }

  openAddEquipmentDialog(): void {
    this.equipmentService.isEdit = false;
    const addDialogRef = this.dialog.open(ModifyEquipmentDialogComponent, {
      width: '500px',
      data: {},
    });
    addDialogRef.afterClosed().subscribe(() => {
      this.refresh()
    });
  }

  openEditDialog(data: any): void {
    this.equipmentService.isEdit = true;
    this.equipmentService.toEditData = data;
    const editDialogRef = this.dialog.open(ModifyEquipmentDialogComponent, {
      width: '500px',
      data: { 
        equipment: data.equipment, 
        status: data.status, 
        category: data.category, 
        price: data.price, 
        description: data.description 
      },
    });
    editDialogRef.afterClosed().subscribe(result => {
      this.equipmentService.isEdit = false;
      this.refresh()
    });
  }

  refresh(){
    setTimeout(() => {
      this.equipmentDataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
      this.equipments = EQUIPMENT_DATA;
      
    }, 1000);
  }

}







