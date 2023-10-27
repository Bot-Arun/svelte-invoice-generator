<script lang="ts">
import {fade} from 'svelte/transition'
import Cross from '../assets/cross.svg'
import { onMount } from 'svelte';
import Down from '../assets/down.svg'
import Up from '../assets/up.svg'
import type { ClientData, DataMapping, ProductData } from '../store/SettingsStore';
let itemList = ['name','price','discount','gst','description'];
let clientList = ['name','business','phno','email','gstno','address']
let tab:'client'|'item' |'terms' = 'client';

export let products:ProductData[] ;
export let productMapping:DataMapping[] ;
export let clientMapping:DataMapping[] ;
export let clients:ClientData[]  ;
export let clientUrl:string ;
export let itemUrl:string ;
export let Terms:string[] ;
export let setError :(msg:string)=> void ;

let ItemData :any = [];
async function getItemData(){ 
    try {
        let data  = await fetch(itemUrl).then(x => x.json()).then(x => x.products);
        if (data===undefined )
        throw Error();
        ItemData = data;
    }
    catch (error) {
        setError('Enter a valid json url');
        ItemData= []
    }
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
        let data = await fetch(clientUrl).then(x => x.json()).then(x => x.users);
        if (data===undefined ) 
        throw Error();
        CustomerData = data;
    }
    catch (error) {
        setError('Enter a valid json url');
        CustomerData = []
    }
}

$:{ 
    if(productMapping.length > 0) {
        products = ItemData.map((x:any) => {
        let obj :any ={};
        productMapping.map(({from,to})=>{
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
    if(clientMapping.length > 0) {
        clients = CustomerData.map((x:any) => {
        let obj:any ={} ;
        clientMapping.map(({from,to})=>{
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
function addProductMapping() {
    productMapping.push({from:'',to:''})
    productMapping = [...productMapping];
}
function removeProductMapping(index:number) {
    productMapping.splice(index,1)
    productMapping = [...productMapping];
}
function addClientMapping() {
    clientMapping.push({from:'',to:''})
    clientMapping = [...clientMapping];
}
function removeClientMapping(index:number) {
    clientMapping.splice(index,1)
    clientMapping = [...clientMapping];
}
function swapTerms(index:number) {
    let temp = Terms[index]
    Terms[index] = Terms[index +1]
    Terms[index +1] = temp
    Terms = [...Terms ]
}
function addTerms() {
    Terms = [...Terms,'']
}
function removeTerm (index:number) {
    Terms.splice(index,1)
    Terms = [...Terms]
}
</script>
<div class="bg-secondary-bg">

    <div class="p-3 sm:p-4 max-sm:text-xs max-md:text-sm bg-primary-bg rounded-t-lg font-semibold flex">
    <button class=" hover:text-white {tab=='client'?'text-white':'text-gray-500'}" on:click={()=> tab = 'client'} >CLIENT INFORMATION</button>
    <button class="hover:text-white {tab=='item'?'text-white':'text-gray-500'} ml-1 sm:ml-5 md:ml-10" on:click={()=> tab = 'item'} >ITEM INFORMATION</button>
    <button class="hover:text-white {tab=='terms'?'text-white':'text-gray-500'} ml-1 sm:ml-5 md:ml-10" on:click={()=> tab = 'terms'} >TERMS & CONDITIONS</button>
    </div>
    {#if tab == 'item'}
    <div class="bg-secondary-bg flex max-md:flex-col m-3 p-6">
        <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" bind:value={itemUrl} placeholder="Add your json url here" type="text" />
        <button class="bg-[#CC335F] rounded-lg w-fit max-md:mx-auto max-md:mt-3 md:ml-6 p-2 text-white px-4"  on:click={getItemData} >Fetch Data</button>
    </div>
        {#each productMapping as item,index}
            <div class="flex px-10 py-3">   
                <div class="" >
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}>
                    {#if ItemData.length}
                        {#each Object.keys(ItemData[0]) as val}
                            {#if item.from===val || !productMapping.map(y => y.from).includes(val) }
                            <option value={val} >{val}</option>
                            {/if}
                        {/each}
                    {/if}
                    </select>
                </div>
                <div class="ml-auto">
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.to}>
                    {#each itemList as val}
                        {#if item.to === val || !productMapping.map(y => y.to).includes(val)}
                        <option>{val}</option>
                        {/if}
                    {/each} 
                    </select>
                </div>
                <button on:click={()=> removeProductMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
            </div>
        {/each}     
        {#if ItemData.length}
            <button class="text-primary-fg  ml-10 my-6" in:fade out:fade  on:click={addProductMapping} >Add Mapping</button>
        {/if}
    {:else if  tab === 'client'}
        <div class="bg-secondary-bg flex max-md:flex-col m-3 p-6">
            <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" bind:value={clientUrl} placeholder="Add your json url here" type="text" />
            <button class="bg-[#CC335F] rounded-lg w-fit max-md:mx-auto max-md:mt-3 md:ml-6 p-2 text-white px-4"  on:click={getClientData} >Fetch Data</button>
        </div>
        {#each clientMapping as item,index}
            <div class="flex px-10 py-3">   
                <div class="" >
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}>
                        {#if CustomerData.length}
                            {#each Object.keys(CustomerData[0]) as val}
                                {#if item.from===val || !clientMapping.map(y => y.from).includes(val) }
                                <option value={val} >{val}</option>
                                {/if}
                            {/each}
                        {/if}
                    </select>
                </div>
                <div class="ml-auto">
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.to}>
                        {#each clientList as val}
                        {#if item.to === val || !clientMapping.map(y => y.to).includes(val)}
                        <option>{val}</option>
                        {/if}
                    {/each} 
                    </select>
                </div>
                <button on:click={()=> removeClientMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
            </div>
        {/each} 
        {#if CustomerData.length}
            <button class="text-primary-fg  ml-10 my-6" in:fade out:fade  on:click={addClientMapping} >Add Mapping</button>
        {/if}

    {:else} 
    <div class="bg-secondary-bg flex flex-col m-3 p-6">
        {#each Terms as item,index}
            <div class="flex pb-2 mt-5">
                <span class="self-center  mr-2">{index+1}.</span>
                <input type="text" bind:value={item} class="focus:outline-none w-full border-b border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]">
                <button class="ml-2" on:click={()=>removeTerm(index) } ><img src={Cross} alt="cross"/></button>
                {#if Terms.length -1 > index }
                    <button on:click={()=> swapTerms(index)} class="ml-2"><img src={Down} alt="down"/></button>
                {/if}
                {#if index > 0}
                    <button on:click={()=> swapTerms(index -1)} class="ml-2"><img src={Up} alt="up"/></button>
                {/if}
            </div>
        {/each}
        <button class="text-primary-fg ml-2 my-6 mr-auto" on:click={addTerms} >Add Terms</button>
    </div>

    {/if} 
</div>
