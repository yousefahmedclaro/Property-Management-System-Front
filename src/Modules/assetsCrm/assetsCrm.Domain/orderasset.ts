export interface OrderAsset {
    id: string ;
    companyId: string ;
    assetsIds?: string[] | null;
    requirements?: string ;
    notes?: string | null ;
    requestSource?: string | null ;
    status?: string | null ;
    code?: string | null;
}