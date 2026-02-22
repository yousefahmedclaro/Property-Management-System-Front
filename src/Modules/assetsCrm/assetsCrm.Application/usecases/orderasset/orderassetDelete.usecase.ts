import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { OrderAssetRepository, orderassetRepositoryProvider } from '../../repositories/orderasset.repository';

@Injectable()
class orderassetDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _orderAssetRepository = inject(OrderAssetRepository);

  execute(Id: string): Observable<object> {
    return this._orderAssetRepository.delete(Id);
  }
}

const orderassetDeleteProviders = [
  orderassetRepositoryProvider,
  orderassetDeleteUseCase,
];

export { orderassetDeleteUseCase, orderassetDeleteProviders };