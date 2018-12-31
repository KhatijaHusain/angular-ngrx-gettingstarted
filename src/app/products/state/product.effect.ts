import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from '@ngrx/effects'; 
import * as fromActions from'./product.action';
import { map, mergeMap } from "rxjs/operators";
import { Product } from "../product";
import { ProductService } from "../product.service";

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService){}

        @Effect()
        loadProducts$ = this.actions$.pipe(
            ofType(fromActions.ProductActionTypes.Load), 
                mergeMap((action: fromActions.Load) => this.productService.getProducts().pipe(
                    map(( x: Product[]) => (new fromActions.LoadSuccess(x)) ))
            )
        )
}