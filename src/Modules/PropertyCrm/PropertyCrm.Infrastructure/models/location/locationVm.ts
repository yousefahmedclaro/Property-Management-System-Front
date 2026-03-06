import { LocalizedString } from "../../../../Common/domain/localized-string";
import { Mapper } from "../../../../Common/infrastructure/mapper";
import { Location } from "../../../PropertyCrm.Domain/location";

export interface locationVm {
  id: string;
  name: LocalizedString;
  parentLocationId?: string;
  parentLocationName?: string;
}

export class locationDtoMapper extends Mapper<locationVm, Location> {

  override mapFrom(vm: locationVm): Location {
    return {
      id: vm.id,
      name: vm.name,
      parentLocationId: vm.parentLocationId,
      parentLocationName: vm.parentLocationName,
    };
  }

  override mapTo(entity: Location): locationVm {
    return {
      id: entity.id!,
      name: entity.name!,
      parentLocationId: entity.parentLocationId,
      parentLocationName: entity.parentLocationName,
    };
  }

  public static Map(): locationDtoMapper {
    return new locationDtoMapper();
  }
}
