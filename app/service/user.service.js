import { axios } from "@/lib/axios"

export const createUser = async (payload) => {
    return await axios.post('/users/register',payload)
}

export const loginUser = async (payload) => {
    return await axios.post('/users/login', payload)
}

export const logoutUser = async () => {
    return await axios.get('/users/logout')
}

export const fetchUserDetails = async () => {
    return await axios.get('users/current-user')
}