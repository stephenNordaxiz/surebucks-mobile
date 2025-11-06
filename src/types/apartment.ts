
export type Apartment = {
    id: number; //change it string when connecting to db
    bathrooms: number;
    bedrooms: number;
    images: string[];
    property_id: number;//change to string later
    rent: number;
    sqFt: number;
    unit: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}