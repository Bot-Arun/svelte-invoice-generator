<script lang='ts'>
    import { type FormItemType } from '../store/FormStore';
    import {setting} from '../store/SettingsStore'
  import DisabledFormItem from './DisabledFormItem.svelte';

    export let data:FormItemType[] ;
    
</script>
<div class="mt-8">
    <div class="flex text-sm rounded-t text-white p-4 bg-primary-bg">
        <div class="w-[35%]">
            Item
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
    </div>
</div>

{#each data.filter( x => x.name !== '') as item,index }
    <DisabledFormItem bind:item={item} {index} bind:data={data} ></DisabledFormItem>
{/each}


