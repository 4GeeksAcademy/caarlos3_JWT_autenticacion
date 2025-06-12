import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"



export const DataUser = () => {

    const {store, dispatch} = useGlobalReducer();

    const navigate = useNavigate()

    const fetchUser = async () => {
        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")
            
            if (!token){
                navigate('/login')
            }

            const token = localStorage.getItem('token');

			const userResponse = await fetch(`${backendUrl}/api/login`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const user = await userResponse.json()
            dispatch({ type: 'set_user', psyload:{
                user: user.user
            }})

            return user

        } catch{
            throw new Error('Error al traer usuario'),
            navigate('/login')
        }
    }

    useEffect(() => (
        DataUser()
    ), [])

    return (

        <section>
            <h1>Data</h1>
            <h2>
                {store.user.email}
            </h2>
        </section>
    )
}