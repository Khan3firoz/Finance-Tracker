import { axios } from "./axios"

export const createAccount = async (payload) => {
    return await axios.post('/account/create', payload)
}