<script lang="ts" >
  import Cross from '../assets/cross.svg'
  import Down from '../assets/down.svg'
  import Up from '../assets/up.svg'
  import Setting from '../assets/setting.svg'
  import Form from "../components/Form.svelte";
  import PDF from '../assets/pdf.svg'
  import XLS from '../assets/xls.svg'
  import DOC from '../assets/document.svg'
  import  {Link, navigate, useHistory} from 'svelte-routing'
  import { formData , type charge, refresh } from "../store/FormStore";
  import { clientData, setting ,clientInfo, variables, terms, record, template, productData, itemURL, clientDataMapping, clientURL, productDataMapping, client } from '../store/SettingsStore';
  import { onMount } from 'svelte';
  import SettingButton from '../components/SettingButton.svelte';
  import Header from '../components/Header.svelte';
  import BackButton from '../components/BackButton.svelte';
  import { getData, getTemplate, postData } from '../api/api';
  import FileUpload from '../components/FileUpload.svelte';
  import { getExtension } from '../lib';

  export let templateId:string;
  let attachmentInput:HTMLInputElement;
  let discountRef :HTMLInputElement ;
  let image : HTMLInputElement;
  let ind = 0;
  let next: HTMLInputElement ;
  let filterdArray : any[] =[];
  let focus =false ;
  let validate = false;

  $: filterdArray, ind = 0 ;
  function changeFocus(code:string) {
    if (code==="ArrowDown" && filterdArray.length >0)
    ind = Math.min(filterdArray.length-1,ind+1);
    else if (code==="ArrowUp")
    ind = Math.max(0,ind-1);
    else if (code==="Enter") {
      $clientInfo.name = filterdArray[ ind].name ?? '';
      $clientInfo.email = filterdArray[ind].email ?? ''
      $clientInfo.business = filterdArray[ind].business ?? ''
      $clientInfo.phno = filterdArray[ind].phno ?? ''
      $clientInfo.gstno = filterdArray[ind].gstno ?? ''
      $clientInfo.address = filterdArray[ind].address ?? ''
      next.focus();
    }
  }
  $: {
    filterdArray = $clientData.filter( x => x.name && x.name.toLocaleLowerCase().startsWith($clientInfo.name.toLocaleLowerCase())&& x.name.toLocaleLowerCase() && $clientInfo.name!=='') ;
    }
  $: {
    if($formData.items.length) {
        $formData.total = $formData.items.map(x => x.total).reduce((x,y) => x +y);
    }
  }

  let discountFocus = false ;
  let additionalChargesFocus = false;
  let discountInputs:any[] = []
  let additionalChargesInputs:any[] = []
  $: discountInputs = $formData.deductions.map(x => null)
  $: additionalChargesInputs = $formData.aditionalCharges.map(x =>null);
  function addDiscount(){
    $formData.deductions = [...$formData.deductions,{name:'',chargeType:'%',amount:0}]
    discountFocus = true;
}
  function addAdditionalCharges(){
    $formData.aditionalCharges = [...$formData.aditionalCharges,{name:'',chargeType:'%',amount:0}]
    additionalChargesFocus = true;
  }
  function removeDiscount(index:number) {
    $formData.deductions.splice(index,1);
    $formData.deductions = [...$formData.deductions]
  }
  function removeAdditionalCharges(index:number) {
    $formData.aditionalCharges.splice(index,1);
    $formData.aditionalCharges = [...$formData.aditionalCharges];
  }
  function swapTerms(index:number) {
    let temp = $formData.terms[index]
    $formData.terms[index] = $formData.terms[index +1]
    $formData.terms[index +1] = temp
    $formData.terms = [...$formData.terms ]
  }
  function addTerms() {
    $formData.terms = [...$formData.terms,'']
  }
  function removeTerm (index:number) {
    $formData.terms.splice(index,1)
    $formData.terms = [...$formData.terms]
  }
    
    function addAttachment() {
        const file = attachmentInput.files?.[0];
        if (file === undefined)
            return;
        $formData.attachments.push(file);
        $formData.attachments= [...$formData.attachments] 
    } 
    function removeAttachment(index:number) {
        $formData.attachments.splice(index,1);
        $formData.attachments= [...$formData.attachments]
    }
    let errors:string[] = []
    function validateForm() {
        errors =[]
        if($record.some(x => x.trim().length===0)) 
            errors.push("Record information Can't be empty !");
        if($formData.terms.some(x => x.trim().length===0))
            errors.push("Terms Can't be empty !");
        if($formData.items.length===0)
            errors.push("There should be atleast an item !");
        if($formData.items.some(x => x.name.trim().length===0))
            errors.push("Item name Can't be empty !");
        if($formData.deductions.some(x => x.name.trim().length===0))
            errors.push("Deduction name Can't be empty !");
        if($formData.aditionalCharges.some(x => x.name.trim().length===0))
            errors.push("Additional Charge name Can't be empty !");
        errors = [...errors]
        validate =true;
        if(errors.length)
            document?.getElementById('my_modal_3')?.showModal()
        else
            navigate( `/${templateId}/preview`);    
    }
    function additionalChargeUpdate(event:any,index:number) {
        if ((event.key == "Enter" || event.key === 'Tab')&& event.target.value === '') {
            $formData.aditionalCharges[index].name = 'Additional Charge'
        }
    }

    function discountUpdate(event:any,index:number) {
        if ((event.key == "Enter" || event.key === 'Tab')&& event.target.value === '') {
            $formData.deductions[index].name = 'Discount'
        }
    }
    let ItemData :any = [];
