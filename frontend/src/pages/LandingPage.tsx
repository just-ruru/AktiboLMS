import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";

export function LandingPage() {
  return (
    <div className="bg-[#000e53] content-stretch flex flex-col items-center relative size-full animate-page-fade">
      <Navbar className="w-[1440px]" />

      {/* Hero */}
      <div className="bg-[#000e53] h-[656px] overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-bold leading-[1.45] absolute left-[72px] not-italic text-[#ffb700] text-[12px] top-[72px] whitespace-nowrap">
          A MORE FOCUSED WAY TO LEARN
        </p>
        <div className="font-sans font-semibold leading-[0] absolute left-[72px] not-italic text-[64px] text-white top-[112px] tracking-[-1.92px] w-[600px] whitespace-nowrap">
          <p className="leading-[1.1] mb-0">Less searching.</p>
          <p className="leading-[1.1] text-[#ffb700]">More learning.</p>
        </div>
        <p className="font-sans font-normal leading-[1.45] absolute left-[72px] not-italic text-[#d1d8ee] text-[20px] top-[286px] w-[520px] whitespace-wrap">
          Make room for your next step. Bring your courses and your learning
          journey together with AKTIBO LMS.
        </p>
        <Link
          to="/register"
          className="bg-[#ffb700] flex h-[56px] items-center justify-center absolute left-[72px] overflow-clip rounded-[8px] top-[416px] w-[216px]"
        >
          <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
            Create an account
          </p>
        </Link>
        <div className="border border-[#5d6994] border-solid flex h-[56px] items-center justify-center absolute left-[304px] overflow-clip rounded-[8px] top-[416px] w-[200px]">
          <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
            Explore courses
          </p>
        </div>
        <p className="font-sans font-normal leading-[1.45] absolute left-[72px] not-italic text-[#d1d8ee] text-[14px] top-[494px] whitespace-nowrap">
          Already learning with us? Log in to continue.
        </p>
        <p className="font-sans font-medium leading-[1.45] absolute left-[748px] not-italic text-[#d1d8ee] text-[11px] top-[76px] whitespace-nowrap">
          AN EXAMPLE OF YOUR LEARNING SPACE
        </p>
        <div className="bg-white h-[426px] absolute left-[748px] overflow-clip rounded-[14px] top-[110px] w-[620px]">
          <div className="bg-[#f4f6fa] h-[52px] absolute left-0 overflow-clip top-0 w-[620px] whitespace-nowrap">
            <p className="absolute left-[20px] text-[#000e53] text-[13px] top-[16px]">
              AKTIBO / My learning
            </p>
            <p className="absolute left-[518px] text-[#596579] text-[10px] top-[18px]">
              EXAMPLE
            </p>
          </div>
          <div className="bg-[#f4f6fa] h-[374px] absolute left-0 overflow-clip top-[52px] w-[140px]">
            <p className="font-sans font-bold leading-[1.45] absolute left-[18px] not-italic text-[#596579] text-[9px] top-[28px] whitespace-nowrap">
              WORKSPACE
            </p>
            <div className="bg-[#000e53] flex h-[38px] items-center justify-center absolute left-[12px] overflow-clip rounded-[6px] top-[58px] w-[116px]">
              <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                My learning
              </p>
            </div>
            <p className="font-sans font-normal leading-[1.45] absolute left-[24px] not-italic text-[#596579] text-[12px] top-[112px] whitespace-nowrap">
              My account
            </p>
            <p className="font-sans font-normal leading-[1.45] absolute left-[24px] not-italic text-[#596579] text-[12px] top-[150px] whitespace-nowrap">
              Get help
            </p>
          </div>
          <div className="absolute h-[324px] left-[164px] overflow-clip top-[76px] w-[432px]">
            <p className="font-sans font-semibold leading-[1.45] absolute left-0 not-italic text-[#15203a] text-[23px] top-0 whitespace-nowrap">
              Welcome back.
            </p>
            <p className="font-sans font-normal leading-[1.45] absolute left-0 not-italic text-[#596579] text-[13px] top-[38px] whitespace-nowrap">
              A small step forward starts here.
            </p>
            <div className="bg-white border border-[#dee4ee] border-solid h-[226px] absolute left-0 overflow-clip rounded-[10px] top-[82px] w-[432px]">
              <p className="font-sans font-bold leading-[1.45] absolute left-[19px] not-italic text-[#596579] text-[9px] top-[17px] whitespace-nowrap">
                CONTINUE LEARNING
              </p>
              <p className="font-sans font-semibold leading-[1.45] absolute left-[19px] not-italic text-[#15203a] text-[19px] top-[41px] whitespace-nowrap">
                Learning essentials
              </p>
              <p className="font-sans font-normal leading-[1.45] absolute left-[19px] not-italic text-[#596579] text-[12px] top-[75px] whitespace-nowrap">
                Lesson 3 of 5
              </p>
              <div className="bg-[#e7ebf3] h-[6px] absolute left-[19px] overflow-clip rounded-[3px] top-[106px] w-[392px]">
                <div className="bg-[#ffb700] h-[6px] absolute left-0 rounded-[3px] top-0 w-[235px]" />
              </div>
              <p className="font-sans font-normal leading-[1.45] absolute left-[19px] not-italic text-[#596579] text-[11px] top-[130px] whitespace-nowrap">
                Up next
              </p>
              <p className="font-sans font-medium leading-[1.45] absolute left-[19px] not-italic text-[#15203a] text-[14px] top-[152px] whitespace-nowrap">
                Build your learning routine
              </p>
              <div className="bg-[#000e53] flex h-[36px] items-center justify-center absolute left-[247px] overflow-clip rounded-[6px] top-[170px] w-[164px]">
                <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
                  Continue lesson
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ffb700] h-[100px] absolute left-[1078px] overflow-clip rounded-[12px] top-[500px] w-[266px]">
          <div className="font-sans font-semibold leading-[0] absolute left-[24px] not-italic text-[#000e53] text-[21px] top-[18px] whitespace-nowrap">
            <p className="leading-[1.45] mb-0">A little progress.</p>
            <p className="leading-[1.45]">Every day.</p>
          </div>
        </div>
      </div>

      {/* Learning principles */}
      <div className="bg-[#ffb700] h-[124px] overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-semibold leading-[1.45] absolute left-[72px] not-italic text-[#000e53] text-[20px] top-[29px] whitespace-nowrap">
          Find your direction.
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[72px] not-italic text-[#000e53] text-[14px] top-[65px] whitespace-nowrap">
          Explore what comes next.
        </p>
        <div className="absolute bg-[#c28b00] h-[68px] left-[480px] top-[28px] w-[1px]" />
        <p className="font-sans font-semibold leading-[1.45] absolute left-[520px] not-italic text-[#000e53] text-[20px] top-[29px] whitespace-nowrap">
          Build your momentum.
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[520px] not-italic text-[#000e53] text-[14px] top-[65px] whitespace-nowrap">
          Make time for learning.
        </p>
        <div className="absolute bg-[#c28b00] h-[68px] left-[928px] top-[28px] w-[1px]" />
        <p className="font-sans font-semibold leading-[1.45] absolute left-[968px] not-italic text-[#000e53] text-[20px] top-[29px] whitespace-nowrap">
          Keep moving forward.
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[968px] not-italic text-[#000e53] text-[14px] top-[65px] whitespace-nowrap">
          One step at a time.
        </p>
      </div>

      {/* Benefits */}
      <div className="bg-white h-[480px] leading-[1.45] not-italic overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-bold absolute left-[72px] text-[#596579] text-[12px] top-[58px] whitespace-nowrap">
          LEARNING, WITH LESS FRICTION
        </p>
        <p className="font-sans font-semibold absolute left-[72px] text-[#15203a] text-[38px] top-[88px] whitespace-nowrap">
          More focus. Fewer distractions.
        </p>
        <p className="font-sans font-normal absolute left-[72px] text-[#596579] text-[18px] top-[148px] whitespace-nowrap">
          A simpler starting point for the things that matter.
        </p>
        <div className="bg-[#f4f6fa] h-[208px] absolute left-[72px] overflow-clip rounded-[12px] top-[218px] w-[416px]">
          <p className="font-sans font-bold absolute left-[24px] text-[#000e53] text-[14px] top-[22px] whitespace-nowrap">
            01
          </p>
          <p className="font-sans font-semibold absolute left-[24px] text-[#15203a] text-[23px] top-[60px] whitespace-nowrap">
            Your courses, together
          </p>
          <p className="font-sans font-normal absolute left-[24px] text-[#596579] text-[16px] top-[106px] w-[368px] whitespace-nowrap">
            Spend less time looking around and more time finding the learning
            that matters to you.
          </p>
        </div>
        <div className="bg-[#f4f6fa] h-[208px] absolute left-[512px] overflow-clip rounded-[12px] top-[218px] w-[416px]">
          <p className="font-sans font-bold absolute left-[24px] text-[#000e53] text-[14px] top-[22px] whitespace-nowrap">
            02
          </p>
          <p className="font-sans font-semibold absolute left-[24px] text-[#15203a] text-[23px] top-[60px] whitespace-nowrap">
            A clear place to start
          </p>
          <p className="font-sans font-normal absolute left-[24px] text-[#596579] text-[16px] top-[106px] w-[368px] whitespace-nowrap">
            From exploring a course to returning to your account, know where to
            go next.
          </p>
        </div>
        <div className="bg-[#f4f6fa] h-[208px] absolute left-[952px] overflow-clip rounded-[12px] top-[218px] w-[416px]">
          <p className="font-sans font-bold absolute left-[24px] text-[#000e53] text-[14px] top-[22px] whitespace-nowrap">
            03
          </p>
          <p className="font-sans font-semibold absolute left-[24px] text-[#15203a] text-[23px] top-[60px] whitespace-nowrap">
            Your own learning space
          </p>
          <p className="font-sans font-normal absolute left-[24px] text-[#596579] text-[16px] top-[106px] w-[368px] whitespace-nowrap">
            Keep your profile and contact details organised, so you can focus on
            your next step.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#f4f6fa] h-[400px] overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-bold leading-[1.45] absolute left-[72px] not-italic text-[#596579] text-[12px] top-[54px] whitespace-nowrap">
          MAKE YOUR NEXT MOVE
        </p>
        <p className="font-sans font-semibold leading-[1.45] absolute left-[72px] not-italic text-[#15203a] text-[38px] top-[84px] whitespace-nowrap">
          A simple start. A steady rhythm.
        </p>
        <div className="absolute bg-[#cad2e2] h-[1px] left-[98px] top-[194px] w-[894px]" />
        <div className="bg-[#000e53] absolute left-[72px] overflow-clip rounded-[10px] size-[48px] top-[170px]">
          <p className="font-sans font-semibold leading-[1.45] absolute left-[14px] not-italic text-[16px] text-white top-[12px] whitespace-nowrap">
            01
          </p>
        </div>
        <p className="font-sans font-semibold leading-[1.45] absolute left-[72px] not-italic text-[#15203a] text-[24px] top-[244px] whitespace-nowrap">
          Create your account
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[72px] not-italic text-[#596579] text-[16px] top-[288px] w-[370px] whitespace-nowrap">
          Start with a profile that is yours.
        </p>
        <div className="bg-[#000e53] absolute left-[520px] overflow-clip rounded-[10px] size-[48px] top-[170px]">
          <p className="font-sans font-semibold leading-[1.45] absolute left-[14px] not-italic text-[16px] text-white top-[12px] whitespace-nowrap">
            02
          </p>
        </div>
        <p className="font-sans font-semibold leading-[1.45] absolute left-[520px] not-italic text-[#15203a] text-[24px] top-[244px] whitespace-nowrap">
          Explore a course
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[520px] not-italic text-[#596579] text-[16px] top-[288px] w-[370px] whitespace-nowrap">
          Find the right next step for your goals.
        </p>
        <div className="bg-[#000e53] absolute left-[968px] overflow-clip rounded-[10px] size-[48px] top-[170px]">
          <p className="font-sans font-semibold leading-[1.45] absolute left-[14px] not-italic text-[16px] text-white top-[12px] whitespace-nowrap">
            03
          </p>
        </div>
        <p className="font-sans font-semibold leading-[1.45] absolute left-[968px] not-italic text-[#15203a] text-[24px] top-[244px] whitespace-nowrap">
          Keep coming back
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[968px] not-italic text-[#596579] text-[16px] top-[288px] w-[370px] whitespace-nowrap">
          Make learning part of your routine.
        </p>
      </div>

      {/* Explore AKTIBO */}
      <div className="bg-white h-[440px] overflow-clip relative shrink-0 w-[1440px]">
        <div className="bg-[#000e53] h-[336px] absolute left-[72px] overflow-clip rounded-[16px] top-[52px] w-[632px]">
          <p className="font-sans font-bold leading-[1.45] absolute left-[32px] not-italic text-[#ffb700] text-[11px] top-[28px] whitespace-nowrap">
            EXPLORE AKTIBO
          </p>
          <div className="font-sans font-semibold leading-[0] absolute left-[32px] not-italic text-[34px] text-white top-[62px] whitespace-nowrap">
            <p className="leading-[1.45] mb-0">Make space for</p>
            <p className="leading-[1.45]">something new.</p>
          </div>
          <div className="font-sans font-normal leading-[0] absolute left-[32px] not-italic text-[#d1d8ee] text-[16px] top-[176px] whitespace-nowrap">
            <p className="leading-[1.45] mb-0">
              Your next chapter starts with curiosity.
            </p>
            <p className="leading-[1.45]">
              Take a look at the courses on AKTIBO.
            </p>
          </div>
          <div className="bg-[#ffb700] flex h-[52px] items-center justify-center absolute left-[32px] overflow-clip rounded-[8px] top-[252px] w-[188px]">
            <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
              Explore courses
            </p>
          </div>
        </div>
        <div className="bg-[#f4f6fa] h-[336px] absolute left-[736px] overflow-clip rounded-[16px] top-[52px] w-[632px]">
          <p className="font-sans font-bold leading-[1.45] absolute left-[32px] not-italic text-[#596579] text-[11px] top-[28px] whitespace-nowrap">
            FIND YOUR FIT
          </p>
          <div className="font-sans font-semibold leading-[0] absolute left-[32px] not-italic text-[#15203a] text-[34px] top-[62px] whitespace-nowrap">
            <p className="leading-[1.45] mb-0">Your goals.</p>
            <p className="leading-[1.45]">Your next step.</p>
          </div>
          <div className="font-sans font-normal leading-[0] absolute left-[32px] not-italic text-[#596579] text-[16px] top-[176px] whitespace-nowrap">
            <p className="leading-[1.45] mb-0">
              Review pricing before you get started
            </p>
            <p className="leading-[1.45]">and choose what works for you.</p>
          </div>
          <div className="bg-white border border-[#dee4ee] border-solid flex h-[52px] items-center justify-center absolute left-[32px] overflow-clip rounded-[8px] top-[252px] w-[174px]">
            <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
              View pricing
            </p>
          </div>
        </div>
      </div>

      {/* Common questions */}
      <div className="bg-[#f4f6fa] h-[448px] overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-bold leading-[1.45] absolute left-[72px] not-italic text-[#596579] text-[12px] top-[60px] whitespace-nowrap">
          A LITTLE CLARITY
        </p>
        <div className="font-sans font-semibold leading-[0] absolute left-[72px] not-italic text-[#15203a] text-[38px] top-[92px] whitespace-nowrap">
          <p className="leading-[1.45] mb-0">Before you</p>
          <p className="leading-[1.45]">get started.</p>
        </div>
        <div className="font-sans font-normal leading-[0] absolute left-[72px] not-italic text-[#596579] text-[17px] top-[220px] whitespace-nowrap">
          <p className="leading-[1.45] mb-0">A few helpful answers for</p>
          <p className="leading-[1.45]">your first steps on AKTIBO.</p>
        </div>
        <div className="absolute h-[112px] left-[536px] overflow-clip top-[56px] w-[832px]">
          <p className="font-sans font-semibold leading-[1.45] absolute left-0 not-italic text-[#15203a] text-[20px] top-[10px] whitespace-nowrap">
            How do I get started?
          </p>
          <p className="font-sans font-normal leading-[1.45] absolute left-0 not-italic text-[#596579] text-[16px] top-[49px] w-[800px] whitespace-nowrap">
            Choose Create an account, then complete your registration.
          </p>
          <div className="absolute bg-[#dee4ee] h-[1px] left-0 top-[110px] w-[832px]" />
        </div>
        <div className="absolute h-[112px] left-[536px] overflow-clip top-[168px] w-[832px]">
          <p className="font-sans font-semibold leading-[1.45] absolute left-0 not-italic text-[#15203a] text-[20px] top-[10px] whitespace-nowrap">
            Already have an account?
          </p>
          <p className="font-sans font-normal leading-[1.45] absolute left-0 not-italic text-[#596579] text-[16px] top-[49px] w-[800px] whitespace-nowrap">
            Use Log in to return to your AKTIBO account.
          </p>
          <div className="absolute bg-[#dee4ee] h-[1px] left-0 top-[110px] w-[832px]" />
        </div>
        <div className="font-sans font-normal leading-[1.45] absolute h-[112px] left-[536px] not-italic overflow-clip top-[280px] w-[832px] whitespace-nowrap">
          <p className="font-sans font-semibold absolute left-0 text-[#15203a] text-[20px] top-[10px] whitespace-nowrap">
            What if I forget my password?
          </p>
          <p className="font-sans font-normal absolute left-0 text-[#596579] text-[16px] top-[49px] w-[800px] whitespace-nowrap">
            Choose Forgot Password on the login page to request a reset link.
          </p>
        </div>
      </div>

      {/* Get started */}
      <div className="bg-[#000e53] h-[300px] overflow-clip relative shrink-0 w-[1440px]">
        <p className="font-sans font-bold leading-[1.45] absolute left-[72px] not-italic text-[#ffb700] text-[12px] top-[52px] whitespace-nowrap">
          YOUR NEXT CHAPTER
        </p>
        <p className="font-sans font-semibold leading-[1.45] absolute left-[72px] not-italic text-[44px] text-white top-[86px] whitespace-nowrap">
          Start small. Go further.
        </p>
        <p className="font-sans font-normal leading-[1.45] absolute left-[72px] not-italic text-[#d1d8ee] text-[18px] top-[164px] whitespace-nowrap">
          Make your next step a learning step with AKTIBO.
        </p>
        <Link
          to="/register"
          className="bg-[#ffb700] flex h-[56px] items-center justify-center absolute left-[1080px] overflow-clip rounded-[8px] top-[94px] w-[288px]"
        >
          <p className="font-sans font-semibold leading-[1.45] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
            Create an account
          </p>
        </Link>
        <p className="font-sans font-normal leading-[1.45] absolute left-[1128px] not-italic text-[#d1d8ee] text-[14px] top-[173px] whitespace-nowrap">
          Already registered? Log in
        </p>
      </div>

      {/* Footer */}
      <div className="bg-[#000e53] h-[194px] overflow-clip relative shrink-0 w-[1440px]">
        <div className="absolute bg-[#304074] h-[1px] left-[72px] top-0 w-[1296px]" />
        <div className="absolute flex gap-[12px] h-[48px] items-center left-[72px] overflow-clip top-[32px] w-[256px]">
          <div className="relative shrink-0 size-[40px]">
            <img
              src="/assets/aktibo-symbol.png"
              alt="AKTIBO symbol"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
          <p className="font-display font-normal leading-[normal] relative shrink-0 text-[18px] text-white whitespace-nowrap">
            AKTIBO LMS
          </p>
        </div>
        <p className="font-sans font-normal leading-[1.4] absolute left-[72px] not-italic text-[#d1d8ee] text-[14px] top-[94px] whitespace-nowrap">
          A more focused way to learn.
        </p>
        <div className="absolute flex gap-[12px] h-[44px] items-center left-[884px] overflow-clip top-[34px] w-[484px]">
          <div className="flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
            <p className="font-sans font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              Home
            </p>
          </div>
          <div className="flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
            <p className="font-sans font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              Courses
            </p>
          </div>
          <div className="flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
            <p className="font-sans font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              Pricing
            </p>
          </div>
          <Link
            to="/login"
            className="flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]"
          >
            <p className="font-sans font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              Log in
            </p>
          </Link>
        </div>
        <p className="font-sans font-normal leading-[1.4] absolute left-[1230px] not-italic text-[#d1d8ee] text-[14px] top-[94px] whitespace-nowrap">
          Learning, with focus.
        </p>
      </div>
    </div>
  );
}
