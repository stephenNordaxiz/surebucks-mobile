/* eslint-disable @typescript-eslint/no-explicit-any */
import { Scores } from "./scores";
import { Apartment } from "./apartment";
import { Pets } from "./pets";
import { Review } from "./review";

export type Property = {
    id: number;
    images: any[];
    unitType: string;
    rentLow: number;
    rentHigh: number;
    bedroomLow: number;
    bedroomHigh: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    tags: string[];
    lat: number;
    long: number;
    about: string;
    pets: Pets[];
    phoneNumber: string;
    website: string;
    stars: number;
    reviews?: Review[];
    features?: string[];
    apartments?: Apartment[];
    scores?: Scores[];
}