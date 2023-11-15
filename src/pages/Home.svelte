<script lang="ts">
  import { Link, navigate } from "svelte-routing";
  import Logo from "../assets/logo.svg";
  import { deleteData, getData, postData } from "../api/api";
  import { onMount } from "svelte";
  import MoreOption from "../assets/MoreOption.svelte";
  import FileUpload from "../components/FileUpload.svelte";
  import { setForm } from "../lib";
  
  interface Tab {
    name:string;
    id:string;
  }
    let tabs :Tab[] =[]
    let tab :Tab ;
  let fromDate =''; 
  let toDate = '';
  let logo = ''
  let templates:any[] =[];
  let companyName = ''
  let forms:any[] = [];
  
  onMount(async () => {
    const {payload} = await getData('/auth/profile') ;
    companyName = payload.companyName;
    logo = payload.companyLogo

    const value = await postData('/templates/getAllTemplate',{
        "sort": "asc",
        "sortField": "templateName",
        "keyword": "",
        "pageSize": 10,
        "page": 1
    });
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
     getFormData();
    })
    setForm();
  async function getFormData () {
    const {payload} = await postData('/forms/getAllForms',{
        "sort": "asc",
        "sortField": "templateName",
        "keyword": "",
        "pageSize": 100,
      "page": 1
    })
    forms = payload.data ;
  }
  let formId = ''
</script>
  
  
  <div class="bg-[#f3f5f7] min-h-screen">
      <main class="text-black justify-center flex md:py-10">
          <div class="flex px-8 text-center flex-col w-[1024px] bg-white  shadow-lg">
            <div class="flex text-left  leading-relaxed justify-between px-10 py-10 text-4xl font-semibold">
                <div class="pt-5 capitalize">
                    Welcome,<br>
                    {companyName}
                </div>
                <div>
                    <FileUpload className="h-32 w-32 " text="" file={{file:null,url:logo}} isImage={true} ></FileUpload>
                </div>
                </div>
                <div class="p-3 sm:p-4 max-sm:text-xs max-md:text-sm bg-primary-bg rounded-t-lg font-semibold flex">
                    {#each tabs as item}
                        <button on:click={()=>tab=item} class="text-white hover:opacity-100 mr-4 {tab ==item?'':'opacity-50'}"  >{item.name}</button>
                    {/each}
                    <button class="ml-auto mr-4 text-[#02E100] opacity-70">
                        <span> + NEW TEMPLATE </span>
                    </button>
                    <button class="text-[#02E100] opacity-70">OPTIONS</button>
                </div> 
                <div class="bg-secondary-bg w-full flex px-8 py-10" >
                    <input disabled class="flex-1 border-2 rounded-md bg-inherit p-2 px-4 focus:outline-none" placeholder="Search your form here" type="text">
                    <button disabled on:click={()=>document?.getElementById('my_modal_2')?.showModal()} class="rounded-md border-[#cc335f] border-2 ml-8 text-[#cc335f] font-semibold p-2" >GENERATE REPORT</button>
                    {#if tab}
                    <a href="/{tab.id}/form" target="_blank">
                        <button  class="py-2 bg-[#cc335f] px-8 text-white ml-8 rounded-md">CREATE NEW</button>
                    </a>
                    {/if}
                    </div>
                <div class="bg-secondary-bg mb-10 overflow-x-scroll " >

                    <div class="flex font-bold w-fit py-6 items-center">
                        <span class="w-[150px]">Sr no</span>
                        <span class="w-[150px]">Record no</span>
                        <span class="w-[150px]">Date</span>
                        <span class="w-[150px]">Version</span>
                        {#if forms.length}
                            {#each forms.filter((x)=> x.templateId === tab.id)[0].recordInformation.recordData as item}
                                <span class="w-[150px]">{item.key} </span>
                            {/each}
                        {/if}
                        <span class="w-[150px]">Value</span>
                        <span class="w-[150px]"></span>
                    </div>
                    <div class="min-h-[200px]">

                    {#each forms.filter((x)=> x.templateId === tab.id) as form,index}
                        <div class="flex py-4 w-fit items-center">
                            <span class="w-[150px]">{index+1}</span>
                            <span class="w-[150px]">{form.formNo.split('||')[1]}</span>
                            <span class="w-[150px]">{new Date().toLocaleDateString('en-GB').split('/').join('-')}</span>
                            <span class="w-[150px]">1.0</span>
                            {#each form.recordInformation.recordData as item}
                                <span class="w-[150px]">{item.value}</span>
                            {/each}

                            <span class="w-[150px]">₹ {form.price.totalAmount}</span>
                            <span class="w-[150px]">
                                <a href="/preview/{form._id}" target='_blank'><button class="rounded-md border-[#cc335f] border-2 ml-8 text-[#cc335f] font-semibold px-2 p-1">View</button></a>
                            </span>
                            <button class=" mx-2 py-1 bg-[#cc335f] px-2 text-white rounded-md" on:click={()=>{formId = form._id ;document?.getElementById('delete_form')?.showModal()}} >Delete</button>
                        </div>  
                    {:else}
                         <div class=" text-3xl font-semibold text-secondary-fg py-14">No Items Found</div>
                    {/each}
                </div>

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
    <dialog id='delete_form' class="modal">
        <div class=" modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>'toggleModal'}>✕</button>
            </form>
        
            <h3 class="font-bold text-lg">Alert</h3>
            <div class="p-4">
                <div class="py-2">
                    Are you sure to delte this form ?
                </div>
            </div>
            <div class="flex">
                <form method="dialog" >
                    <button class="ml-auto btn btn-error px-5" on:click={()=>{ 
                        deleteData('/forms/delete/'+formId);
                        forms = forms.filter(x => formId!==x._id);
                }} >Yes</button>
                    <button class="btn ml-10 btn-neutral px-5">No</button>
                </form>
            </div>
        </div>
    </dialog>
  </div>