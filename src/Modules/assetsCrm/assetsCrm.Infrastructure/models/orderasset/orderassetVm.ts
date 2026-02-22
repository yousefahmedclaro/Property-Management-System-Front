import { Mapper } from '../../../../Common/infrastructure/mapper';
import { OrderAsset } from '../../../assetsCrm.Domain/orderasset';

export interface orderassetVm {
  id: string;                    
  Assets: string[];              
  Company: string;               
  Requirements: string;          
  notes: string | null;          
  requestSource?: string | null;  
  status?: string | null ;
 }
    
export class orderassetVmMapper extends Mapper<orderassetVm, OrderAsset> {
  override mapFrom(vm: orderassetVm): OrderAsset {
    return {
      id: vm.id,
      assetsIds: vm.Assets,      
      companyId: vm.Company,    
      requirements: vm.Requirements,
      notes: vm.notes,
      requestSource: vm.requestSource,
      status: vm.status,
    };
  }

  override mapTo(orderAsset: OrderAsset): orderassetVm {
    return {
      id : orderAsset.id || '',
      Assets: orderAsset.assetsIds || [],
      Company: orderAsset.companyId || '',
      Requirements: orderAsset.requirements || '',
      notes: orderAsset.notes || null,
      requestSource: orderAsset.requestSource || null,
      status: orderAsset.status || null
    };
  }

  public static Map(): orderassetVmMapper {
    return new orderassetVmMapper();
  }
}
