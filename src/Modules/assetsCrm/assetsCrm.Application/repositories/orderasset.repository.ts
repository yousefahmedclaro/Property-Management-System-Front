import { PaginationParams, PaginationRespons } from "../../../Common/domain/pagination";
import { Observable } from "rxjs";
import { OrderAsset } from "../../assetsCrm.Domain/orderasset";
import { orderassetRepositoryImplementation } from "../../assetsCrm.Infrastructure/repositoryImplementation/orderasset.RepositoryImplementation";

export abstract class OrderAssetRepository{
  abstract getPage(
    params: PaginationParams
  ): Observable<PaginationRespons<OrderAsset>>;

        abstract getList(): Observable<OrderAsset[]>;
        
        abstract getById(id: string): Observable<OrderAsset>; 
      
        abstract post(orderAsset: OrderAsset): Observable<string>;
      
        abstract put(orderAsset: OrderAsset): Observable<object>;
      
        abstract delete(Id: string): Observable<object>;
}


export const orderassetRepositoryProvider = {
  provide: OrderAssetRepository,
  useClass: orderassetRepositoryImplementation,
};