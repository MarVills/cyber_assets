
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, EffectSources, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { BehaviorSubject, Observable, of, } from 'rxjs';
// import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Equipment, EquipmentDTO } from '../state/equipments.state';
import * as equipmentActions from './equipments.actions';
import { EquipmentsService } from '../services/inventory/equipments.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
// import { TokenInterceptor } from 'src/app/shared/token.interceptor';


@Injectable()
export class EquipmentsEffects {

  equipments$ = this.getObservable(this.fireStore.collection('equipments')) as Observable<Equipment[]>;

  constructor(
    private actions$: Actions,
    // private handleToken: HandleTokenService,
    private http: HttpClient,
    private equipmentsService: EquipmentsService,
    private fireStore: AngularFirestore,
    // private tokenInterceptor: TokenInterceptor,
    ) {}

  // config = {
  //   headers: new HttpHeaders({'Authorization': 'Bearer '+this.handleToken.getToken()})
  // }

  getObservable(collection: AngularFirestoreCollection<Equipment>){
    const subject = new BehaviorSubject<Equipment[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Equipment[]) => {
      subject.next(val);
    });
    return subject;
  };
  
  fetchEquipmentsEFFECT$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(equipmentActions.requestFetchEquipmentsACTION),
    // switchMap((_)=>{
    //   const subject = new BehaviorSubject<Equipment[]>([]);
    //   return this.fireStore.collection('equipments').valueChanges({ idField: 'id' }).subscribe((val: any) => {
    //     subject.next(val);
    //   });
    //   // .pipe(
    //   //   switchMap((data: any)=>{
    //   //     return equipmentActions.successFetchEquipmentsACTION({ payload: data })
    //   //   }),
    //   //   catchError((error: Error) => of(equipmentActions.onEquipmentFailure({ error: error })))
    //   // )
    // })
  ));
// ===========================================================================
    // mergeMap(() =>{
    //   return this.http.get<any>(`/api/products?page=${res.page.toString()}`, this.config).pipe(
    //     switchMap((data: any) => {
    //       console.log('effect', data)
    //       return [
    //         productActions.successFetchProductsACTION({ payload: data })
    //       ]
    //     }),
    //     catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
    //   )
    // })

// ==========================================================================

  // fetchProductEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(productActions.requestFetchProductACTION),
  //   mergeMap(data =>{
  //     return this.http.get<Product>(`/api/products/${data.payload}`, this.config).pipe(
  //       switchMap((data: Product) => {
  //         return [
  //           productActions.successFetchProductACTION({ payload: data })
  //         ]
  //       }),
  //       catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
  //     )
  //   })
  // ));

  // updateArticleActionEffect$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(productActions.requestUpdateProductACTION),
  //   mergeMap(action => {
  //     return this.http.put<Product>(`/api/products/${this.productService.dataID}`, action.payload, this.config).pipe(
  //       switchMap((data: ProductDTO) => {
  //         var returnData = [productActions.successUpdateProductACTION({ payload: data })];
  //         console.log("success data", returnData)
  //         return returnData;
  //       }
  //       ),
  //       catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
  //     )
  //   })
  // ));

  // deleteProductEFFEET$: Observable<Action> = createEffect(() => this.actions$.pipe(
  //   ofType(productActions.requestDeleteProductACTION),
  //   mergeMap(data =>{
  //     return this.http.delete<number>(`/api/products/${this.productService.dataID}`, this.config).pipe(
  //       switchMap(res => [
  //         productActions.successDeleteProductACTION()
  //       ]),
  //       catchError((error: Error) => of(productActions.onProductFailure({ error: error })))
  //     )
  //   })
  // ));
}