async function getItemData(){ 
    try {
        let data  = await postData('/templates/fetchInputMapping',{
            "templateid": templateId,
            "fetchfor": "ItemInformation",
            "fetchfrom": "Google_Sheet",
            "range": "A1:Z100"
        }).then( x => x.payload);
        if (data===undefined )
        throw Error();
        ItemData = data;
    }
    catch (error) {
        ItemData= []
    }
}
let CustomerData :any = [];
onMount(async()=>{
    if($refresh) {
        await getTemplate(templateId),
        await Promise.all([
            getClientData(),
            getItemData(),
        ])
    }
    else {
        $refresh = true;
    }
    
})
$:{
    if(discountFocus) {
        discountRef?.focus();
        setTimeout(()=>discountFocus = false  ,0)
        
    }
    else if (additionalChargesFocus)  {
        image?.focus();
        setTimeout(()=>additionalChargesFocus = false  ,0)
        
    }
}
async function getClientData(){
    try {
        let data  = await postData('/templates/fetchInputMapping',{
            "templateid": templateId,
            "fetchfor": "ClientInformation",
            "fetchfrom": "Google_Sheet",
            "range": "A1:Z100"
        }).then( x => x.payload);
        if (data===undefined ) 
        throw Error();
        CustomerData = data;
    }
    catch (error) {
        CustomerData = []
    }
}

$:{ 
    if($productDataMapping.length > 0) {
        $productData = ItemData.map((x:any) => {
        let obj :any ={};
        $productDataMapping.map(({from,to})=>{
            if(to==='name')
            obj[to] = ''+x[from];
            else 
            obj[to] = ''+x[from];

        })
        return obj;
        }
        )
    }
}

