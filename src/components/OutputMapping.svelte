<script lang="ts">
  import { fade } from "svelte/transition";
    import Cross from '../assets/cross.svg';
  import { formData } from "../store/FormStore";
  import { clientInfo, template, variables } from "../store/SettingsStore";
  import App from "../App.svelte";
    let tab :"item"|"form" = 'form';
    let itemList = ['item','qty','price','GST','total','description'];
    let formList = ['formNo','totalAmount',...$formData.deductions.map(x => x.name),...$formData.aditionalCharges.map(x => x.name),...$variables.map(x => x.name),...Object.keys($clientInfo)].filter(x => x!== '')
    export let formMapping:any = []
    function addFormItemMapping() {
        formMapping.push({from:'',to:''})
        formMapping = [...formMapping];
    }
    function removeFormItemMapping(index:number) {
        formMapping.splice(index,1)
        formMapping = [...formMapping];
    }
    export let itemMapping:any = []
    function addItemMapping() {
        itemMapping.push({from:'',to:''})
        itemMapping = [...itemMapping];
    }
    function removeItemMapping(index:number) {
        itemMapping.splice(index,1)
        itemMapping = [...itemMapping];
    }
</script>

<div class="bg-secondary-bg">
    <div class="p-3 sm:p-4 max-sm:text-xs max-md:text-sm bg-primary-bg rounded-t-lg font-semibold flex">
    <button class=" hover:text-white {tab=='form'?'text-white':'text-gray-500'}" on:click={()=> tab = 'form'} >FORM INFORMATION</button>
    <button class="hover:text-white {tab=='item'?'text-white':'text-gray-500'} ml-1 sm:ml-5 md:ml-10" on:click={()=> tab = 'item'} >ITEM INFORMATION</button>
    </div>
    {#if tab == 'form'}
    <div class="bg-secondary-bg flex max-md:flex-col m-3 p-6">
        <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" placeholder="After creating template your GoogleSheet Form url will appear here" disabled type="text" value={$template.dataUrl}  />
    </div>
        {#each formMapping as item,index}
            <div class="flex px-10 py-3">   
                <div class="" >
                    {#if item.from === 'formNo' }
                        <input disabled class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}/>
                    {:else}
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}>
                    {#if formList.length}
                        {#each formList as val}
                            {#if item.from===val || !formMapping.map(y => y.from).includes(val) }
                            <option value={val} >{val}</option>
                            {/if}
                        {/each}
                    {/if}
                    </select>
                    {/if}
                </div>
                <div class="ml-auto">
                    <input
                        class=" focus:outline-none border-b pb-2 w-60 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                        bind:value={item.to}
                        placeholder=" Choose value "
                        type="text"
                        />
                </div>
                <button on:click={()=> removeFormItemMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
            </div>
        {/each}     
        {#if formList.length - formMapping.length}
            <button class="text-primary-fg  ml-10 my-6" in:fade out:fade  on:click={addFormItemMapping} >Add Mapping</button>
        {/if}
    {:else if  tab === 'item'}
    <div class="bg-secondary-bg flex max-md:flex-col m-3 p-6">
        <input class="bg-inherit flex-1 border focus:outline-none rounded-lg p-2" placeholder="After creating template your GoogleSheet Form url will appear here" disabled value={$template.dataUrl} type="text" />
    </div>
        {#each itemMapping as item,index}
            <div class="flex px-10 py-3">   
                <div class="" >
                    {#if item.from === 'formNo' }
                        <input disabled class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}/>
                    {:else}
                    <select class="max-sm:w-20 sm:w-28 md:w-60 text-lg focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit p-2" bind:value={item.from}>
                    {#if itemList.length}
                        {#each itemList as val}
                            {#if item.from===val || !itemMapping.map(y => y.from).includes(val) }
                            <option value={val} >{val}</option>
                            {/if}
                        {/each}
                    {/if}
                    </select>
                    {/if}
                </div>
                <div class="ml-auto">
                    <input
                        class=" focus:outline-none border-b pb-2 w-60 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                        bind:value={item.to}
                        placeholder=" Choose value "
                        type="text"
                        />
                </div>
                <button on:click={()=> removeItemMapping(index) } class="ml-4"> <img src={Cross} alt=""> </button>
            </div>
        {/each}     
        {#if itemList.length - itemMapping.length}
            <button class="text-primary-fg  ml-10 my-6" in:fade out:fade  on:click={addItemMapping} >Add Mapping</button>
        {/if}
        
    {/if} 
</div>
