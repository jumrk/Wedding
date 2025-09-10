"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const s = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const o = useTransform(scrollYProgress, [0, 1], [1, 0.1]);

  return (
    <section ref={ref} className="relative h-[85vh] overflow-hidden">
      {/* Background image (z-0) */}
      <div className="absolute inset-0 z-0">
        <img src="/hero.JPG" alt="" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/30 via-white/10 to-white/40" />
      </div>

      {/* Content (z-10) */}
      <motion.div
        style={{ y, scale: s, opacity: o }}
        className="relative z-10 h-full flex flex-col items-center justify-between py-8"
      >
        {/* Tên script trên đầu */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full px-6"
        >
          <p className="font-script text-3xl text-slate-700 text-center tracking-wide">
            Dương Kha – Vân Hạ
          </p>
        </motion.div>

        {/* Khối thông tin giữa/dưới */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="w-full px-6"
        >
          <div className="mx-auto max-w-xs rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-soft p-4 text-center">
            <p className="text-[11px] tracking-[0.2em] text-slate-600">
              THƯ MỜI TIỆC CƯỚI
            </p>

            <div className="my-2 h-px bg-slate-300/60" />

            <p className="text-[12px] font-medium text-slate-700">
              THỨ 7 • 11h00
            </p>

            <div className="my-2 h-px bg-slate-300/60" />

            <p className="text-[20px] font-semibold tracking-[0.35em] text-slate-900">
              27.09.2025
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
