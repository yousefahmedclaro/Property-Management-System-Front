import { Mapper } from '../../../../Common/infrastructure/mapper';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';

export interface orderassetDto {
     id: string;                    
     assets: string[];              
     company: string;               
     requirements: string;         
     notes: string | null;
     requestSource?: string | null;
    status?: string | null ;
    code?: string | null;
}
    
export class orderassetDtoMapper extends Mapper<orderassetDto, OrderAsset> {
  override mapFrom(Dto: orderassetDto): OrderAsset {
    return {
       id: Dto.id,
       assetsIds: Dto.assets || [], 
       companyId: Dto.company, 
       requirements: Dto.requirements,
       notes: Dto.notes,
       requestSource: Dto.requestSource,
       status: Dto.status,
       code: Dto.code

    };
  }

  override mapTo(orderAsset: OrderAsset): orderassetDto {
    return {
      id : orderAsset.id || '',
      assets: orderAsset.assetsIds || [],
      company: orderAsset.companyId || '',
      requirements: orderAsset.requirements || '',
      notes: orderAsset.notes || null,
      requestSource: orderAsset.requestSource || null,
      status: orderAsset.status || null,
      code: orderAsset.code || null
    };
  }

  public static Map(): orderassetDtoMapper {
    return new orderassetDtoMapper();
  }
}
