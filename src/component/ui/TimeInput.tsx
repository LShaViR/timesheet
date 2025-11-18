import React, { useState, useRef, ChangeEventHandler } from "react";

export default function TimeInput({
  value = 0,
  onChange,
}: {
  value?: number;
  onChange: (value: number) => void;
}) {
  const [error, setError] = useState("");
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const validateAndSetHours = (hours: string) => {
    const numValue = parseInt(hours);
    if (hours === "") {
      onChange(value % 60);
      setError("");
      return true;
    }
    if (numValue >= 0 && numValue <= 23) {
      onChange((value % 60) + numValue * 60);
      return true;
    } else {
      setError("Hours must be between 00 and 23");
      return false;
    }
  };

  const validateAndSetMinutes = (minutes: string) => {
    const numValue = parseInt(minutes);
    if (minutes === "") {
      onChange(Math.floor(value / 60));
      setError("");
      return true;
    }
    if (numValue >= 0 && numValue <= 59) {
      onChange(numValue + Math.floor(value / 60));
      setError("");
      return true;
    } else {
      setError("Minutes must be between 00 and 59");
      return false;
    }
  };

  const handleHoursChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value1 = e.target.value.replace(/\D/g, "");
    if (validateAndSetHours(value1) && value1.length === 2) {
      minutesRef.current?.focus();
    }
  };

  const handleMinutesChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    validateAndSetMinutes(value);
  };
  return (
    <div
      role="group"
      aria-labelledby="hours-input"
      className={`inline-flex items-center gap-1 px-2 py-2 border-2 rounded-lg transition-all ${error
          ? "border-red-500 bg-red-50"
          : "border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
        }`}
    >
      <input
        ref={hoursRef}
        id="hours-input"
        type="text"
        inputMode="numeric"
        placeholder="HH"
        value={Math.floor(value / 60).toString()}
        onChange={handleHoursChange}
        maxLength={2}
        className="w-6 text-lg font-mono text-center focus:outline-none bg-transparent"
        aria-label="Hours"
        aria-describedby={error ? "time-error" : undefined}
        aria-invalid={error ? "true" : "false"}
      />

      <span className="text-lg font-bold text-gray-400" aria-hidden="true">
        :
      </span>

      <input
        ref={minutesRef}
        id="minutes-input"
        type="text"
        inputMode="numeric"
        placeholder="MM"
        value={(value % 60).toString()}
        onChange={handleMinutesChange}
        maxLength={2}
        className="w-6 text-lg font-mono text-center focus:outline-none bg-transparent"
        aria-label="Minutes"
        aria-describedby={error ? "time-error" : undefined}
        aria-invalid={error ? "true" : "false"}
      />
    </div>
  );
}
