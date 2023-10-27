<script lang="ts">
    import Cross from '../assets/cross.svg'
  import type { UploadFile } from '../store/FormStore';

    export let className:string ="h-[100px] w-[300px]"; 
    export let file :UploadFile;
    export let text:string;
    export let isImage = false;
    let input:HTMLInputElement;
    let inputId: string = `file-input-${Math.random().toString(36).substring(7)}`;
    function onFileChange() {
        if( input && input.files) {
            file.file = input.files[0];
        }
    }

</script>

<div class="{className} flex relative">
    {#if file.url !==''}
        <img src={file.url} class="{className}" alt="{file.url}"  />
        {#if !isImage}
        <button on:click={()=> {file.url = ''}} class="self-start w-10 absolute  -mt-2 ">
            <img src={Cross} alt="">
        </button>
        {/if}
    {:else if  file.file !== null}
        <img src={URL.createObjectURL(file.file)} class="{className}" alt="{file.url}"  />
        {#if !isImage}
        <button on:click={()=> {file.file = null}} class="self-start w-10 absolute  -mt-2 ">
            <img src={Cross} alt="">
        </button>
        {/if}
    {:else}    
        <input bind:this={input} id={inputId} on:change={onFileChange} accept="image/png, image/jpeg, image/svg+xml"  type="file" class="hidden"  />
        <label for={inputId} class="{className} p-5 flex-1 my-border w-full focus:bg-secondary-bg hover:bg-gray-100 text-primary-fg break-words justify-center text-center flex"> <span class="self-center font-semibold">{text}</label>
    {/if}
</div>

<style>
    .my-border {
            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23B7C2D3FF' stroke-width='3' stroke-dasharray='7%2c15' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
            border-radius: 20px;
        }
    </style>