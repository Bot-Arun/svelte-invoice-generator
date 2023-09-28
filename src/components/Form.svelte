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
        <div class="flex text-sm text-white p-4 bg-[#221148]">
        <div class="w-[35%]">
            Item
        </div>
        <div class="w-[10%]">
            Type
        </div>
        <div class="w-[10%]">
            Qty
        </div>
        <div class="w-[10%]">
            Price
        </div>
        <div class="w-[10%]">
            Discount
        </div>
        <div class="w-[10%]">
            GST
        </div>
        <div class="w-[10%]">
            Total
        </div>
    </div>
</div>

{#each data as item,index }
    <FormItem bind:item={item} {index} bind:data={data} ></FormItem>
{/each}

<button on:click={handleInsertLast} class="flex justify-center w-full mt-3  focus:bg-[#e5ecf7] p-3 border-dashed bg- border-violet-300 my-border border-r-0 bg-[#F8FAFF] hover:bg-gray-100 text-sm text-[#6C40D1] font-semibold" >ADD NEW LINE ITEM</button>

</div>


<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
    }
</style>