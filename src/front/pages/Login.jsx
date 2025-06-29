import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (email, password) => {

        try{
            const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(`${backendUrl}/api/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            } 
            
            )

            const data = await response.json()

            if(response.ok && data.token){
            localStorage.setItem('token', data.token)
            return data;
            }else{
                setError(data.err || 'Error al hacer login ')
            }

        }catch{
            setError("Error al conectar con el servidor");
            return null;
        }

    }

    const handleOnsubmit = async (evt) => {
        evt.preventDefault();
        setError('');
        
        const response = await handleLogin(email, password)
        if(response) {
            navigate('/data-user')
        }

    }


    return(

        <section className="container">
            <form className="logInForm" onSubmit={handleOnsubmit}>
                <label className="mb-3">Email</label>
                <input className="mb-3" type="email" name="email" value={email} placeholder="email" required onChange={(evt) => setEmail(evt.target.value)}/>
                <label className="mb-3">Password</label>
                <input type="password" name="password" value={password} placeholder="password" required onChange={(evt) => setPassword(evt.target.value)}/>
            <button className="btn btn-danger mt-3" type="submit">
                Send
            </button>
            </form>

        </section>
    )
}