<script lang="ts">
  import {Router,Route} from 'svelte-routing'
  import Home from './pages/Home.svelte';
  import Setting from './pages/Settings.svelte';
  export let url = '';
</script>

<Router {url}>
    <Route path="/home" component={Home} />
    <Route path="/setting" component={Setting} />
    <Route path="/"><Home/></Route>
</Router>
