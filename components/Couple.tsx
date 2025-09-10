"use client";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useMemo, useRef } from "react";

export default function Couple() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Parallax trong phạm vi section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // y / rotate / scale khi cuộn (parallax mềm)
  const leftY = useTransform(scrollYProgress, [0, 1], [20, -10]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-10, 20]);
  const leftRot = useTransform(scrollYProgress, [0, 1], [2, -1]); // deg
  const rightRot = useTransform(scrollYProgress, [0, 1], [-2, 1]); // deg
  const leftScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);
  const rightScale = useTransform(scrollYProgress, [0, 1], [1.02, 1]);

  // Variants mượt (spring) + stagger
  const container = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 18,
          mass: 0.6,
          when: "beforeChildren",
          staggerChildren: 0.12,
        },
      },
    }),
    []
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 130, damping: 18 },
    },
  };

  const imgLeft = {
    hidden: { opacity: 0, x: -40, scale: 0.98 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  const imgRight = {
    hidden: { opacity: 0, x: 40, scale: 0.98 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 140, damping: 16 },
    },
  };

  return (
    <section ref={ref} className="px-4 py-10">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        className="rounded-2xl bg-white/80 backdrop-blur border border-white/60 shadow-soft p-4 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-[12px] leading-5 text-slate-400 italic"
        >
          Yêu nhau là chuyện cả đời
          <br />
          Yêu ngàn năm y như ngày mới thương
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-3 grid grid-cols-2 gap-3 text-[12px] font-semibold text-slate-800"
        >
          <div>
            NHÀ TRAI
            <div className="mt-1 text-[12px] font-normal">
              ÔNG HUỲNH HƯƠNG
              <br />
              BÀ LÊ THỊ DẠ THẢO
            </div>
          </div>
          <div>
            NHÀ GÁI
            <div className="mt-1 text-[12px] font-normal">
              ÔNG HUỲNH VĂN CHÂU
              <br />
              BÀ TRẦN THỊ LAN HƯƠNG
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="my-3 flex items-center justify-center"
        >
          <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
            <path
              d="M14 34C9 26 2 22 2 14C2 8 6 4 10 4c4 0 5 3 4 5-1-2 1-5 4-5 4 0 8 4 8 10 0 8-7 12-12 20z"
              stroke="#e85a88"
              strokeWidth="1.5"
              fill="none"
            />
          </svg>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 text-[12px] text-slate-600"
        >
          <div>Chú Rể</div>
          <div>Cô Dâu</div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-1 grid grid-cols-2 text-slate-700"
        >
          <div className="font-script text-2xl">Huỳnh Dương Kha</div>
          <div className="font-script text-2xl">Huỳnh Trần Vân Hạ</div>
        </motion.div>
      </motion.div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <motion.div
          variants={imgLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          style={
            prefersReduced
              ? undefined
              : { y: leftY, rotate: leftRot as any, scale: leftScale as any }
          }
          whileHover={{ rotateZ: -1.5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl will-change-transform"
        >
          <img
            src="/images/8.JPG"
            alt="Chú rể"
            className="object-cover [backface-visibility:hidden]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-white/30 pointer-events-none" />
        </motion.div>

        <motion.div
          variants={imgRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          style={
            prefersReduced
              ? undefined
              : { y: rightY, rotate: rightRot as any, scale: rightScale as any }
          }
          whileHover={{ rotateZ: 1.5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl will-change-transform"
        >
          <img
            src="/images/9.JPG"
            alt="Cô dâu"
            className="object-cover [backface-visibility:hidden]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-white/30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
