<script lang="ts">
  import {Router,Route} from 'svelte-routing';
  import {themeColors} from './store/SettingsStore';
  import FormPage from './pages/FormPage.svelte';
  import Preview from './pages/Preview.svelte';
  import Setting from './pages/Settings.svelte';
  import Login from './pages/Login.svelte';
  import Home from './pages/Home.svelte';
  export let url = '';
</script>
<div id='body' class='mine'  style=" --primary-fg:{$themeColors.primaryFg};--primary-bg:{$themeColors.primaryBg};
--secondary-fg:{$themeColors.secondaryFg};--secondary-bg:{$themeColors.secondaryBg};
" >
  <Router {url}>
    <Route path="/form" component={FormPage} />
    <Route path="/setting" component={Setting} />
    <Route path="/preview" component={Preview} />
    <Route path="/home" component={Home}/>
    <Route path="/login" component={Login}/>
    <Route path="/"><Home/></Route>
  </Router>
</div>
  
<style>
  @media print {
      @page {
          margin: 0;
          transform-origin: top left;
        
      }
      .mine {
        zoom:0.78;
      }

  }
  :global(.text-primary-fg) {
    color: var(--primary-fg);
  }
  :global(.bg-primary-bg) {
    background: var(--primary-bg);
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