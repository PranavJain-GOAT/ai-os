import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/lib/AuthContext";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const code = searchParams.get("code");

      // 1. If tokens are already in URL (Backend handled redirect)
      if (accessToken && refreshToken) {
        // We need to fetch the user details to call login()
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
          const res = await axios.get(`${apiUrl}/users/me`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });
          if (res.data.success) {
            login(res.data.data, { accessToken, refreshToken });
            navigate(res.data.data.role === 'DEVELOPER' ? '/developer' : '/client');
            return;
          }
        } catch (e) {
          console.error("Token login error:", e);
        }
        navigate('/auth');
        return;
      }

      // 2. If code is in URL (Frontend received redirect from Google)
      if (code) {
        try {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
          const response = await axios.post(`${apiUrl}/auth/google/callback`, { code });
          
          if (response.data.success) {
            const { accessToken, refreshToken, user } = response.data.data;
            login(user, { accessToken, refreshToken });
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
