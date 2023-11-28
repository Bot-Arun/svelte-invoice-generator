import { ItemData } from "../ProductData";
import { postData } from "../api/api";
import { formData } from "../store/FormStore";
import { client, record } from "../store/SettingsStore";

export function getExtension(file:File) {
    const parts = file?.name.split('.') ?? [];
    const extension = parts[parts?.length-1]
    return extension;
}

export function setForm(){
    formData.set({
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
        signature:{url:'',file:null}, 
        deductions:[],
        total:0,
        notes:'',
        aditionalCharges:[],
        attachments:[],
        terms:[]
      });
      record.set([])
      client.set([])
}