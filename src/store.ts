import { writable , type Writable} from "svelte/store";

export interface FormItemType {
    name:string,
    discountType:string,
    discount:number,
    price:number,
    quantity:number,
    total:number,
}


export const formData:Writable<FormItemType[]> = writable([{
    name:"",
    price:0,
    discount:0,
    discountType:'%',
    quantity:1,
    total:0,
}])