import { Mapper } from '../../../../Common/infrastructure/mapper';
import { owner } from '../../../PropertyCrm.Domain/owner';

export interface ownerVm {
  id?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  incomeBalance?: number | null;
}

export class ownerVmMapper extends Mapper<ownerVm, owner> {
  override mapFrom(vm: ownerVm): owner {
    return {
      id: vm.id,
      name: vm.name,
      phoneNumber: vm.phoneNumber,
      email: vm.email,
      incomeBalance: vm.incomeBalance,
    };
  }

  override mapTo(entity: owner): ownerVm {
    return {
      id: entity.id!,
      name: entity.name!,
      phoneNumber: entity.phoneNumber!,
      email: entity.email!,
      incomeBalance: entity.incomeBalance!,
    };
  }

  public static Map(): ownerVmMapper {
    return new ownerVmMapper();
  }
}