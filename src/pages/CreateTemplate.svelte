<script lang="ts">
  import DataMapping from "../components/DataMapping.svelte";
  import Cross from "../assets/cross.svg";
  import { fade, fly } from "svelte/transition";
  import BackButton from "../components/BackButton.svelte";
  import {
    setting,
    variables,
    themeColors,
    record,
    productData,
    template,
    productDataMapping,
    clientDataMapping,
    clientData,
    clientURL,
    itemURL,
    terms,
  } from "../store/SettingsStore";
import { formData } from "../store/FormStore";
import { postData } from "../api/api";
import { navigate } from "svelte-routing";
  let ind = 0;
  async function createTemplate() {
    const result = await postData('/templates/create',{
      "templateName": $template.name,
      "businessName": $template.business,
      "otherInfo": $template.other,
      "settings": {
          "themeName": "string",
          "includeDiscount": $setting.discount,
          "includeGST": $setting.GST,
          "includeItemDescription": $setting.description,
          "includeAdditionalNotes": $setting.additionalNotes,
          "includeAttachments": $setting.attachments
      },
      "customVariables":$variables.map(x =>{
          return {
              "variableName": x.name,
              "variableValues": x.values,
          }
      }),
      "orgId": "OrgID",
      "dataMapping":{
          "clientInformation": {
              "dataUrl": $itemURL,
              "isAuthRequired": false,
              "authDetails": false,
              "mappedData": $clientDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "itemMapping": {
              "dataUrl": $clientURL,
              "isAuthRequired": false,
              "authDetails": {},
              "mappedData": $productDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "terms": $terms.map((x,y) => {
              return {
                  value:x,
                  order:y,
              }
          })
      }
  })
      navigate('/home');
  }
  let tempVariableName = "";
  let error = "";
  const setError = (msg: string) => {
    error = msg;
    setTimeout(() => (error = ""), 3000);
  };
  $: $record = $variables.map((x) => "");

  function addNewVariable() {
    $variables = [...$variables, { name: "", values: [""] }];
  }
  function newVariable(code: string, index: number) {
    if (code == "Enter") {
      $variables[index].name = tempVariableName;
      $variables[index] = { ...$variables[index] };
      $variables = [...$variables];
      ind = $variables.length - 1;
    }
  }

  function removeVariable(index: number) {
    if ($variables.length > 1) $variables.splice(index, 1);
    else $variables[0] = { name: "", values: [""] };
    $variables = [...$variables];
  }

  function addValue(index: number) {
    $variables[index].values.push("");
    $variables[index].values = [...$variables[index].values];
    $variables[index] = { ...$variables[index] };
    $variables = [...$variables];
  }
  function removeValue(index: number) {
    $variables[ind].values.splice(index, 1);
    $variables[ind].values = [...$variables[ind].values];
    $variables[ind] = { ...$variables[ind] };
    $variables = [...$variables];
  }

  $: $variables, $variables.length - 1 < ind ? (ind -= 1) : ind;
</script>
<style>
  .my-border {
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E6E6E6FF' stroke-width='3' stroke-dasharray='7%2c 20' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
      border-radius: 20px;
  }
</style>
<div class=" flex flex-col bg-[#f3f5f7] md:py-32">
  <div class="fixed top-5 right-5 md:left-10 md:top-10">
    <button on:click={() => history.back()}><BackButton /></button>
  </div>
  <main
    class="text-black justify-center px-4 md:px-10 py-10 flex-col mx-auto shadow-lg w-[1024px] bg-white flex"
  >
    <div class="text-4xl font-semibold">TEMPLATE INFO</div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class="flex w-full">
          <div class="p-10  w-1/2">
          <div class="font-semibold pb-3">INFORMATION</div>
              <div class=" mr-20">
              <input
                  bind:value={$template.name}
                  class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                  placeholder="Template name"
                  type="text"
              />
              </div>
              <div class="">
              <input
                  bind:value={$template.business}
                  class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                  placeholder="Business name"
                  type="text"
              />
              </div>
              <textarea
                  bind:value={$template.other}
                  class="rounded-xl h-32 focus-border-primary-fg border-gray-400 focus:outline-none w-full bg-inherit border mt-6 p-5"
                  name=""
                  placeholder="Other information"
                  id=""
                  cols="30"
                  rows="5"
              />
          </div>
          <div class='flex w-1/2'>
              <div class=" bg-black h-32 w-32 text-center  my-7 p-5 sm:p-10 flex my-border mr-3 sm:mx-8" > 
                  <span class="self-center sm:text-xl font-light flex-wrap text-lg ">Add Logo</span> 
              </div>
              <div class="flex-1 mt-5">
              {#if $formData.signature !==null}
                  <img  class="h-28 max-w-60" alt="Thumbnail"  />
                  <button on:click={()=> $formData.signature = null} class="self-start w-10  -mt-3 ">
                      <img src={Cross} alt="">
                  </button>
              {:else}    
                  <input  accept="image/png, image/jpeg"  type="file"  id='sig' class="hidden"  />
                  <label for='sig' class="flex-1 my-border-2 w-full focus:bg-secondary-bg hover:bg-gray-100 h-20 p-2 text-primary-fg break-words mt-10 justify-center text-center flex"> <span class="self-center font-semibold">Add Signature</label>
              {/if}
              </div>
          </div>
      </div>
    </div>
    <div class="text-4xl font-semibold">SETTINGS</div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
        <div class="font-semibold pb-3">FORM SETTINGS</div>
        <div class="flex mt-4">
          <input type="checkbox" bind:checked={$setting.discount} />
          <div class="ml-4">Include item discount</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.GST} />
          <div class="ml-4">Include item GST</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.thumbnail} />
          <div class="ml-4">Include item image thumbnail</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.description} />
          <div class="ml-4">Include item description</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.additionalNotes} />
          <div class="ml-4">Include additional notes</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={$setting.attachments} />
          <div class="ml-4">Include attachments</div>
        </div>
      </div>
      <div
        class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10"
      >
        <div class="font-semibold pb-3">THEME SETTINGS</div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary foreground Color</div>
          <input bind:value={$themeColors.primaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary background Color</div>
          <input bind:value={$themeColors.primaryBg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary foreground Color</div>
          <input bind:value={$themeColors.secondaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary background Color</div>
          <input bind:value={$themeColors.secondaryBg} id="primary" type="color" />
        </div>
      </div>
    </div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
        <div class="flex">
          <div id="variable" class="font-semibold pb-3">CUSTOM VARIABLES</div>
          <button class="ml-auto text-primary-fg" on:click={addNewVariable}
            >+ Add new variable</button
          >
        </div>
        {#each $variables as item, index}
          <div class="flex mt-4">
            {#if item.name === ""}
              <button on:click={() => removeVariable(index)}
                ><img src={Cross} alt="" /></button
              >
              <input
                class="ml-2 focus:outline-none border-b pb-2 w-60 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                placeholder="Variable Name"
                bind:value={tempVariableName}
                on:keydown={(e) => newVariable(e.code, index)}
                on:focusout={() => newVariable("Enter", index)}
                type="text"
              />
            {:else}
              <button on:click={() => removeVariable(index)}
                ><img src={Cross} alt="" /></button
              >
              <button
                class="flex ml-4 {ind === index ? 'text-primary-fg' : ''}"
                on:focusin={() => (ind = index)}
              >
                {item.name} ({item.values.length})
              </button>
              <div
                class="ml-auto text-primary-fg {ind === index
                  ? 'visible'
                  : 'hidden'}"
              >
                {">"}
              </div>
            {/if}
          </div>
        {/each}
      </div>
      <div
        class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10"
      >
        <div class="flex">
          <div class="font-semibold pb-3">VALUES</div>
          <button class="ml-auto text-primary-fg" on:click={() => addValue(ind)}
            >+ Add new value</button
          >
        </div>
        {#each $variables[ind].values as item, index}
          <div class="flex mt-3">
            <span class="self-center mr-2">{index + 1}.</span>
            <input
              class=" focus:outline-none border-b pb-2 w-60 border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
              bind:value={item}
              placeholder=" Choose value {index + 1}"
              type="text"
            />
            <button class="ml-auto" on:click={() => removeValue(index)}>
              <img src={Cross} alt="" />
            </button>
          </div>
        {/each}
      </div>
    </div>
    <div>
      <div class="my-5 text-4xl font-semibold">DATA MAPPING</div>
      <DataMapping
        bind:Terms={$terms}
        bind:clientMapping={$clientDataMapping}
        bind:clientUrl={$clientURL}
        bind:itemUrl={$itemURL}
        bind:clients={$clientData}
        bind:productMapping={$productDataMapping}
        bind:products={$productData}
        {setError}
      />
      <div class="flex mt-10">
        <button
          on:click={createTemplate}
          class="mx-auto px-6 py-2 bg-[#CC335F] rounded-lg text-base text-white"
          >CREATE AND CONTINUE</button
        >
      </div>
      <div class="text-center font-semibold my-10">Powered by NiForms</div>
    </div>
  </main>
  <div>
    {#if error}
      <div class="fixed bottom-5 min-w-max w-full flex justify-center">
        <div in:fly out:fade class="alert alert-error w-[50%] fixed bottom-5">
          <button on:click={() => (error = "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
          </button>
          <span>{error}</span>
        </div>
      </div>
    {/if}
  </div>
</div>
