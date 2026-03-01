import { Mapper } from "../../../../Common/infrastructure/mapper";
import { rentalDuration } from "../../../PropertyCrm.Domain/rentalDuration";
import { rentalDurationDtoMapper } from "./rentalDurationDto";

export interface rentalDurationVm {
  id?: string;
  months?: number;
  name?: string;
}

export class rentalDurationVmMapper extends Mapper<rentalDurationVm, rentalDuration> {
  override mapFrom(vm: rentalDurationVm): rentalDuration {
    return {
      id: vm.id,
      months: vm.months,
      name: vm.name,
    };
  }

  override mapTo(entity: rentalDuration): rentalDurationVm {
    return {
      id: entity.id!,
      months: entity.months!,
      name: entity.name!,
    };
  }

  public static Map(): rentalDurationDtoMapper {
    return new rentalDurationDtoMapper();
  }
}
