import { HttpClient } from "@angular/common/http";
import { BaseMediaService } from "./base-media.service";
import { STRAPI_AUTH_TOKEN, UPLOAD_API_URL_TOKEN } from "../../repositories/repository.tokens";
import { Inject } from "@angular/core";
import { map, Observable } from "rxjs";
import { IStrapiAuthentication } from "../interfaces/strapi-authentication.interface";

export type StrapiUploadResponse = StrapiMediaData[]

export interface StrapiMedia{
    id:number,
    attributes:StrapiMediaData
}

export interface StrapiMediaData {
  id: number
  name: string
  alternativeText: any
  caption: any
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: ProviderMetadata
  createdAt: string
  updatedAt: string
}

export interface Formats {
  large: Large
  small: Small
  medium: Medium
  thumbnail: Thumbnail
}

export interface Large {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  provider_metadata: ProviderMetadata
}

export interface Small {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  provider_metadata: ProviderMetadata
}

export interface Medium {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  provider_metadata: ProviderMetadata
}

export interface Thumbnail {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  provider_metadata: ProviderMetadata
}

export interface ProviderMetadata {
  public_id: string
  resource_type: string
}

export class StrapiMediaService extends BaseMediaService{

    constructor(
        @Inject(UPLOAD_API_URL_TOKEN) private uploadUrl: string,
        @Inject(STRAPI_AUTH_TOKEN) private auth: IStrapiAuthentication,
        private httpClient:HttpClient
    ) { 
      super();
    }
  
    private getHeaders() {
        const token = this.auth.getToken();
        return {
            headers: token ? { 'Authorization': `Bearer ${token}` } : undefined
        };
    }

    public upload(blob:Blob):Observable<number[]>{
      const formData = new FormData();
      formData.append('files', blob);
      return this.httpClient.post<StrapiUploadResponse>(
        `${this.uploadUrl}`, formData, this.getHeaders())
            .pipe(map((response:StrapiUploadResponse)=>{
        return response.map(media=>media.id);
      }));
    }
  }