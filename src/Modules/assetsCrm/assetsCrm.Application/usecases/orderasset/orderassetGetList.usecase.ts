import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { OrderAssetRepository, orderassetRepositoryProvider } from '../../repositories/orderasset.repository';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';

@Injectable()
class orderassetGetListUseCase implements UseCaseWithOutInPut<OrderAsset[]> {
  private readonly _orderAssetRepository = inject(OrderAssetRepository);

  execute(): Observable<OrderAsset[]> {
    return this._orderAssetRepository.getList();
  }
}

const orderassetGetListProviders = [
  orderassetRepositoryProvider,
  orderassetGetListUseCase,
];

export { orderassetGetListUseCase, orderassetGetListProviders };