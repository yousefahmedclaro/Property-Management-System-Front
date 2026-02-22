import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';
import { OrderAssetRepository, orderassetRepositoryProvider } from '../../repositories/orderasset.repository';

@Injectable()
class orderassetPostUseCase implements UseCase<OrderAsset, string> {
  private readonly _orderAssetRepository = inject(OrderAssetRepository);

  execute(orderAsset: OrderAsset): Observable<string> {
    return this._orderAssetRepository.post(orderAsset);
  }
}

const orderassetPostProviders = [
  orderassetRepositoryProvider,
  orderassetPostUseCase,
];

export { orderassetPostUseCase, orderassetPostProviders };