$:{ 
    if($clientDataMapping.length > 0) {
        $clientData = CustomerData.map((x:any) => {
        let obj:any ={} ;
        $clientDataMapping.map(({from,to})=>{
            if(to==='name')
            obj[to] = ''+x[from];
            else 
            obj[to] = ''+x[from];
        })
        return obj;
        }
        )
    }
}

  $: {
    $formData.subTotal = $formData.items.reduce((x,y) => x+ y.total,0)
    let totalDiscountPercent = $formData.deductions.reduce((x,y) => y.chargeType == '%' ? x+ y.amount : x ,0 );
    let totalDiscountAmount = $formData.deductions.reduce((x,y) => y.chargeType == '₹' ? x+ y.amount : x ,0 );
    let val = $formData.subTotal*(1 - totalDiscountPercent/100) - totalDiscountAmount ;
    let totalExtraChargePercent = $formData.aditionalCharges.reduce((x,y) => y.chargeType == '%' ? x+ y.amount : x ,0 );
    let totalExtraChargeAmount = $formData.aditionalCharges.reduce((x,y) => y.chargeType == '₹' ? x+ y.amount : x ,0 );
    $formData.total = Math.round( val*(1 + totalExtraChargePercent/100) + totalExtraChargeAmount );
    }
    $: $client = [$clientInfo.name, $clientInfo.business, $clientInfo.email, $clientInfo.phno, $clientInfo.gstno, $clientInfo.address,]
