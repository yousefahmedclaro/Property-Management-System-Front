import { Mapper } from '../../../../Common/infrastructure/mapper';
import { property } from '../../../PropertyCrm.Domain/property';

export interface propertyVm {
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
}

export class propertyVmMapper extends Mapper<propertyVm, property> {
  override mapFrom(vm: propertyVm): property {
    return {
      id: vm.id,
      code: vm.code,
      price: vm.price,
      size: vm.size,
      isAvailable: vm.isAvailable,
      buildingNumber: vm.buildingNumber,
      owner: vm.owner,
      ownerId: vm.ownerId,
      location: vm.location,
      locationId: vm.locationId,
      categoryName: vm.categoryName,
      categoryId: vm.categoryId,
      allowedDurations: vm.allowedDurations,
      allowedRentalDurationIds: vm.allowedRentalDurationIds,
    };
  }

  override mapTo(entity: property): propertyVm {
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
    };
  }

  public static Map(): propertyVmMapper {
    return new propertyVmMapper();
  }
}