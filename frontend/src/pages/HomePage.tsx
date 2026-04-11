import { LogOut } from "lucide-react";
import Hero from "../components/ui/hero";
import ReportForm from "../components/ui/ReportForm";
import ResQifyLogo from "../components/ui/ResqifyIcon";
import Loader from "../components/ui/Loader";
import { useAuth } from "../hooks/useAuth";
// import useAuth from "../";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { UserQuerySchema } from "../validation/guestQueryValidation";

function HomePage() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm({
  //     resolver: zodResolver(UserQuerySchema),
  //   });
  const { signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  if (isLoading) {
    return <Loader fullscreen bg="mesh" variant="orbital" text="Logging out" />;
  }
  return (
    <section className="">
      <div className="flex gap-2 items-center p-2 border-b-2 border-b-border w-full">
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="flex gap-2 items-center">
              <ResQifyLogo className="w-15 h-15 rounded-full" />

              <div className="flex flex-col">
                <h1 className="text-3xl text-white font-sans font-black">
                  <span className="text-critical font-sans">ResQ</span>
                  ify
                </h1>
                <p className="text-[10px] text-text-secondary brightness-130  font-sans font-light mt-1">
                  EMERGENCY RESPONSE SYSTEM
                </p>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleSignOut()}
              className="flex items-center gap-2 font-mono text-xs font-semibold tracking-widest uppercase text-critical border border-critical/25 rounded-xl px-6 py-2.5 hover:border-critical hover:text-white hover:bg-critical/10 hover:shadow-[0_0_16px_rgba(255,59,59,0.2)] transition-all duration-200"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <Hero />
        <ReportForm />
      </div>
    </section>
  );
}

export default HomePage;
