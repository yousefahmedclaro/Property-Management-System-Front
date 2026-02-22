import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';
import { orderassetRepositoryProvider, OrderAssetRepository } from '../../repositories/orderasset.repository';

@Injectable()
class orderassetGetPageUseCase implements UseCase<
  { params: PaginationParams; assetsIds: string[], companyId: string },
  PaginationRespons<OrderAsset>
> {
  private readonly _orderAssetRepository = inject(OrderAssetRepository);

  execute(obj: {
    params: PaginationParams;
  }): Observable<PaginationRespons<OrderAsset>> {
    return this._orderAssetRepository.getPage(obj.params);
  }
}

const orderassetGetPageProviders = [
  orderassetRepositoryProvider,
  orderassetGetPageUseCase,
];

export { orderassetGetPageUseCase, orderassetGetPageProviders };