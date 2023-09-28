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

<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>

<div class=" p-4 bg-[#F8FAFF]">
    <div class="flex text-sm text-black">
        <div class=" w-[35%] p-1 flex">
           <span class="self-center">{index+1}.</span> <input class=" pl-2 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" bind:value={item.name} type="text">
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" min="1" bind:value={item.quantity} >
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" min="1" bind:value={item.quantity} >
        </div>
        <div class=" w-[10%] p-1 flex"> <span class="self-center pr-1">₹</span>
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" bind:value={item.price} >
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit pl-2 w-full" type="number" bind:value={item.discount}>
            <select class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit" bind:value={item.discountType} >
                <option class="" value="%">%</option>
                <option value="₹">₹</option>
            </select>
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" bind:value={item.price} ><span class="self-center pr-1">%</span>
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" bind:value={item.total} >
        </div>
        <button on:click={handleDelete} class=" w-[5%] p-1">
            <img src={Cross} alt="">
        </button>
    </div>
    <div class="items-center mt-5 flex">
        <button class="my-border focus:bg-[#e5ecf7] hover:bg-gray-100 p-5 py-8 text-[#6C40D1] break-words w-36 text-center">Add Thumbnail</button>
        <!-- <input type="file"  id='files' class="hidden"/> -->
        <textarea class="w-[450px] ml-4 focus:outline-none bg-inherit border-2 m-2 h-28 rounded-lg p-5" placeholder="Add description" />
        <div class="ml-auto flex">
            {#if index +1 < data.length}
            <!-- <button class=" mr-2"></button> -->
            <button class="mr-2 flex opacity-70 hover:opacity-100" on:click={()=>handleInsertAt(index+1)} ><span class="text-sm text-[#617183] hover:text-black">Insert an item below</span><img src={Down} class="ml-2  " alt=""></button>
            {/if}
            {#if index > 0}
            <button class="mr-2 flex" on:click={()=>handleInsertAt(index)} ><img src={Up} class="opacity-70 hover:opacity-100 " alt=""></button>
            {/if}
        </div>
    </div>
</div>