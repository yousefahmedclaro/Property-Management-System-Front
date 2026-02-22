import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';
import { OrderAssetRepository, orderassetRepositoryProvider } from '../../repositories/orderasset.repository';

@Injectable()
class orderassetPutUseCase implements UseCaseWithOutOutPut<OrderAsset> {
  private readonly _orderAssetRepository = inject(OrderAssetRepository);

  execute(orderAsset: OrderAsset): Observable<object> {
    return this._orderAssetRepository.put(orderAsset);
  }
}
const orderassetPutProviders = [
  orderassetRepositoryProvider,
  orderassetPutUseCase,
];
export { orderassetPutUseCase, orderassetPutProviders };