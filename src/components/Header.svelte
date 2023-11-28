<script>

  import { template } from "../store/SettingsStore";
  import FileUpload from "./FileUpload.svelte";
  export let preview = false ;
</script>


<div class="flex justify-between text-white bg-primary-bg py-5">
    <div class=" px-8 py-8 font-light text-sm">
        <div class="text-xl sm:text-3xl  font-bold">{$template.name.toUpperCase()}</div>
        <div class="mt-2 font-semibold tracking-wider ">TC10A22023   |  {new Date().toLocaleDateString('en-GB').split('/').join('-')}   |  V1 </div>
        <div class="mt-2">{$template.business.toUpperCase()}</div>
        <div class="mt-2 text-sm whitespace-break-spaces ">{$template.other}</div>
        <div class="mt-2">Phone no  |  Email address  | GST no</div>
    </div>
    <div class="" > 
    {#if $template.logo.url || $template.logo.file!==null}
        <div class="m-4 mr-10 " >
            <FileUpload className="h-36 w-36" isImage={true} text="temp"  file={$template.logo}  />
        </div>
    {:else if !preview}
        <div class=" text-center my-7 p-5 sm:p-10 flex my-border mr-3 sm:mx-8" > 
            <span class="py-5 self-center sm:text-xl font-light flex-wrap text-lg ">Add Logo</span> 
        </div>
    {/if}
    </div>
</div>

<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E6E6E6FF' stroke-width='3' stroke-dasharray='7%2c 20' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>