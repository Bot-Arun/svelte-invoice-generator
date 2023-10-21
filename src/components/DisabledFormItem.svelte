<script lang='ts'>
    import { setting} from "../store/SettingsStore";
    import { type FormItemType } from "../store/FormStore";
    export let item :FormItemType ;
    export let data :FormItemType[]
    export let index :number;
    let image :HTMLImageElement;
    $:if (item.file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target?.result as string;
        };

        reader.readAsDataURL(item.file);
    }
</script>

<div class=" p-4 bg-secondary-bg break-inside-avoid">
    <div class="flex text-sm text-black">
        <div class="w-[35%] p-1 flex">
            <div class="relative w-full">
                <div class="flex">
                    <span class="-left-2 self-center max-md:text-xl absolute max-sm:-left-4 max-md:-left-6">{index+1}. </span>
                    <div class=" rounded-none pl-2 focus:outline-none border-0 bg-inherit py-2 pr-2 w-full">{item.name}</div>
                </div>
                
            </div>
        </div>
        <div class=" flex-1 p-1 flex ">
            <input disabled class=" rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-full"  type="number" min="1" value={item.quantity} >
        </div>

        <div class=" flex-1 p-1 flex"> <span class="self-center pr-1">₹</span>
            <input disabled class="rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-full" type="text" value={item.price} >
        </div>
        {#if $setting.discount}
            <div class="flex-1 p-1 flex">
                <div class="rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-fit " >
                {item.discount} {item.discountType}
                </div>
            </div>
        {/if}
        {#if $setting.GST}
            <div class="flex-1 p-1 flex">
                <div class="rounded-none focus:outline-none py-2 pr-2 w-full"><span class="self-center pr-1">{item.gst} %</span>
                </div>
            </div>
        {/if}
        <div class="flex-1 p-1 flex">
            <input disabled class="rounded-none focus:outline-none bg-inherit py-2 pr-2 w-full" type="text" value={item.total} >
        </div>
    </div>
    <div class="mt-5 flex ">
        {#if $setting.thumbnail}
            <div class="flex mr-5">
                {#if item.file !==null}
                    <img bind:this={image} class="h-28 w-28 ml-4" alt="Thumbnail"  />
                {/if}
            </div>

        {/if}
        {#if $setting.description && item.description }
        <div class="flex">
            <div class=" w-[550px] focus:outline-none border-0 bg-inherit border-[#B7C2D3FF] mx-2 h-28 rounded-lg py-5" >
                {item.description}
            </div>

        </div>
        {/if}
    </div>
</div>