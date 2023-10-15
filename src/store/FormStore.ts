import { writable, type Writable } from "svelte/store";

export interface FormItemType {
  name: string;
  type: string;
  discountType: string;
  discount: number;
  price: number;
  gst: number;
  file:File|null;
  quantity: number;
  total: number;
}


export interface charge {
  chargeType:'%'| '₹',
  amount:number,
  name:string,
}

export interface FormDataType {
  items:FormItemType[],
  deductions:charge[],
  aditionalCharges:charge[],
  total:number,
  attachments :File[],
  terms:string[],
  signature:File|null,
}


export const formData:Writable<FormDataType> = writable({
  items: [
    {
      name: "",
      type: "",
      price: 0,
      discount: 0,
      file:null,
      discountType: "%",
      quantity: 1,
      gst: 0,
      total: 0,
    },
  ],
  signature:null, 
  deductions:[],
  total:0,
  aditionalCharges:[],
  attachments:[],
  terms:[]
});
