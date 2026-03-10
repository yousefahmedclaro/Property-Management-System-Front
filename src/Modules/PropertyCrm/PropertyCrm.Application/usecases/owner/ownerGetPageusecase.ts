import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { owner } from '../../../PropertyCrm.Domain/owner';
import { ownerRepository, ownerRepositoryProvider } from '../../repositories/owner.repository';

@Injectable()
class ownerGetPageUseCase implements UseCase<{ params: PaginationParams }, PaginationRespons<owner>> {
  private readonly _ownerRepository = inject(ownerRepository);

  execute(obj: { params: PaginationParams }): Observable<PaginationRespons<owner>> {
    return this._ownerRepository.getPage(obj.params);
  }
}

const ownerGetPageProviders = [ownerRepositoryProvider, ownerGetPageUseCase];
export { ownerGetPageUseCase, ownerGetPageProviders };