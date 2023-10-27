<script lang="ts">
  import {Router,Route} from 'svelte-routing';
  import {themeColors} from './store/SettingsStore';
  import FormPage from './pages/FormPage.svelte';
  import Preview from './pages/Preview.svelte';
  import Setting from './pages/Settings.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  import CreateTemplate from './pages/CreateTemplate.svelte';
  import SharablePreview from './pages/SharablePreview.svelte';
  export let url = '';
</script>
<div id='body' class='mine'  style=" --primary-fg:{$themeColors.primaryFg};--primary-bg:{$themeColors.primaryBg};
--secondary-fg:{$themeColors.secondaryFg};--secondary-bg:{$themeColors.secondaryBg};
" >
  <Router {url}>
    <Route path="/:id/form" let:params >
      <FormPage templateId={params.id} />
    </Route>
    <Route path="/:id/setting" let:params >
      <Setting templateId={params.id} />
    </Route>
    <Route path="/:id/preview" let:params >
      <Preview templateId={params.id} />
    </Route>
    <Route path="/preview/:id" let:params >
      <SharablePreview formId={params.id} />
    </Route>
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/createTemplate" component={CreateTemplate}/>
    <Route path="/"><Login/></Route>
  </Router>
</div>
  
<style>
  @media print {
    * { 
      -webkit-print-color-adjust: exact !important;   
      color-adjust: exact !important;              
      print-color-adjust: exact !important; 
    }
    @page {
        margin: 0mm;
        transform-origin: top left;
        footnote-display: none;
    }
    .mine {
      zoom:0.78;
    }

  }
  :global(.text-primary-fg) {
    color: var(--primary-fg);
  }
  :global(.bg-primary-bg, .hover-bg-primary-bg:hover) {
    background: var(--primary-bg);
    color:white;
  }
  :global(.text-secondary-fg) {
    color: var(--secondary-fg);
  }
  :global(.bg-secondary-bg) {
    background: var(--secondary-bg);
  }
  :global(.fill-primary-bg) {
    fill: var(--primary-bg);
  }
  :global(.bg-primary-fg) {
    background: var(--primary-fg);
  }
  :global( .focus-border-primary-fg:focus) {
    border-color: var(--primary-fg)!important;
    --tw-border-opacity: 1;
  }
</style>