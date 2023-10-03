<script lang="ts" >
  import Cross from '../assets/cross.svg'
  import Form from "../components/Form.svelte";
  import { formData ,setting } from "../store";
  let discount : number = 0 ;
  let discountType : string = '%';
  let extraCharges :number = 0 ;
  let extraChargesType : string  = "%";
  let total  = 0 ;
  $: {
    if($formData.length) {
        total = $formData.map(x => x.total).reduce((x,y) => x +y);
    }
  }
  $:console.log($setting)
</script>
<style>
    .my-border {
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23E6E6E6FF' stroke-width='3' stroke-dasharray='7%2c 20' stroke-dashoffset='9' stroke-linecap='square'/%3e%3c/svg%3e");
        border-radius: 20px;
    }
</style>
<div class="bg-[#f3f5f7] min-h-screen">
    <main class="justify-center flex py-40">
        <div class="flex flex-col w-[1024px] bg-white border border-[#617183]">
            <div class="flex justify-between text-white bg-[#221148] py-5">
                <div class=" px-8 py-8 font-light text-sm">
                    <div class="text-3xl  font-bold">QUOTATION</div>
                    <div class="mt-2">Business Name</div>
                    <div class="mt-2">Address Line 1</div>
                    <div class="mt-2">Phone no | Email address | GST no </div>
                </div>
                <div class=" text-cente  my-7 p-10 flex my-border mx-8" > <span class="self-center text-xl font-light flex-wrap  ">Add Logo</span> </div>
            </div>
            <div class="px-8 flex flex-col">
                <div class="flex mt-8">
                    <div class="flex-1 bg-[#f8faff] py-4 px-3 mx-2 rounded-xl"> 
                        <div class="text-lg text-[#556172] py-2 font-semibold">RECORD INFORMATION</div>
                        <div class="p-4 pb-10">
                            <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="India" type="text">
                            <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Created By" type="text">
                            <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Created Date" type="text">
                            <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Type" type="text">

                        </div>
                    </div>
                    <div  class="flex-1 bg-[#f8faff] px-2 mx-2"> 
                        <div class="flex-1 py-4 px-3 mx-2 rounded-xl"> 
                            <div class="text-lg text-[#556172]  py-2 font-semibold">CLIENT INFORMATION</div>
                            <div class="p-4 pb-10">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Client name" type="text">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Business name" type="text">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Email id" type="text">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Type" type="text">
                                <input class="focus:outline-none mt-5 border-b pb-2 w-full border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] " placeholder="Address" type="text">
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-4">
                    <input type="checkbox"/> <span class="ml-2"> Add shiping details</span>
                </div>
                <Form bind:data={$formData}/>

                <div class="flex " >
                    <div class="ml-5 flex flex-col">
                        <div class="text-3xl mt-10 font-semibold"> Settings</div>
                        <div class="flex flex-col mt-5">
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.autoMode}> <span>Automatic</span></div>
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.showThumbnail}> <span>show thumbnail</span></div>
                            <div class="mt-3"><input type="checkbox" bind:checked={$setting.showDesc}> <span>show description</span></div>
                        </div>
                    </div>
                    <div class="ml-auto">
                        <div class="">
                            <div class="flex mt-10">
                                <div class="self-center text-xl mr-10">Discount</div>
                                <input bind:value={discount} class="ml-auto focus:outline-none  border-b pb-2 w-32 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                <select bind:value={discountType} class="ml-5 focus:outline-none border-b pb-2 w-16 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] ">
                                    <option value="%">%</option>
                                    <option value="₹">₹</option>
                                </select>
                                <button class="ml-2"><img src={Cross} alt=""></button>
                            </div>
                            <div class="flex mt-7">
                                <div class="self-center text-xl mr-10">Extra Charge</div>
                                <input bind:value={extraCharges} class="ml-auto focus:outline-none  border-b pb-2 w-32 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] "  type="number" min="0" >
                                <select bind:value={extraChargesType} class="ml-5 focus:outline-none border-b pb-2 w-16 border-gray-400 focus:border-[#733dd9] bg-inherit placeholder-[#B7C2D3] ">
                                    <option value="%">%</option>
                                    <option value="₹">₹</option>
                                </select>
                                <button class="ml-2"><img src={Cross} alt=""></button>
                            </div>
                            <div class="text-[#6C40D1] mt-7">
                                + Add Discount or deductions
                            </div>
                            <div class="text-[#6C40D1] mt-7">
                                + Add Additional charges
                            </div>
                            <div class="flex font-semibold text-2xl mt-10 p-4 border-t-2 border-b-2">
                               <span>Total (INR)</span>
                               <span class="ml-auto"> ₹ {total}</span> 
                            </div>

                        </div>
                    </div>
                </div>
                <div class="flex mt-10">
                    <div class="h-60 mr-5 flex-1 p-5 bg-[#F8FAFF]">
                        <div class="text-lg text-[#556172]  py-2 font-semibold">ADDITIONAL NOTES</div>
                        <textarea class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                    </div>
                    <div class="h-60 flex-1 ml-5 p-5 bg-[#F8FAFF]">
                        <div class="text-lg text-[#556172]  py-2 font-semibold">ADD ATTACHMENTS</div>
                        <textarea class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                    </div>
                </div>
                <div class="w-full mt-16 h-60 p-5 bg-[#F8FAFF]">
                    <div class="text-lg text-[#556172]  py-2 font-semibold">TERMS & CONDITIONS</div>
                    <textarea class="bg-inherit focus:outline-none w-full" rows="5"></textarea>
                </div>
                <div class="mt-10">
                    <input type="checkbox" name="" id=""><span class="text-lg ml-4 ">Save the T&Cs for every next period</span>
                </div>
                <div class="flex-col w-full flex">
                    <span class="text-white mt-10 bg-[#CC335F] text-lg self-center p-2 rounded-md "  >
                        SAVE & CONTINUE
                    </span>
                    <div class="text-black font-semibold self-center my-10">
                        Powered by NiForms
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>