import Hero from "../components/ui/hero";
import ReportForm from "../components/ui/ReportForm";
import ResQifyLogo from "../components/ui/ResqifyIcon";

function HomePage() {
  return (
    <section className="">
      <div className="flex gap-2 items-center p-2 border-b-2 border-b-border">
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

      <div className="mt-12 flex flex-col gap-8">
        <Hero />
        <ReportForm />
      </div>
    </section>
  );
}

export default HomePage;
