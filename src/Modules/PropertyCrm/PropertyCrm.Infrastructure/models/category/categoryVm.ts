import { Mapper } from "../../../../Common/infrastructure/mapper";
import { category } from "../../../PropertyCrm.Domain/category";

export interface categoryVm {
  id?: string;
  name?: string;
}

export class categoryVmMapper extends Mapper<categoryVm, category> {
  override mapFrom(vm: categoryVm): category {
    return {
      id: vm.id,
      name: vm.name,
    };
  }

  override mapTo(entity: category): categoryVm {

    return {
      id: entity.id!,
      name: entity.name!,
    };
  }

  public static Map(): categoryVmMapper {
    return new categoryVmMapper();
  }
}
