import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetails } from 'src/app/Models/manage-account.model';
import { ManageAccountService, accData } from 'src/app/store/services/manage-account.service';
import { SharedService } from 'src/app/shared/shared.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/store/services/authentication/auth.service';
import { 
  AngularFireStorage,  
  AngularFireStorageReference, 
  AngularFireUploadTask } from '@angular/fire/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  closeResult = '';
  accounts: AccountDetails[] = [];
  searchText: any;
  accDetails!: AccountDetails;
  hide = true;
  _accountDetailsForm!: FormGroup;
  accountData = accData;
  base64Output!: string;
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  imagePath:any;
  file!: FileUpload;
  downloadUrl: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
 
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private manageAccount: ManageAccountService,
    private sharedService: SharedService,
    private storage: AngularFireStorage,
    private authService: AuthService) {
      this.accountDetailsForm(); 
  }

  ngOnInit(): void {
    this.manageAccount.onFetchAccDetails();
    
    setTimeout(() => {
      this._accountDetailsForm = this.formBuilder.group({
        firstName: new FormControl(accData.firstName, Validators.required),
        lastName: new FormControl(accData.lastName, Validators.required),
        middleName: new FormControl(accData.middleName, Validators.required),
        emailAddress: new FormControl(accData.emailAddress, [Validators.required, Validators.email]),
        contactNumber: new FormControl(accData.contactNumber, Validators.required),
        profileImage: new FormControl(""),
        description: new FormControl(accData.description, Validators.required),
      });
      this.accountData = accData;
      this.downloadUrl = accData.profileImageID? accData.profileImageID: this.downloadUrl
    }, 1000);
  }

  accountDetailsForm(){
    this._accountDetailsForm = this.formBuilder.group({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      middleName: new FormControl("", Validators.required),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      contactNumber: new FormControl("", Validators.required),
      profileImage: new FormControl(""),
      description: new FormControl("", Validators.required),
    }); 
  }

  imageTest=(event: any)=>{
    let file = event.target.files[0];
    console.log("file",file)
    let fileName = this.sharedService.randomString(10);
    const filePath = `profiles/${fileName}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file)
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          this.downloadUrl = downloadURL
        })
      })
    ).subscribe();
  }

  updateAccount(){
    var value = this._accountDetailsForm.value;
    value.profileImageID = this.downloadUrl;
    this.manageAccount.onEditAccountDetails(this.manageAccount.toEditAccount, {
      firstName: value.firstName,
      lastName: value.lastName,
      middleName: value.middleName,
      emailAddress: value.emailAddress,
      contactNumber: value.contactNumber,
      profileImageID: this.downloadUrl,
      description: value.description
    }).then(()=>{
      this.sharedService.openSnackBar("Account details updated successfuly", "Ok");
      this.accountData = accData;
    })
  }

  editAccStatus(){
  
  }
}

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  constructor(file: File) {
    this.file = file;
  }
}





