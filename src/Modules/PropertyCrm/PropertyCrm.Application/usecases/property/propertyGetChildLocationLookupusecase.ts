import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class propertyGetChildLocationUseCase implements UseCase<string, Lookup[]> {
  private readonly _propertyRepository = inject(propertyRepository);
  execute(parentId: string): Observable<Lookup[]> {
    return this._propertyRepository.getChildLocations(parentId);
  }
}

const propertyGetChildLocationProviders = [propertyRepositoryProvider, propertyGetChildLocationUseCase];
export { propertyGetChildLocationUseCase, propertyGetChildLocationProviders };