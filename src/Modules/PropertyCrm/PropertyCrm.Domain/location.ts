import { LocalizedString } from '../../Common/domain/localized-string';

export interface Location {
  id: string;
  name: LocalizedString;
  parentLocationId?: string;
  parentLocationName?: string; // ← is this line there?
}