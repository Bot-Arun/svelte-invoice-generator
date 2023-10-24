<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import Logo from "../assets/logo.svelte";
  import { postData } from "../api/api";
  import { onMount } from "svelte";
  interface Tab {
    name:string;
    id:string;
  }
    let tabs :Tab[] =[]
    let tab :Tab ;
  let fromDate =''; 
  let toDate = '';
  let templates:any[] =[];
  let forms:any[] = [];
  onMount(async () => {
    const value = await postData('/templates/getAllTemplate',{
        "sort": "asc",
        "sortField": "templateName",
        "keyword": "",
        "pageSize": 10,
        "page": 1
    });
    console.log(value)
    if(value?.statusCode === 401) {
        navigate('/login')
    }
    templates = value.payload.data;
    tabs = value.payload.data.map( (x:any) => {
        return {
            name:x.templateName,
            id:x._id,
        }
    });
    tab = tabs[0]
  })
  async function getFormData () {
    const result = await postData('/forms/getAllForms',{
        "sort": "asc",
        "sortField": "templateName",
        "keyword": "",
        "pageSize": 10,
      "page": 1
    })
    console.log(result.payload.data)
    forms = result.payload.data ;
    // .filter((x:any) => {
    //     console.log(x.templateId,tab.id)
    //     return x.templateId === tab.id});
    console.log('lslkdfas')
  }
  $: tab ,getFormData();
</script>
  
  
  <div class="bg-[#f3f5f7] min-h-screen">
      <main class="text-black justify-center flex md:py-10">
          <div class="flex px-8 text-center h-screen flex-col w-[1024px] bg-white  shadow-lg">
            <div class="flex text-left  leading-relaxed justify-between px-10 py-10 text-4xl font-semibold">
                <div class="pt-5 capitalize">
                    Welcome,<br>
                    Seventy Two Pharma Omnicare
                </div>
                <div>
                    <Logo/>
                </div>
                </div>
                <div class="p-3 sm:p-4 max-sm:text-xs max-md:text-sm bg-primary-bg rounded-t-lg font-semibold flex">
                    {#each tabs as item}
                        <button on:click={()=>tab=item} class="text-white hover:opacity-100 mr-4 {tab ==item?'':'opacity-50'}"  >{item.name}</button>
                    {/each}
                    <button class="ml-auto mr-4 text-[#02E100] hover:opacity-70">
                        <Link to='/createTemplate'> + NEW TEMPLATE </Link>
                    </button>
                    <button class="text-[#02E100] hover:opacity-70">OPTIONS</button>
                </div> 
                <div class="bg-secondary-bg" >
                    <div class="flex px-8 py-10" >
                        <input class="flex-1 border-2 rounded-md bg-inherit p-2 px-4 focus:outline-none" placeholder="Search your form here" type="text">
                        <button on:click={()=>document?.getElementById('my_modal_2')?.showModal()} class="rounded-md border-[#cc335f] border-2 ml-8 text-[#cc335f] font-semibold p-2" >GENERATE REPORT</button>
                        <button on:click={()=>navigate(`/${tab.id}/form`) } class="py-2 bg-[#cc335f] px-8 text-white ml-8 rounded-md">CREATE NEW</button>
                    </div>

                    <div class="font-bold py-6 flex">
                        <div class="flex-1">Sr no</div>
                        <div class="flex-1">Record no</div>
                        <div class="flex-1">Date</div>
                        <div class="flex-1">Version</div>
                        {#each forms as item}
                             <!-- content here -->
                        {/each}
                        <div class="flex-1">Type</div>
                        <div class="flex-1">Created by</div>
                        <div class="flex-1">Created to</div>
                        <div class="flex-1">Value</div>
                        <div class="flex-1"></div>
                    </div>
                    {#each forms as item}
                    <div class="flex py-4">
                        <div class="flex-1">1</div>
                        <div class="flex-1">{item._id.slice(0,7)}...</div>
                        <div class="flex-1">{new Date().toLocaleDateString('en-GB').split('/').join('-')}</div>
                        <div class="flex-1">1.0</div>
                        <div class="flex-1">Walk in</div>
                        <div class="flex-1">Sunil Kumar</div>
                        <div class="flex-1">Raghuram 
                            Agencies</div>
                        <div class="flex-1">₹ {item.price.totalAmount}</div>
                        <div class="flex-1"></div>
                    </div>
                    {/each}
                </div> 
            </div>
      </main>
      <dialog id='my_modal_2' class="modal ">
        <div class="text-black modal-box rounded-lg bg-white min-w-[700px] px-10">
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>'toggleModal'}>✕</button>
        </form>
        <h3 class="font-bold text-3xl text-center py-5">GENERATE REPORT</h3>
        <select class="p-4 w-full bg-inherit mt-5 border-2">
            <option value="saf">Template Name 1</option>
            <option value="saf">sfdafsd</option>
            <option value="saf">sfdafsd</option>
        </select>
        <div class=" w-full bg-inherit flex mt-10 border-2">
            <input class="absolute flex-1 focus:outline-none p-4" type="text" placeholder="From Date" bind:value={fromDate} />
            <input  id='date-picker' autocomplete="off" class=" flex-1 focus:outline-none p-4" type="date" placeholder="dd-mm-yyyy" bind:value={fromDate} />
        </div>

        <div class="  w-full bg-inherit flex mt-10 border-2">
            <input class="absolute flex-1 bg-inherit focus:outline-none p-4" type="text" placeholder="To Date" bind:value={toDate} />
            <input  id='date-picker' autocomplete="off" class=" bg-inherit flex-1 focus:outline-none p-4" type="date" placeholder="dd-mm-yyyy" bind:value={toDate} />
        </div>
        <select class="p-4 w-full bg-inherit mt-10 border-2">
            <option value="saf">Variable 1</option>
            <option value="saf">value 2</option>
        </select>
        <select class="p-4 w-full bg-inherit mt-10 border-2">
            <option value="saf">Variable 2</option>
            <option value="saf">value1</option>
        </select>
        <button class="flex mx-auto px-6 py-3 rounded-lg bg-[#cc335f] text-white font-semibold my-10">GENERATE & DOWNLOAD</button>
        </div>
    </dialog>
  </div>