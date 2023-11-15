<script lang="ts" >
    import Cross from '../assets/cross.svg'
    import Down from '../assets/down.svg'
    import Up from '../assets/up.svg'
    import Setting from '../assets/setting.svg'
    import back from '../assets/back.svg'
    import Form from "../components/Form.svelte";
    import PDF from '../assets/pdf.svg'
    import XLS from '../assets/xls.svg'
    import DOC from '../assets/document.svg'
    import  {Link, navigate} from 'svelte-routing'
    import { formData , type charge } from "../store/FormStore";
    import { clientData, setting ,clientInfo, variables, terms, record, client, template, itemURL, clientDataMapping, clientURL, productDataMapping } from '../store/SettingsStore';
    import { onMount } from 'svelte';
    import DisabledForm from '../components/DisabledForm.svelte';
    import BackButton from '../components/BackButton.svelte';
    import Header from '../components/Header.svelte';
    import { getData, getTemplate, postData } from '../api/api';
    import FileUpload from '../components/FileUpload.svelte';
  import { getExtension } from '../lib';
  
    export let formId:string;
    let total:number  = $formData.total ;
    let showImage =false ;
    let image : HTMLImageElement;
    let input:HTMLInputElement;
    let ind = 0;
    let next: HTMLInputElement ;
  

 
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
    
  </script>
  <div id='mine' class="bg-[#f3f5f7] min-w-[1024px]  w-full ">
      <div class="fixed top-5 right-5 md:left-10 md:top-10">
      <button class=" print:hidden " on:click={()=> {history.back()}}><BackButton></BackButton></button> 
      </div>
      <main  class="text-black flex print:py-0">
          <div id='main'   class="flex flex-col min-w-[1024px] w-[1024px] mx-auto bg-white print:shadow-none shadow-lg">
              <Header/>
              <div class="px-8 flex flex-col">
                  <div class="flex mt-8">
                      <div class="flex-1 bg-secondary-bg py-4 px-3 mx-2 rounded-xl"> 
                          <div class="text-lg text-secondary-fg py-2 font-semibold">RECORD INFORMATION</div>
                          <div class="p-4 pb-10">
                              {#each $record as item}
                                  <div class="border-b border-gray-400 mt-5 pb-2 w-full text-lg ">
                                      {item}
                                  </div>
                              {/each} 
                          </div>
                      </div>
                      <div  class="mt-0 flex-1 bg-secondary-bg px-2 mx-2"> 
                          <div class="flex-1 py-4 px-3 mx-2 rounded-xl"> 
                              <div class="text-lg text-secondary-fg  py-2 font-semibold">CLIENT INFORMATION</div>
                              <div class="p-4 relative z-50 pb-10">
                                  <div class="p-4 pb-10">
                                      {#each $client.filter(x => x) as item}
                                          <div class="border-b border-gray-400 mt-5 pb-2 w-full text-lg ">
                                              {item}
                                          </div>
                                      {/each} 
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <DisabledForm data={$formData.items}/>
  
                  <div class="flex " >
                      <div class="px-3 ml-auto  mt-5">
                          <div class="break-inside-avoid">
                              {#each $formData.deductions as discount}
                              <div class="flex mt-7">
                                      <input disabled value={discount.name} class="border-b border-gray-400 bg-inherit rounded-none w-40 focus:outline-none self-center text-xl mr-10" />
                                      <div class="border-b border-gray-400 rounded-none ml-auto focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] " >
                                          {discount.amount}
                                      </div>
                                      <div class="border-b border-gray-400 rounded-none ml-5 focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] ">
                                          {discount.chargeType}
                                      </div>
                                  </div>
                                  {/each}
                              <div class="">
                                  {#each $formData.aditionalCharges.filter( x => x.name !== '') as extraCharge}
                                  <div class="flex  mt-7">
                                      <input disabled value={extraCharge.name} class="border-b border-gray-400 bg-inherit rounded-none w-40 focus:outline-none self-center text-xl mr-10" />
                                      <div class="border-b border-gray-400 rounded-none ml-auto focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] " >
                                          {extraCharge.amount}
                                      </div>
                                      <div class="border-b border-gray-400 rounded-none ml-5 focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] ">
                                          {extraCharge.chargeType}
                                      </div>
                                  </div>
                                  {/each}
                              </div>
                              <div class=" bg-green-500 w-[350px]"></div>
                              <div class="flex font-semibold text-2xl mt-10 py-4 border-y border-[#B7C2D3FF] ">
                                 <span>Total (INR)</span>
                                 <span class="ml-auto"> ₹ {$formData.total}</span> 
                              </div>
  
                          </div>
                          {#if $formData.signature.file !== null || $formData.signature.url.length}
                            <div class="flex mt-5 break-inside-avoid">
                              <FileUpload file={$formData.signature} isImage={true} text='' />
                            </div>
                        {/if}
                      </div>
                  </div>
                  <div class="flex flex-col mt-10 mx-2 break-inside-avoid ">
                      {#if $setting.additionalNotes && $formData.notes}
                          <div class="h-60 mr-5 flex-1 p-5 bg-secondary-bg">
                              <div class="text-lg text-secondary-fg  py-2 font-semibold">ADDITIONAL NOTES</div>
                              <textarea value={$formData.notes} class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                          </div>
                      {/if}
                      {#if $setting.attachments && $formData.attachments.length}
                          <div class="flex-1 mt-0 ml-5 p-5 bg-secondary-bg"> 
                              <div class="text-lg text-secondary-fg  py-2 mb-3 font-semibold">ATTACHMENTS</div>
                              <div class="flex flex-wrap">
  
                                  {#each $formData.attachments  as item,index}
                                      {@const extension = getExtension($formData.attachments[index])}
                                      <div class="flex mr-2 mb-4">
                                          <div class="flex flex-col">
                                              {#if  extension === 'pdf'}
                                                  <img src={PDF}  class="w-20 h-20" alt="">   
                                              {:else if extension === 'xlsx'}
                                                  <img src={XLS} class="w-20 h-20" alt="">
                                              {:else}
                                                  <img src={DOC} class="w-20 h-20" alt="">
                                              {/if}
                                              <div class="text-center mt-2 text-sm">
                                                  {item.name.length > 10? item.name.substring(0,10)+'...':item.name}
                                              </div>
                                          </div>
                                          <button class="w-6 -ml-4 -mt-2  self-start">
                                              <img src={Cross} alt="">
                                          </button>
                                      </div>
                                  {/each}
                                  
                              </div>
                          </div>
                      {/if}
                  </div>
                  {#if $formData.terms.length}
                      <div class="w-full mt-16 p-5 bg-secondary-bg break-inside-avoid">
                          <div class="text-lg text-secondary-fg  py-2 font-semibold">TERMS & CONDITIONS</div>
                          {#each $formData.terms.filter(x => x.length >0) as item,index}
                          <div class="flex pb-2 mt-5 ">
                              <span class="self-center mr-2 ">{index+1}.</span>
                              <input disabled type="text" value={item} class="border-b focus:outline-none w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"/>
                          </div>
                          {/each}
                      </div>
                  {/if}
                  <div class="flex-col w-full flex">
                    <div class="flex justify-around print:hidden">
                        <button on:click={()=>print()} class="text-white mt-10 w-[200px] bg-[#CC335F] self-center p-2 rounded-md "  >
                            PRINT OR DOWNLOAD
                        </button>
                    </div>
                    <div class="text-black font-semibold self-center my-10">
                        Powered by NiForms
                    </div>
                  </div>
              </div>
          </div>
      </main>
  </div>