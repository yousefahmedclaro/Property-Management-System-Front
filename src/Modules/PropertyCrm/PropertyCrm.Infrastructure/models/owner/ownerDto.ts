import { Mapper } from '../../../../Common/infrastructure/mapper';
import { owner } from '../../../PropertyCrm.Domain/owner';

export interface ownerDto {
  id?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  incomeBalance?: number | null;
}

export class ownerDtoMapper extends Mapper<ownerDto, owner> {
  override mapFrom(dto: ownerDto): owner {
    return {
      id: dto.id,
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      incomeBalance: dto.incomeBalance,
    };
  }

  override mapTo(entity: owner): ownerDto {
    return {
      id: entity.id!,
      name: entity.name!,
      phoneNumber: entity.phoneNumber!,
      email: entity.email!,
      incomeBalance: entity.incomeBalance!,
    };
  }

  public static Map(): ownerDtoMapper {
    return new ownerDtoMapper();
  }
}