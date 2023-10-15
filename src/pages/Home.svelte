<script lang="ts" >
  import Cross from '../assets/cross.svg'
  import Down from '../assets/down.svg'
  import Up from '../assets/up.svg'
  import Setting from '../assets/setting.svg'
  import Form from "../components/Form.svelte";
  import PDF from '../assets/pdf.svg'
  import XLS from '../assets/xls.svg'
  import DOC from '../assets/document.svg'
  import  {Link} from 'svelte-routing'
  import { formData , type charge } from "../store/FormStore";
  import { clientData, setting, type ClientData ,client, variables, terms } from '../store/SettingsStore';
  import { onMount } from 'svelte';
  let attachmentInput:HTMLInputElement;
  let discounts :charge[] = $formData.deductions;
  let extraCharges:charge[] = $formData.aditionalCharges;
  let total:number  = $formData.total ;
  let input :HTMLInputElement ;
  let showImage =false ;
  let image : HTMLImageElement;

  let ind = 0;
  let next: HTMLInputElement ;
  let filterdArray : any[] =[];
  let focus =false ;
  $: filterdArray, ind = 0 ;
  function changeFocus(code:string) {
    if (code==="ArrowDown" && filterdArray.length >0)
    ind = Math.min(filterdArray.length-1,ind+1);
    else if (code==="ArrowUp")
    ind = Math.max(0,ind-1);
    else if (code==="Enter") {
      $client.name = filterdArray[ ind].name ?? '';
      $client.email = filterdArray[ind].email ?? ''
      $client.business = filterdArray[ind].business ?? ''
      $client.phno = filterdArray[ind].phno ?? ''
      $client.gstno = filterdArray[ind].gstno ?? ''
      $client.address = filterdArray[ind].address ?? ''
      next.focus();
    }
  }
  $: {
    filterdArray = $clientData.filter( x => x.name && x.name.toLocaleLowerCase().startsWith($client.name.toLocaleLowerCase())&& x.name.toLocaleLowerCase() && $client.name!=='') ;
    }
  $: {
    if($formData.items.length) {
        total = $formData.items.map(x => x.total).reduce((x,y) => x +y);
    }
  }
  function addDiscount(){
    discounts = [...discounts,{name:'Discount',chargeType:'%',amount:0}]
  }
  function addAdditionalCharges(){
    extraCharges = [...extraCharges,{name:'Additional Charge',chargeType:'%',amount:0}]
  }
  function removeDiscount(index:number) {
    discounts.splice(index,1);
    discounts = [...discounts]
  }
  function removeAdditionalCharges(index:number) {
    extraCharges.splice(index,1);
    extraCharges = [...extraCharges];
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
  function onSignatureChange() {
        $formData.signature = input.files ? input.files[0]:null;
		
        if ($formData.signature ) {
            showImage = true;
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result as string);
            });
            reader.readAsDataURL($formData.signature);
            return;
        } 
		showImage = false; 
    }
    function getExtension(file:File) {
        const parts = file?.name.split('.') ?? [];
        const extension = parts[parts?.length-1]
        return extension;
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
  $: {
    let val = $formData.items.reduce((x,y) => x+ y.total,0)
    let totalDiscountPercent = discounts.reduce((x,y) => y.chargeType == '%' ? x+ y.amount : x ,0 );
    let totalDiscountAmount = discounts.reduce((x,y) => y.chargeType == '₹' ? x+ y.amount : x ,0 );
    val = val*(1 - totalDiscountPercent/100) - totalDiscountAmount ;
    let totalExtraChargePercent = extraCharges.reduce((x,y) => y.chargeType == '%' ? x+ y.amount : x ,0 );
    let totalExtraChargeAmount = extraCharges.reduce((x,y) => y.chargeType == '₹' ? x+ y.amount : x ,0 );
    total = Math.round( val*(1 + totalExtraChargePercent/100) + totalExtraChargeAmount );
    }
    onMount(()=>{
        $formData.terms=[...$terms] ;  ;
    })
</script>
<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E6E6E6FF' stroke-width='3' stroke-dasharray='7%2c 20' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
    .my-border-2 {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>
<div class="bg-[#f3f5f7] min-h-screen">
    <div class="fixed bottom-20 left-20">
    <Link to='/setting'><img src={Setting} alt=""></Link>
    </div>
    <main class="justify-center flex py-40">
        <div class="flex flex-col w-[1024px] bg-white  shadow-lg">
            <div class="flex justify-between text-white bg-[#221148] py-5">
                <div class=" px-8 py-8 font-light text-sm">
                    <div class="text-3xl  font-bold">QUOTATION</div>
                    <div class="mt-2">Business Name</div>
                    <div class="mt-2">Address Line 1</div>
                    <div class="mt-2">Phone no | Email address | GST no </div>
                </div>
                <div class=" text-cente  my-7 p-10 flex my-border mx-8" > <span class="self-center text-xl font-light flex-wrap  ">Add Logo</span> </div>
            </div>
            <div class="px-8 flex flex-col">
                <div class="flex mt-8">
                    <div class="flex-1 bg-[#f8faff] py-4 px-3 mx-2 rounded-xl"> 
                        <div class="text-lg text-[#556172] py-2 font-semibold">RECORD INFORMATION</div>
                        <div class="p-4 pb-10">
                            {#each $variables as variable}
                                <select class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] ">
                                <option value="" disabled selected >{variable[0]}</option>
                                {#each variable[1] as value}
                                    <option>{value}</option>
                                {/each}
                                </select>
                            {/each}
                        </div>
                    </div>
                    <div  class="flex-1 bg-[#f8faff] px-2 mx-2"> 
                        <div class="flex-1 py-4 px-3 mx-2 rounded-xl"> 
                            <div class="text-lg text-[#556172]  py-2 font-semibold">CLIENT INFORMATION</div>
                            <div class="p-4 relative pb-10">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Client name" bind:value={$client.name} on:focusin={()=> focus = true} on:focusout={ ()=> setTimeout(()=> focus = false,500) }  on:keydown={(e)=>changeFocus(e.key)}  type="text">
                                {#if focus && filterdArray.length && $setting.autoMode}
                                    <div class="absolute border flex flex-col rounded-lg mt-1 border-gray-400 bg-white w-full">
                                        {#each filterdArray as item,index}
                                            <button class="p-2 text-left {index==ind?"bg-[#945ff7] text-white":""}" on:mouseenter={()=> ind = index}  on:click={()=> changeFocus("Enter")} >{item.name}</button>
                                        {/each}
                                    </div>
                                {/if}
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " bind:value={$client.business} placeholder="Business name" type="text">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " bind:value={$client.email} placeholder="Email id" type="email">
                                <div class="flex">
                                    <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " bind:value={$client.phno} placeholder="Phone no" type="text">
                                    <input class="ml-4 focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " bind:value={$client.gstno} placeholder="GST no" type="text">
                                </div>
                                <input bind:this={next} class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " bind:value={$client.address} placeholder="Address" type="text">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-4">
                    <input type="checkbox"/> <span class="ml-2"> Add additional details</span>
                </div>
                <Form bind:data={$formData.items}/>

                <div class="flex " >
                    <div class="ml-5 flex flex-col">
                        <div class="text-3xl mt-10 font-semibold"> Settings</div>
                        <div class="flex flex-col mt-5">
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.autoMode}> <span>Automatic</span></div>
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.thumbnail}> <span>show thumbnail</span></div>
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.description}> <span>show description</span></div>
                        </div>
                    </div>
                    <div class="ml-auto mt-5">
                        <div class="">
                            {#each discounts as discount,index}
                            <div class="flex mt-7">
                                    <input bind:value={discount.name} class="border-b-gray-400 focus:border-b-[#733dd9] border-b w-40 focus:outline-none self-center text-xl mr-10" />
                                    <input bind:value={discount.amount} class="ml-auto focus:outline-none  border-b pb-2 w-12 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                    <select bind:value={discount.chargeType} class="ml-5 focus:outline-none border-b pb-2 w-12 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] ">
                                        <option value="%">%</option>
                                        <option value="₹">₹</option>
                                    </select>
                                    <button on:click={()=>removeDiscount(index)} class="ml-2"><img src={Cross} alt=""></button>
                                </div>
                                {/each}
                            <div class="">
                                {#each extraCharges as extraCharge,index}
                                <div class="flex  mt-7">

                                    <input bind:value={extraCharge.name} class="border-b-gray-400 focus:border-b-[#733dd9] border-b w-40 focus:outline-none self-center text-xl mr-10"/>
                                    <input bind:value={extraCharge.amount} class="ml-auto focus:outline-none  border-b pb-2 w-12 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                    <select bind:value={extraCharge.chargeType} class="ml-5 focus:outline-none border-b pb-2 w-12 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] ">
                                        <option value="%">%</option>
                                        <option value="₹">₹</option>
                                    </select>
                                    <button on:click={()=>removeAdditionalCharges(index)} class="ml-2"><img src={Cross} alt=""></button>
                                </div>
                                {/each}
                            </div>
                            <button on:click={addDiscount} class="block text-[#6C40D1] mt-7">
                                + Add Discount or deductions
                            </button>
                            <button on:click={addAdditionalCharges} class="text-[#6C40D1] mt-7">
                                + Add Additional charges
                            </button>
                            <div class="w-[350px]"> </div>
                            <div class="flex font-semibold text-2xl mt-10 py-4 border-y border-[#B7C2D3FF] ">
                               <span>Total (INR)</span>
                               <span class="ml-auto"> ₹ {total}</span> 
                            </div>

                        </div>
                        {#if showImage}
                            <div class="flex mt-5">
                                <img bind:this={image} class="h-28 w-60" alt="Thumbnail"  />
                                <button on:click={()=> { showImage= false}} class="self-start w-10  -mt-3 ">
                                    <img src={Cross} alt="">
                                </button>
                            </div>
                        {:else}
                            <input bind:this={input} accept="image/png, image/jpeg" on:change={onSignatureChange} type="file"  id='sig' class="hidden"  />
                            <label for='sig' class="my-border-2 w-full focus:bg-[#F8FAFF] hover:bg-gray-100 h-20 p-2 text-[#6C40D1] break-words mt-10 justify-center text-center flex"> <span class="self-center font-semibold">Add Signature</label>
                        {/if}
                    </div>
                </div>
                <div class="flex mt-10">
                    {#if $setting.additionalNotes}
                        <div class="h-60 mr-5 flex-1 p-5 bg-[#F8FAFF]">
                            <div class="text-lg text-[#556172]  py-2 font-semibold">ADDITIONAL NOTES</div>
                            <textarea class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                        </div>
                    {/if}
                    {#if $setting.attachments}
                        <div class="flex-1 ml-5 p-5 bg-[#F8FAFF]"> 
                            <div class="text-lg text-[#556172]  py-2 mb-3 font-semibold">ADD ATTACHMENTS</div>
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
                                <!-- <img src={PDF} alt=""> -->
                                <input bind:this={attachmentInput} on:change={addAttachment} type="file" hidden id='attach' >
                                <label for="attach"  class="my-border-2 rounded-3xl  focus:bg-[#e5ecf7] hover:bg-gray-100 w-28 h-28 flex text-[#6C40D1] text-lg text-center">
                                    <span class="m-auto"> Add here</span>
                                </label>
                            </div>
                        </div>
                    {/if}
                </div>
                <div class="w-full mt-16 p-5 bg-[#F8FAFF]">
                    <div class="text-lg text-[#556172]  py-2 font-semibold">TERMS & CONDITIONS</div>
                    {#each $formData.terms as item,index}
                        <div class="flex pb-2 mt-5">
                            <span class="self-center  mr-2">{index+1}.</span>
                            <input type="text" bind:value={item} class="focus:outline-none border-b w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3]">
                            <button class="ml-2" on:click={()=>removeTerm(index) } ><img src={Cross} alt="cross"/></button>
                            {#if $formData.terms.length -1 > index }
                                <button on:click={()=> swapTerms(index)} class="ml-2"><img src={Down} alt="down"/></button>
                            {/if}
                            {#if index > 0}
                                <button on:click={()=> swapTerms(index -1)} class="ml-2"><img src={Up} alt="up"/></button>
                            {/if}
                        </div>
                    {/each}
                    <button on:click={addTerms} class="text-[#733dd9] mt-5">+ add Terms</button>
                </div>
                <div class="mt-10">
                    <input type="checkbox" name="" id=""><span class="text-lg ml-4 ">Save the T&Cs for every next period</span>
                </div>
                <div class="flex-col w-full flex">
                    <span class="text-white mt-10 bg-[#CC335F] text-lg self-center p-2 rounded-md "  >
                        SAVE & CONTINUE
                    </span>
                    <div class="text-black font-semibold self-center my-10">
                        Powered by NiForms
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>