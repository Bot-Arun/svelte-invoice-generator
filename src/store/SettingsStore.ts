import { writable ,type Writable } from "svelte/store";

export interface Setting {
    autoMode: boolean,
    showThumbnail: boolean,
    showDesc: boolean,
    showDiscount:boolean,
    showGST:boolean,
}

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}
function updateLocalStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const setting = writable(getFromLocalStorage('setting', {
  thumbnail: false,
  description: true,
  discount: true,
  additionalNotes: false,
  attachments: false,
  GST: true,
}));

setting.subscribe(($setting) => {
  updateLocalStorage('setting', $setting);
});

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

export const client : Writable<ClientType>  = writable({
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

export const terms:Writable<string[]> = writable(['Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.','Please quote invoice number when remitting funds.'])

export interface Colors {
  primaryFg: string,
  primaryBg: string,
  secondaryFg: string,
  secondaryBg: string,
}


export const themeColors:Writable<Colors> = writable({
  primaryFg: '#018d00',
  primaryBg: '#014751',
  secondaryFg: '#556172',
  secondaryBg: '#f3fcf3',
})

export const record:Writable<string[]> = writable(['',''])


export interface Template {
  name:string;
  business:string;
  other:string;
}

export const template:Writable<Template> = writable({
  name:'INVOICE',
  business:'SEVENTY TWO PHARMA OMNICARE PVT LTD',
  other:'NO. 31 & 33, C.M.C Road, Senjal, Karaikudi'
})