import { useState } from "react";
import { useNavigate } from "react-router-dom"



export const SignUp = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSignUp = async (email, password) => {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

        const response = await fetch(`${backendUrl}/api/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            navigate('/login');
        } else {
            const errorData = await response.json();
            alert(errorData.msg || "Error al crear usuario");
        }
    
};

const handleOnsubmit = async (e) => {
    e.preventDefault();
    await handleSignUp(email, password)
};


return (

    <section className="containerSignUp">
        <form onSubmit={handleOnsubmit} className="formSignUp">
            <label className="mb-3" htmlFor="email">Email</label>
            <input className="mb-3" type="email" name="email" value={email} placeholder="email" required onChange={(e) => setEmail(e.target.value)} />
            <label className="mb-3" htmlFor="password">Password</label>
            <input className="mb-3" type="password" name="password" value={password} placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-danger" type="submit">Sign In</button>
        </form>

    </section>



)
}