import { ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/store/services/authentication/auth.service';
import { MenuItems } from '../../shared/menu-items/menu-items';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  status = true;
  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  constructor(
  changeDetectorRef: ChangeDetectorRef,
  media: MediaMatcher,
  public menuItems: MenuItems,
  private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("event",this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener("event",this._mobileQueryListener);
  }

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  signOut = () => this.authService.signOut()
}
