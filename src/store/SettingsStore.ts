import { writable ,type Writable } from "svelte/store";
import { formData, type UploadFile } from "./FormStore";

export interface Setting {
  thumbnail: boolean,
  description: boolean,
  discount: boolean,
  additionalNotes: boolean,
  attachments: boolean,
  GST: boolean,
  org:string,
  terms:boolean,
}

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
function updateLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const setting = writable<Setting>( {
  thumbnail: false,
  description: true,
  discount: true,
  additionalNotes: false,
  attachments: false,
  GST: true,
  org:'',
  terms:true,
});

// setting.subscribe(($setting) => {
//   updateLocalStorage('setting', $setting);
// });

export interface ProductData {
  name?:string,
  gst?:number,
  discount?:number,
  price?:number,
}
export interface DataMappingType {
  from :string,
  to:string,
}
export interface ClientData {
  name?:string,
  business?:string,
  email?:string,
  phno?:string,
  gstno?:string,
  address?:string,
}
export interface ClientType {
  name:string,
  business:string,
  email:string,
  phno:string,
  gstno:string,
  address:string,
}

export const clientInfo : Writable<ClientType>  = writable({
  name:'',
  business:'',
  email:'',
  phno:'',
  gstno:'',
  address:'',
})

export const productData: Writable<ProductData[]> = writable([])

export const productDataMapping:Writable<DataMappingType[]> = writable([])

export const clientData:Writable<ClientData[]> = writable([]); 

export const clientDataMapping:Writable<DataMappingType[]> = writable([])

export const clientURL:Writable<string> = writable('https://dummyjson.com/users')

export const itemURL:Writable<string> = writable('https://dummyjson.com/products')

export interface Variable {
  name:string;
  values:string[];
}

export const variables:Writable<Variable[]> = writable([
  {name:'',values:['']}
])

export const terms:Writable<string[]> = writable([])

export interface Colors {
  primaryFg: string,
  primaryBg: string,
  secondaryFg: string,
  secondaryBg: string,
}


export const themeColors:Writable<Colors> = writable({
  primaryFg: '#018d00',
  primaryBg: '#1f4851',
  secondaryFg: '#556172',
  secondaryBg: '#f3fcf3',
})

export const record:Writable<string[]> = writable([])

export const client:Writable<string[]> = writable(['',''])


export interface TemplateType {
  name:string;
  business:string;
  other:string;
  logo:UploadFile;
  signature:UploadFile;
  terms:string[];
  dataUrl:string;
  outputFormMapping:DataMappingType[];
  outputItemMapping:DataMappingType[];
}


export const template:Writable<TemplateType> = writable({
  name:'',
  business:'',
  other:'',
  signature:{file:null,url:''},
  logo:{file:null,url:''},
  terms:[],
  dataUrl:'',
  outputFormMapping:[{from :'formNo',to:''}],
  outputItemMapping:[{from :'formNo',to:''}],
})




