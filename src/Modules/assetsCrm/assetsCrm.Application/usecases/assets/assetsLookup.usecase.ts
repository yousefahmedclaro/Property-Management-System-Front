import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UseCaseWithOutInPut } from '../../../../Common/application/use-case';
import { Asset } from '../../../assetsCrm.Domain/asset';
import { AssetsRepository, assetsRepositoryProvider } from '../../repositories/assets.repository';
import { Lookup } from '../../../../Common/domain/lookup';

@Injectable()
class AssetsGetLookUpUseCase implements UseCaseWithOutInPut<Lookup[]> {
  private readonly _assetsRepository = inject(AssetsRepository);

  execute(): Observable<Lookup[]> {
    return this._assetsRepository.getAssetsLookUpList();
  }
}

const AssetsGetLookUpProviders = [
  assetsRepositoryProvider,
  AssetsGetLookUpUseCase,
];

export { AssetsGetLookUpUseCase, AssetsGetLookUpProviders };
