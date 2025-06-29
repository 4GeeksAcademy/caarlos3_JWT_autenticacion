import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"



export const DataUser = () => {

    const { store, dispatch } = useGlobalReducer();

    const navigate = useNavigate()

    const fetchUser = async () => {
        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");


            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login')
                return;
            }

            const userResponse = await fetch(`${backendUrl}/api/user/data-user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if(userResponse.ok){
            const user = await userResponse.json()
            dispatch({
                type: 'set_user', payload: {
                    user: user.user
                }
            })
            return user;
        }


        } catch {
            throw new Error('Error al traer usuario'),
            navigate('/login')
        }
    }

    useEffect(() => {
        let isMounted = true;

        const loadHandle = async () => {

            if (isMounted) {
                try {
                    await fetchUser();
                } catch (error) {
                    console.log(error)
                }
            }
        };
        loadHandle();
        return () => {
            isMounted = false;
        }
    }, [])

    if (!store.user) {
        return null
    }

    return (

        <section>
            <h1>Data</h1>
            <h2>
                {store.user.email}
            </h2>
            <button className="btn btn-danger" onClick={() => {
                localStorage.removeItem('token');
                dispatch({ type: 'set_user', payload: { user: null } });
                navigate('/login');
            }}>
                Cerrar sesión
            </button>
        </section>
    )
}