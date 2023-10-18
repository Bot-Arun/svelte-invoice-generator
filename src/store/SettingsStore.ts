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
  autoMode: false,
  thumbnail: true,
  description: true,
  discount: true,
  additionalNotes: true,
  attachments: true,
  GST: true,
}));

setting.subscribe(($setting) => {
  updateLocalStorage('setting', $setting);
});

export interface ProductData {
  name?:string,
  gst?:number,
  discount?:number,
  type?:string,
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

export const variables:Writable<[string,string[]][]> = writable([
  ['myVariable',['value1','value2']],
  ['Return Reason',['reason 1','reason 2']]
])

export const terms:Writable<string[]> = writable(['Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.','Please quote invoice number when remitting funds.'])

export interface Colors {
  primaryFg: string,
  primaryBg: string,
  secondaryFg: string,
  secondaryBg: string,
}


export const themeColors:Writable<Colors> = writable({
  primaryFg: '#6C40D1',
  primaryBg: '#221148',
  secondaryFg: '#556172',
  secondaryBg: '#F8FAFF',
})