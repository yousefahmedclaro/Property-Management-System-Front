export interface property {
  id?: string | null;
  code?: string | null;
  price?: number | null;
  size?: number | null;
  isAvailable?: string | null;
  buildingNumber?: number | null;
  owner?: string | null;
  ownerId?: string | null;
  location?: string | null;
  locationId?: string | null;
  categoryName?: string | null;
  categoryId?: string | null;
  allowedDurations?: string[] | null;
  allowedRentalDurationIds?: string[] | null;
   childLocationName?: string | null; 
}