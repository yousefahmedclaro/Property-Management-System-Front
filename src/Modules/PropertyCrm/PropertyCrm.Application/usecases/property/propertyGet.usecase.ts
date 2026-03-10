import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCase } from '../../../../Common/application/use-case';
import { property } from '../../../PropertyCrm.Domain/property';
import { propertyRepository, propertyRepositoryProvider } from '../../repositories/property.repository';

@Injectable()
class propertyGetUseCase implements UseCase<string, property> {
  private readonly _propertyRepository = inject(propertyRepository);

  execute(id: string): Observable<property> {
    return this._propertyRepository.get(id);
  }
}

const propertyGetProviders = [propertyRepositoryProvider, propertyGetUseCase];
export { propertyGetUseCase, propertyGetProviders };