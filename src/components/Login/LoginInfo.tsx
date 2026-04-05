import StatCard from "../StatCard";
import ResQifyLogo from "../ui/ResqifyIcon";
import AuthStats from "./AuthStats";
import Circle from "./Circle";
import RecentActivity from "./RecentActivity";

function LoginInfo() {
  return (
    <div className=" bg-base border border-border-strong rounded-l-2xl p-6 px-8  w-[500px]  h-full">
      <div className=" shrink-0 ">
        <div className="flex flex-col gap-8">
          <div className="flex -ml-3 items-center">
            <ResQifyLogo className="w-14 h-14 rounded-full" />
            <h1 className="text-3xl text-white font-sans font-black">
              <span className="text-critical font-sans">ResQ</span>
              ify
            </h1>
          </div>
          <div className="flex items-center  gap-2 bg-critical-muted border border-critical-border px-3 py-0.5 w-fit rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-critical animate-blink"></span>
            <span className="uppercase text-[11px] text-critical tracking-wider font-mono">
              system live
            </span>
          </div>
          <div>
            <div className=" gap-10 items-start">
              <div>
                <h3 className="text-white text-3xl font-sans font-black tracking-tight">
                  Every second
                  <br />
                  counts
                  <br />
                  <span className="text-3xl text-critical font-sans font-medium tracking-normal">
                    Respond now
                  </span>
                </h3>
              </div>
              {/* <div className="-mt-20">
                <Circle />
              </div> */}
              <div className="">
                <Circle />
              </div>
            </div>
            <p className="text-text-faint font-mono font-medium tracking-wider text-xs leading-5 w-100 mt-4">
              AI-powered incident classification and real-time dispatch. Every
              second counts ResQify makes sure the right team reaches the right
              room instantly
            </p>
          </div>
          {/* <div>
            <AuthStats />
          </div> */}
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
    //   <div>
    //     <Circle />
    //   </div>
  );
}

export default LoginInfo;
