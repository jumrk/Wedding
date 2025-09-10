"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  names?: string; // chữ ở giữa
  subtitle?: string; // ví dụ ngày giờ
  oncePerSession?: boolean; // chỉ hiện 1 lần trong session
  autoOpenDelay?: number; // ms trước khi tự mở
};

export default function InviteSplash({
  names = "Kha & Hạ",
  subtitle = "27.09.2025 — 11:00",
  oncePerSession = false,
  autoOpenDelay = 700,
}: Props) {
  const prefersReduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const seen = sessionStorage.getItem("invite-splash-seen") === "1";
    if (oncePerSession && seen) return;
    setShow(true);

    const t = setTimeout(() => setOpening(true), autoOpenDelay);
    return () => clearTimeout(t);
  }, [oncePerSession, autoOpenDelay, prefersReduced]);

  const handleComplete = () => {
    setShow(false);
    if (oncePerSession) sessionStorage.setItem("invite-splash-seen", "1");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      {/* nền hồng nhạt + blur nhẹ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-100 backdrop-blur-sm"
      />

      {/* phần nội dung giữa */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-16 w-16">
            <span className="absolute inset-0 rounded-full bg-pink-200/70 blur-xl" />
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
              <span className="text-2xl text-pink-600">❤</span>
            </div>
          </div>
          <h1 className="font-display text-3xl text-pink-700">{names}</h1>
          <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
          <p className="mt-3 text-xs text-slate-500">Đang mở thiệp…</p>
        </div>
      </motion.div>

      {/* hai cánh thiệp */}
      <div className="absolute inset-0 overflow-hidden">
        {/* trái */}
        <motion.div
          initial={{ x: 0 }}
          animate={opening ? { x: "-100%" } : { x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 h-full w-1/2 bg-white shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.92))",
          }}
        />
        {/* phải */}
        <motion.div
          initial={{ x: 0 }}
          animate={opening ? { x: "100%" } : { x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 top-0 h-full w-1/2 bg-white shadow-2xl"
          style={{
            backgroundImage:
              "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0.92))",
          }}
          onAnimationComplete={handleComplete}
        />
      </div>

      <button
        onClick={() => setOpening(true)}
        className="absolute left-1/2 -translate-x-1/2 bottom-10 rounded-full px-4 py-2 bg-white text-pink-600 shadow hover:shadow-md active:scale-95"
      >
        Mở thiệp
      </button>
    </div>
  );
}
