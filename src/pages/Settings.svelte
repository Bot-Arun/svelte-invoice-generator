<script lang="ts">
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
    type Setting,
    type DataMappingType,
    type Variable,
    type Colors,
    type ProductData,
    type ClientData,
    type TemplateType
  } from "../store/SettingsStore";
  import Template from "../components/Template.svelte";
  import { onMount } from "svelte";
  import { getTemplate } from "../api/api";
  import { refresh } from "../store/FormStore";
  export let refreshSetting = false ;
  export let templateId:string ;
  onMount(async()=>{
    if(refreshSetting)
    await getTemplate(templateId);
    $refresh = false ;
  })
</script>

<Template 
  create={false}
  templateId={templateId}
  setting={{...$setting}}
  variables={[...$variables]}
  themeColors={{...$themeColors}}
  record={[...$record]}
  productData={[...$productData]}
  template={{...$template}}
  productDataMapping={[...$productDataMapping]}
  clientDataMapping={[...$clientDataMapping]}
  clientData={{...$clientData}}
  clientURL={$clientURL}
  itemURL={$itemURL}
  terms={[...$terms]}
/>