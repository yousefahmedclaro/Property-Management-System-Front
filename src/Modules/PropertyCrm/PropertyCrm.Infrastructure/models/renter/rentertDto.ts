import { Mapper } from "../../../../Common/infrastructure/mapper";
import { renter } from "../../../PropertyCrm.Domain/renter";

export interface renterDto {
  id?: string | null;
  name?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  budget?: number | null;
}

export class renterDtoMapper extends Mapper<renterDto, renter> {
  override mapFrom(dto: renterDto): renter {
    return {
      id: dto.id,
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      budget: dto.budget,
    };
  }

  override mapTo(renter: renter): renterDto {
    return {
      id: renter.id!,
      name: renter.name!,
      phoneNumber: renter.phoneNumber!,
      email: renter.email!,
      budget: renter.budget!,
    };
  }

  public static Map(): renterDtoMapper {
    return new renterDtoMapper();
  }
}