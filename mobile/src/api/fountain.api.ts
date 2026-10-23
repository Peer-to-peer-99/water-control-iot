import api from "./index";
import {Fountain} from "../types/fountain";

// @ts-ignore
async function fetchFountains(): Promise<Fountain[]>
{
    const response = await api.get('v1/fountain');
    return response.data;
}