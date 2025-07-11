import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import Swal from "sweetalert2";
const Signup = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningUp) {
      setIsSigningUp(true);
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
        });

        setIsSigningUp(false);
        return;
      }
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/dashboard");
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningUp(false);
      }
    }
  };
  return (
    <>
      {userLoggedIn && <Navigate to="/dashboard" replace={true} />}
      <main className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="w-96 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold uppercase">Sign Up</h1>
            
            <form onSubmit={onSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                placeholder=" Confirm  Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border p-2 w-full mb-4"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded w-full"
                disabled={isSigningUp}>
                {isSigningUp ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
