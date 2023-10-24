<script lang='ts'>
    import { setting, productData} from "../store/SettingsStore";
    import { type FormItemType } from "../store/FormStore";
    import Cross from '../assets/cross.svg'
    import Up from '../assets/up.svg'
    import Down from '../assets/down.svg'
    export let item :FormItemType ;
    export let data :FormItemType[]
    export let index :number;
    export let validate:boolean;
    let input :HTMLInputElement;
    let image :HTMLImageElement;

    $:if (item.file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target?.result as string;
        };

        reader.readAsDataURL(item.file);
    }   
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
            gst:0,
            file:null,
            name:'',
            price:0,
            description:'',
            quantity:1,
            total:0,
        })
        data = [...data];
    }
    function swapItem(index:number) {
        let temp = data[index];
        data[index] = data[index+1];
        data[index +1] = temp;
        data = [...data];
    }
    function onThumbnailChange() {
        item.file = input.files ? input.files[0]:null;
		
        if (item.file) {
            const reader = new FileReader();
            reader.addEventListener("load", function () {
                image.setAttribute("src", reader.result as string);
            });
            reader.readAsDataURL(item.file);
            return;
        } 
    }
  
  let ind = 0;
  let next: HTMLInputElement ;
  let filterdArray : any[] =[];
  let focus =true ;
  $: filterdArray, ind = 0 ;
  function computeDiscount(value:number) {
        if($setting.discount===false)
            return
        if(item.discountType == '₹') {
            item.discount = (item.price + item.price*item.gst/100) - (value/ item.quantity)
        }
        else if(item.price) {
            item.discount = Math.round((item.gst - 100*((value / (item.quantity*item.price)) - 1) ))
        }
        else {
            item.discount = 0;
        }
    }
  $: {
    filterdArray = $productData.filter( x => x.name && x.name.toLocaleLowerCase().startsWith(item.name.toLocaleLowerCase())&& x.name.toLocaleLowerCase() && item.name!=='') ;
    }
  function changeFocus(code:string) {
    if (code==="ArrowDown" && filterdArray.length >0)
    ind = Math.min(filterdArray.length-1,ind+1);
    else if (code==="ArrowUp")
    ind = Math.max(0,ind-1);
    else if (code==="Enter") {
      item.name = filterdArray[ ind].name ?? '';
      item.discount = filterdArray[ ind].discount ?? 0;
      item.gst = filterdArray[ ind].gst ?? 0;
      item.price = filterdArray[ind].price ?? 0 ;   
      next.focus();
    }
}
let innerWidth:number;
</script>

<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>

