import { Mapper } from '../../../../Common/infrastructure/mapper';
import { contract } from '../../../PropertyCrm.Domain/contract';

export interface contractDto {
  id?: string | null;
  ownerId?: string | null;
  ownerName?: string | null;
  ownerEmail?: string | null;
  renterId?: string | null;
  renterName?: string | null;
  renterEmail?: string | null;
  propertyId?: string | null;
  code?: string | null;
  propertyLocation?: string | null;
  propertySize?: number | null;
  propertyCategory?: string | null;
  propertyRentDuration?: string | null;
  rentalDurationId?: string | null;
  contractPrice?: number | null;
  contractStartDate?: string | null;
  contractEndDate?: string | null;
  monthlyRentAmount?: number | null;
  annualIncreament?: number | null;
  insurance?: number | null;
  startData?: string | null;
}

export class contractDtoMapper extends Mapper<contractDto, contract> {
  override mapFrom(dto: contractDto): contract {
    return {
      id: dto.id,
      ownerId: dto.ownerId,
      ownerName: dto.ownerName,
      ownerEmail: dto.ownerEmail,
      renterId: dto.renterId,
      renterName: dto.renterName,
      renterEmail: dto.renterEmail,
      propertyId: dto.propertyId,
      code: dto.code,
      propertyLocation: dto.propertyLocation,
      propertySize: dto.propertySize,
      propertyCategory: dto.propertyCategory,
      propertyRentDuration: dto.propertyRentDuration,
      rentalDurationId: dto.rentalDurationId,
      contractPrice: dto.contractPrice,
      contractStartDate: dto.contractStartDate,
      contractEndDate: dto.contractEndDate,
      monthlyRentAmount: dto.monthlyRentAmount,
      annualIncreament: dto.annualIncreament,
      insurance: dto.insurance,
      startData: dto.startData,
    };
  }

  override mapTo(entity: contract): contractDto {
    return {
      id: entity.id,
      ownerId: entity.ownerId,
      ownerName: entity.ownerName,
      ownerEmail: entity.ownerEmail,
      renterId: entity.renterId,
      renterName: entity.renterName,
      renterEmail: entity.renterEmail,
      propertyId: entity.propertyId,
      code: entity.code,
      propertyLocation: entity.propertyLocation,
      propertySize: entity.propertySize,
      propertyCategory: entity.propertyCategory,
      propertyRentDuration: entity.propertyRentDuration,
      rentalDurationId: entity.rentalDurationId,
      contractPrice: entity.contractPrice,
      contractStartDate: entity.contractStartDate,
      contractEndDate: entity.contractEndDate,
      monthlyRentAmount: entity.monthlyRentAmount,
      annualIncreament: entity.annualIncreament,
      insurance: entity.insurance,
      startData: entity.startData,
    };
  }

  public static Map(): contractDtoMapper {
    return new contractDtoMapper();
  }
}