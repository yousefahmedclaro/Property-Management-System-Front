import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class propertyGetCategoryLookupUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _propertyRepository = inject(propertyRepository);
  execute(): Observable<Lookup[]> {
    return this._propertyRepository.getCategoryLookup();
  }
}

const propertyGetCategoryLookupProviders = [propertyRepositoryProvider, propertyGetCategoryLookupUseCase];
export { propertyGetCategoryLookupUseCase, propertyGetCategoryLookupProviders };