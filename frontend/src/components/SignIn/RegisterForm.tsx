import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  RegisterUserSchema,
  type RegisterUserSchemaType,
} from "../../validation/RegsiterValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../ui/Loader";
import { useAuth } from "../../hooks/useAuth";
// import { useAuthContext } from "../../context/AuthProvider";
import ErrorMessage from "./errormessage";
type Role = "guest" | "staff" | "admin";
type teamCategoryProps = "Fire" | "Security" | "Maintenance" | "Medical";
const roles: { id: Role; icon: string; label: string; desc: string }[] = [
  {
    id: "guest",
    icon: "🏨",
    label: "Guest",
    desc: "Report emergencies from your room",
  },
  {
    id: "staff",
    icon: "👮",
    label: "Staff",
    desc: "Manage and respond to incidents",
  },
  {
    id: "admin",
    icon: "⚙️",
    label: "Admin",
    desc: "Full system access and analytics",
  },
];

const staffTeams: { id: teamCategoryProps; icon: string; label: string }[] = [
  { id: "Security", icon: "🛡️", label: "Security" },
  { id: "Medical", icon: "🏥", label: "Medical" },
  { id: "Maintenance", icon: "🔧", label: "Maintenance" },

  { id: "Fire", icon: "🛎️", label: "Reception" },
];

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const { signUp, isLoading, insertProfilesData } = useAuth();

  const onSubmit: SubmitHandler<RegisterUserSchemaType> = async (userData) => {
    if (role === "staff" && teamCategory === null) {
      alert("Enter Team Category");
      return;
    }
    await signUp(userData.email, userData.password, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      role,
      roomNumber: userData.roomNumber,
    });

    const userProfile = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      role,
      roomNumber: userData.roomNumber,
      team_category: teamCategory,
      staff_status: role === "staff" ? "online" : null,
    };

    await insertProfilesData(userProfile);
  };

  const [role, setRole] = useState<Role>("guest");
  const [teamCategory, setTeamCategory] = useState<teamCategoryProps | null>(
    null,
  );
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <Loader
        fullscreen
        bg="mesh"
        variant="orbital"
        text="Setting up your account"
      />
    );
  }

  return (
    <div className="max-w-[800px] p-6 px-10 border h-[720px] border-border-focus bg-base-raised rounded-r-2xl">
      <div>
        <h3 className="text-white text-lg font-sans font-medium tracking-normal">
          Create your account
        </h3>
        <p className="text-text-secondary brightness-125 font-sans text-xs font-medium tracking-wide mt-2 mb-2">
          Select your role to get started
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-7">
        {roles.map(({ id, icon, label, desc }) => (
          <button
            key={id}
            type="button"
            onClick={() => setRole(id)}
            className={`
              flex flex-col items-center justify-center gap-2
              py-6 px-4 rounded-xl border text-center
              transition-all duration-150 cursor-pointer
              ${
                role === id
                  ? "bg-critical-muted border-critical"
                  : "bg-surface border-border hover:border-border-strong  hover:bg-surface-raised"
              }
            `}
          >
            <span className="text-2xl leading-none">{icon}</span>
            <span
              className={`font-sans font-semibold text-sm ${
                role === id ? "text-critical" : "text-text-primary"
              }`}
            >
              {label}
            </span>
            <span className="font-mono text-[10px] text-text-faint leading-relaxed">
              {desc}
            </span>
          </button>
        ))}
      </div>

      {role === "staff" && (
        <div className="mb-7">
          <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-3">
            Select your team
          </p>
          <div className="flex flex-wrap gap-2">
            {staffTeams.map(({ id, icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTeamCategory(id)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl border
                  font-mono text-xs font-medium transition-all duration-150 cursor-pointer
                  ${
                    teamCategory === id
                      ? "bg-critical-muted border-critical text-critical"
                      : "bg-surface border-border text-text-secondary hover:border-border-strong hover:bg-surface-raised hover:text-text-primary"
                  }
                `}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              placeholder="Jaya"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
            {errors.firstName && (
              <ErrorMessage message={errors?.firstName?.message as string} />
            )}
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Patel"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
            {errors.lastName && (
              <ErrorMessage message={errors?.lastName?.message as string} />
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="jpatel@grandmumbai.com"
            className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
          />
          {errors.email && (
            <ErrorMessage message={errors?.email?.message as string} />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
            {errors.password && (
              <ErrorMessage message={errors?.password?.message as string} />
            )}
          </div>

          <div>
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
              className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
            />
            {errors.confirmPassword && (
              <ErrorMessage
                message={errors?.confirmPassword?.message as string}
              />
            )}
          </div>
        </div>
        {role !== "guest" ? (
          ""
        ) : (
          <div className="mb-8">
            <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
              Hotel Room Number
            </label>
            <div className="flex items-stretch bg-surface-raised border border-border rounded-xl overflow-hidden focus-within:border-critical transition-colors">
              <input
                {...register("roomNumber")}
                type="number"
                placeholder="Ex 402"
                className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to login
          </button>

          <button
            type="submit"
            onClick={() => console.log(errors)}
            className="bg-critical text-white font-mono font-semibold text-sm tracking-widest rounded-xl py-3.5 px-8 flex items-center gap-2 hover:bg-[#e82020] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,59,59,0.25)] hover:shadow-[0_8px_24px_rgba(255,59,59,0.35)] transition-all duration-200 active:translate-y-0"
          >
            Create account
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="text-center font-mono text-xs text-text-secondary">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-critical hover:underline"
          >
            Sign in here
          </button>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;

// import { useState } from "react";
// import { useForm, type SubmitHandler } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import {
//   RegisterUserSchema,
//   type RegisterUserSchemaType,
// } from "../../validation/RegsiterValidation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Loader from "../ui/Loader";
// import { useAuth } from "../../hooks/useAuth";
// // import { useAuthContext } from "../../context/AuthProvider";
// import ErrorMessage from "./errormessage";
// type Role = "guest" | "staff" | "admin";

// const roles: { id: Role; icon: string; label: string; desc: string }[] = [
//   {
//     id: "guest",
//     icon: "🏨",
//     label: "Guest",
//     desc: "Report emergencies from your room",
//   },
//   {
//     id: "staff",
//     icon: "👮",
//     label: "Staff",
//     desc: "Manage and respond to incidents",
//   },
//   {
//     id: "admin",
//     icon: "⚙️",
//     label: "Admin",
//     desc: "Full system access and analytics",
//   },
// ];

// type StaffTeam = "security" | "medical" | "maintenance" | "fire" | "reception";

// const staffTeams: { id: StaffTeam; icon: string; label: string }[] = [
//   { id: "security", icon: "🛡️", label: "Security" },
//   { id: "medical", icon: "🏥", label: "Medical" },
//   { id: "maintenance", icon: "🔧", label: "Maintenance" },

//   { id: "reception", icon: "🛎️", label: "Reception" },
// ];

// function RegisterForm() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<RegisterUserSchemaType>({
//     resolver: zodResolver(RegisterUserSchema),
//   });

//   const { signUp, isLoading, insertProfilesData } = useAuth();

//   const onSubmit: SubmitHandler<RegisterUserSchemaType> = async (userData) => {
//     if (role === "staff" && staffTeam === null) {
//       alert("Enter Your Team");
//       return;
//     }
//     await signUp(userData.email, userData.password, {
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       role,
//       roomNumber: userData.roomNumber,
//     });

//     const userProfile = {
//       firstName: userData.firstName,
//       lastName: userData.lastName,
//       role,
//       roomNumber: userData.roomNumber,
//       ...(role === "staff" && { staffTeam }),
//       team_category: staffTeam,
//     };

//     console.log(userProfile);

//     await insertProfilesData(userProfile);
//   };

//   const [role, setRole] = useState<Role>("guest");
//   const [staffTeam, setStaffTeam] = useState<StaffTeam | null>(null);
//   const navigate = useNavigate();
//   if (isLoading) {
//     return (
//       <Loader
//         fullscreen
//         bg="mesh"
//         variant="orbital"
//         text="Setting up your account"
//       />
//     );
//   }

//   return (
//     <div className="max-w-[800px] p-6 px-10 border h-[720px] border-border-focus  bg-base-raised rounded-r-2xl">
//       <div>
//         <h3 className="text-white text-lg font-sans font-medium tracking-normal">
//           Create your account
//         </h3>
//         <p className="text-text-secondary brightness-125 font-sans text-xs font-medium tracking-wide mt-2 mb-2">
//           Select your role to get started
//         </p>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-7">
//         {roles.map(({ id, icon, label, desc }) => (
//           <button
//             key={id}
//             type="button"
//             onClick={() => setRole(id)}
//             className={`
//               flex flex-col items-center justify-center gap-2
//               py-6 px-4 rounded-xl border text-center
//               transition-all duration-150 cursor-pointer
//               ${
//                 role === id
//                   ? "bg-critical-muted border-critical"
//                   : "bg-surface border-border hover:border-border-strong  hover:bg-surface-raised"
//               }
//             `}
//           >
//             <span className="text-2xl leading-none">{icon}</span>
//             <span
//               className={`font-sans font-semibold text-sm ${
//                 role === id ? "text-critical" : "text-text-primary"
//               }`}
//             >
//               {label}
//             </span>
//             <span className="font-mono text-[10px] text-text-faint leading-relaxed">
//               {desc}
//             </span>
//           </button>
//         ))}
//       </div>

//       {role === "staff" && (
//         <div className="mb-7">
//           <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest mb-3">
//             Select your team
//           </p>
//           <div className="flex flex-wrap gap-2">
//             {staffTeams.map(({ id, icon, label }) => (
//               <button
//                 key={id}
//                 type="button"
//                 onClick={() => setStaffTeam(id)}
//                 className={`
//                   flex items-center gap-2 px-4 py-2 rounded-xl border
//                   font-mono text-xs font-medium transition-all duration-150 cursor-pointer
//                   ${
//                     staffTeam === id
//                       ? "bg-critical-muted border-critical text-critical"
//                       : "bg-surface border-border text-text-secondary hover:border-border-strong hover:bg-surface-raised hover:text-text-primary"
//                   }
//                 `}
//               >
//                 <span>{icon}</span>
//                 <span>{label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//               First Name
//             </label>
//             <input
//               {...register("firstName")}
//               type="text"
//               placeholder="Jaya"
//               className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
//             />
//             {errors.firstName && (
//               <ErrorMessage message={errors?.firstName?.message as string} />
//             )}
//           </div>

//           <div>
//             <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//               Last Name
//             </label>
//             <input
//               {...register("lastName")}
//               type="text"
//               placeholder="Patel"
//               className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
//             />
//             {errors.lastName && (
//               <ErrorMessage message={errors?.lastName?.message as string} />
//             )}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//             Email Address
//           </label>
//           <input
//             {...register("email")}
//             type="email"
//             placeholder="jpatel@grandmumbai.com"
//             className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
//           />
//           {errors.email && (
//             <ErrorMessage message={errors?.email?.message as string} />
//           )}
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//               Password
//             </label>
//             <input
//               {...register("password")}
//               type="password"
//               placeholder="••••••••"
//               className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
//             />
//             {errors.password && (
//               <ErrorMessage message={errors?.password?.message as string} />
//             )}
//           </div>

//           <div>
//             <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//               Confirm Password
//             </label>
//             <input
//               {...register("confirmPassword")}
//               type="password"
//               placeholder="••••••••"
//               className="w-full bg-surface-raised border border-border rounded-xl px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint focus:border-critical transition-colors"
//             />
//             {errors.confirmPassword && (
//               <ErrorMessage
//                 message={errors?.confirmPassword?.message as string}
//               />
//             )}
//           </div>
//         </div>

//         {role === "guest" ? (
//           <div className="mb-8">
//             <label className="font-mono text-[10px] text-text-secondary uppercase tracking-widest block mb-2">
//               Hotel Room Number
//             </label>

//             <div className="flex items-stretch bg-surface-raised border border-border rounded-xl overflow-hidden focus-within:border-critical transition-colors">
//               <input
//                 {...register("roomNumber")}
//                 type="number"
//                 placeholder="Ex 402"
//                 className="flex-1 bg-transparent px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-faint"
//               />
//             </div>
//           </div>
//         ) : (
//           ""
//         )}

//         <div className="flex items-center justify-between mb-5">
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="flex items-center gap-2 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors"
//           >
//             <svg
//               width="13"
//               height="13"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M19 12H5M12 19l-7-7 7-7" />
//             </svg>
//             Back to login
//           </button>

//           <button
//             type="submit"
//             onClick={() => console.log(errors)}
//             className="bg-critical text-white font-mono font-semibold text-sm tracking-widest rounded-xl py-3.5 px-8 flex items-center gap-2 hover:bg-[#e82020] hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,59,59,0.25)] hover:shadow-[0_8px_24px_rgba(255,59,59,0.35)] transition-all duration-200 active:translate-y-0"
//           >
//             Create account
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         <p className="text-center font-mono text-xs text-text-secondary">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-critical hover:underline"
//           >
//             Sign in here
//           </button>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default RegisterForm;
