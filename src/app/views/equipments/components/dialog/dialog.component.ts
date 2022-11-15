
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EQUIPMENT_DATA } from '../../../../store/state/equipments.state';
import { Equipment, EquipmentDTO } from 'src/app/Models/equipment.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { EquipmentsService } from '../../../../store/services/inventory/equipments.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-equipments',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  
  displayedColumns = [ 'name', 'status', 'category', 'action'];
  dataSource = new MatTableDataSource<Equipment>(EQUIPMENT_DATA);
  
  _equipmentForm!: FormGroup;
  
 

  constructor(
    breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public equipmentData:Equipment,
    public equipmentsService: EquipmentsService,
    private sharedService: SharedService) { 
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
      this.displayedColumns = result.matches ?
          [ 'name', 'status', 'category', 'action'] :
          [ 'name', 'status', 'category', 'action'];
    });
  }

  ngOnInit(): void {
    this.equipmentForm();
  }
  
  equipmentForm(){
    var isEdit = this.equipmentsService.isEdit;
    this._equipmentForm = this.formBuilder.group({
      name: new FormControl(isEdit?this.equipmentData.name:"", Validators.required),
      status: new FormControl(isEdit?this.equipmentData.status:"", Validators.required),
      price: new FormControl(isEdit?this.equipmentData.price:"", [
        Validators.required,
        RxwebValidators.numeric({allowDecimal:true,isFormat:true})  
      ]),
      category: new FormControl(isEdit?this.equipmentData.category:"", Validators.required),
      description: new FormControl(isEdit?this.equipmentData.description:"", Validators.required),
     });
  }


  onAddEquipment(formDirective: FormGroupDirective){
    var data = this._equipmentForm.value;
    EQUIPMENT_DATA.push(data)
    this.equipmentsService.onAddEquipment(data).then(res => {
      this.sharedService.openSnackBar("Equipment Added Successfully", "Ok")
    })
    this.clearForm(formDirective);
    formDirective.resetForm();
  }

  // onSelectEditEquipment(data: EquipmentDTO){
  //   this.equipmentsService.isEdit = true;
  //   this.toEditData = data;
  //   this.equipmentForm()
  // }

  onEditEquipment(formDirective: FormGroupDirective){
    this.equipmentsService.isEdit = false;
    this.equipmentsService.onEditEquipment(this.equipmentsService.toEditData, this._equipmentForm.value).then(()=>{
      this.sharedService.openSnackBar("Equipment Edited Successfuly", "Ok");
    })
    this.clearForm(formDirective)
  }

  onCancelEdit(formDirective: FormGroupDirective){
    this.equipmentsService.isEdit = false
    formDirective.resetForm();
  }

  clearForm(formDirective: FormGroupDirective){
    this._equipmentForm.reset()
    formDirective.resetForm();
  }

}


