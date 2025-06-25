import { useState } from "react"
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            localStorage.setItem('token', data.token)
            return data

        }catch{
            throw new Error ("Error al logear")
        }

    }

    const handleOnsubmit = async (evt) => {
        evt.preventDefault();
        
        const response = await handleLogin(email, password)
        if(response) {
            navigate('/data-user')
        }

    }


    return(

        <section className="container d-flex justify-content-center">
            <form className="d-flex justify-content-center" onSubmit={handleOnsubmit}>
                <label>Email</label>
                <input type="email" name="email" value={email} placeholder="email" required onChange={(evt) => setEmail(evt.target.value)}/>
                <label>Password</label>
                <input type="password" name="password" value={password} placeholder="password" required onChange={(evt) => setPassword(evt.target.value)}/>
            <button className="btn btn-danger" type="submit">
                Send
            </button>
            </form>

        </section>
    )
}