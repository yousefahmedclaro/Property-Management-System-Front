import { Mapper } from "../../../../Common/infrastructure/mapper";
import { category } from "../../../PropertyCrm.Domain/category";

export interface categoryDto {
  id?: string;
  name?: string;
}

export class categoryDtoMapper extends Mapper<categoryDto, category> {
  override mapFrom(dto: categoryDto): category {
    return {
      id: dto.id,
      name: dto.name,
    };
  }

  override mapTo(entity: category): categoryDto {
    return {
      id: entity.id!,
      name: entity.name!,
    };
  }

  public static Map(): categoryDtoMapper {
    return new categoryDtoMapper();
  }
}
