<script lang="ts" >
  import Header from "../components/Header.svelte";
  import File from '../assets/file.svg'
  import Add from '../assets/add.svg'
  import Form from "../components/Form.svelte";
  import { formData } from "../store";
</script>

<div class="bg-[#f3f5f7] min-h-screen">
    <Header/>
    <main class="justify-center flex mt-20">
        <div class="flex flex-col w-[1024px] shadow-md p-8 bg-white border border-[#617183] rounded-md">
            <div class="text-3xl text-center my-5">Invoice</div>

            <div class="flex">
                <div class="text-lg flex flex-col w-1/2">
                    <div class="flex">
                        <div class="w-1/2">Invoice No: </div>
                        <div ><input class="focus:outline-none w-40 border-b border-gray-400 hover:border-[#733dd9] focus:border-[#733dd9]" type="text"></div>
                    </div>
                    <div class="flex mt-5">
                        <div class="w-1/2">Invoice Date: </div>
                        <div ><input class="focus:outline-none w-40 border-b border-gray-400 focus:border-[#733dd9]" type="date"></div>
                    </div>
                </div>
                <div class="ml-auto">
                    <div class="items-center">
                        <button class="flex focus:bg-[#e5ecf7] p-3 border-dashed bg- border-violet-300 rounded-md border bg-[#f7faff] hover:bg-gray-100"> <img src={File} class="mr-2" alt="loading">  Add Business Logo</button>
                        <input type="file"  id='files' class="hidden"/>
                    </div>
                </div>
            </div>

            <div class="flex hover:cursor-pointer mt-3">
                <img src={Add} alt="">
                <span class="ml-2 text-gray-600 hover:text-black"> Add More Fields </span>
            </div>

            <div class="flex mt-8">
                <div class="flex-1 bg-[#f7faff] py-4 px-3 mx-2 rounded-xl"> 
                    <div class="text-2xl py-2">Billed By <span class="text-sm text-gray-500">(Your Details)</span></div>
                    <div class="p-4 bg-white border pb-32 border-zinc-400 rounded-md">
                        <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="India" type="text">
                        <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="Your Business / Freelancer Name (Required)"  type="text">
                        <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="Address (Optional)"  type="text">
                        <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="City (Optional)"  type="text">
                        <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="State (Optional)"  type="text">
                    </div>
                </div>
                <div  class="flex-1 bg-[#f7faff] px-2 mx-2"> 
                    <div class="flex-1 bg-[#f7faff] py-4 px-3 mx-2 rounded-xl"> 
                        <div class="text-2xl py-2">Billed To <span class="text-sm text-gray-500">(Client Details)</span></div>
                        <div class="p-4 bg-white border pb-32 border-zinc-400 rounded-md">
                            <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="India" type="text">
                            <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="Your Business / Freelancer Name (Required)"  type="text">
                            <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="Address (Optional)"  type="text">
                            <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="City (Optional)"  type="text">
                            <input class="focus:outline-none mt-5 border-b w-full border-gray-400 focus:border-[#733dd9] placeholder-gray-600" placeholder="State (Optional)"  type="text">
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <input type="checkbox"/> <span class="ml-2"> Add shiping details</span>
            </div>
            <Form bind:data={$formData}/>
            <div class="h-screen"></div>
        </div>
    </main>
</div>