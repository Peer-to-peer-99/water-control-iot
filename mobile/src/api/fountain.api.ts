import api from "./index";
import {Fountain} from "../types/fountain";

// @ts-ignore
async function fetchFountains(): Promise<Fountain[]>
{
    const response = await api.get('v1/fountains');
    return response.data;
}

async function fetchFountain(id: number): Promise<Fountain>
{
    const response = await api.get(`v1/fountains/${id}`);
    return response.data;
}

export {
    fetchFountains,
    fetchFountain
};