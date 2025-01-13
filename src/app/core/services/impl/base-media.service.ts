import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export abstract class BaseMediaService {  
    public abstract upload(blob:Blob):Observable<number[]>;
  }
  