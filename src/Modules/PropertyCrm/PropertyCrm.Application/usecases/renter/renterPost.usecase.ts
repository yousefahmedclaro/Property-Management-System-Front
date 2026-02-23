import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { renter } from '../../../PropertyCrm.Domain/renter';
import { renterRepository, renterRepositoryProvider } from '../../repositories/renter.repository';

@Injectable()
class renterPostUseCase implements UseCase<renter, string> {
  private readonly _renterRepository = inject(renterRepository);

  execute(renter: renter): Observable<string> {
    return this._renterRepository.post(renter);
  }
}

const renterPostProviders = [
  renterRepositoryProvider,
  renterPostUseCase,
];

export { renterPostUseCase, renterPostProviders };