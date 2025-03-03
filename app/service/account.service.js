import { axios } from "./axios"

export const createAccount = async (payload) => {
    return await axios.post('/account/create', payload)
}

export const fetchAccountList = async () => {
    return await axios.get(`/account/get`)
}

export const createTransaction = async (payload) => {
    return await axios.post('/account/transaction', payload)
}

export const fetchAllTransaction = async () => {
    return await axios.get(`/account/transaction`)
}

