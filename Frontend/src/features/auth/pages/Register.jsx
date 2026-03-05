    import React, { useState } from 'react'
    import { Link, useNavigate } from 'react-router-dom'
    import InputFeild from '../components/InputFeild'
    import { useAuth } from '../hooks/useAuth';


    const Register = () => {
        const { loading, handleRegister } = useAuth();
        const [username, setUsername] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();

        async function handleSubmit(e){
            e.preventDefault();
            await handleRegister({username, email, password});
            navigate("/")

        }
    return (
        <div className='w-full h-full bg-black p-6 flex flex-col gap-8'>
            <div className='heading'>
                <h1 className='text-6xl font-extralight mb-4 mt-6'><span className='font-normal'>Create</span> Your New Account</h1>
                <p className='mb-4 text-zinc-400'>Sign Up With The Folowing Methods</p>
            </div>
            <div className='form flex flex-col'>
                <form onSubmit={handleSubmit} action="" className='flex flex-col gap-5'>
                    <InputFeild name={"email"} placeholder={"Enter Email"} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <InputFeild name={"username"} placeholder={"Enter Username"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <InputFeild name={"password"} placeholder={"Password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit' className='bg-lime-400 p-4 rounded-2xl text-black font-medium'>Sign Up</button>
                </form>
            </div>
                <p className='text-zinc-400 text-center'>Already Have An Account? <Link to={"/login"} className='text-lime-400'>Sign In</Link></p>
        </div>
    )
    }

    export default Register