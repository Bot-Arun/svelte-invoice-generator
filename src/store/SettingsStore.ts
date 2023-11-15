import { writable ,type Writable } from "svelte/store";
import { formData, type UploadFile } from "./FormStore";

export interface Setting {
    autoMode: boolean,
    showThumbnail: boolean,
    showDesc: boolean,
    showDiscount:boolean,
    showGST:boolean,
    org:string,
}

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
function updateLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const setting = writable( {
  thumbnail: false,
  description: true,
  discount: true,
  additionalNotes: false,
  attachments: false,
  GST: true,
  org:''
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
export interface DataMapping {
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

export const productDataMapping:Writable<DataMapping[]> = writable([])

export const clientData:Writable<ClientData[]> = writable([]); 

export const clientDataMapping:Writable<DataMapping[]> = writable([])

export const clientURL:Writable<string> = writable('https://dummyjson.com/users')

export const itemURL:Writable<string> = writable('https://dummyjson.com/products')

export interface Variable {
  name:string;
  values:string[];
}

export const variables:Writable<Variable[]> = writable([
  {name:'myVariable',values:['value1','value2']},
  {name:'Return Reason',values:['reason 1','reason 2']},
])

export const terms:Writable<string> = writable('')

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


export interface Template {
  name:string;
  business:string;
  other:string;
  logo:UploadFile;
  signature:UploadFile;
  terms:string[];
}


export const template:Writable<Template> = writable({
  name:'INVOICE',
  business:'SEVENTY TWO PHARMA OMNICARE PVT LTD',
  other:'NO. 31 & 33, C.M.C Road, Senjal, Karaikudi',
  signature:{file:null,url:''},
  logo:{file:null,url:''},
  terms:[],
})




