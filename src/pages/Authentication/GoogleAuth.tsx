import React from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Define the user type based on Google's response payload
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string; // Google User ID
}
const GoogleAuth: React.FC = () => {
    const navigate = useNavigate();
  
    const clientId: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const decoded: GoogleUser = jwtDecode<GoogleUser>(response.credential);
      console.log("Google User:", decoded);

      // Send the token to your backend for verification
      sendTokenToBackend(response.credential);
    }
  };

  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  const sendTokenToBackend = async (token: string) => {
    try {
      // const res = await fetch("http://38.alhost:8000/auth/google/callback", {
      const res = await fetch("http://35.88.181.210:8000/google/callback",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res?.json();
      localStorage.setItem("token",data?.token)
      toast.success('Successfully logged in!')
      navigate('/');
      
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("Error sending token to backend:", error);
    }
  };
 
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;