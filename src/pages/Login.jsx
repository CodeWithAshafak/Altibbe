import React from "react";
import {
  doSignInWithGoogle,
  doSignInWithEmailAndPassword,
} from "../firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link ,Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    
     if (!email || !password) {
    Swal.fire({
      icon: "error",
      title: "Missing fields",
      text: "Please enter both email and password",
    });
    return;
  }

    if (!isSigningIn){
      setIsSigningIn(true);
       try {
      await doSignInWithEmailAndPassword(email, password);
      Swal.fire({
        title: "Success!",
        text: "You have been logged in.",
        icon: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
      });
      setIsSigningIn(false);
    }
  }
  
  }
  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((error) => {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      });
    }
  }
  

  return (
    <>
      <div>
        {userLoggedIn && <Navigate to="/dashboard" replace={true} />}

        <main className="w-full h-screen flex items-center justify-center bg-gray-100">
          <div className="w-96 bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-4">
              <h3 className="text-2x bold uppercase">Login</h3>
              <p>
                Don't have an account ?{" "}
                <Link to="/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </p>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full mt-2"
                />
                <button
                  onClick={onSubmit}
                  className="bg-blue-500 text-white p-2 rounded w-full mt-4"
                >
                  Sign In
                </button>

                <p>or</p>
                <button
                  onClick={onGoogleSignIn}
                  className="bg-white border border-gray-300 p-2 rounded w-full mt-4 flex items-center justify-center"
                >
                  <FcGoogle className="mr-2" size={24} />
                  Sign In with Google
                </button>
                {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};


export default Login;
