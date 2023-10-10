<script lang="ts">
  import { Link } from "svelte-routing";
  import back from '../assets/back.svg'
  import {setting} from '../store'
</script>


<div class="bg-[#f3f5f7] min-h-screen pt-20">
  <div class="fixed ml-20">
  <Link to='/'><img src={back} alt=""></Link> 
  </div>
  <main class="justify-center p-10 flex-col mx-auto w-[1024px] bg-white flex ">
    <div class="text-4xl font-semibold">
      SETTINGS
    </div>
    <div class="flex my-10 bg-[#f8faff] px-10">
      <div class=" w-1/2 p-10">
        <div class="font-semibold pb-3">FORM SETTINGS</div>
        <div class="flex mt-4">
          <input type="checkbox" bind:checked={$setting.discount} >
          <div class="ml-4">Include item discouont</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.GST}>
          <div class="ml-4">Include item GST</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.thumbnail}>
          <div class="ml-4">Include item image thumbnail</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.description}>
          <div class="ml-4">Include item description</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.additionalNotes}>
          <div class="ml-4">Include additional notes</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.attachments}>
          <div class="ml-4">Include attachments</div>
        </div>
      </div>
      <div class="bg-[#f8faff] w-1/2 my-10 border-l-gray-200 border-l-2 px-10">
        <div class="font-semibold pb-3">THEME SETTINGS</div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">Primary Color</div>
          <input id="primary" type="color" >
        </div>
        <div class="flex mt-2 justify-between">
          <div class="mr-4">Secondary Color</div>
          <input id="primary" type="color" >
        </div>
        <div class="flex mt-2 justify-between">
          <div class="mr-4">CTA Color</div>
          <input id="primary" type="color" >
        </div>
        
      </div>
    </div>
  </main>
</div>

