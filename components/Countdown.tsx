"use client";
import { useEffect, useState } from "react";
function diff(target: Date) {
  const now = Date.now(),
    t = target.getTime(),
    ms = Math.max(0, t - now);
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}
export default function Countdown({ date = "2025-09-27T11:00:00+07:00" }) {
  const [t, setT] = useState(() => diff(new Date(date)));
  useEffect(() => {
    const id = setInterval(() => setT(diff(new Date(date))), 1000);
    return () => clearInterval(id);
  }, [date]);
  const item = (label: string, val: number) => (
    <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl glass">
      <div className="text-2xl font-semibold">
        {val.toString().padStart(2, "0")}
      </div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  );
  return (
    <div className="glass rounded-2xl p-4 flex items-center justify-center gap-3">
      {item("Ngày", t.d)}
      {item("Giờ", t.h)}
      {item("Phút", t.m)}
      {item("Giây", t.s)}
    </div>
  );
}
