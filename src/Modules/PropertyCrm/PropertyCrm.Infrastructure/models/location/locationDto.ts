import { LocalizedString } from '../../../../Common/domain/localized-string';
import { Mapper } from '../../../../Common/infrastructure/mapper';
import { Location } from '../../../PropertyCrm.Domain/location';

export interface LocationDto {
  id: string;
  name: LocalizedString;
  parentLocationId?: string;
  parentLocationName?: string; 
}

export class LocationDtoMapper extends Mapper<LocationDto, Location> {
  override mapFrom(dto: LocationDto): Location {
    return {
      id: dto.id,
      name: dto.name,
      parentLocationId: dto.parentLocationId,
      parentLocationName: dto.parentLocationName, 

    };
  }

  override mapTo(entity: Location): LocationDto {
    return {
      id: entity.id,
      name: entity.name,
      parentLocationId: entity.parentLocationId,
      parentLocationName: entity.parentLocationName,
    };
  }

  public static Map(): LocationDtoMapper {
    return new LocationDtoMapper();
  }
}