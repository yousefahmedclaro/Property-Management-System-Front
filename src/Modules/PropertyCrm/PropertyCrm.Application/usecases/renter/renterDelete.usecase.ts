import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutOutPut } from '../../../../Common/application/use-case';
import { renterRepository, renterRepositoryProvider } from '../../repositories/renter.repository';

@Injectable()
class renterDeleteUseCase implements UseCaseWithOutOutPut<string> {
  private readonly _renterRepository = inject(renterRepository);

  execute(Id: string): Observable<object> {
    console.log('renterDeleteUseCase execute with Id:', Id);
    return this._renterRepository.delete(Id);
  }
}

const renterDeleteProviders = [
  renterRepositoryProvider,
  renterDeleteUseCase,
];

export { renterDeleteUseCase, renterDeleteProviders };
