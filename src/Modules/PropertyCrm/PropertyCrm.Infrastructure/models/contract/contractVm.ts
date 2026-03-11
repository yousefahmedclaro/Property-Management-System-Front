import { Mapper } from '../../../../Common/infrastructure/mapper';
import { contract } from '../../../PropertyCrm.Domain/contract';

export interface contractVm {
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

export class contractVmMapper extends Mapper<contractVm, contract> {
  override mapFrom(vm: contractVm): contract {
    return {
      id: vm.id,
      ownerId: vm.ownerId,
      ownerName: vm.ownerName,
      ownerEmail: vm.ownerEmail,
      renterId: vm.renterId,
      renterName: vm.renterName,
      renterEmail: vm.renterEmail,
      propertyId: vm.propertyId,
      code: vm.code,
      propertyLocation: vm.propertyLocation,
      propertySize: vm.propertySize,
      propertyCategory: vm.propertyCategory,
      propertyRentDuration: vm.propertyRentDuration,
      rentalDurationId: vm.rentalDurationId,
      contractPrice: vm.contractPrice,
      contractStartDate: vm.contractStartDate,
      contractEndDate: vm.contractEndDate,
      monthlyRentAmount: vm.monthlyRentAmount,
      annualIncreament: vm.annualIncreament,
      insurance: vm.insurance,
      startData: vm.startData,
    };
  }

  override mapTo(entity: contract): contractVm {
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

  public static Map(): contractVmMapper {
    return new contractVmMapper();
  }
}