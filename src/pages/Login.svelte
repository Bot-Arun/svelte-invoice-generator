<script lang="ts">
  import { navigate } from "svelte-routing";
  import {postData} from '../api/api'
  import { setting } from "../store/SettingsStore";
  import { fade, fly } from "svelte/transition";

  let email = '';
  let password = '';

  const login = async () => {
        const {payload,status,message} = await postData('/auth/login',{
            email,password
        });
        if(status > 250)
        setError(message)
        localStorage.setItem('token',payload.token)
        $setting.org =payload.userData._id;
        navigate('/home')

}
let error = '';
  const setError = (msg: string) => {
      error = msg;
    setTimeout(() => (error = ""), 3000);
  };

</script>


<div class="bg-[#f3f5f7] min-h-screen">
    <main class="text-black justify-center flex md:py-20">
        <div class="flex text-center h-screen flex-col w-[1024px] bg-white  shadow-lg">
            <div class="mt-32 text-4xl font-semibold">
                Manage all your forms here!
            </div>
            <div class="mt-14">
                <input bind:value={email} class="border focus:outline-none bg-inherit px-3 py-2 w-[400px]" placeholder="username" type="text">
            </div>
            <div class="mt-14">
                <input bind:value={password} class="border bg-inherit focus:outline-none px-3 py-2 w-[400px]" placeholder="password" type="password">
            </div>
            <button on:click={login} class="text-white mt-14 px-16 bg-[#CC335F] self-center p-2 rounded-md "  >
                Login
            </button>
            <div class="text-black font-semibold self-center my-10">
                Powered by NiForms
            </div>
        </div>
    </main>
    {#if error.length}
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