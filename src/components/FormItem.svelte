<script lang='ts'>
  import { setting, type FormItemType} from "../store";

  import Plus from '../assets/plus.svg'
    import Cross from '../assets/cross.svg'
    import Up from '../assets/up.svg'
    import Down from '../assets/down.svg'
    export let item :FormItemType ;
    export let data :FormItemType[]
    export let index :number;
    $:{
        if(item.discountType === '₹') {
            item.total = Math.round(((item.price *(1+ item.gst/100)) - item.discount )* item.quantity) ;
        }
        else {
            item.total = Math.round(((item.price *( 1+ (item.gst/100)))*(1-( item.discount)/100))* item.quantity) ;
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
            type:'',
            gst:0,
            name:'',
            price:0,
            quantity:1,
            total:0,
        })
        data = [...data];
    }

  let countries = [
    {
      name: "United States",

      iso_3: "USA",

      phone_code: "+1",
    },

    {
      name: "United Kingdom",

      iso_3: "GBR",

      phone_code: "+44",
    },

    {
      name: "Türkiye",

      iso_3: "TUR",

      phone_code: "+90",
    },
  ];
  let ind = 0;
  let next: HTMLInputElement | null = null
  let filterdArray : any[] =[];
  let focus =false ;
  $:console.log(ind)
  $: filterdArray, ind = 0 ;
  function counputeDiscount(value:number) {
        if(item.discountType == '₹') {
            item.discount = (item.price + item.price*item.gst/100) - (value/ item.quantity)
        }
        else if(item.price) {
            item.discount = Math.round((item.gst - 100*((value / (item.quantity*item.price)) - 1) ))
        }
        else {
            item.discount = 0;
        }
        console.log('done')
    }
  $: {
    filterdArray = countries.filter( x => x.name.toLocaleLowerCase().startsWith(item.name.toLocaleLowerCase())&& x.name.toLocaleLowerCase() !== item.name.toLocaleLowerCase() && item.name!=='') ;
    }
  function changeFocus(key:number) {
    if (key===40 && filterdArray.length >0)
    ind = Math.min(filterdArray.length-1,ind+1);
    else if (key===38)
    ind = Math.max(0,ind-1);
    else if (key===13) {
      item.name = filterdArray[ ind].name;
      next.focus();
    }
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
            <div class="relative w-full">
                <div class="flex">
                    <span class="self-center">{index+1}.</span> 
                    <input class=" pl-2 focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" bind:value={item.name} on:focusin={()=> focus = true} on:focusout={ ()=> setTimeout(()=> focus = false,500) }  on:keydown={(e)=>changeFocus(e.keyCode)}  type="text">
                </div>
                {#if focus && filterdArray.length && $setting.autoMode}
                    <div class="absolute border-2 bg-white w-full">
                        {#each filterdArray as item,index}
                            <div class:bg-gray-200={index==ind} class="p-2 " on:click={()=> {item.name = item.name;next.focus();}} >{item.name}</div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div class=" w-[10%] p-1 flex">
            <input  bind:this={next}  class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="text" min="1" bind:value={item.type} >
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full"  type="number" min="1" bind:value={item.quantity} >
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
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" bind:value={item.gst} ><span class="self-center pr-1">%</span>
        </div>
        <div class=" w-[10%] p-1 flex">
            <input class="focus:outline-none border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9] bg-inherit py-2 pr-2 w-full" type="number" on:change={(e)=>counputeDiscount(e.target?.value ?? 0)} value={item.total} >
        </div>
        <button on:click={handleDelete} class=" w-[5%] p-1">
            <img src={Cross} alt="">
        </button>
    </div>
    <div class=" mt-5 flex">
        {#if $setting.showThumbnail}
             <button class="my-border focus:bg-[#e5ecf7] hover:bg-gray-100 h-28 p-5 text-[#6C40D1] break-words w-36 text-center">Add Thumbnail</button>
             <!-- <input type="file"  id='files' class="hidden"/> -->
        {/if}
        {#if $setting.showDesc}
            <textarea class="w-[450px] ml-4 focus:outline-none bg-inherit border-2 mx-2 h-28 rounded-lg p-5" placeholder="Add description" />
        {/if}
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