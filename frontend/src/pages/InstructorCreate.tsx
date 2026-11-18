import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Card } from "../components/ui/Card";
import { Navbar } from "../components/ui/Navbar";
import { createInstructor } from "../services/api";

export function InstructorCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    instructorId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.instructorId.trim()) newErrors.instructorId = "Instructor ID is required";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email should be valid";
    }
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createInstructor(form);
      navigate("/instructors/list");
    } catch (err: any) {
      setErrors({ _submit: err.message || "Failed to create instructor" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f4f6fa] flex flex-col items-start relative size-full">
      <Navbar signedIn className="w-[1420px]" />
      <main className="flex flex-col items-center justify-center overflow-clip py-[47px] relative shrink-0 w-full animate-page-fade">
        <Card className="h-[753px] rounded-[28px] px-[20px] py-[35px] shrink-0 w-[1246px] items-center overflow-clip">
          <div className="flex flex-col items-start overflow-clip p-[10px] relative w-full max-w-[1420px]">
            <h1 className="text-[64px] font-['Castoro Titling'] text-black text-center w-full leading-[normal]">
              CREATE INSTRUCTOR
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col items-start overflow-clip p-[10px] relative w-full">
            {errors._submit && (
              <p className="mt-1 text-[11px] font-['Lexend Exa'] text-red-500 w-full mb-4">
                {errors._submit}
              </p>
            )}
            <div className="flex gap-[10px] h-[488px] items-start overflow-clip relative w-full">
              {/* Left Panel */}
              <div className="flex-1 flex flex-col h-[488px] items-start justify-center min-w-px overflow-clip relative w-full">
                <div className="flex flex-col items-start relative w-full">
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="instructorId" className="text-[24px] text-black whitespace-nowrap">
                      Instructor ID
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <Input
                      id="instructorId"
                      type="text"
                      inputSize="register"
                      value={form.instructorId}
                      onChange={(e) => setForm({ ...form, instructorId: e.target.value })}
                      placeholder="e.g. INS2025001"
                      className="w-full"
                      error={errors.instructorId}
                    />
                  </div>
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="firstName" className="text-[24px] text-black whitespace-nowrap">
                      First Name
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <Input
                      id="firstName"
                      type="text"
                      inputSize="register"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="First Name"
                      className="w-full"
                      error={errors.firstName}
                    />
                  </div>
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="lastName" className="text-[24px] text-black whitespace-nowrap">
                      Last Name
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <Input
                      id="lastName"
                      type="text"
                      inputSize="register"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Last Name"
                      className="w-full"
                      error={errors.lastName}
                    />
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex-1 flex flex-col h-[383px] items-start justify-center min-w-px overflow-clip relative w-full">
                <div className="flex flex-col items-start relative w-full">
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="email" className="text-[24px] text-black whitespace-nowrap">
                      Email
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <Input
                      id="email"
                      type="email"
                      inputSize="register"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="example@cit.edu"
                      className="w-full"
                      error={errors.email}
                    />
                  </div>
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="password" className="text-[24px] text-black whitespace-nowrap">
                      Password
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <Input
                      id="password"
                      type="password"
                      inputSize="register"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="••••••"
                      className="w-full"
                      error={errors.password}
                    />
                  </div>
                  <div className="flex flex-col items-start overflow-clip py-[6px] px-[10px] relative w-full">
                    <Label htmlFor="description" className="text-[24px] text-black whitespace-nowrap">
                      Description
                    </Label>
                  </div>
                  <div className="flex flex-col items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Brief description..."
                      className="w-full h-[46px] rounded-[11px] border border-black bg-white px-4 text-[16px] font-['Lexend Exa'] focus:outline-none focus:ring-2 focus:ring-aktif-gold"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[67px] items-center justify-center overflow-clip py-[5px] px-[10px] relative w-full">
              <Button
                variant="primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e as React.FormEvent);
                }}
                disabled={submitting}
                className="w-full max-w-[588px] h-[51px] px-[179px] py-[8px] border border-black hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Creating..." : "ADD INSTRUCTOR"}
              </Button>
            </div>
          </form>
          <footer className="flex gap-[199px] h-[20px] items-center justify-center leading-[normal] overflow-clip p-[10px] relative shrink-0 text-[12px] text-black text-center w-full whitespace-nowrap">
            <p className="relative shrink-0">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/instructors/list")}
                className="font-bold hover:text-[#ffb700] transition-colors duration-200"
              >
                View Instructor List
              </button>
            </p>
          </footer>
        </Card>
      </main>
    </div>
  );
}
