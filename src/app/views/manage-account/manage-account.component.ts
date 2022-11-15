import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from 'src/app/store/state/accounts/manage-account.state';
import { UserAccountDialogComponent } from './components/user-account-dialog/user-account-dialog.component';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {

  closeResult = '';
  contacts: Contact[] = [];
  searchText: any;
  txtContactname = '';
  txtContactPost = '';
  txtContactadd = '';
  txtContactno = '';
  txtContactinstagram = '';
  txtContactlinkedin = '';
  txtContactfacebook = '';
  
  hide = true;
  options: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  

  constructor(
    fb: FormBuilder,
    public dialog: MatDialog
    ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto'
    });
   }

  openDialog(action: string, obj: any) {
  obj.action = action;
  const dialogRef = this.dialog.open(UserAccountDialogComponent, {
      width: '500px',
      data: obj
  });

  dialogRef.afterClosed().subscribe(result => {
      // if (result.event === 'Add') {
      //     this.addContact(result.data);
      // }

  });
  }

  addContact(row_obj: ContactData) {
    this.contacts.push({
        contactimg: 'assets/images/users/default.png',
        contactname: row_obj.txtContactname,
        contactpost: row_obj.txtContactPost,
        contactadd: row_obj.txtContactadd,
        contactno: row_obj.txtContactno,
        contactinstagram: row_obj.txtContactinstagram,
        contactlinkedin: row_obj.txtContactlinkedin,
        contactfacebook: row_obj.txtContactfacebook
    });
  }
 
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  ngOnInit(): void {
    this.contacts = [
      {
          contactimg: 'assets/images/users/2.jpg',
          contactname: 'Johnathan Doe',
          contactpost: 'Web Designer',
          contactadd: '795 Folsom Ave, Suite 600 San Francisco, CADGE 94107',
          contactno: '(123) 456-7890',
          contactinstagram: '254',
          contactlinkedin: '54',
          contactfacebook: '154'
      },
      {
          contactimg: 'assets/images/users/8.jpg',
          contactname: 'Oliver Smith',
          contactpost: 'Theme Designer',
          contactadd: '55 E 11th St #1OTH, Suite 600 New York, NY, 10003 ',
          contactno: '(212) 228-8403',
          contactinstagram: '150',
          contactlinkedin: '14',
          contactfacebook: '165'
      },
      {
          contactimg: 'assets/images/users/4.jpg',
          contactname: 'George Johnson',
          contactpost: 'Front End Developer',
          contactadd: '36 W 138th St, San Francisco New York, NY, 10037',
          contactno: '(212) 234-0783',
          contactinstagram: '300',
          contactlinkedin: '65',
          contactfacebook: '130'
      },
      {
          contactimg: 'assets/images/users/5.jpg',
          contactname: 'Harry Potter',
          contactpost: 'Hacker',
          contactadd: '2289 5th Ave, Suite 600 San Francisco New York, NY, 10037',
          contactno: '(212) 456-8403',
          contactinstagram: '220',
          contactlinkedin: '38',
          contactfacebook: '178'
      },
      {
          contactimg: 'assets/images/users/6.jpg',
          contactname: 'Jack Williams',
          contactpost: 'Back End Developer',
          contactadd: '425 5th Ave, San Francisco New York, NY, 10016',
          contactno: '(154) 456-8745',
          contactinstagram: '650',
          contactlinkedin: '150',
          contactfacebook: '195'
      },
      {
          contactimg: 'assets/images/users/7.jpg',
          contactname: 'Jacob Jones',
          contactpost: 'Graphics Designer',
          contactadd: '17 Stuyvesant Walk, Suite 600 New York, NY, 10009',
          contactno: '(150) 784-7890',
          contactinstagram: '151',
          contactlinkedin: '29',
          contactfacebook: '160'
      }
  ];
  }

}

export interface ContactData {
  closeResult: string;
  contacts: Contact[];
  searchText: any;
  txtContactname: string;
  txtContactPost: string;
  txtContactadd: string;
  txtContactno: string;
  txtContactinstagram: string;
  txtContactlinkedin: string;
  txtContactfacebook: string;
}
