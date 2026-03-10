import { Mapper } from '../../../../Common/infrastructure/mapper';
import { property } from '../../../PropertyCrm.Domain/property';

export interface propertyDto {
  id?: string | null;
  code?: string | null;
  price?: number | null;
  size?: number | null;
  isAvailable?: string | null;
  buildingNumber?: number | null;
  owner?: string | null;
  ownerId?: string | null;
  location?: string | null;
  locationId?: string | null;
  categoryName?: string | null;
  categoryId?: string | null;
  allowedDurations?: string[] | null;
  allowedRentalDurationIds?: string[] | null;
    childLocationName?: string | null;
}

export class propertyDtoMapper extends Mapper<propertyDto, property> {
  override mapFrom(dto: propertyDto): property {
    return {
      id: dto.id,
      code: dto.code,
      price: dto.price,
      size: dto.size,
      isAvailable: dto.isAvailable,
      buildingNumber: dto.buildingNumber,
      owner: dto.owner,
      ownerId: dto.ownerId,
      location: dto.location,
      locationId: dto.locationId,
      categoryName: dto.categoryName,
      categoryId: dto.categoryId,
      allowedDurations: dto.allowedDurations,
      allowedRentalDurationIds: dto.allowedRentalDurationIds,
        childLocationName: dto.childLocationName,
    };
  }

  override mapTo(entity: property): propertyDto {
    return {
      id: entity.id,
      code: entity.code,
      price: entity.price,
      size: entity.size,
      isAvailable: entity.isAvailable,
      buildingNumber: entity.buildingNumber,
      owner: entity.owner,
      ownerId: entity.ownerId,
      location: entity.location,
      locationId: entity.locationId,
      categoryName: entity.categoryName,
      categoryId: entity.categoryId,
      allowedDurations: entity.allowedDurations,
      allowedRentalDurationIds: entity.allowedRentalDurationIds,
        childLocationName: entity.childLocationName,
    };
  }

  public static Map(): propertyDtoMapper {
    return new propertyDtoMapper();
  }
}