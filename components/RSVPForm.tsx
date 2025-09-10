"use client";
import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attend, setAttend] = useState("yes");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const prefersReduced = useReducedMotion();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, attend, message }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      alert("Gửi thất bại, vui lòng thử lại.");
    } finally {
      setSending(false);
    }
  };

  if (done) return <ThankYou />;

  return (
    <section>
      <form onSubmit={submit} className="glass rounded-2xl p-4">
        <h2 className="text-3xl font-display text-center">Xác nhận tham dự</h2>
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-sm">Họ tên</label>
            <input
              className="mt-1 w-full rounded-2xl border border-pink-200 px-3 py-2 bg-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm">Số điện thoại</label>
            <input
              className="mt-1 w-full rounded-2xl border border-pink-200 px-3 py-2 bg-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              inputMode="tel"
            />
          </div>
          <div>
            <label className="text-sm">Bạn có thể tham dự?</label>
            <select
              className="mt-1 w-full rounded-2xl border border-pink-200 px-3 py-2 bg-white"
              value={attend}
              onChange={(e) => setAttend(e.target.value)}
            >
              <option value="yes">Có mặt</option>
              <option value="no">Xin phép vắng mặt</option>
              <option value="maybe">Có thể</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Lời nhắn</label>
            <textarea
              className="mt-1 w-full rounded-2xl border border-pink-200 px-3 py-2 bg-white"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button
            disabled={sending}
            className="w-full btn-primary disabled:opacity-60"
            aria-busy={sending}
          >
            {sending ? "Đang gửi..." : "Gửi xác nhận"}
          </button>
        </div>
      </form>
    </section>
  );
}

/* ====== Màn hình cảm ơn với animation + confetti (eager import) ====== */
function ThankYou() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // ⬇️ EAGER IMPORT: không tách chunk => tránh ChunkLoadError
        const { default: confetti } = await import(
          /* webpackMode: "eager" */ "canvas-confetti"
        );

        if (cancelled) return;
        // tôn trọng reduced-motion
        if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
          return;

        const duration = 1500;
        const end = Date.now() + duration;
        const colors = ["#ff77a9", "#ffd1e1", "#ffffff"];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        })();
      } catch (err) {
        console.warn("Confetti load failed:", err);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 text-center"
    >
      <div className="relative mx-auto mb-3 h-14 w-14">
        <span className="absolute inset-0 rounded-full bg-pink-200/60 blur-xl" />
        <motion.div
          initial={{ scale: 0.7, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.05,
          }}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-pink-600"
          >
            <path
              fill="currentColor"
              d="M12 21s-6.716-4.35-9.428-7.06A5.5 5.5 0 1 1 12 6.09a5.5 5.5 0 1 1 9.428 7.85C18.716 16.65 12 21 12 21Z"
            />
          </svg>
        </motion.div>
      </div>

      <h2 className="text-3xl font-display">Cảm ơn bạn ♥</h2>
      <p className="mt-1 text-sm text-slate-600">
        Chúng mình đã ghi nhận RSVP của bạn và sẽ liên hệ khi cần.
      </p>
      <span className="mt-4 inline-flex h-2 w-2 animate-ping rounded-full bg-pink-400/70" />
    </motion.div>
  );
}
