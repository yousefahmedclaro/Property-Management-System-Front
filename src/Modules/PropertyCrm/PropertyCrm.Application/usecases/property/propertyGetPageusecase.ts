import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { PaginationParams, PaginationRespons } from '../../../../Common/domain/pagination';
import { property } from '../../../PropertyCrm.Domain/property';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';

@Injectable()
class propertyGetPageUseCase implements UseCase<{ params: PaginationParams }, PaginationRespons<property>> {
  private readonly _propertyRepository = inject(propertyRepository);

  execute(obj: { params: PaginationParams }): Observable<PaginationRespons<property>> {
    return this._propertyRepository.getPage(obj.params);
  }
}

const propertyGetPageProviders = [propertyRepositoryProvider, propertyGetPageUseCase];
export { propertyGetPageUseCase, propertyGetPageProviders };