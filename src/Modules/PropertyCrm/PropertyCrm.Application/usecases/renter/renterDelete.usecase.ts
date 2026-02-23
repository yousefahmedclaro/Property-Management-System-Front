import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { renterRepository, renterRepositoryProvider } from '../../repositories/renter.repository';

@Injectable()
class renterDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _renterRepository = inject(renterRepository);

  execute(renterId: string): Observable<object> {
    return this._renterRepository.delete(renterId);
  }
}

const renterDeleteProviders = [
  renterRepositoryProvider,
  renterDeleteUseCase,
];

export { renterDeleteUseCase, renterDeleteProviders };
