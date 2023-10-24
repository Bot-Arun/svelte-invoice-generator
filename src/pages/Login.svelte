<script lang="ts">
  import { navigate } from "svelte-routing";
</script>


<div class="bg-[#f3f5f7] min-h-screen">
    <main class="text-black justify-center flex md:py-20">
        <div class="flex text-center h-screen flex-col w-[1024px] bg-white  shadow-lg">
            <div class="mt-32 text-4xl font-semibold">
                Manage all your forms here!
            </div>
            <div class="mt-14">
                <input class="border focus:outline-none px-3 py-2 w-[400px]" placeholder="username" type="text">
            </div>
            <div class="mt-14">
                <input class="border focus:outline-none px-3 py-2 w-[400px]" placeholder="password" type="text">
            </div>
            <button on:click={()=>navigate('/home')} class="text-white mt-14 px-16 bg-[#CC335F] self-center p-2 rounded-md "  >
                Login
            </button>
            <div class="text-black font-semibold self-center my-10">
                Powered by NiForms
            </div>
        </div>
    </main>
</div>