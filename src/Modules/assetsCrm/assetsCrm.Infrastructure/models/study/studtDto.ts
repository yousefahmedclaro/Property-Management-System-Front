import { LocalizedString } from '../../../../Common/domain/localized-string';
import { Mapper } from '../../../../Common/infrastructure/mapper';
import { Study } from '../../../assetsCrm.Domain/study';

export interface StudyDto {
  id: string;
  name: LocalizedString;
  assetId: string;
  asset: string | null;
  rentalValue: number | null;
  value: number | null;
  irr: number | null;
  data ?: string;
  evaluatedBy ?: string | null;
  evaluatedAt ?: string;
  finalReport ?: string;
}   
export class StudyDtoMapper extends Mapper<StudyDto, Study> {
  override mapFrom(dto: StudyDto): Study {
    return {
      id: dto.id,
      name: dto.name,
      assetName: dto.asset,
      asset: {
        id: dto.assetId,
        translatedName: dto.asset,
      },
      value: dto.value,
      irr: dto.irr,
      rentalValue: dto.rentalValue,
    };
  }

  override mapTo(study: Study): StudyDto {
    return {
      id: study.id!,
      name: study.name!,
      assetId: study.asset!.id!,
      asset: study.assetName!,
      value: study.value!,
      irr: study.irr!,
      rentalValue: study.rentalValue!,
    };
  }

  public static Map(): StudyDtoMapper {
    return new StudyDtoMapper();
  }
}