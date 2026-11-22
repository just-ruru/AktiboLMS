import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { getInstructorById } from "../services/api";

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
    <div className="bg-[#f4f6fa] flex flex-col min-h-screen relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction */}
      <div className="bg-[#000e53] flex flex-col gap-[10px] h-[208px] items-start overflow-clip pb-[61px] pl-[72px] pr-[900px] pt-[27px] relative shrink-0 w-full">
        <p className="font-['Inter'] font-bold text-[#ffb700] text-[12px] whitespace-nowrap">
          YOUR ACCOUNT
        </p>
        <div className="content-stretch flex flex-col h-[58px] items-start pt-[2px] relative shrink-0 w-[297px]">
          <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[40px] text-white whitespace-nowrap">
            Instructor profile
          </p>
        </div>
        <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#cdd5f0] text-[18px] w-[min-content]">
          Manage your instructor information and account details.
        </p>
      </div>

      {/* Profile workspace inset */}
      <div className="content-stretch flex flex-col h-[678px] items-start pl-[72px] pt-[40px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex gap-[32px] h-[638px] items-start overflow-clip relative shrink-0 w-[1296px]">
          {/* Left column — profile summary + session actions */}
          <div className="content-stretch flex flex-col gap-[40px] h-[663px] items-start py-[4px] relative shrink-0 w-[312px]">
            <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[9px] h-[445px] items-center overflow-clip px-[28px] py-[16px] relative rounded-[16px] shrink-0 w-full">
              <div className="bg-[#ffb700] h-[4px] relative rounded-[2px] shrink-0 w-[40px]" />
              <div className="relative shrink-0 size-[219px]">
                <img
                  src={profilePicPlaceholder}
                  alt="Avatar"
                  className="absolute block inset-0 max-w-none size-full"
                />
              </div>
              <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                INSTRUCTOR HOLDER
              </p>
              <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#15203a] text-[28px] w-[min-content]">
                {instructor.firstName} {instructor.lastName}
              </p>
              <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#596579] text-[14px] w-[min-content]">
                {instructor.email}
              </p>
              <div className="bg-[#dee4ee] h-px relative shrink-0 w-full" />
              <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full">
                <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
                  Edit basic info
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-col gap-[12px] h-[170px] items-start overflow-clip pb-[50px] pr-[5px] relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#15203a] text-[16px] whitespace-nowrap">
                Account access
              </p>
              <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                Finished teaching for now?
              </p>
              <div className="content-stretch flex flex-col h-[54px] items-start pt-[10px] relative shrink-0 w-full">
                <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[307px]">
                  <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#a32c3b] text-[16px] whitespace-nowrap">
                    Log out
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Instructor details card */}
          <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[24px] h-[613px] items-start overflow-clip pb-[78px] pt-[28px] px-[32px] relative rounded-[16px] shrink-0 w-[952px]">
            <div className="content-stretch flex gap-[367px] h-[72px] items-start overflow-clip pb-[9px] relative shrink-0 w-full">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] h-full items-start leading-[1.4] not-italic relative shrink-0 w-[275px]">
                <p className="font-['Inter'] font-semibold relative shrink-0 text-[#15203a] text-[26px] whitespace-nowrap">
                  Instructor Details
                </p>
                <p className="font-['Inter'] font-normal min-w-full relative shrink-0 text-[#596579] text-[15px] w-[min-content]">
                  Your personal and academic information.
                </p>
              </div>
              <div className="bg-[#ffb700] border border-[#000e53] text-[#000e53] content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[246px] cursor-pointer hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0">
                <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
                  Edit Instructor Details
                </p>
              </div>
            </div>

            <div className="content-stretch flex flex-col h-[336px] items-start overflow-clip relative shrink-0 w-full">
              <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[888px]">
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
              <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-[888px]">
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
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                    Description
                  </p>
                  <p className="relative shrink-0 text-[#15203a] text-[18px] w-[428px]">
                    {instructor.description || "—"}
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-[428px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
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
              <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[15px] whitespace-nowrap">
                Keep your contact information up to date.
              </p>
            </div>

            <div className="absolute bg-[#dee4ee] h-px left-[31px] top-[110px] w-[888px]" />
            <div className="absolute bg-[#dee4ee] h-px left-[31px] top-[235px] w-[888px]" />
            <div className="absolute bg-[#dee4ee] h-px left-[31px] top-[347px] w-[888px]" />
            <div className="absolute bg-[#dee4ee] h-px left-[31px] top-[479px] w-[888px]" />
          </div>
        </div>
      </div>

      {/* Footer inset */}
      <div className="content-stretch flex flex-col h-[152px] items-start pt-[24px] relative shrink-0 w-full">
        <div className="bg-[#000e53] content-stretch flex flex-col gap-[14px] h-[128px] items-start overflow-clip pb-[14px] pt-[32px] px-[72px] relative shrink-0 w-[1440px]">
          <div className="absolute bg-[#304074] h-px left-[72px] top-0 w-[1296px]" />
          <div className="content-stretch flex gap-[556px] h-[48px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex gap-[12px] h-full items-center overflow-clip relative shrink-0 w-[256px]">
              <div className="relative shrink-0 size-[40px]">
                <img src="/assets/aktibo-symbol.png" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" />
              </div>
              <p className="[word-break:break-word] font-['Lexend Exa'] font-normal leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">
                AKTIBO LMS
              </p>
            </div>
            <div className="content-stretch flex h-[46px] items-start pt-[2px] relative shrink-0 w-[484px]">
              <div className="content-stretch flex gap-[12px] h-[44px] items-center overflow-clip relative shrink-0 w-[484px]">
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    Home
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    Courses
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    Pricing
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                    My account
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-normal gap-[965px] h-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#d1d8ee] text-[14px] w-full">
            <p className="h-full relative shrink-0 w-[193px]">A more focused way to learn.</p>
            <p className="h-full relative shrink-0 w-[138px]">Learning, with focus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