</script>
<style>
    .my-border-2 {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>
<div class="bg-[#f3f5f7] min-h-screen">
    <div class="fixed left-5 bottom-5 sm:bottom-10 sm:left-10 z-10">
    <Link to='{templateId}/setting'><SettingButton/></Link>
    </div>
    <div class="fixed top-5 right-5 md:left-10 md:top-10">
        <Link to='/home'><BackButton/></Link> 
    </div> 
    <main class="text-black justify-center flex md:py-40">
        <div class="flex flex-col w-[1024px] bg-white  shadow-lg">
            <Header/>
            <div class="px-3 md:px-8 flex flex-col">
                <div class="flex flex-col sm:flex-row mt-8">
                    <div class="flex-1 bg-secondary-bg py-4 px-3 mx-2 rounded-xl"> 
                        <div class="text-lg text-secondary-fg py-2 font-semibold">RECORD INFORMATION</div>
                        <div class="p-4 pb-10">
                            {#each $variables as variable,index}
                                {#if variable.values.length}
                                    <select bind:value={$record[index]} class="focus:outline-none mt-5 border-b pb-2 w-full text-lg {validate&& $record[index].length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} bg-inherit placeholder-[#B7C2D3] ">
                                    <option value="" disabled selected={true}  >{variable.name}</option>
                                    {#each variable.values as value}
                                        <option>{value}</option>
                                    {/each}
                                    </select>
                                {:else}
                                    <input class="rounded-none focus:outline-none mt-5 border-b pb-2 w-full {validate&& $record[index].length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'}  bg-inherit placeholder-[#B7C2D3] " bind:value={$record[index]} placeholder="{variable.name}" type="text">
                                {/if}
                            {/each}
                            <div class="text-primary-fg mt-10">
                                <Link to='/{templateId}/setting' >+ Add variable</Link>
                            </div>

                        </div>
                    </div>
                    <div  class=" mt-5 sm:mt-0 flex-1 bg-secondary-bg px-2 mx-2"> 
                        <div class="flex-1 py-4 px-3 mx-2 rounded-xl"> 
                            <div class="text-lg text-secondary-fg  py-2 font-semibold">CLIENT INFORMATION</div>
                            <div class="m-4 relative pb-10">
                                <input class=" rounded-none focus:outline-none mt-5 border-b w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " placeholder="Client name" bind:value={$clientInfo.name} on:focusin={()=> focus = true} on:focusout={ ()=> setTimeout(()=> focus = false,500) }  on:keydown={(e)=>changeFocus(e.key)}  type="text">
                                {#if focus && filterdArray.length }
                                    <div class="absolute border z-50 flex flex-col mt-1 border-gray-400 bg-white w-full">
                                        {#each filterdArray.slice(0,5) as item,index}
                                            <button class="p-2 text-left {index === filterdArray.slice(0,5).length -1?'':'border-b' } border-gray-300 {index==ind?" bg-primary-bg text-white":"bg-secondary-bg"}" on:mouseenter={()=> ind = index}  on:click={()=> changeFocus("Enter")} >{item.name}</button>
                                        {/each}
                                    </div>
                                {/if}
                                <input class="rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " bind:value={$clientInfo.business} placeholder="Business name" type="text">
                                <input class="rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " bind:value={$clientInfo.email} placeholder="Email id" type="email">
                                <div class="flex">
                                    <input class="rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " bind:value={$clientInfo.phno} placeholder="Phone no" type="text">
                                    <input class="rounded-none ml-4 focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " bind:value={$clientInfo.gstno} placeholder="GST no" type="text">
                                </div>
                                <input bind:this={next} class="rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] " bind:value={$clientInfo.address} placeholder="Address" type="text">
                            </div>
                        </div>
                    </div>
                </div>
                
                <Form {validate} bind:data={$formData.items}/>

                <div class="flex " >
                    <div class="max-sm:flex-1 px-3 max-sm:mx-auto sm:ml-auto  mt-5">
                        {#if $formData.aditionalCharges.length + $formData.deductions.length !== 0}
                            <div class="flex mb-10  text-xl mt-10 py-4 border-y border-[#B7C2D3FF] ">
                                <span>Sub Total (INR)</span>
                                <span class="ml-auto"> ₹ {$formData.subTotal}</span> 
                            </div>
                        {/if}
                        <div class="">
                            {#each $formData.deductions as discount,index}
                            <div class="flex mt-7">
                                {#if $formData.deductions.length -1 !==index}
                                    <input bind:value={discount.name} placeholder="Discount Name" class="bg-inherit rounded-none {validate&& discount.name.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} border-b w-40 focus:outline-none self-center text-xl mr-10"
                                    on:keydown={(e)=>discountUpdate(e,index)}
                                    />
                                {:else}
                                    <input bind:value={discount.name} placeholder="Discount Name" class="bg-inherit rounded-none {validate&& discount.name.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} border-b w-40 focus:outline-none self-center text-xl mr-10"
                                    bind:this={discountRef}
                                    on:keydown={(e)=>discountUpdate(e,index)}
                                    />
                                {/if}
                                    
                                    <input bind:value={discount.amount} class="rounded-none ml-auto focus:outline-none  border-b pb-2 w-12 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                    <select bind:value={discount.chargeType} class="rounded-none ml-5 focus:outline-none border-b pb-2 w-12 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] ">
                                        <option value="%">%</option>
                                        <option value="₹">₹</option>
                                    </select>
                                    <button on:click={()=>removeDiscount(index)} class="ml-2"><img src={Cross} alt=""></button>
                                </div>
                                {/each}
                                
                            <div class="">
                                {#each $formData.aditionalCharges as extraCharge,index}
                                <div class="flex  mt-7">
                                    {#if $formData.aditionalCharges.length -1 === index}
                                        <input bind:value={extraCharge.name} placeholder="Additional Charges Name" class="bg-inherit rounded-none {validate&& extraCharge.name.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} border-b w-40 focus:outline-none self-center text-xl mr-10"
                                        on:keydown={(e)=>additionalChargeUpdate(e,index)}
                                        bind:this={image}
                                        />
                                    {:else}
                                        <input bind:value={extraCharge.name} placeholder="Additional Charges Name" class="bg-inherit rounded-none {validate&& extraCharge.name.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} border-b w-40 focus:outline-none self-center text-xl mr-10"
                                        on:keydown={(e)=>additionalChargeUpdate(e,index)}
                                        />
                                    {/if}
                                    <input bind:value={extraCharge.amount} class="rounded-none ml-auto focus:outline-none  border-b pb-2 w-12 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                    <select bind:value={extraCharge.chargeType} class="rounded-none ml-5 focus:outline-none border-b pb-2 w-12 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3] ">
                                        <option value="%">%</option>
                                        <option value="₹">₹</option>
                                    </select>
                                    <button on:click={()=>removeAdditionalCharges(index)} class="ml-2"><img src={Cross} alt=""></button>
                                </div>
                                {/each}
                            </div>
                            <button on:click={addDiscount} class="block text-primary-fg mt-7">
                                + Add Discount or deductions
                            </button>
                            <button on:click={addAdditionalCharges} class="text-primary-fg mt-7">
                                + Add Additional charges
                            </button>
                            <div class=" bg-green-500 sm:w-[350px]"></div>
                            <div class="flex font-semibold text-2xl mt-10 py-4 border-y border-[#B7C2D3FF] ">
                               <span>Total (INR)</span>
                               <span class="ml-auto"> ₹ {$formData.total}</span> 
                            </div>

                        </div>
                        <FileUpload className="my-5 h-[100px] w-full" bind:file={$formData.signature} text={'Add signature'}  />
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row mt-10 mx-2">
                    {#if $setting.additionalNotes}
                        <div class="h-60 sm:mr-5 flex-1 p-5 bg-secondary-bg">
                            <div class="text-lg text-secondary-fg  py-2 font-semibold">ADDITIONAL NOTES</div>
                            <textarea bind:value={$formData.notes} class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                        </div>
                    {/if}
                    {#if $setting.attachments}
                        <div class="flex-1 mt-10 sm:mt-0  sm:ml-5 p-5 bg-secondary-bg"> 
                            <div class="text-lg text-secondary-fg  py-2 mb-3 font-semibold">ADD ATTACHMENTS</div>
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
                                        <button on:click={()=> removeAttachment(index)} class="w-6 -ml-4 -mt-2  self-start">
                                            <img src={Cross} alt="">
                                        </button>
                                    </div>
                                {/each}
                                <input bind:this={attachmentInput} on:change={addAttachment} type="file" hidden id='attach' >
                                <label for="attach"  class="my-border-2 rounded-3xl  focus:bg-[#e5ecf7] hover:bg-gray-100 w-28 h-28 flex text-primary-fg text-lg text-center">
                                    <span class="m-auto"> Add here</span>
                                </label>
                            </div>
                        </div>
                    {/if}
                </div>
                {#if $setting.terms}
                    <div class="w-full mt-16 p-5 bg-secondary-bg">
                        <div class="text-lg text-secondary-fg  py-2 font-semibold">TERMS & CONDITIONS</div>
                        {#each $formData.terms as item,index}
                            <div class="flex pb-2 mt-5">
                                <span class="self-center mr-2">{index+1}.</span>
                                <input type="text" bind:value={item} class="focus:outline-none border-b w-full {validate&& item.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} bg-inherit placeholder-[#B7C2D3]">
                                <button class="ml-2" on:click={()=>removeTerm(index) } ><img src={Cross} alt="cross"/></button>
                                {#if $formData.terms.length -1 > index }
                                    <button on:click={()=> swapTerms(index)} class="ml-2"><img src={Down} alt="down"/></button>
                                {/if}
                                {#if index > 0}
                                    <button on:click={()=> swapTerms(index -1)} class="ml-2"><img src={Up} alt="up"/></button>
                                {/if}
                            </div>
                        {/each}
                        <button on:click={addTerms} class="text-primary-fg mt-5">+ add Terms</button>
                    </div>
                {/if}
                <div class="mt-10 flex-col w-full flex">
                    <button on:click={validateForm} class="text-white mt-10 mx-auto bg-[#CC335F] text-lg  p-2 rounded-md "  >
                        SAVE & CONTINUE
                    </button>
                    <div class="text-black font-semibold self-center my-10">
                        Powered by NiForms
                    </div>
                </div>
            </div>
        </div>

    </main>
    <dialog id='my_modal_3' class="modal">
        <div class="modal-box">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>'toggleModal'}>✕</button>
        </form>
        
        <h3 class="font-bold text-lg">Alert</h3>
        <p class="p-4">
        {#each errors as item,index}
            <div class="py-2">
                {index+1}. {item}
            </div>
        {/each}
        </p>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
</div>