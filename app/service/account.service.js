import { axios } from "./axios"

export const createAccount = async (payload) => {
    return await axios.post('/account/create', payload)
}

export const fetchAccountList = async (userId) => {
    return await axios.get(`/account/get?userId=${userId}`)
}

export const createTransaction = async (payload) => {
    return await axios.post('/account/transaction', payload)
}

export const fetchAllTransaction = async (userId) => {
    return await axios.get(`/account/transaction/${userId}`)
}

