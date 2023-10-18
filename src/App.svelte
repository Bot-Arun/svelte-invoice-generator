<script lang="ts">
  import {Router,Route} from 'svelte-routing';
  import {themeColors} from './store/SettingsStore';
  import Home from './pages/Home.svelte';
  import Setting from './pages/Settings.svelte';
  export let url = '';
</script>
<div  style=" --primary-fg:{$themeColors.primaryFg};--primary-bg:{$themeColors.primaryBg};
--secondary-fg:{$themeColors.secondaryFg};--secondary-bg:{$themeColors.secondaryBg};
" >
  <Router {url}>
    <Route path="/home" component={Home} />
    <Route path="/setting" component={Setting} />
    <Route path="/"><Home/></Route>
  </Router>
</div>
  
<style>
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