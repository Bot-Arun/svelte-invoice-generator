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
                    <div class="border-b border-gray-400 rounded-none pl-2 focus:outline-none border-0 bg-inherit py-2 pr-2 w-full">{index+1}. {item.name}</div>
                </div>
            </div>
        </div>
        <div class=" flex-1 p-1 flex ">
            <input disabled class="border-b border-gray-400 rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-full"  type="number" min="1" value={item.quantity} >
        </div>

        <divd class=" flex-1 p-1 flex"> 
            <div class="border-b border-gray-400 rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-full">
                ₹ {item.price}
            </div>
        </divd>
        {#if $setting.discount}
            <div class="flex-1 p-1 flex">
                <div class="border-b border-gray-400 rounded-none focus:outline-none border-0 bg-inherit py-2 pr-2 w-full " >
                {item.discount} {item.discountType}
                </div>
            </div>
        {/if}
        {#if $setting.GST}
            <div class="flex-1 p-1 flex">
                <div class="border-b border-gray-400 rounded-none focus:outline-none py-2 pr-2 w-full"><span class="self-center pr-1">{item.gst} %</span>
                </div>
            </div>
        {/if}
        <div class="flex-1 p-1 flex">
            <input disabled class="border-b border-gray-400 rounded-none focus:outline-none bg-inherit py-2 pr-2 w-full" type="text" value={item.total} >
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
            <div class="w-[550px] focus:outline-none border p-4 border-gray-400 bg-inherit border-[#B7C2D3FF] mx-2 min-h-[60px] rounded-md py-5" >
                {item.description}
            </div>

        </div>
        {/if}
    </div>
</div>