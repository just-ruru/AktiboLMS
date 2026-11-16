import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Navbar } from "../components/ui/Navbar";
import { getInstructorById, deactivateInstructor } from "../services/api";

const profilePicPlaceholder = new URL(
  "../assets/profile_pic_placeholder.jpg",
  import.meta.url
).href;

export function InstructorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [instructor, setInstructor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    getInstructorById(Number(id))
      .then((i) => {
        setInstructor(i);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#000e53] flex flex-col items-center justify-center h-screen">
        <p className="text-white text-[24px] font-['Lexend Exa']">Loading instructor profile...</p>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="bg-[#000e53] flex flex-col items-center justify-center h-screen">
        <p className="text-white text-[24px] font-['Lexend Exa']">Instructor not found.</p>
        <Button
          variant="primary"
          onClick={() => navigate("/instructors/list")}
          className="mt-6"
        >
          Back to Instructor List
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#000e53] flex flex-col gap-[10px] items-center pb-[898px] px-[10px] relative size-full">
      <Navbar className="w-[1420px]" />
      <main className="flex flex-col h-[903px] items-center justify-center overflow-clip relative shrink-0 w-[1440px] animate-fade-in-up">
        <div className="flex flex-col items-center relative shrink-0 h-[850px]">
          <div className="bg-[rgba(217,217,217,0.1)] h-[850px] w-[1372px] rounded-[28px] relative" />
          <div className="absolute flex gap-[19px] h-[863px] items-start justify-center left-0 overflow-clip px-[10px] py-[51px] rounded-[28px] top-[-0.5px] w-[1372px]">
            {/* Left sidebar — instructor profile card */}
            <aside className="bg-white flex flex-col h-[754px] items-center overflow-clip p-[10px] relative rounded-[11px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[343px]">
              <div className="flex flex-col gap-[10px] h-[340px] items-center justify-center overflow-clip p-[24px] relative rounded-[24px] shrink-0 w-[306px]">
                <img
                  src={profilePicPlaceholder}
                  alt="Instructor Avatar"
                  className="size-[219px] rounded-full object-cover"
                />
                <h2 className="text-[32px] font-['Lexend Exa'] font-bold text-black text-center whitespace-nowrap">
                  {instructor.firstName} {instructor.lastName}
                </h2>
                <p className="text-[#ffb700] text-[16px] text-center w-[179px] font-['Lexend Exa'] font-bold">
                  Edit basic info
                </p>
              </div>
              <div className="bg-[#ffb700] h-[4px] relative rounded-[2px] shrink-0 w-[40px] mt-4" />
              <p className="text-[#596579] text-[12px] text-center whitespace-nowrap font-['Lexend Exa']">
                INSTRUCTOR ID: {instructor.instructorId}
              </p>
              <p className="text-[#15203a] text-[14px] text-center whitespace-nowrap font-['Lexend Exa']">
                {instructor.email}
              </p>
            </aside>

            {/* Right panel */}
            <section className="flex flex-col gap-[25px] h-[754px] items-start overflow-clip relative rounded-[11px] shrink-0 w-[936px]">
              {/* Instructor Details card */}
              <div className="bg-white flex flex-col gap-[13px] h-[509px] items-start justify-center leading-[normal] overflow-clip px-[32px] py-[24px] relative rounded-[16px] shrink-0 w-[936px] whitespace-nowrap">
                <div className="content-stretch flex gap-[367px] h-[72px] items-start overflow-clip pb-[9px] relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] h-full items-start leading-[1.4] not-italic relative shrink-0 w-[275px]">
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#15203a] text-[26px] whitespace-nowrap">
                      Instructor Details
                    </p>
                    <p className="font-['Inter:Regular'] font-normal min-w-full relative shrink-0 text-[#596579] text-[15px] w-[min-content]">
                      Your personal and academic information.
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/instructors/update/${instructor.id}`)}
                    className="h-[48px] w-[246px] rounded-[8px] text-[16px] bg-[#ffb700] border border-black text-[#000e53] font-['Inter:Semi_Bold'] font-semibold whitespace-nowrap hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
                  >
                    Edit Instructor Details
                  </Button>
                </div>
                <div className="content-stretch flex flex-col h-[336px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex font-['Inter:Medium'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[888px]">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Instructor ID
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                        {instructor.instructorId}
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        First Name
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                        {instructor.firstName}
                      </p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex font-['Inter:Medium'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[888px]">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Last Name
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                        {instructor.lastName}
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Email Address
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                        {instructor.email}
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[32px] h-[112px] items-start overflow-clip relative shrink-0 w-[888px]">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Description
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                        {instructor.description || "—"}
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                      <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Status
                      </p>
                      <p className={`relative shrink-0 text-[18px] w-[428px] ${
                        instructor.isActive ? "text-[#236543]" : "text-[#a32c3b]"
                      }`}>
                        {instructor.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col h-[51px] items-start pt-[30px] relative shrink-0 w-[295px]">
                  <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[15px] whitespace-nowrap">
                    Keep your contact information up to date.
                  </p>
                </div>
              </div>

              {/* Deactivate instructor */}
              <div className="bg-white flex flex-col items-center justify-center overflow-clip px-[18px] py-[24px] relative rounded-[16px] shrink-0 w-[936px] h-[100px]">
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to deactivate ${instructor.firstName} ${instructor.lastName}'s account?`
                      )
                    ) {
                      deactivateInstructor(instructor.id).then(() => {
                        navigate("/instructors/list");
                      });
                    }
                  }}
                  className="h-[58px] rounded-[12px] w-full text-[20px] bg-[#ff585b] border-2 border-black text-black text-center whitespace-nowrap hover:bg-[#ff4044] active:bg-[#e83a3d] transition-colors duration-200"
                >
                  Deactivate Instructor Account
                </Button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
