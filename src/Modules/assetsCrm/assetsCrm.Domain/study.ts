import { Asset } from './asset';
import { LocalizedString } from '../../Common/domain/localized-string';

export interface Study {
  id?: string | null;
  name?: LocalizedString | null;
  assetName?: string | null;
  rentalValue?: number | null;
  value?: number | null;
  irr?: number | null;
  asset?: Asset | null;
}