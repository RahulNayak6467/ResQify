import { useRef } from "react";
import CTASection from "../components/LandingPage/CTA";
import DashboardMockup from "../components/LandingPage/DashboardMockup";
import Features from "../components/LandingPage/Features";
// import Card from "../components/LandingPage/FeaturesCard";

import Navbar from "../components/LandingPage/navbar";

import ProcessSection from "../components/LandingPage/ProcessSteps";
import RolesSection from "../components/LandingPage/RoleSection";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import ReactLenis from "lenis/react";
// import { children, fadeOut } from "../constants/animation";
// constants/features.ts

const fadeOut: Variants = {
  //   initial: {
  //     y: 30,
  //     opacity: 0,
  //   },
  //   final: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       staggerChilren: 0.1,
  //       delay: 1,
  //       duration: 1,
  //       stagger: 0.1,
  //     },
  //     ease: "easeIn",
  //   },
  initial: { opacity: 0 },
  final: {
    opacity: 1,
    transition: {
      duration: 3,
      staggerChildren: 0.6,
    },
  },
};

const children: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

function LandingPage() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start end", "end start"],
  });

  const transformed = useTransform(scrollYProgress, [0, 0.5], [1.2, 1]);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      <main className="bg-background min-h-screen relative overflow-x-hidden">
        {/* <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-100"></div> */}

        <Navbar />
        <div className="inset-0 fixed  z-1 h-50 w-70 blur-[250px]  bg-resolved   top-50 -left-30  "></div>
        <div className="inset-0 fixed z-1 h-40 w-700 blur-[500px] bg-accent top-10 left-[50%] "></div>
        <div className="inset-0 fixed z-1 h-30 w-100 blur-[500px] bg-critical  top-200  left-[35%]"></div>
        <section className="fixed inset-0 z-10 grid-pattern"></section>
        <motion.div
          variants={fadeOut}
          initial={"initial"}
          animate={"final"}
          className="mt-48 mx-auto max-w-7xl   h-fit  "
        >
          <div className="flex w-full justify-center mt-2">
            <motion.div
              variants={children}
              className="flex items-center gap-2 px-4 py-2 bg-resolved-muted w-fit rounded-full border border-resolved-border "
            >
              <span className="h-2 w-2 rounded-full bg-resolved border border-resolved-border  shadow-[0_0_20px_rgba(0,217,126,1)]"></span>
              <p className="text-resolved text-xs  font-black">
                AI-Powered Emergency Response
              </p>
            </motion.div>
          </div>
          <motion.div variants={children} className="text-center  mt-10">
            <h1 className="text-6xl font-sans tracking-wide font-black">
              Hotel Safety
            </h1>
            <h1 className="text-6xl font-sans tracking-wider font-black bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent ">
              Reimagined
            </h1>
            <p className="text-md text-center w-150 mt-4 mx-auto text-text-secondary brightness-150 tracking-wider ">
              Real-time crisis detection, intelligent alerting, and coordinated
              response — all powered by AI. Keep every guest safe, every second.
            </p>
          </motion.div>
          <motion.div
            ref={dashboardRef}
            variants={children}
            className="w-4xl mx-auto mt-48"
            style={{ scale: transformed }}
          >
            <DashboardMockup />
          </motion.div>
          <div className="flex justify-around w-3xl mx-auto mt-12">
            <div className="flex flex-col justify-center items-center">
              <span className="bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent text-3xl">
                1.2s
              </span>
              <span className="text-text-secondary brightness-150 uppercase font-sans font-normal tracking-wider text-xs">
                Avg response
              </span>
            </div>
            <div className="flex flex-col justify-center items-center ">
              <span className="bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent text-3xl">
                99.9%
              </span>
              <span className="text-text-secondary brightness-150 uppercase font-sans font-normal tracking-wider text-xs">
                uptime
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent text-3xl">
                24/7
              </span>
              <span className="text-text-secondary brightness-150 uppercase font-sans font-normal tracking-wider text-xs">
                monitoring
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="bg-gradient-to-r from-resolved to-accent pb-2 bg-clip-text text-transparent text-3xl">
                3
              </span>
              <span className="text-text-secondary brightness-150 uppercase font-sans font-normal tracking-wider text-xs">
                role dashboards
              </span>
            </div>
          </div>
        </motion.div>
        {/* <div className="mt-12">
        <Marquee />
        </div> */}
        <Features />
        <ProcessSection />
        <RolesSection />
        <CTASection />
      </main>
    </ReactLenis>
  );
}

export default LandingPage;

//bg-[linear-gradient(135deg,#fff_0%,#e8eaf0_40%,#00e5a0_100%)]
