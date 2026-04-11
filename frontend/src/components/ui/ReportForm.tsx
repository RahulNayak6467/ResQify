import { useNavigate } from "react-router-dom";
import { EMERGENCY_TYPES } from "../../constants/emergency_types";
import EmergencyTypes from "./emergencytypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserQuerySchema } from "../../validation/guestQueryValidation";
import { useState } from "react";
import ErrorMessage from "../SignIn/errormessage";
import useClassify from "../../hooks/useClassify";

function ReportForm() {
  const navigate = useNavigate();
  const [emergencyType, setEmergencyType] = useState<string>("");
  const { classifyIncident } = useClassify();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserQuerySchema),
  });
  const onSubmit = async (userQuery) => {
    if (!emergencyType) {
      alert("Enter a emergencyType");
      return;
    }
    const userQueryData = {
      roomNumber: userQuery.roomNumber,
      name: userQuery.Name,
      description: userQuery.description,
      emergencyType,
    };

    console.log(userQueryData);

    const result = await classifyIncident(userQueryData);
    console.log(result);
  };
  return (
    <section className="bg-base-raised w-[550px] h-[580px] mx-auto border border-border-strong rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8  bg-base-raised rounded-2xl border-border-strong"
      >
        <div className="flex flex-col ">
          <label
            htmlFor="room-number"
            className="text-text-secondary text-[10px] uppercase"
          >
            Room number
          </label>
          <div className="flex gap-2 mt-2">
            <input
              {...register("roomNumber")}
              className="py-1.5 px-4 w-30 border border-border-strong"
              type="number"
              placeholder="e.g. 412"
            />
            {errors.roomNumber && (
              <ErrorMessage message={errors?.roomNumber?.message as string} />
            )}
            <input
              {...register("Name")}
              className="py-1.5  px-4 border border-border-strong w-full"
              type="text"
              placeholder="Your name (optional)"
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            htmlFor="emergency-type"
            className="text-text-secondary text-[10px] uppercase "
          >
            Emergency type
          </label>
          <div className="grid grid-cols-3 gap-x-4 gap-y-2 ">
            {EMERGENCY_TYPES.map((emergency) => (
              <EmergencyTypes
                emergencyType={emergencyType}
                setEmergencyType={setEmergencyType}
                key={emergency.label}
                icon={emergency.icon}
                label={emergency.label}
              />
            ))}
          </div>
          <div>
            <p className="text-xs font-bold mt-4 font-mono uppercase text-text-faint">
              Describe the situation
            </p>
            <input
              {...register("description")}
              type="text"
              placeholder="e.g. My roommate is having trouble breathing "
              className="w-full bg-surface pb-30 text-xs px-4 py-4 mt-2 border-border-strong"
            />
            {errors.description && (
              <ErrorMessage message={errors?.description?.message as string} />
            )}
            <div className="mt-8">
              <button
                // onClick={() => naviagte("/reported")}
                type="submit"
                className="text-text-primary font-bold w-full text-center py-2  flex justify-center gap-2 items-center bg-critical rounded-xl cursor-pointer hover:shadow-critical "
              >
                <span>🚨</span>
                <p className="text-center">Send Emergency Alert</p>
              </button>
            </div>
          </div>
        </div>
      </form>
      <p className="text-xs font-mono w-100 mx-auto  mt-6">
        <span className="text-critical   ">
          For life-threatening emergencies
        </span>
        <span className="ml-1">
          always call 112 / 911 first. This system notifies hotel staff in
        </span>
        parallel.
      </p>
    </section>
  );
}

export default ReportForm;
