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
    import { clientData, setting ,client, variables, terms, record, template } from '../store/SettingsStore';
    import { onMount } from 'svelte';
    import DisabledForm from '../components/DisabledForm.svelte';
    import BackButton from '../components/BackButton.svelte';
    import Header from '../components/Header.svelte';
    import { getData, getTemplate, postData } from '../api/api';
  import FileUpload from '../components/FileUpload.svelte';
  
    export let formId:string ;
    let attachmentInput:HTMLInputElement;
    let total:number  = $formData.total ;
    let showImage =false ;
    let image : HTMLImageElement;
    let input:HTMLInputElement;
    let ind = 0;
    let next: HTMLInputElement ;
    let signature = ''
    
    onMount(async ()=>{
        const {payload} = await getData('/forms/previewForm/'+formId) 
        template.update(x =>  {
            x.signature.url= payload.invoiceInfo.signature
            return x ;
        })
        await getTemplate(payload.templateId);
        formData.set({
            items: payload.itemDetails.map((x:any) =>  {
                console.log(x)
                return {
                    name: x.item,
                    price: x.price,
                    discount: x.discount.value,
                    file:null,
                    description:x.description,
                    discountType: x.discount.typeData =='Percentage'?'%':'₹',
                    quantity: x.qty,
                    gst: x.GST,
                    total: x.total,
                }
            }),
            signature:{file:null,url:payload.invoiceInfo.signature}, 
            deductions:[],
            total:payload.price.totalAmount,
            notes:payload.invoiceInfo.addtionalInfo,
            aditionalCharges:[],
            attachments:[],
            terms:payload.invoiceInfo.termsConditions,
        })

    })
  
    function getExtension(file:File) {
        const parts = file?.name.split('.') ?? [];
        const extension = parts[parts?.length-1]
        return extension;
    }
    
  </script>
  <div id='mine' class="bg-[#f3f5f7] min-w-[1024px]  w-full ">
      <div class="fixed top-5 right-5 md:left-10 md:top-10">
      <button class=" print:hidden " on:click={()=> history.back()}><BackButton></BackButton></button> 
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
                                  {#if $client.name}
                                      <input disabled class="border-b rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " placeholder="Client name" value={$client.name}   type="text">
                                  {/if}
                                  {#if $client.business}
                                      <input disabled class="border-b rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " value={$client.business} placeholder="Business name" type="text">
                                  {/if}
                                  {#if $client.email}
                                      <input disabled class="border-b rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " value={$client.email} placeholder="Email id" type="email">
                                  {/if}
                                  <div class="flex">
                                      {#if $client.phno}
                                          <input disabled class="border-b rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " value={$client.phno} placeholder="Phone no" type="text">
                                      {/if}
                                      {#if $client.gstno}
                                          <input disabled class="border-b border-gray-400 rounded-none ml-4 focus:outline-none mt-5  pb-2 w-full focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " value={$client.gstno} placeholder="GST no" type="text">
                                      {/if}
                                  </div>
                                  {#if $client.address}
                                      <input bind:this={next} class="border-b border-gray-400 rounded-none focus:outline-none mt-5 pb-2 w-full focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] "value={$client.address} placeholder="Address" type="text">
                                  {/if}
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
                                 <span class="ml-auto"> ₹ {total}</span> 
                              </div>
  
                          </div>
                          <div class="flex mt-5 break-inside-avoid">
                              <FileUpload text='sig' file={$formData.signature} isImage={true} />
                          </div>
                      </div>
                  </div>
                  <div class="flex flex-col mt-10 mx-2 break-inside-avoid ">
                      {#if $setting.additionalNotes && $formData.notes}
                          <div class="h-60 mr-5 flex-1 p-5 bg-secondary-bg">
                              <div class="text-lg text-secondary-fg  py-2 font-semibold">ADDITIONAL NOTES</div>
                              <textarea class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
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
                      <div class="text-black font-semibold self-center my-10">
                          Powered by NiForms
                      </div>
                  </div>
              </div>
          </div>
      </main>
  </div>