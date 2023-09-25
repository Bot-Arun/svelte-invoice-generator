<script lang='ts'>
  import type { FormItemType } from "../store";

  import Plus from '../assets/plus.svg'
    import Cross from '../assets/cross.svg'
    import Up from '../assets/up.svg'
    import Down from '../assets/down.svg'
    export let item :FormItemType ;
    export let data :FormItemType[]
    export let index :number;
    $:{
        if(item.discountType === '₹') {
            item.total = (item.price - item.discount )* item.quantity ;
        }
        else {
            item.total = (item.price - item.price*(item.discount /100) )* item.quantity ;
        }
    }
    function handleDelete() {
        data.splice(index,1);
        data = [...data]
    }
    function handleInsertAt(i:number) {
        data.splice(i,0,{
            discount:0,
            discountType:'%',
            name:'',
            price:0,
            quantity:0,
            total:0,
        })
        data = [...data];
    }
</script>

<div class=" p-4 mb-2 bg-[#f7faff]">
    <div class="flex text-sm text-black">
        <div class=" w-[37.5%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" bind:value={item.name} type="text">
        </div>
        <div class=" w-[12.5%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" min="1" bind:value={item.quantity} >
        </div>
        <div class=" w-[12.5%] p-1 flex"> <span class="self-center pr-1">₹</span>
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="text" bind:value={item.price} >
        </div>
        <div class=" w-[12.5%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit pl-2 w-full" type="text" bind:value={item.discount}>
            <select class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit" bind:value={item.discountType} >
                <option class="" value="%">%</option>
                <option value="₹">₹</option>
            </select>
        </div>
        <div class=" w-[12.5%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="text" bind:value={item.total} >
        </div>
        <button on:click={handleDelete} class=" w-[12.5%] p-1">
            <img src={Cross} alt="">
        </button>
    </div>
    <div class="items-center mt-2 flex">
        <button class="flex ml-4  focus:bg-[#e5ecf7] px-6 p-1 border-dashed bg- border-violet-300 rounded-md border bg-[#f7faff] hover:bg-gray-100 text-sm text-[#617183]"> <img src={Plus} class="mr-2" alt="loading">  Upload Thumnail</button>
        <!-- <input type="file"  id='files' class="hidden"/> -->
        
        <button class="flex ml-4  focus:bg-[#e5ecf7] px-6 p-1 border-dashed bg- border-violet-300 rounded-md border bg-[#f7faff] hover:bg-gray-100 text-sm text-[#617183]"> <img src={Plus} class="mr-2" alt="loading">  Add Description</button>
        <!-- <input type="file"  id='files' class="hidden"/> -->
        
        <button class="ml-auto mr-2"><span class="text-sm text-[#617183] hover:text-black">Insert an item below</span></button>
        {#if index > 0}
             <button class="mr-2" on:click={()=>handleInsertAt(index)} ><img src={Up} class="opacity-70 hover:opacity-100 " alt=""></button>
        {/if}
        {#if index +1 < data.length}
            <button class="mr-2" on:click={()=>handleInsertAt(index+1)} ><img src={Down} class="opacity-70 hover:opacity-100 " alt=""></button>
        {/if}
    </div>
</div>