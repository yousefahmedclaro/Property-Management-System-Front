import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { renter } from '../../../PropertyCrm.Domain/renter';
import { renterRepository, renterRepositoryProvider } from '../../repositories/renter.repository';

@Injectable()
class renterGetPageUseCase implements UseCase<
  { params: PaginationParams;  },
  PaginationRespons<renter>
> {
  private readonly _renterRepository = inject(renterRepository);

  execute(obj: {
    params: PaginationParams;
  }): Observable<PaginationRespons<renter>> {
    return this._renterRepository.getPage(obj.params);
  }
}

const renterGetPageProviders = [
  renterRepositoryProvider,
  renterGetPageUseCase,
];

export { renterGetPageUseCase, renterGetPageProviders };