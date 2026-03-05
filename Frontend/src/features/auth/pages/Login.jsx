import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputFeild from "../components/InputFeild";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin({ email, password})
    navigate("/")

  }

  return (
    <div className="w-full h-full bg-black">
      <div className="w-full h-full bg-black p-6 flex flex-col gap-8">
        <div className="heading">
          <h1 className="text-6xl font-extralight mb-4 mt-6">
            <span className="font-normal">Login</span> Your Account
          </h1>
          <p className="mb-4 text-zinc-400">
            Sign In With The Folowing Methods
          </p>
        </div>
        <div className="form flex flex-col">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5"
          >
            <InputFeild value={email} onChange={(e)=> setEmail(e.target.value)} name={"email"} placeholder={"Enter Email"} />
            <InputFeild value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} placeholder={"Password"} />
        <button type="submit" className="bg-lime-400 p-4 rounded-2xl text-black font-medium">
          Sign In
        </button>
          </form>
        </div>
        <p className="text-zinc-400 text-center">
          Create a new Account?{" "}
          <Link to={"/register"} className="text-lime-400">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
