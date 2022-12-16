import { Injectable, OnDestroy } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class EquipmentsService implements OnDestroy {
  isEdit: boolean = false;
  constructor() {}

  ngOnDestroy(): void {}
}
