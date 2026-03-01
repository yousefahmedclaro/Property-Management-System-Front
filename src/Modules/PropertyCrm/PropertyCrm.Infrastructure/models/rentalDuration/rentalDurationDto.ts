import { Mapper } from "../../../../Common/infrastructure/mapper";
import { rentalDuration } from "../../../PropertyCrm.Domain/rentalDuration";

export interface rentalDurationDto {
  id?: string;
  months?: number;
  name?: string;
}

export class rentalDurationDtoMapper extends Mapper<rentalDurationDto, rentalDuration> {
  override mapFrom(dto: rentalDurationDto): rentalDuration {
    return {
      id: dto.id,
      months: dto.months,
      name: dto.name,
    };
  }

  override mapTo(entity: rentalDuration): rentalDurationDto {
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
