import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const code = searchParams.get("code");

      // 1. If tokens are already in URL (Backend handled redirect)
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        const role = localStorage.getItem('user_role') || 'client';
        navigate(role === 'developer' ? '/developer' : '/client');
        return;
      }

      // 2. If code is in URL (Frontend received redirect from Google)
      if (code) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
          const response = await axios.post(`${apiUrl}/auth/google/callback`, { code });
          
          if (response.data.success) {
            const { accessToken, refreshToken, user } = response.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            
            navigate(user.role === 'DEVELOPER' ? '/developer' : '/client');
          } else {
            navigate('/auth?error=google_auth_failed');
          }
        } catch (error) {
          console.error("Google Exchange Error:", error);
          navigate('/auth?error=google_auth_failed');
        }
        return;
      }

      // 3. No code or tokens found
      navigate('/auth');
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-white mx-auto mb-4" />
        <p className="text-white font-sub">Authenticating with Google...</p>
      </div>
    </div>
  );
}
