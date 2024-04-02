import { useState } from "react";
import api from "../../api/api";
import SignUp from "./SignUp";
import { FetchState } from "../../hooks";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({ dispatch }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [register, setRegister] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: FetchState.FETCH_INIT });
    try {
      await api.createSession(email, password);
      const data = await api.getAccount();
    //  console.log("data-------------",data.password);
      dispatch({ type: FetchState.FETCH_SUCCESS, payload: data });
    } catch (error) {
      if (error.response && error.response.status === 500) {
        // Server error
        toast.error('Server error. Please try again later.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      else{
        // Credential error
        toast.error("Incorrect email or password. Please try again!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      dispatch({ type: FetchState.FETCH_FAILURE });
    }
  };
  

//console.log("password---------------------",password);

let navigate = useNavigate();

  const forgotPassword = async () => {
    // dispatch({ type: FetchState.FETCH_INIT });
    // try {
    // await api.createSession(email, password);
    //   const data = await api.getAccount();
    //   await api.updatePassword(password);
    //   dispatch({ type: FetchState.FETCH_SUCCESS, payload: password });
      navigate('/forgot-password');
    // } catch (error) {
    //   dispatch({ type: FetchState.FETCH_FAILURE });
    // }
  };


  return register ? (
    <SignUp setRegister={setRegister} dispatch={dispatch} />
  ) : (
    <section className="container h-screen mx-auto flex">
      <div className="flex-grow flex flex-col max-w-xl justify-center p-6">
        <h1 className="text-6xl font-bold">Login</h1>
        <p className="mt-6">
          {" "}
          Don't have an account ?{" "}
          <span
            className="cursor-pointer underline"
            onClick={() => setRegister(true)}
          >
            Sign Up
          </span>{" "}
        </p>
        <form onSubmit={handleLogin}>
          <label className="block mt-6"> Email</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mt-6"> Password</label>
          <input
            className="w-full p-4 placeholder-gray-400 text-gray-700 bg-white text-lg border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-900"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-6">
            <button
              type="submit"
              disabled={!email || !password}
              className="mx-auto mt-4 py-4 px-16 font-semibold rounded-lg shadow-md bg-gray-900 text-white border hover:border-gray-900 hover:text-gray-900 hover:bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Login
            </button>
          </div>
      
          {/* <nav>
        <Link to="src/pages/Login/ForgetPassword.jsx">Forget Password?</Link> {" "}
      </nav> */}

          <p className="mt-6">
          {" "}
          {" "}
          <span
            className="cursor-pointer underline"
            onClick={() =>  forgotPassword()
          }
          >
            Forgot password?
          </span>{" "}
        </p>        
        </form>
      </div>
    </section>
  );
};

export default Login;
