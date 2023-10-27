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
  } from "../store/SettingsStore";
  import { postData,putData } from "../api/api";
  import FileUpload from '../components/FileUpload.svelte'
  import { formData, type UploadFile } from "../store/FormStore";
  export let templateId:string;
  let ind = 0;
  let color = { ...$themeColors };
  let customVariable = [...$variables];
  let settings = { ...$setting };
  let productMapping = [...$productDataMapping];
  let clientMapping = [...$clientDataMapping];
  let products = [...$productData];
  let clients = [...$clientData];
  let clientUrl = $clientURL;
  let itemUrl = $itemURL;
  let formTemplate = { ...$template };
  async function saveChanges() {
    let signatureUrl = '';
    let logo = ''
    if(formTemplate.signature.file) {
      const form = new FormData();
      form.append('file', formTemplate.signature.file); 
      const value = await postData('/uploads/uploadTemplateSignature/'+templateId,form,{
          'Content-Type':'multipart/form-data',
      },);
      signatureUrl =value.payload.location;
    }
    else {
      signatureUrl = formTemplate.signature.url;
    }
    if(formTemplate.logo.file) {
      const form = new FormData();
      form.append('file', formTemplate.logo.file); 
      const value = await postData('/uploads/uploadTemplateLogo/'+templateId,form,{
        'Content-Type':'multipart/form-data',
      },);
      logo =value.payload.location;
    }
    else {
      logo = formTemplate.logo.url;
    }
    const result = await putData('/templates/update/'+templateId,{
      "templateName": formTemplate.name,
      "businessName": formTemplate.business,
      "otherInfo": formTemplate.other,
      "templateLogo":logo,
      "templateSignature":signatureUrl,
      "settings": {
          "themeName": "string",
          "includeDiscount": settings.discount,
          "includeGST": settings.GST,
          "includeItemDescription": settings.description,
          "includeAdditionalNotes": settings.additionalNotes,
          "includeAttachments": settings.attachments
      },
      "customVariables":customVariable.map(x =>{
          return {
              "variableName": x.name,
              "variableValues": x.values,
          }
      }),
      "orgId": $setting.org,
      "dataMapping":{
          "clientInformation": {
              "dataUrl": itemUrl,
              "isAuthRequired": false,
              "authDetails": false,
              "mappedData": clientMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "itemMapping": {
              "dataUrl": clientUrl,
              "isAuthRequired": false,
              "authDetails": {},
              "mappedData": productMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "terms": formTemplate.terms.map((x,y) => {
              return {
                  value:x,
                  order:y,
              }
          })
      }
    })
    $template = formTemplate;
    $formData.terms = formTemplate.terms
    $formData.signature = formTemplate.signature  
    $setting = settings;
    $itemURL = itemUrl;
    $clientURL = clientUrl;
    $productDataMapping = productMapping;
    $clientDataMapping = clientMapping;
    $variables = customVariable;
    $themeColors = color;
    $productData = products;
    $clientData = clients;
    setSuccess("changes saved");
    
  }
  let tempVariableName = "";
  let error = "";
  let success = "";
  const setError = (msg: string) => {
    error = msg;
    setTimeout(() => (error = ""), 3000);
  };
  const setSuccess = (msg: string) => {
    success = msg;
    setTimeout(() => (success = ""), 3000);
  };
  $: $record = $variables.map((x) => "");
  
  
  function addNewVariable() {
    customVariable = [...customVariable, { name: "", values: [""] }];
  }
  function newVariable(code: string, index: number) {
    if (code == "Enter") {
      customVariable[index].name = tempVariableName;
      customVariable[index] = { ...customVariable[index] };
      customVariable = [...customVariable];
      ind = customVariable.length - 1;
    }
  }

  function removeVariable(index: number) {
    if (customVariable.length > 1) customVariable.splice(index, 1);
    else customVariable[0] = { name: "", values: [""] };
    customVariable = [...customVariable];
  }

  function addValue(index: number) {
    customVariable[index].values.push("");
    customVariable[index].values = [...customVariable[index].values];
    customVariable[index] = { ...customVariable[index] };
    customVariable = [...customVariable];
  }
  function removeValue(index: number) {
    customVariable[ind].values.splice(index, 1);
    customVariable[ind].values = [...customVariable[ind].values];
    customVariable[ind] = { ...customVariable[ind] };
    customVariable = [...customVariable];
  }
  let temp = ''
  $: customVariable, customVariable.length - 1 < ind ? (ind -= 1) : ind;
</script>
<div class=" bg-[#f3f5f7] md:py-10">
  <div class="fixed top-5 right-5 md:left-10 md:top-10">
    <button on:click={() => history.back()}><BackButton /></button>
  </div>
  <main
    class="text-black justify-center   flex"
  ><div class="flex flex-col bg-white px-4 md:px-10 py-10 mx-auto shadow-lg w-[1024px]">
    <div class="text-4xl font-semibold">TEMPLATE INFO</div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class="flex max-lg:flex-col w-full">
        <div class="p-10  flex-1">
        <div class="font-semibold pb-3">INFORMATION</div>
            <div class=" mr-20">
            <input
                bind:value={formTemplate.name}
                class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                placeholder="Template name"
                type="text"
            />
            </div>
            <div class="">
            <input
                bind:value={formTemplate.business}
                class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                placeholder="Business name"
                type="text"
            />
            </div>
            <textarea
                bind:value={formTemplate.other}
                class="rounded-xl h-32 focus-border-primary-fg border-gray-400 focus:outline-none w-full bg-inherit border mt-6 p-5"
                name=""
                placeholder="Other information"
                id=""
                cols="30"
                rows="5"
            />
        </div>
        <div class='flex px-5 max-lg:flex-col flex-1 py-10'>
            <div class="mt-10 mr-10" > 
              <FileUpload className="h-32 w-32" text={'Add Logo'} bind:file={formTemplate.logo}  ></FileUpload> 
            </div>
            <div class="mt-10 flex-1 ">
              <FileUpload className=" h-32" text={'Add Signature'} bind:file={formTemplate.signature} ></FileUpload> 
            </div>
            
        </div>
    </div>
  </div>
    <div class="text-4xl font-semibold">SETTINGS</div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
        <div class="font-semibold pb-3">FORM SETTINGS</div>
        <div class="flex mt-4">
          <input type="checkbox" bind:checked={settings.discount} />
          <div class="ml-4">Include item discount</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={settings.GST} />
          <div class="ml-4">Include item GST</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={settings.thumbnail} />
          <div class="ml-4">Include item image thumbnail</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={settings.description} />
          <div class="ml-4">Include item description</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={settings.additionalNotes} />
          <div class="ml-4">Include additional notes</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={settings.attachments} />
          <div class="ml-4">Include attachments</div>
        </div>
      </div>
      <div
        class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10"
      >
        <div class="font-semibold pb-3">THEME SETTINGS</div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary foreground Color</div>
          <input bind:value={color.primaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary background Color</div>
          <input bind:value={color.primaryBg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary foreground Color</div>
          <input bind:value={color.secondaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary background Color</div>
          <input bind:value={color.secondaryBg} id="primary" type="color" />
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
        {#each customVariable as item, index}
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
        {#each customVariable[ind].values as item, index}
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
        bind:Terms={formTemplate.terms}
        bind:clientMapping
        bind:clientUrl
        bind:itemUrl
        bind:clients
        bind:productMapping
        bind:products
        {setError}
      />
      <div class="flex mt-10">
        <button
          on:click={saveChanges}
          class="mx-auto px-6 py-2 bg-[#CC335F] rounded-lg text-base text-white"
          >SAVE CHANGES</button
        >
      </div>
      <div class="text-center font-semibold my-10">Powered by NiForms</div>
    </div>
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
    {#if success}
      <div class="fixed bottom-5 min-w-max w-full flex justify-center">
        <div in:fly out:fade class=" w-[50%] alert alert-success">
          <button on:click={() => (success = "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
          </button>
          <span>{success}!</span>
        </div>
      </div>
    {/if}
  </div>
</div>
