<script lang='ts'>
    import { onMount } from 'svelte';
    import Add from '../assets/add.svg'
    import {type FormItemType } from '../store';
    import FormItem from './FormItem.svelte';

    export let data:FormItemType[] ;
    onMount(()=>{
        console.log(data)
    })
    function handleInsertLast() {
        const value = {   
            discount:0,
            discountType:'%',
            name:'',
            price:0,
            quantity:0,
            total:0,
         }
        data = [...data,value];
    }
</script>

<div>
    <div>
        <div class="flex text-sm text-white p-4 bg-[#733dd9] rounded-t-md">
        <div class="w-[37.5%]">
            Item
        </div>
        <div class="w-[12.5%]">
            Quandity
        </div>
        <div class="w-[12.5%]">
            Rate
        </div>
        <div class="w-[12.5%]">
            Discount
        </div>
        <div class="w-[12.5%]">
            Amount
        </div>
    </div>
</div>

{#each data as item,index }
    <FormItem bind:item={item} {index} bind:data={data} ></FormItem>
{/each}

<button on:click={handleInsertLast} class="flex justify-center w-full  focus:bg-[#e5ecf7] p-3 border-dashed bg- border-violet-300 rounded-md border bg-[#f7faff] hover:bg-gray-100 text-sm text-[#617183]"> <img src={Add} class="mr-2 self-center"  alt="loading"> <span > Add New Line</span></button>

</div>