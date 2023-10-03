import { writable , type Writable} from "svelte/store";

export interface FormItemType {
    name:string,
    type:string,
    discountType:string,
    discount:number,
    price:number,
    gst:number,
    quantity:number,
    total:number,
}
export const setting = writable({ 
    autoMode : false ,
    showThumbnail : false,
    showDesc : false ,
})

export const formData:Writable<FormItemType[]> = writable([{
    name:"",
    type:'',
    price:0,
    discount:0,
    discountType:'%',
    quantity:1,
    gst:0,
    total:0,
}])