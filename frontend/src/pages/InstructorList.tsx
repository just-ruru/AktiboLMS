import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { getAllInstructors, type Instructor } from "../services/api";

export function InstructorList() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Recently updated");

  useEffect(() => {
    getAllInstructors(page, 20)
      .then((res) => {
        setInstructors(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page]);

  const handleCreate = () => navigate("/instructors/create");
  const handleView = (id: number) => navigate(`/instructors/profile/${id}`);
  const handleEdit = (id: number) => navigate(`/instructors/update/${id}`);

  const filtered = instructors.filter((i) => {
    if (search && !i.firstName.toLowerCase().includes(search.toLowerCase()) && !i.lastName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filter !== "All") {
      const isActive = i.isActive;
      return filter === "Active" ? isActive : !isActive;
    }
    return true;
  });

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">

      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] h-[176px] items-start overflow-clip pb-[36px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
          INSTRUCTOR WORKSPACE
        </p>
        <div className="content-stretch flex flex-col h-[64px] items-start pt-[4px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[843px] h-[60px] items-start relative shrink-0 w-[1296px]">
            <p className="[word-break:break-word] font-['Castoro_Titling:Regular'] h-full leading-[1.5] not-italic relative shrink-0 text-[40px] text-white w-[189px]">
              Instructors
            </p>
            <div className="content-stretch flex h-[59px] items-start pt-[11px] relative shrink-0 w-[264px]">
              <Button
                variant="primary"
                onClick={handleCreate}
                className="h-[48px] w-[264px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] text-[12px] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                ADD INSTRUCTOR
              </Button>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-nowrap">
          Manage instructor accounts, view profiles, and keep records up to date.
        </p>
      </div>

      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex flex-col gap-[20px] h-[748px] items-start overflow-clip pb-[40px] relative shrink-0 w-[1296px]">
          <div className="content-stretch flex gap-[16px] h-[44px] items-start relative shrink-0 w-full">
            <div
              className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px]"
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-black whitespace-pre">
                ALL INSTRUCTORS {instructors.length}
              </p>
            </div>
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px]"
              onClick={() => setFilter("Active")}
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[12px] whitespace-pre">
                ACTIVE {instructors.filter((i) => i.isActive).length}
              </p>
            </div>
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px]"
              onClick={() => setFilter("Inactive")}
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[12px] whitespace-pre">
                INACTIVE {instructors.filter((i) => !i.isActive).length}
              </p>
            </div>
            <div className="content-stretch flex h-full items-start pl-[688px] relative shrink-0 w-[816px]">
              <div
                className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[128px]"
              >
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[12px] whitespace-nowrap">
                  FILTERS
                </p>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[24px] h-[52px] items-start relative shrink-0 w-full">
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col h-full items-start overflow-clip pb-[17px] pl-[20px] pr-[312px] pt-[15px] relative rounded-[9px] shrink-0 w-[640px]"
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full">
                Search instructor name, ID, or email
              </p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mt-2 h-[42px] rounded-[11px] border border-[#dee4ee] bg-white px-4 text-[16px] font-['Lexend Exa'] focus:outline-none focus:ring-2 focus:ring-aktibo-gold"
                placeholder="Search instructors..."
              />
            </div>
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[122px] h-full items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-[280px]"
            >
              <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-[110px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                  {filter}
                </p>
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-[6px] h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[97px] h-full items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-[328px]"
            >
              <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-[183px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                  Sort: {sort}
                </p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-[6px] h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
              >
                <option>Recently updated</option>
                <option>Name (A-Z)</option>
                <option>Instructor ID</option>
              </select>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] whitespace-pre">
            {filtered.length} instructors
          </p>
          <div className="content-stretch flex flex-col h-[260px] items-start pt-[10px] relative shrink-0 w-full">
            <div className="content-stretch flex gap-[24px] h-full items-start relative shrink-0 w-[1296px] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#596579] text-[16px] font-['Lexend Exa'] w-full">
                  No instructors found.
                </div>
              ) : (
                filtered.map((instructor) => (
                  <div
                    key={instructor.id}
                    className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[9px] h-full items-start overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-[416px] flex-shrink-0"
                  >
                    <div className="content-stretch flex gap-[156px] h-[26px] items-start relative shrink-0 w-full">
                      <div
                        className="bg-[#f4f6fa] content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[94px]"
                      >
                        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#000e53] text-[10px] whitespace-nowrap">
                          {instructor.instructorId}
                        </p>
                      </div>
                      <div
                        className={`content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[126px] ${
                          instructor.isActive
                            ? "bg-[#e9f5ef] text-[#236543]"
                            : "bg-[#f4f6fa] text-[#596579]"
                        }`}
                      >
                        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[10px] whitespace-nowrap">
                          {instructor.isActive ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col h-[59px] items-start pt-[5px] relative shrink-0 w-full">
                      <div
                        className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[0] relative shrink-0 text-[#15203a] text-[18px] w-[376px]"
                      >
                        <p className="leading-[1.5] mb-0">
                          {instructor.firstName}
                        </p>
                        <p className="leading-[1.5]">{instructor.lastName}</p>
                      </div>
                    </div>
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] whitespace-nowrap">
                      {instructor.email}
                    </p>
                    <div className="content-stretch flex flex-col h-[20px] items-start pt-[3px] relative shrink-0 w-[152px]">
                      <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] whitespace-nowrap">
                        {instructor.description || "No description"}
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col h-[51px] items-start pt-[11px] relative shrink-0 w-full">
                      <div className="content-stretch flex gap-[20px] h-[40px] items-start relative shrink-0 w-[376px]">
                        <div className="content-stretch flex h-[38px] items-start pt-[5px] relative shrink-0 w-[180px]">
                          <div className="content-stretch flex flex-col gap-[13px] h-[33px] items-start relative shrink-0 w-[180px]">
                            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                              Joined {new Date(instructor.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="content-stretch flex gap-[8px] h-full items-start relative shrink-0 w-full">
                          <Button
                            variant="secondary"
                            onClick={() => handleView(instructor.id)}
                            className="h-[38px] flex-1 rounded-[9px] bg-white border border-[#dee4ee] text-[#000e53] text-[12px] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] transition-colors duration-200"
                          >
                            VIEW
                          </Button>
                          <Button
                            variant="primary"
                            onClick={() => handleEdit(instructor.id)}
                            className="h-[38px] flex-1 rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] text-[12px] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                          >
                            EDIT
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full mt-4">
            <Button
              variant="secondary"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="h-[40px] px-[20px] rounded-[9px] bg-white border border-[#dee4ee] text-[#000e53] text-[14px] font-['Lexend Exa'] font-bold disabled:opacity-50 disabled:pointer-events-none"
            >
              Prev
            </Button>
            <p className="text-[#596579] text-[14px] font-['Lexend Exa'] mx-2">
              Page {page + 1} of {totalPages}
            </p>
            <Button
              variant="secondary"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="h-[40px] px-[20px] rounded-[9px] bg-white border border-[#dee4ee] text-[#000e53] text-[14px] font-['Lexend Exa'] font-bold disabled:opacity-50 disabled:pointer-events-none"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
