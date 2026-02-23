import { Mapper } from "../../../../Common/infrastructure/mapper";
import { renter } from "../../../PropertyCrm.Domain/renter";

export interface renterVm {
  id?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
}

export class renterVmMapper extends Mapper<renterVm, renter> {
  override mapFrom(vm: renterVm): renter {
    return {
      id: vm.id,
      name: vm.name,
      phoneNumber: vm.phoneNumber,
      email: vm.email,
      budget: vm.budget,
    };
  }

  override mapTo(renter: renter): renterVm {
    return {
      id: renter.id!,
      name: renter.name!,
      phoneNumber: renter.phoneNumber!,
      email: renter.email!,
      budget: renter.budget!,
    };
  }

  public static Map(): renterVmMapper {
    return new renterVmMapper();
  }

}