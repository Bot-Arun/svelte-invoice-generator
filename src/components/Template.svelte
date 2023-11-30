<script lang="ts">
  import InputMapping from "./InputMapping.svelte";
  import Cross from "../assets/cross.svg";
  import { fade, fly } from "svelte/transition";
  import BackButton from "./BackButton.svelte";
  export let templateId:string = '';
  export let setting:Setting;
  export let variables:Variable[];
  export let themeColors:Colors;
  export let record:string[];
  export let productData:ProductData[] ;
  export let template:TemplateType;
  export let productDataMapping:DataMappingType[];
  export let clientDataMapping:DataMappingType[];
  export let clientData:ClientData[];
  export let clientURL:string;
  export let itemURL:string;
  export let terms:string[];
  export let updateChanges:Function = ()=>{};
  export let create:boolean ;
import { formData, refresh } from "../store/FormStore";
import { postData, putData } from "../api/api";
import { navigate } from "svelte-routing";
  import FileUpload from "./FileUpload.svelte";
  import OutputMapping from "./OutputMapping.svelte";
  import type { ClientData, Colors, DataMappingType, ProductData, Setting, TemplateType, Variable } from "../store/SettingsStore";
  let ind = 0;
  async function createTemplate() {
    var result = await postData('/templates/create',{
      "templateName": template.name,
      "businessName": template.business,
      "otherInfo": template.other,
      "templateLogo":'',
      "templateSignature":'',
      "settings": {
          "themeName": "string",
          "includeDiscount": setting.discount,
          "includeGST": setting.GST,
          "includeItemDescription": setting.description,
          "includeAdditionalNotes": setting.additionalNotes,
          "includeAttachments": setting.attachments
      },
      "customVariables":variables.map(x =>{
          return {
              "variableName": x.name,
              "variableValues": x.values,
          }
      }),
      "orgId":localStorage.getItem('orgId')??'',
      "dataMapping":{
          "clientInformation": {
              "dataUrl": itemURL,
              "outputFileName": "Google Sheet name",
              "outputFileID": "Google Sheet ID",
              "outputMode": "Google_Sheet",
              "isAuthRequired": false,
              "authDetails": false,
              "mappedData": clientDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "itemMapping": {
              "dataUrl": clientURL,
              "outputFileName": "Google Sheet name",
              "outputFileID": "Google Sheet ID",
              "outputMode": "Google_Sheet",
              "isAuthRequired": false,
              "authDetails": {},
              "mappedData": productDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "outputDataMapping": {
            "dataUrl": "",
            "outputFileName": "",
            "outputFileID": "",
            "outputMode": "Google_Sheet",
            "isAuthRequired": false,
            "authDetails": false,
            "formMappedData": template.outputFormMapping.map( x => {
              return  {
                "urlFieldName": x.to,
                "templateFieldName": x.from,
                "typeData": "type of field"
              }
            }),
            "ItemMappedData": template.outputItemMapping.map( x => {
              return  {
                "urlFieldName": x.to,
                "templateFieldName": x.from,
                "typeData": "type of field"
              }
            }),
          },
          "terms": template.terms.map((x,y) => {
              return {
                  value:x,
                  order:y,
              }
          })
      }
  })
  if (result.status > 250) {
    setError(result.message);
    return;
  }
  let templateId = result.payload._id;
  let signatureUrl = '';
  let logo = '';
  if(template.signature.file) {
    const form = new FormData();
      form.append('file',template.signature.file);
    const value = await postData('/uploads/uploadTemplateSignature/'+templateId,form,{
    'Content-Type':'multipart/form-data',
  },);
    signatureUrl =value.payload.location;
  }
  else {
    signatureUrl = template.signature.url;
  }
  if(template.logo.file) {

    const form = new FormData();
      form.append('file',template.logo.file);
    const value = await postData('/uploads/uploadTemplateLogo/'+templateId,form,{
    'Content-Type':'multipart/form-data',
  },);
    logo =value.payload.location;
  }
  else {
    logo = template.logo.url;
  }
  result.payload.templateSignature = signatureUrl;
  result.payload.templateLogo = logo;

  var result = await putData('/templates/update/'+templateId,result.payload);
  if(result.status < 250) {
      navigate('/home');
  }
  else {
    setError(result.message);
  }
}
async function updateTemplate() {
    let signatureUrl = '';
    let logo = ''
    if(template.signature.file) {
      const form = new FormData();
      form.append('file', template.signature.file); 
      const value = await postData('/uploads/uploadTemplateSignature/'+templateId,form,{
          'Content-Type':'multipart/form-data',
      },);
      signatureUrl =value.payload.location;
    }
    else {
      signatureUrl = template.signature.url;
    }
    if(template.logo.file) {
      const form = new FormData();
      form.append('file',template.logo.file); 
      const value = await postData('/uploads/uploadTemplateLogo/'+templateId,form,{
        'Content-Type':'multipart/form-data',
      },);
      logo =value.payload.location;
    }
    else {
      logo = template.logo.url;
    }
    const result = await putData('/templates/update/'+templateId,{
      "templateName": template.name,
      "businessName": template.business,
      "otherInfo": template.other,
      "templateLogo":logo,
      "templateSignature":signatureUrl,
      "settings": {
          "themeName": "string",
          "includeDiscount": setting.discount,
          "includeGST": setting.GST,
          "includeItemDescription": setting.description,
          "includeAdditionalNotes": setting.additionalNotes,
          "includeAttachments": setting.attachments
      },
      "customVariables":variables.map(x =>{
          return {
              "variableName": x.name,
              "variableValues": x.values,
          }
      }),
      "orgId": localStorage.getItem('orgId')??'',
      "dataMapping":{
          "clientInformation": {
              "dataUrl": itemURL,
              "outputFileName": "Google Sheet name",
              "outputFileID": "Google Sheet ID",
              "outputMode": "Google_Sheet",
              "isAuthRequired": false,
              "authDetails": false,
              "mappedData": clientDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "itemMapping": {
              "dataUrl": clientURL,
              "outputFileName": "Google Sheet name",
              "outputFileID": "Google Sheet ID",
              "outputMode": "Google_Sheet",
              "isAuthRequired": false,
              "authDetails": {},
              "mappedData": productDataMapping.map(x => {
                  return {
                      "urlFieldName": x.from,
                      "templateFieldName": x.to,
                      "type": "string"
                  }
              })
          },
          "outputDataMapping": {
            "dataUrl": template.dataUrl,
            "outputFileName": "",
            "outputFileID": "",
            "outputMode": "Google_Sheet",
            "isAuthRequired": false,
            "authDetails": false,
            "formMappedData": template.outputFormMapping.map( x => {
              return  {
                "urlFieldName": x.from,
                "templateFieldName": x.to,
                "typeData": "type of field"
              }
            }),
            "ItemMappedData": template.outputItemMapping.map( x => {
              return  {
                "urlFieldName": x.from,
                "templateFieldName": x.to,
                "typeData": "type of field"
              }
            }),
          },
          "terms": template.terms.map((x,y) => {
              return {
                  value:x,
                  order:y,
              }
          })
      }
    })
    if (result.status > 250) {
      setError(result.message);
      return;
    }
    else {
      $formData.terms = {...template.terms}
      $formData.signature = {...template.signature  }
      updateChanges(template,setting,itemURL,clientURL,productDataMapping,clientDataMapping,variables,themeColors,productData,clientData);
      $refresh = true;
      setSuccess("changes saved");
    }
    
  }
  let tempVariableName = "";
  let error = "";
  let success = '';
  const setError = (msg: string) => {
    error = msg;
    setTimeout(() => (error = ""), 3000);
  };
  const setSuccess = (msg: string) => {
    success = msg;
    setTimeout(() => (success = ""), 3000);
  };
  $: record = variables.map(() => "");

  function addNewVariable() {
    variables = [...variables, { name: "", values: [""] }];
  }
  function newVariable(code: string, index: number) {
    if (code == "Enter") {
      variables[index].name = tempVariableName;
      variables[index] = { ...variables[index] };
      variables = [...variables];
      ind = variables.length - 1;
    }
  }

  function removeVariable(index: number) {
    if (variables.length > 1) variables.splice(index, 1);
    else variables[0] = { name: "", values: [""] };
    variables = [...variables];
  }

  function addValue(index: number) {
    variables[index].values.push("")
    variables[index] = { ...variables[index] };
    variables = [...variables];
  }
  function removeValue(index: number) {
    variables[ind].values.splice(index, 1)
    variables[ind] = { ...variables[ind] };
    variables = [...variables];    
  }

  $: variables, variables.length - 1 < ind ? (ind -= 1) : ind;
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
                  bind:value={template.name}
                  class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                  placeholder="Template name"
                  type="text"
              />
              </div>
              <div class="">
              <input
                  bind:value={template.business}
                  class=" rounded-none focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus-border-primary-fg bg-inherit placeholder-[#B7C2D3]"
                  placeholder="Business name"
                  type="text"
              />
              </div>
              <textarea
                  bind:value={template.other}
                  class="rounded-xl h-32 focus-border-primary-fg border-gray-400 focus:outline-none w-full bg-inherit border mt-6 p-5"
                  name=""
                  placeholder="Other information"
                  id=""
                  cols="30"
                  rows="5"
              />
          </div>
          <div class='flex w-1/2'>
            <div class="mt-10 mr-10" > 
              <FileUpload className="h-32 w-32" text={'Add Logo'} bind:file={template.logo}  ></FileUpload> 
            </div>
            <div class="mt-10 flex-1 ">
              <FileUpload className=" h-32" text={'Add Signature'} bind:file={template.signature} ></FileUpload> 
            </div>
          </div>
      </div>
    </div>
    <div class="text-4xl font-semibold">SETTINGS</div>
    <div class="flex max-md:flex-col my-10 bg-secondary-bg md:px-10">
      <div class=" md:w-1/2 p-10">
        <div class="font-semibold pb-3">FORM SETTINGS</div>
        <div class="flex mt-4">
          <input type="checkbox" bind:checked={setting.discount} />
          <div class="ml-4">Include item discount</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.GST} />
          <div class="ml-4">Include item GST</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.thumbnail} />
          <div class="ml-4">Include item image thumbnail</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.description} />
          <div class="ml-4">Include item description</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.additionalNotes} />
          <div class="ml-4">Include additional notes</div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.terms} />
          <div class="ml-4">Include TERMS & CONDITIONS </div>
        </div>
        <div class="flex mt-2">
          <input type="checkbox" bind:checked={setting.attachments} />
          <div class="ml-4">Include attachments</div>
        </div>
      </div>
      <div
        class="bg-secondary-bg md:w-1/2 my-10 border-l-gray-200 md:border-l-2 px-10"
      >
        <div class="font-semibold pb-3">THEME SETTINGS</div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary foreground Color</div>
          <input bind:value={themeColors.primaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">primary background Color</div>
          <input bind:value={themeColors.primaryBg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary foreground Color</div>
          <input bind:value={themeColors.secondaryFg} id="primary" type="color" />
        </div>
        <div class="flex mt-4 justify-between">
          <div class="mr-4">secondary background Color</div>
          <input bind:value={themeColors.secondaryBg} id="primary" type="color" />
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
        {#each variables as item, index}
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
        {#each variables[ind].values as item, index}
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
      <div class="my-5 text-4xl font-semibold">INPUT DATA MAPPING</div>
      <InputMapping
        templateId={templateId}
        create={create}
        bind:terms={template.terms}
        bind:clientMapping={clientDataMapping}
        bind:clientUrl={clientURL}
        bind:itemUrl={itemURL}
        bind:clients={clientData}
        bind:productMapping={productDataMapping}
        bind:products={productData}
        {setError}
      />
      <div class="mb-5 mt-20 text-4xl font-semibold">OUTPUT DATA MAPPING</div>
      <OutputMapping
      bind:formMapping={template.outputFormMapping} bind:itemMapping={template.outputItemMapping} />
      <div class="flex mt-10">
        {#if create}
           <button
           on:click={createTemplate}
           class="mx-auto px-6 py-2 bg-[#CC335F] rounded-lg text-base text-white"
           >CREATE AND CONTINUE</button
           >
        {:else}
        <button
        on:click={updateTemplate}
        class="mx-auto px-6 py-2 bg-[#CC335F] rounded-lg text-base text-white"
        >SAVE CHANGES</button
      >
        {/if}
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
