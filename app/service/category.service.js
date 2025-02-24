import { axios } from "./axios"

export const createCategory = async (payload) => {
    return await axios.post('/categories/create',payload)
}

export const fetchCategory = async (userId) => {
    return await axios.get(`/categories/${userId}`)
}
