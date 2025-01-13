import { Observable } from "rxjs";
import { IAuthentication } from "./authentication.interface";

export interface IStrapiAuthentication extends IAuthentication{
    getToken():string | null;
}