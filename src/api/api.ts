import axios from 'axios';
import { clientDataMapping, clientURL, itemURL, productDataMapping, record, setting, template, terms, variables } from '../store/SettingsStore';
import { formData } from '../store/FormStore';

export const baseURL = 'https://niforms.neuui.com/api/v1'

const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getData = (endpoint:string) => {
  return instance.get(endpoint)
    .then(response => {
        const data = response.data ;
        data['status'] = response.status ;
        return data ;
    })
    .catch(error => {
      if(error.response) {
        console.error(error);
        return {...error.response.data,'status':error.response.status}
      }
      throw error;
    });
};

export const postData = (endpoint:string, data:any,headers?:any) => {
  return instance.post(endpoint, data,headers)
    .then(response => {
        const data = response.data ;
        data['status'] = response.status ;
        return data;
    })
    .catch(error => {
      if(error.response) {
        return {...error.response.data,'status':error.response.status}
      }
      throw error;
    });
};

export const putData = (endpoint:string, data:any,headers?:any) => {
    return instance.put(endpoint, data,headers)
      .then(response => {
          const data = response.data ;
          data['status'] = response.status ;
          return data;
      })
      .catch(error => {
        if(error.response) {
          return {...error.response.data,'status':error.response.status}
        }
        throw error;
      });
  };

  export const deleteData = (endpoint:string,headers?:any) => {
    return instance.delete(endpoint,headers)
      .then(response => {
          const data = response.data ;
          data['status'] = response.status ;
          return data;
      })
      .catch(error => {
        if(error.response) {
          return {...error.response.data,'status':error.response.status}
        }
        throw error;
      });
  };

export async function getTemplate(templateId:string) {
    const {payload} = await getData('/templates/getTemplate/'+templateId);
        template.update(x => {
            x.name=payload.templateName
            x.business = payload.businessName;
            x.other = payload.otherInfo;
            x.terms = payload.dataMapping.terms.map((x:any) => x.value);
            x.logo = {url:payload.templateLogo,file:null}
            x.signature = {url:payload.templateSignature,file:null}
            return x ;
        })
        setting.update( x => {
            x.discount = payload.settings.includeDiscount
            x.GST = payload.settings.includeGST;
            x.description = payload.settings.includeItemDescription;
            x.additionalNotes = payload.settings.includeAdditionalNotes
            x.attachments = payload.settings.includeAttachments;
            return x ;
        })
        variables.set( payload.customVariables.map((x:any) => {
            return {
                name: x.variableName,
                values: x.variableValues
            };
        }));

        itemURL.set( payload.dataMapping.clientInformation.dataUrl)

        clientDataMapping.set( payload.dataMapping.clientInformation.mappedData.map((x:any) => {
            return {
                from: x.urlFieldName,
                to: x.templateFieldName
            };
        }));

        clientURL.set( payload.dataMapping.itemMapping.dataUrl);

        productDataMapping.set( payload.dataMapping.itemMapping.mappedData.map((x:any) => {
            return {
                from: x.urlFieldName,
                to: x.templateFieldName
            };
        }));
}

template.subscribe((x) => {
  formData.update(y => {
    y.terms = x.terms;
    y.signature = x.signature;
    return y;
  })
})

