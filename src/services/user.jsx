import api from "../app/api"

export const userApi = () => {
    return api.get("/users")
}

