import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { renter } from '../../../PropertyCrm.Domain/renter';
import { renterRepository, renterRepositoryProvider } from '../../repositories/renter.repository';

@Injectable()
class renterPutUseCase implements UseCaseWithOutOutPut<renter> {
  private readonly _renterRepository = inject(renterRepository);

  execute(renter: renter): Observable<object> {
    return this._renterRepository.put(renter);
  }
}
const renterPutProviders = [
  renterRepositoryProvider,
  renterPutUseCase,
];
export { renterPutUseCase, renterPutProviders };