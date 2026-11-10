import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Navbar } from "../components/ui/Navbar";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#000e53] flex flex-col items-center justify-center h-screen">
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full animate-page-fade">
        <div className="bg-white rounded-[28px] p-[40px] shadow-xl border border-black/20 flex flex-col items-center gap-[16px] text-center">
          <h1 className="text-[64px] font-['Castoro Titling'] text-black">404</h1>
          <p className="text-[24px] font-['Lexend Exa'] text-[#15203a]">
            Page not found
          </p>
          <p className="text-[#596579] text-[16px] font-['Lexend Exa'] w-[400px]">
            The page you're looking for doesn't exist yet.
          </p>
          <div className="flex gap-[16px]">
            <Button
              variant="primary"
              onClick={() => navigate("/")}
              className="h-[51px] px-[179px]"
            >
              Back to Home
            </Button>
            <Link to="/students/list">
              <Button
                variant="secondary"
                className="h-[51px] px-[179px]"
              >
                Go to Students
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
