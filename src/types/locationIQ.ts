export type Location = {    
    place_id: string;
    osm_id: string;
    osm_type: string;
    licence: string;
    lat: string;
    lon: string;
    boundingbox: string[],
    class: "place" | string;
    type: "city" | "state" | "country" | string;
    display_name: string;
    display_place: string;
    display_address: string;
    address: {
        name: string;
        house_number: string;
        road: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        country_code: string;
    }
}