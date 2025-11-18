"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import TimeInput from "@/component/ui/TimeInput";
import { Controller, useForm } from "react-hook-form";
import { useProject } from "@/provider/ProjectProvider";
import { redirect } from "next/navigation";

type Inputs = {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  satarday: number;
  sunday: number;
};

function Page() {
  const getMonday = (input: string | Date) => {
    const date =
      typeof input === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input)
        ? new Date(input + "T00:00:00")
        : new Date(input);
    // normalize to local midnight first to avoid timezone drift
    date.setHours(0, 0, 0, 0);

    const day = date.getDay(); // 0 (Sun) .. 6 (Sat)
    const diff = date.getDate() - day + (day === 0 ? -6 : 2); // shift to Monday
    const monday = new Date(date); // copy so original isn't mutated further
    monday.setDate(diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const projectCtx = useProject();
  if (!projectCtx || !projectCtx.project) {
    redirect("/project");
  }
  const startValue = getMonday(new Date()).toISOString().split("T")[0];
  const [start, setStart] = useState(startValue);
  const [formData, setFormData] = useState({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    satarday: 0,
    sunday: 0,
  });

  const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
  const fullDay = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "satarday",
    "sunday",
  ];

  const dateFormat = (start: string, dayOffset: number, formatStr?: string) => {
    const d = new Date(start);
    d.setDate(d.getDate() + dayOffset);
    return format(d, formatStr ?? "dd MMM");
  };

  const end = dateFormat(start, 6, "yyyy-MM-dd");
  const projectName = "project name";

  const totalHours = Object.values(formData).reduce(
    (agg, value) => agg + value,
    0,
  );

  const onSubmit = async () => {
    alert(
      JSON.stringify({
        ...formData,
        date: `${start}_${end}`,
        projectId: projectId,
      }),
    );

    setFormData({
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      satarday: 0,
      sunday: 0,
    });
  };

  const handleLeftPrev = () => {
    const d = getMonday(new Date(start));
    d.setDate(d.getDate() - 7);
    setStart(d.toISOString().split("T")[0]);
  };

  const handleLeftNext = () => {
    const d = new Date(start);
    d.setDate(d.getDate() + 7);
    setStart(d.toISOString().split("T")[0]);
  };
  const handleChange = (field: string) => {
    return (value: number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  };

  return (
    <div className="p-4 border border-black rounded-lg flex flex-col gap-8 w-full overflow-x-auto">
      <div className="text-2xl font-bold w-full">{projectName}</div>
      <div className="flex justify-between w-full">
        <button
          type="button"
          className="block bg-white"
          onClick={handleLeftPrev}
        >
          <ArrowLeft />
        </button>
        <div className="block">
          {start} to {end}
        </div>
        <button
          type="button"
          className="block bg-white"
          onClick={handleLeftNext}
        >
          <ArrowRight />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="w-full flex flex-col gap-8">
          <div className="p-6 py-12 w-full border rounded overflow-x-auto w-full">
            <div className="flex justify-between space-x-3">
              <div className="flex flex-col gap-12 items-start justify-between mr-10">
                <div className="font-semibold">Day</div>
                <div className="font-semibold">Time</div>
              </div>
              {days.map((day, index) => {
                return (
                  <div className="flex flex-col gap-12 items-start">
                    <div className="flex flex-col">
                      <span>{day}</span>
                      <span>{dateFormat(start, index)}</span>
                    </div>
                    <div>
                      <TimeInput
                        value={formData[fullDay[index] as keyof Inputs]}
                        onChange={handleChange(fullDay[index])}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              Total Hours: <TimeInput value={totalHours} onChange={() => { }} />
            </div>
            <div>
              <button
                className="bg-blue-700 text-white px-8 py-3 rounded-lg"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
