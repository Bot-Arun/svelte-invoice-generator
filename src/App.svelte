<script lang="ts">
  import {Router,Route} from 'svelte-routing';
  import {themeColors} from './store/SettingsStore';
  import Home from './pages/Home.svelte';
  import Setting from './pages/Settings.svelte';
  import Preview from './pages/Preview.svelte';
  export let url = '';
</script>
<div id='body' class='mine'  style=" --primary-fg:{$themeColors.primaryFg};--primary-bg:{$themeColors.primaryBg};
--secondary-fg:{$themeColors.secondaryFg};--secondary-bg:{$themeColors.secondaryBg};
" >
  <Router {url}>
    <Route path="/home" component={Home} />
    <Route path="/setting" component={Setting} />
    <Route path="/preview" component={Preview} />
    <Route path="/"><Home/></Route>
  </Router>
</div>
  
<style>
  @media print {
      @page {
          margin: 0;
          transform: scale(0.1); /* Adjust the scale value as needed */
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
</style>