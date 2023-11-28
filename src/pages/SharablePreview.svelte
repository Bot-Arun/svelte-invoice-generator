<script lang="ts">
  import { onMount } from "svelte";
  import { getData } from "../api/api";
    import PreviewForm from "../components/PreviewForm.svelte";
  import { formData } from "../store/FormStore";
  import { template, setting, variables, itemURL, clientDataMapping, clientURL, productDataMapping, record, client } from "../store/SettingsStore";
    onMount(async() => {
        const {payload} = await getData('/forms/previewForm/'+formId);
        const {formsData:form, templateData} = payload;
        template.update(x => {
            x.name=templateData.templateName
            x.business = templateData.businessName;
            x.other = templateData.otherInfo;
            x.terms = templateData.dataMapping.terms.map((x:any) => x.value);
            x.logo = {url:templateData.templateLogo,file:null}
            x.signature = {url:templateData.templateSignature,file:null}
            return x ;
        })
        setting.update( x => {
            x.discount = templateData.settings.includeDiscount
            x.GST = templateData.settings.includeGST;
            x.description = templateData.settings.includeItemDescription;
            x.additionalNotes = templateData.settings.includeAdditionalNotes
            x.attachments = templateData.settings.includeAttachments;
            return x ;
        })
        variables.set( templateData.customVariables.map((x:any) => {
            return {
                name: x.variableName,
                values: x.variableValues
            };
        }));

        itemURL.set( templateData.dataMapping.clientInformation.dataUrl)

        clientDataMapping.set( templateData.dataMapping.clientInformation.mappedData.map((x:any) => {
            return {
                from: x.urlFieldName,
                to: x.templateFieldName
            };
        }));

        clientURL.set( templateData.dataMapping.itemMapping.dataUrl);

        productDataMapping.set( templateData.dataMapping.itemMapping.mappedData.map((x:any) => {
            return {
                from: x.urlFieldName,
                to: x.templateFieldName
            };
        }));
        record.update(x => 
            form.recordInformation.recordData.map( (x:any)=> x.value )
        )
        client.update(x => 
            form.clientInformation.map( (x:any)=> x.value )
        )
        
        formData.update(x => {
            x.items = form.itemDetails.map((x:any) => {
                return {
                    name: x.item,
                    price: x.price,
                    discount: x.discount.value,
                    file:null,
                    description:x.description,
                    discountType:x.discount.typeData ==='Rupees'?"₹":"%",
                    quantity: x.qty,
                    gst: x.GST,
                    total: x.total,
                }
            })
            x.deductions = form.price.additionalDiscountCharges.map((y:any) =>{
                return {
                    chargeType:y.typeData ==="Rupees"? '₹':"%",
                    amount:y.value,
                    name:y.key,
                }
            }),
            x.aditionalCharges = form.price.additionalCharges.map((y:any) =>{
                return {
                    chargeType:y.typeData ==="Rupees"? '₹':"%",
                    amount:y.value,
                    name:y.key,
                }
            })
            x.total = form.price.totalAmount;
            x.terms = form.invoiceInfo.termsConditions;
            x.notes = form.invoiceInfo.addtionalInfo;
            x.signature.url = form.invoiceInfo.signature;
            return x;
        })
    })
    export let formId:string;
</script>

<PreviewForm sharablePreview={true} />