import { Book } from "lucide-react";
import { motion } from "motion/react";

interface Feature {
  icon: typeof Book;
  iconColor?: string;
  iconBg: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  tabBg: string;
}

const assignColor = (iconBg: string) => {
  switch (iconBg) {
    case "#00d97e10":
      return "text-resolved";

    case "#ff3b3b10":
      return "text-critical";

    case "#4a9eff10":
      return "text-accent";

    case "#ffaa0010":
      return "text-moderate";

    default:
      return "text-resolved";
  }
};

const container = {
  initial: {
    opacity: 0,
    transition: {
      staggerChildren: 1,
    },
  },
  show: {
    opacity: 1,
  },
};

function Card({
  title,
  desc,
  tag,
  icon: Icon,

  iconBg,
  tagColor,
  tabBg,
}: Feature) {
  return (
    <motion.div
      variants={container}
      initial={"initial"}
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className="bg-[#0D0F15] w-full p-6 rounded-2xl  border border-border border-t-2 hover:border-resolved-border   cursor-pointer hover:border-t-resolved  transition-all relative z-50"
    >
      <div
        style={{ backgroundColor: iconBg }}
        className={`w-fit p-3  rounded-2xl`}
      >
        <Icon className={assignColor(iconBg)} />
      </div>
      <motion.div>
        <h3 className="text-white text-lg mt-4 font-sans font-black tracking-wide">
          {title}
        </h3>
      </motion.div>
      <motion.div>
        <p className="mt-2 text-[14px] text-text-secondary brightness-150 w-70 leading-5">
          {desc}
        </p>
      </motion.div>
      <motion.div>
        <p
          className={`w-fit mt-6 uppercase font-bold ${tagColor} ${tabBg}  px-4 py-0.5  text-[10px] rounded-full`}
        >
          {tag}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Card;
