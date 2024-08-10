import { api } from "./api";

export const addCompany = async (Data) =>{
    const response = await api.post('/company/add-compnay',Data);
    return response.data
};
export const editNfc = async (nfcCode,Data) =>{
    const response = await api.post(`/admin/edit_nfc/${nfcCode}`,Data);
    return response.data
};

export const getCompanies = async (Data) =>{
    const response = await api.get('/company/get-companies');
    return response.data
};

export const getCompanyData = async (nfcCode) =>{
    const response = await api.get(`/company/get-companyData/${nfcCode}`);
    return response.data
};

export const makePaymentApi = async (Data)=>{
    const response = await api.post('/company/makepayment',Data);
    return response.data
}
export const loginAdmin = async (Data)=>{
    const response = await api.post('/login',Data);
    return response.data
}