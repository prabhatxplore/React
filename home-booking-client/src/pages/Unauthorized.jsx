// Unauthorized.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Unauthorized() {
    const navigate = useNavigate();
    const { user } = useAuth()
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background grid */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Glow blob */}
            <div className="absolute w-96 h-96 bg-red-500 opacity-10 rounded-full blur-3xl top-1/4 left-1/2 -translate-x-1/2" />

            {/* Card */}
            <div className="relative z-10 text-center max-w-md w-full">

                {/* Lock icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-2xl">
                        <svg
                            className="w-12 h-12 text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                </div>

                {/* 403 */}
                <p className="text-7xl font-black text-slate-800 tracking-tighter mb-1 select-none">
                    403
                </p>

                {/* Title */}
                <h1 className="text-2xl font-bold text-slate-100 mb-3 tracking-tight">
                    Access Denied
                </h1>

                {/* Subtitle */}
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    You don't have permission to view this page. <br />
                    Please contact support if you think this is a mistake.
                </p>

                {/* Divider */}
                <div className="w-16 h-px bg-slate-700 mx-auto mb-8" />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">

                    <button
                        onClick={() => navigate(user.user_type === "host" ? "/dashboard" : "/")}
                        className="px-6 py-2.5 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-400 transition-all duration-200 shadow-lg shadow-red-500/20"
                    >
                        Go {user.user_type === "host" ? "Dashboard" : "Home"}
                    </button>
                </div>
            </div>
        </div>
    );
}