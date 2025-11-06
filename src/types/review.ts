
export type Review = {
    id: number; //change it string when connecting to db
    user_id: number;//change to string when connected to backend
    property_id: number;//change to string when connected to backend
    title: string;
    body: string;
    stars: number;
    created_at: string;
    deleted_at: string | null;
    updated_at: string | null;
}