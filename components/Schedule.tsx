"use client";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const EVENT = {
  hour: "11h00",
  weekday: "THỨ 7",
  date: 27,
  month: 9,
  year: 2025,
  lunarNote: "(Nhầm Ngày 06 Tháng 08 Năm Ất Tỵ)",
};

function buildCalendar(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  const iso = (d: Date) => (d.getDay() === 0 ? 7 : d.getDay());
  const leading = iso(first) - 1;
  const days = last.getDate();
  const cells = leading + days;
  const rows = Math.ceil(cells / 7);
  const grid: Array<Array<{ day: number | null }>> = [];
  let cur = 1 - leading;
  for (let r = 0; r < rows; r++) {
    const row: Array<{ day: number | null }> = [];
    for (let c = 0; c < 7; c++, cur++) {
      row.push({ day: cur >= 1 && cur <= days ? cur : null });
    }
    grid.push(row);
  }
  return grid;
}

export default function Schedule() {
  const { hour, weekday, date, month, year, lunarNote } = EVENT;
  const grid = buildCalendar(year, month);

  return (
    <SectionReveal>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 gap-2 items-end"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100"
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <img src="/images/1.jpg" alt="Album 1" className="object-cover" />
        </motion.div>

        <motion.div
          initial={{ scale: 1.06, y: -4 }}
          whileInView={{ scale: 1.06, y: -4 }}
          whileHover={{ scale: 1.09 }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 shadow-soft z-10"
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <img src="/images/2.jpg" alt="Album 2" className="object-cover" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-100"
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <img src="/images/3.jpg" alt="Album 3" className="object-cover" />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-soft p-4 text-center"
      >
        <p className="font-script text-2xl text-slate-700">Thư Mời</p>
        <p className="mt-1 text-[12px] tracking-[0.12em] text-slate-600">
          THAM DỰ LỄ CƯỚI CỦA KHA & HẠ
        </p>

        <p className="mt-3 text-[13px] font-semibold text-slate-800">
          TIỆC MỪNG LỄ VU QUY
        </p>

        <p className="mt-2 text-[12px] text-slate-700">
          Vào Lúc <span className="font-semibold">{hour}</span> |{" "}
          <span className="font-semibold">{weekday}</span>
        </p>

        <div className="mt-3 flex items-stretch justify-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-slate-700">Tháng {month}</span>
            <span className="h-6 w-px bg-slate-300/70" />
            <span className="text-3xl font-semibold text-slate-900">
              {String(date).padStart(2, "0")}
            </span>
            <span className="h-6 w-px bg-slate-300/70" />
            <span className="text-[12px] text-slate-700">{year}</span>
          </div>
        </div>

        <p className="mt-2 text-[12px] text-slate-500 italic">{lunarNote}</p>
      </motion.div>

      {/* Tựa trang trí “tháng 11 2024” */}
      <div className="mt-4 flex items-end justify-between">
        <span className="font-script text-3xl text-slate-700">
          tháng {month}
        </span>
        <span className="text-5xl leading-none font-bold text-slate-900">
          {year}
        </span>
      </div>

      {/* Lịch tháng */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white"
      >
        {/* Header thứ trong tuần (Mon..Sun) */}
        <div className="grid grid-cols-7 text-[11px] text-center text-slate-600 bg-slate-50">
          {["MON", "TUES", "WEDNES", "THURS", "FRI", "SAT", "SUN"].map(
            (d, i) => (
              <div key={i} className="py-2">
                {d}
              </div>
            )
          )}
        </div>
        {/* Ngày trong tháng */}
        <div className="grid grid-rows-6">
          {grid.map((row, r) => (
            <div key={r} className="grid grid-cols-7">
              {row.map((cell, c) => {
                const active = cell.day === date;
                return (
                  <div
                    key={c}
                    className={[
                      "h-10 text-[12px] flex items-center justify-center border-t border-slate-100",
                      c !== 0 ? "border-l border-slate-100" : "",
                      cell.day ? "text-slate-800" : "text-slate-300",
                      active ? "bg-pink-50 text-pink-600 font-semibold" : "",
                    ].join(" ")}
                  >
                    {cell.day ?? ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </motion.div>
    </SectionReveal>
  );
}
