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
  $: console.log(variables)
  import Template from "../components/Template.svelte";
  function updateChanges( templates: TemplateType,
  settings: Setting,
  itemUrl: string,
  clientUrl: string,
  productMapping: DataMappingType[],
  clientMapping: DataMappingType[],
  customVariable: Variable[],
  color: Colors,
  products: ProductData[],
  clients: ClientData[]) {
    console.log("saveChanges");
    $template = {...templates};
    $setting = settings;
    $itemURL = itemUrl;
    $clientURL = clientUrl;
    $productDataMapping = productMapping;
    $clientDataMapping = clientMapping;
    $variables = customVariable;
    $themeColors = color;
    $productData = products;
    $clientData = clients;
  }
</script>

<Template 
  create={true}
  setting={$setting}
  variables={$variables}
  updateChanges={updateChanges}
  themeColors={$themeColors}
  record={$record}
  productData={$productData}
  template={$template}
  productDataMapping={$productDataMapping}
  clientDataMapping={$clientDataMapping}
  clientData={$clientData}
  clientURL={$clientURL}
  itemURL={$itemURL}
  terms={$terms}
/>