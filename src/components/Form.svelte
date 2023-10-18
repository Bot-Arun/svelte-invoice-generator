<script lang='ts'>
    import { type FormItemType } from '../store/FormStore';
    import {setting} from '../store/SettingsStore'
    import FormItem from './FormItem.svelte';

    export let data:FormItemType[] ;
    function handleInsertLast() {
        const value = {
            discount:0,
            discountType:'%',
            type:'',
            file:null,
            gst:0,
            name:'',
            price:0,
            quantity:1,
            total:0,
         }
        data = [...data,value];
    }
    let innerWidth:number;
</script>

<svelte:window bind:innerWidth />
<div>
    <div>
        <div class="flex text-sm rounded-t text-white p-4 bg-primary-bg">
        <div class="w-[35%]">
            Item
        </div>
        {#if innerWidth >= 768}
            <div class="flex-1">
                 Type
            </div>
            <div class="flex-1">
                Qty
            </div>
            <div class="flex-1">
                Price
            </div>
            {#if $setting.discount}
            <div class="flex-1">
                Discount
            </div>
            {/if}
            {#if $setting.GST}
            <div class="flex-1">
                GST
            </div>
            {/if}
            <div class="flex-1">
                Total
            </div>
            <div class="w-10">
                
            </div>
        {/if}
        </div>
    </div>

{#each data as item,index }
    <FormItem bind:item={item} {index} bind:data={data} ></FormItem>
{/each}

<button on:click={handleInsertLast} class="flex justify-center w-full mt-3  focus:bg-[#e5ecf7] p-3 border-dashed bg- border-violet-300 my-border border-r-0 bg-secondary-bg hover:bg-gray-100 text-sm text-primary-fg font-semibold" >ADD NEW LINE ITEM</button>

</div>


<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
    }
</style>