import { writable, type Writable } from "svelte/store";
export interface FormItemType {
  name: string;
  discountType: string;
  discount: number;
  price: number;
  gst: number;
  file:File|null;
  quantity: number;
  description:string;
  total: number;
}
export interface UploadFile {
  url:string;
  file:File|null
}

export interface charge {
  chargeType:'%'| '₹',
  amount:number,
  name:string,
}

export interface FormDataType {
  items:FormItemType[],
  subTotal:number,
  deductions:charge[],
  aditionalCharges:charge[],
  total:number,
  attachments :File[],
  notes:string,
  terms:string[],
  signature:UploadFile,
}

export const refresh:Writable<boolean> = writable(true);

export const formData:Writable<FormDataType> = writable({
  items: [
    {
      name: "",
      price: 0,
      discount: 0,
      file:null,
      description:'',
      discountType: "%",
      quantity: 1,
      gst: 0,
      total: 0,
    },
  ],
  subTotal:0,
  signature:{url:'',file:null}, 
  deductions:[],
  total:0,
  notes:'',
  aditionalCharges:[],
  attachments:[],
  terms:[]
});
