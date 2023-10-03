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

export const setting = writable({
  autoMode: false,
  showThumbnail: true,
  showDesc: true,
});

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
  deductions:[],
  total:0,
  aditionalCharges:[],
  attachments:[],
  terms:['Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.','Please quote invoice number when remitting funds.']
});
