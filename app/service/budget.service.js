import { axios } from "./axios"

export const fetchBudgetList = async () => {
    return await axios.get(`/budget/getAll`)
}

