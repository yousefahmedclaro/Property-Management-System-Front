import { Mapper } from '../../../../Common/infrastructure/mapper';
import { Study } from '../../../assetsCrm.Domain/study';
import { LocalizedString } from '../../../../Common/domain/localized-string';

export interface StudyVm {
  id: string;
  name: LocalizedString;
  assetId: string;
  assetName: string | null;
  rentalValue: number | null;
  value: number | null;
  irr: number | null;
}

export class StudyVmMapper extends Mapper<StudyVm, Study> {
  override mapFrom(vm: StudyVm): Study {
    return {
      id: vm.id,
      name: vm.name,
      assetName: vm.assetName,
      asset: {
        id: vm.assetId,
        translatedName: vm.assetName,
      },
      value: vm.value,
      irr: vm.irr,
      rentalValue: vm.rentalValue,
    };
  }

  override mapTo(study: Study): StudyVm {
    throw new Error('Method not implemented.');
  }

  public static Map(): StudyVmMapper {
    return new StudyVmMapper();
  }
}
