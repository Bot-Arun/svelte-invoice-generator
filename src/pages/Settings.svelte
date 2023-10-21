<script lang="ts">
  import { Link } from "svelte-routing";
  import back from '../assets/back.svg'
  import DataMapping from "../components/DataMapping.svelte";
  import {setting,variables,themeColors} from '../store/SettingsStore'
  import Cross from '../assets/cross.svg'
  import { fade, fly } from "svelte/transition";
  let ind = 0 ;
  let tempVariableName = '';
  export let error = ''
  const setError = (msg:string) =>  {
    error = msg;
    setTimeout(()=> error = '',3000)
  }
  function addNewVariable() {
    $variables = [...$variables,['',['']]]
  }
  function newVariable(code:string,index:number) {
    if(code=="Enter") {
      $variables[index][0] = tempVariableName ;
      $variables[index] = [...$variables[index]]
      $variables = [...$variables]
    }
  }

  function removeVariable(index:number) {
    if($variables.length>1)
    $variables.splice(index,1);
    else 
    $variables[0] = ['',['']]
    $variables = [...$variables]
  }

  function addValue (index:number) {
    $variables[index][1].push('') ;
    $variables[index] = [...$variables[index]]
    $variables = [...$variables]
  }
  function removeValue (index:number) {
    $variables[ind][1].splice(index,1);
    $variables[ind] = [...$variables[ind]]
    $variables = [...$variables]
  }

  $: $variables,$variables.length -1 < ind? ind-=1 :ind

</script>

<div class=" flex bg-[#f3f5f7] md:py-32">
  <div class="fixed top-5 right-5 md:left-10 md:top-10">
  <button on:click={()=> history.back()}><img src={back} alt=""></button> 
  </div>
  <main class="text-black justify-center px-4 md:px-10 py-10 flex-col mx-auto shadow-lg w-[1024px] bg-white flex ">
    <div class="text-4xl font-semibold">
      SETTINGS
    </div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
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
      <div class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10"> 
        <div class="font-semibold pb-3">THEME SETTINGS</div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary foreground Color</div>
          <input bind:value={$themeColors.primaryFg} id="primary" type="color" >
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary background Color</div>
          <input bind:value={$themeColors.primaryBg} id="primary" type="color" >
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary foreground Color</div>
          <input bind:value={$themeColors.secondaryFg} id="primary" type="color" >
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary background Color</div>
          <input bind:value={$themeColors.secondaryBg} id="primary" type="color" >
        </div>
        
      </div> 
    </div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
        <div class="flex">
          <div id='variable' class="font-semibold pb-3">CUSTOM VARIABLES</div>
          <button class="ml-auto text-primary-fg" on:click={addNewVariable} >+ Add new variable</button>
        </div>
        {#each $variables as item,index}
          <div class="flex mt-4">
            {#if item[0] === ''}
              <button on:click={()=> removeVariable(index)}><img src={Cross} alt=""></button>
              <input class="ml-2 focus:outline-none  border-b pb-2 w-60 border-gray-400 focus:border-primary-fg bg-inherit placeholder-[#B7C2D3]" placeholder="Variable Name" bind:value={tempVariableName} on:keydown={(e)=>newVariable(e.code,index)}  on:focusout={()=>newVariable("Enter",index)} type="text">
            {:else}
              <button on:click={()=> removeVariable(index)}><img src={Cross} alt=""></button>
              <button class="flex ml-4  {ind===index ? 'text-primary-fg':''}" on:focusin={()=>ind = index} >
                {item[0]} ({item[1].length})
              </button>
              <div class="ml-auto text-primary-fg {ind===index?'visible':'hidden'}">{'>'}</div>
            {/if}
          </div>
        {/each}
        
      </div>
      <div class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10">
        <div class="flex">
          <div class="font-semibold pb-3">VALUES</div>
          <button class="ml-auto text-primary-fg" on:click={()=>addValue(ind)} >+ Add new value</button>
        </div>
        {#each  $variables[ind][1]  as item,index}
           <div class="flex mt-3">
            <span class="self-center mr-2">{index+1}.</span>
            <input class=" focus:outline-none  border-b pb-2 w-60 border-gray-400 focus:border-primary-fg bg-inherit placeholder-[#B7C2D3]" bind:value={item} placeholder=" Choose value {index+1}" type="text"> <button class="ml-auto" on:click={()=>removeValue(index)} > <img src={Cross} alt=""> </button>
            </div>            
        {/each}
      </div>
    </div>
    <div>
      <div class="my-5 text-4xl font-semibold">
        DATA MAPPING
      </div>
      <DataMapping {setError}/>
    <div class="flex mt-10"><button class="mx-auto px-6 py-2 bg-[#CC335F] rounded-lg text-base text-white">SAVE CHANGES</button> </div>
    <div class="text-center font-semibold my-10">Powered by NiForms</div>
    </div>
    {#if error}
    <div class=" flex justify-center">
      <div in:fly out:fade class="alert alert-error w-[50%] fixed bottom-5 ">
        <button on:click={()=>error = ''}>
          <svg  xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>  
        <span>{error}</span>
      </div>
    </div>
    {/if}
  </main>
</div>