<svelte:window bind:innerWidth />
<div class=" p-4 bg-secondary-bg max-md:mb-4">
    <div class="flex max-md:flex-col max-sm:px-2 max-md:px-6 text-sm text-black">
        <div class=" md:w-[35%] p-1 flex">
            <div class="relative w-full">
                <div class="flex">
                    <span class="-left-2 self-center max-md:text-xl absolute max-sm:-left-4 max-md:-left-6">{index+1}. </span> 
                    <button on:click={handleDelete} class="absolute -right-3 md:hidden ">
                        <img src={Cross} alt="">
                    </button>
                    <div class="self-center md:hidden max-sm:w-32 max-md:w-60 text-lg">Item</div>
                    <input class="rounded-none pl-2 focus:outline-none border-b {validate&& item.name.length ===0 ?'border-red-600':'border-gray-400 focus-border-primary-fg'} bg-inherit py-2 pr-2 w-full" bind:value={item.name} on:focusin={()=> focus = true} on:focusout={ ()=> setTimeout(()=> focus = false,500) }  on:keydown={(e)=>changeFocus(e.code)}  type="text">
                </div>
                {#if focus && filterdArray.length }
                    <div class="absolute flex flex-col border mt-1 border-gray-400 bg-white w-full">
                        {#each filterdArray.slice(0,5) as value,index}
                            <button tabindex="-1" class="p-2 text-left {index === filterdArray.slice(0,5).length -1?'':'border-b' } border-gray-300 {index==ind?" bg-primary-bg text-white":"bg-secondary-bg"}" on:mouseenter={()=> ind = index}  on:click={()=> changeFocus("Enter")} >{value.name}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <div class=" flex-1 p-1 flex max-md:mt-5">
            <div class="self-center md:hidden max-md:w-32 text-lg">Quandity</div>
            <input bind:this={next} class="rounded-none focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full"  type="number" min="1" bind:value={item.quantity} >
            {#if innerWidth < 768 && innerWidth >= 640 }
                <div class="self-center md:hidden max-md:w-32 text-lg ml-5">Price</div>
                <span class="self-center pr-1">₹</span>
                <input class="rounded-none focus:outline-none border-b  border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full " type="text" bind:value={item.price} >
            {/if}
        </div>

        {#if innerWidth >= 768 || innerWidth < 640}
            <div class=" flex-1 p-1 flex"> <span class="self-center pr-1">₹</span>
                <input class="rounded-none focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full" type="text" bind:value={item.price} >
            </div>
        {/if}
        {#if $setting.discount}
            <div class="flex-1 p-1 max-md:ml-auto  max-sm:w-full max-md:w-1/2 max-md:mt-8 flex">
                <div class="self-center md:hidden max-md:w-32 text-lg">Discount</div>
                <input class="rounded-none focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full " type="number" bind:value={item.discount}>
                <select class="focus:outline-none border-b max-md:w-10 border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit" bind:value={item.discountType} >
                    <option class="" value="%">%</option>
                    <option value="₹">₹</option>
                </select>
            </div>
        {/if}
        {#if $setting.GST}
            <div class="flex-1 p-1 max-md:ml-auto max-sm:w-full max-md:w-1/2 max-md:mt-8 flex">
                <div class="self-center md:hidden max-md:w-32 text-lg">GST</div>
                <input class="rounded-none focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full" type="number" bind:value={item.gst} ><span class="self-center pr-1">%</span>
            </div>
        {/if}
        <div class="flex-1 p-1 max-md:ml-auto max-sm:w-full max-md:w-1/2 max-md:mt-8 flex">
            <div class="self-center md:hidden max-md:w-32 text-lg">Total</div>
            <input class="rounded-none focus:outline-none border-b border-gray-400 hover:border-primary-fg focus-border-primary-fg bg-inherit py-2 pr-2 w-full" type="text" on:change={(e)=>computeDiscount(e.target?.value ?? 0)} value={item.total} >
        </div>
        <button on:click={handleDelete} class="max-md:hidden w-[5%] p-1">
            <img src={Cross} alt="">
        </button>
    </div>
    <div class="max-sm:px-2 max-md:px-10 mt-5 flex max-md:flex-col">
        {#if $setting.thumbnail}
            <div class="flex mr-12">
                <div class="self-center md:hidden max-md:w-32 text-lg">Thumbnail</div>
                {#if item.file !== null}
                    <img bind:this={image} class="h-28 w-28 ml-4" alt="Thumbnail"  />
                    <button on:click={()=> item.file = null} class="self-start w-[25px] -mt-3">
                        <img src={Cross} alt="">
                    </button>
                {:else}
                    <input bind:this={input} accept="image/png, image/jpeg" on:change={onThumbnailChange} type="file"  id='files' class="hidden"  />
                    <label for='files' class="my-border focus:bg-[#e5ecf7] hover:bg-gray-100 h-28 p-5 text-primary-fg break-words w-36 text-center flex"> <span class="self-center"> Add Thumbnail</span></label>
                {/if}
            </div>

        {/if}
        {#if $setting.description}
        <div class="flex">
            <textarea bind:value={item.description} class=" max-md:w-full md:w-[350px] lg:w-[450px] xl:w-[550px] max-md:mx-auto max-md:my-5 focus:outline-none bg-inherit border-[1.5px] border-[#B7C2D3FF] focus-border-primary-fg mx-2 h-28 rounded-lg p-5" placeholder="Add description" />
        </div>
        {/if}
        <div class=" max-md:mx-auto max-md:my-5 md:ml-auto flex">
            <button class="text-sm text-primary-fg opacity-70 hover:opacity-100 font-medium hover:cursor-pointer" on:click={()=> handleInsertAt(index+1)} >Insert an item below</button>
            {#if index +1 < data.length}
            <!-- <button class=" mr-2"></button> -->
            <div class="mr-2 flex " >
                <button on:click={()=> swapItem(index)} ><img src={Down} class="ml-2 opacity-70 hover:opacity-100" alt=""></button>
            </div>
            {/if}
            {#if index > 0}
            <div class="mr-2 flex">
                <button on:click={()=>swapItem(index-1)} ><img src={Up} class="opacity-70 hover:opacity-100 " alt=""></button>
            </div>
            {/if}
        </div>
    </div>
</div>