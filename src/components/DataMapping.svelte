<script lang="ts">
  import {productData,productDataMapping,clientDataMapping,clientData,clientURL,itemURL,terms,} from '../store/SettingsStore'
  import {fade} from 'svelte/transition'
  import Cross from '../assets/cross.svg'
  import { onMount } from 'svelte';
  import Down from '../assets/down.svg'
  import Up from '../assets/up.svg'
  let itemList = ['name','type','price','discount','gst'];
  let clientList = ['name','business','phno','email','gstno','address']
  let tab:'client'|'item' |'terms' = 'client';

  let ItemData :any = [];
  async function getItemData(){ 
    try {
        let data  = await fetch($itemURL).then(x => x.json()).then(x => x.products);
        if (data===undefined )
        throw Error();
        ItemData = data;
    }
    catch (error) {
        setError('Enter a valid json url');
        ItemData= []
    }
    console.log(ItemData)
  }
  
  let CustomerData :any = [];
  onMount(async()=>{
    await Promise.all([
        getClientData(),
        getItemData(),
    ])
  })
  async function getClientData(){
    try {
        let data = await fetch($clientURL).then(x => x.json()).then(x => x.users);
        if (data===undefined ) 
        throw Error();
        CustomerData = data;
    }
    catch (error) {
        setError('Enter a valid json url');
        CustomerData = []
    }
  }
  export let setError :(msg:string)=> void ;
  function addProductMapping() {
    $productDataMapping.push({from:'',to:''})
    $productDataMapping = [...$productDataMapping];
  }
  function removeProductMapping(index:number) {
    $productDataMapping.splice(index,1)
    $productDataMapping = [...$productDataMapping];
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
        $productData =[...$productData];
    }
  }
  function addClientMapping() {
    $clientDataMapping.push({from:'',to:''})
    $clientDataMapping = [...$clientDataMapping];
  }
  function removeClientMapping(index:number) {
    $clientDataMapping.splice(index,1)
    $clientDataMapping = [...$clientDataMapping];
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
        $clientData =[...$clientData];
    }
  }

  function swapTerms(index:number) {
    let temp = $terms[index]
    $terms[index] = $terms[index +1]
    $terms[index +1] = temp
    $terms = [...$terms ]
  }
  function addTerms() {
    $terms = [...$terms,'']
  }
  function removeTerm (index:number) {
    $terms.splice(index,1)
    $terms = [...$terms]
  }
</script>
<div class="bg-[#f8faff]">

    <div class="p-4 bg-[#221148] rounded-t-lg font-semibold flex">
      <button class=" hover:text-white {tab=='client'?'text-white':'text-gray-500'}" on:click={()=> tab = 'client'} >CLIENT INFORMATION</button>
      <button class="hover:text-white {tab=='item'?'text-white':'text-gray-500'} ml-10" on:click={()=> tab = 'item'} >ITEM INFORMATION</button>
      <button class="hover:text-white {tab=='terms'?'text-white':'text-gray-500'} ml-10" on:click={()=> tab = 'terms'} >TERMS & CONDITIONS</button>
    </div>
    {#if tab == 'item'}
         <div class="bg-[#f8faff] flex m-3 p-6">
            <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" bind:value={$itemURL} placeholder="Add your json url here" type="text" />
            <button class="bg-[#CC335F] rounded-lg ml-6 p-2 text-white px-4" on:click={getItemData} >Fetch Data</button>
       </div>
       {#each $productDataMapping as item,index}
           <div class="flex px-10 py-3">   
               <div class="w-60" >
                   <select class="text-lg w-60 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit p-2" bind:value={item.from}>
                    {#if ItemData.length}
                        {#each Object.keys(ItemData[0]) as val}
                            {#if item.from===val || !$productDataMapping.map(y => y.from).includes(val) }
                            <option value={val} >{val}</option>
                            {/if}
                        {/each}
                    {/if}
                   </select>
               </div>
               <div class="w-60 ml-auto">
                   <select class="text-lg w-60 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit p-2" bind:value={item.to}>
                    {#each itemList as val}
                       {#if item.to === val || !$productDataMapping.map(y => y.to).includes(val)}
                        <option>{val}</option>
                       {/if}
                   {/each} 
                   </select>
               </div>
               <button on:click={()=> removeProductMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
           </div>
       {/each}     
       {#if ItemData.length}
            <button class="text-[#6C40D1]  ml-10 my-6" in:fade out:fade  on:click={addProductMapping} >Add Mapping</button>
       {/if}
    {:else if  tab === 'client'}
        <div class="bg-[#f8faff] flex m-3 p-6">
            <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" bind:value={$clientURL} placeholder="Add your json url here" type="text" />
            <button class="bg-[#CC335F] rounded-lg ml-6 p-2 text-white px-4"  on:click={getClientData} >Fetch Data</button>
        </div>
        {#each $clientDataMapping as item,index}
            <div class="flex px-10 py-3">   
                <div class="w-60" >
                    <select class="text-lg w-60 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit p-2" bind:value={item.from}>
                        {#if CustomerData.length}
                            {#each Object.keys(CustomerData[0]) as val}
                                {#if item.from===val || !$clientDataMapping.map(y => y.from).includes(val) }
                                <option value={val} >{val}</option>
                                {/if}
                            {/each}
                        {/if}
                    </select>
                </div>
                <div class="w-60 ml-auto">
                    <select class="text-lg w-60 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit p-2" bind:value={item.to}>
                        {#each clientList as val}
                        {#if item.to === val || !$clientDataMapping.map(y => y.to).includes(val)}
                        <option>{val}</option>
                        {/if}
                    {/each} 
                    </select>
                </div>
                <button on:click={()=> removeClientMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
            </div>
        {/each} 
        {#if CustomerData.length}
            <button class="text-[#6C40D1]  ml-10 my-6" in:fade out:fade  on:click={addClientMapping} >Add Mapping</button>
        {/if}

    {:else} 
    <div class="bg-[#f8faff] flex flex-col m-3 p-6">
        {#each $terms as item,index}
            <div class="flex pb-2 mt-5">
                <span class="self-center  mr-2">{index+1}.</span>
                <input type="text" bind:value={item} class="focus:outline-none border-b w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3]">
                <button class="ml-2" on:click={()=>removeTerm(index) } ><img src={Cross} alt="cross"/></button>
                {#if $terms.length -1 > index }
                    <button on:click={()=> swapTerms(index)} class="ml-2"><img src={Down} alt="down"/></button>
                {/if}
                {#if index > 0}
                    <button on:click={()=> swapTerms(index -1)} class="ml-2"><img src={Up} alt="up"/></button>
                {/if}
            </div>
        {/each}
        <button class="text-[#6C40D1] ml-2 my-6 mr-auto" on:click={addTerms} >Add Terms</button>
    </div>

    {/if} 
</div>
