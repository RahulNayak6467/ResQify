import { motion, type Variants } from "motion/react";

const fadeIn: Variants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  final: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

function Navbar() {
  return (
    <motion.header
      variants={fadeIn}
      initial={"initial"}
      animate={"final"}
      className="bg-transparent  fixed w-full backdrop-blur-3xl z-999  top-0"
    >
      <div className="flex items-center justify-between px-8 ">
        <div className=" flex items-center  gap-2">
          <p className="h-3 w-3 rounded-full bg-resolved border border-resolved-border  shadow-[0_0_20px_rgba(0,217,126,1)]"></p>
          <p className="text-2xl text-white font-black tracking-wide font-sans ">
            ResQify
          </p>
        </div>
        <nav className="p-4">
          <ul className="flex gap-8 items-center">
            <li>
              <a className="text-sm text-text-secondary brightness-150" href="">
                Features
              </a>
            </li>
            <li>
              <a className="text-sm text-text-secondary brightness-150" href="">
                How it Works
              </a>
            </li>
            <li>
              <a className="text-sm text-text-secondary brightness-150" href="">
                Roles
              </a>
            </li>
            <li>
              <button className="text-black bg-resolved font-black text-[14px] px-4  py-1.5 border border-resolved-border rounded-lg  shadow-[0_0px_35px_rgba(0,217,126,0.8)]">
                Get started
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </motion.header>
  );
}

export default Navbar;
