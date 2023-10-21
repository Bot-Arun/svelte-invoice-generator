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
  import  {Link} from 'svelte-routing'
  import { formData , type charge } from "../store/FormStore";
  import { clientData, setting ,client, variables, terms, record } from '../store/SettingsStore';
  import { onMount } from 'svelte';
  import DisabledForm from '../components/DisabledForm.svelte';
  let attachmentInput:HTMLInputElement;
  let total:number  = $formData.total ;
  let showImage =false ;
  let image : HTMLImageElement;
  let input:HTMLInputElement;
  let ind = 0;
  let next: HTMLInputElement ;


    function getExtension(file:File) {
        const parts = file?.name.split('.') ?? [];
        const extension = parts[parts?.length-1]
        return extension;
    }
    onMount(()=>{
        $formData.terms=[...$terms] ;  ;
    })

    $:{
        if ($formData.signature) {
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target?.result as string ;
        };

        reader.readAsDataURL($formData.signature);
    }
    }
  
</script>
<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E6E6E6FF' stroke-width='3' stroke-dasharray='7%2c 20' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>
<div id='mine' class="bg-[#f3f5f7] min-w-[1024px]  w-full ">
    <div class="fixed top-5 right-5 md:left-10 md:top-10">
    <button class=" print:hidden " on:click={()=> history.back()}><img src={back} alt=""></button> 
    </div>
    <main  class="text-black flex print:py-0">
        <div id='main'   class="flex flex-col min-w-[1024px] w-[1024px] mx-auto bg-white print:shadow-none shadow-lg">
            <div class="flex justify-between text-white bg-primary-bg py-5">
                <div class=" px-8 py-8 font-light text-sm">
                    <div class="text-3xl  font-bold">QUOTATION</div>
                    <div class="mt-2">Business Name</div>
                    <div class="mt-2">Address Line 1</div>
                    <div class="mt-2 text-sm">Phone no | Email | GST no </div>
                </div>
                <div class=" text-center  my-7 p-10 flex my-border mr-3 mx-8" > <span class="self-center text-xl font-light flex-wrap">Add Logo</span> </div>
            </div>
            <div class="px-8 flex flex-col">
                <div class="flex mt-8">
                    <div class="flex-1 bg-secondary-bg py-4 px-3 mx-2 rounded-xl"> 
                        <div class="text-lg text-secondary-fg py-2 font-semibold">RECORD INFORMATION</div>
                        <div class="p-4 pb-10">
                            {#each $record as item}
                                <div class="mt-5 pb-2 w-full text-lg ">
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
                                    <input disabled class="rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " placeholder="Client name" value={$client.name}   type="text">
                                {/if}
                                {#if $client.business}
                                    <input disabled class="rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " value={$client.business} placeholder="Business name" type="text">
                                {/if}
                                {#if $client.email}
                                    <input disabled class="rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 focus:border-primary-fg bg-inherit placeholder-[#B7C2D3] " value={$client.email} placeholder="Email id" type="email">
                                {/if}
                                <div class="flex">
                                    {#if $client.phno}
                                        <input disabled class="rounded-none focus:outline-none mt-5 pb-2 w-full border-gray-400 bg-inherit placeholder-[#B7C2D3] " value={$client.phno} placeholder="Phone no" type="text">
                                    {/if}
                                    {#if $client.gstno}
                                        <input disabled class="rounded-none ml-4 focus:outline-none mt-5  pb-2 w-fullfocus:border-primary-fg bg-inherit placeholder-[#B7C2D3] " value={$client.gstno} placeholder="GST no" type="text">
                                    {/if}
                                </div>
                                {#if $client.address}
                                    <input bind:this={next} class="rounded-none focus:outline-none mt-5 pb-2 w-fullfocus:border-primary-fg bg-inherit placeholder-[#B7C2D3] "value={$client.address} placeholder="Address" type="text">
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
                                    <input disabled value={discount.name} class="bg-inherit rounded-none w-40 focus:outline-none self-center text-xl mr-10" />
                                    <div class="rounded-none ml-auto focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] " >
                                        {discount.amount}
                                    </div>
                                    <div class="rounded-none ml-5 focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] ">
                                        {discount.chargeType}
                                    </div>
                                </div>
                                {/each}
                            <div class="">
                                {#each $formData.aditionalCharges.filter( x => x.name !== '') as extraCharge}
                                <div class="flex  mt-7">
                                    <input disabled value={extraCharge.name} class="bg-inherit rounded-none w-40 focus:outline-none self-center text-xl mr-10" />
                                    <div class="rounded-none ml-auto focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] " >
                                        {extraCharge.amount}
                                    </div>
                                    <div class="rounded-none ml-5 focus:outline-none pb-2 w-12 bg-inherit placeholder-[#B7C2D3] ">
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
                            {#if $formData.signature!== null}
                                <img bind:this={image} class="h-28 max-w-60" alt="Thumbnail"  />
                            {/if}
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
                <div class="w-full mt-16 p-5 bg-secondary-bg break-inside-avoid">
                    <div class="text-lg text-secondary-fg  py-2 font-semibold">TERMS & CONDITIONS</div>
                    {#each $formData.terms as item,index}
                        <div class="flex pb-2 mt-5">
                            <span class="self-center  mr-2">{index+1}.</span>
                            <input disabled type="text" value={item} class=" focus:outline-none w-full border-gray-400 focus:border-primary-fg bg-inherit placeholder-[#B7C2D3]"/>
                        </div>
                    {/each}
                </div>
                <div class="flex-col w-full flex">
                    <div class="flex justify-around print:hidden">
                        <button on:click={()=>print()} class="text-white mt-10 w-[200px] bg-[#CC335F] self-center p-2 rounded-md "  >
                            PRINT
                        </button>
                        <button on:click={()=> print()} class="text-white mt-10 w-[200px] bg-[#CC335F] self-center p-2 rounded-md "  >
                            SUBMIT & DOWNLOAD
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