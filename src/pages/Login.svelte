<script lang="ts">
  import { navigate } from "svelte-routing";
  import {postData} from '../api/api'

  let email = '';
  let password = '';

  const login = async () => {
    const value = await postData('/auth/login',{
        email,password
    });
    localStorage.setItem('token',value.payload.token);
    console.log(localStorage.getItem('token'))
    navigate('/home')
  }

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
</div>