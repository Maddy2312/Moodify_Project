    import axios from "axios";

    const api = axios.create({
        baseURL: "http://localhost:3000/api/auth",
        withCredentials: true
    })

    export async function register({email, username, password}) {

        const response = await api.post("/register", {
            email: email,
            username: username,
            password: password
        })

        return response.data
    }

    export async function login({username, email, password}) {
        const response = await api.post("/login", {
            email: email,
            username: username,
            password: password
        })

        return response.data
    }

    export async function getMe() {
        const response = await api.get("/get-me")
        return response.data
    }

    export async function logout() {
        const response = await api.post("/logout")
        return response.data
    }