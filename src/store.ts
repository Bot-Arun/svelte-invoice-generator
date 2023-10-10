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
  terms:['Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments.','Please quote invoice number when remitting funds.']
});
