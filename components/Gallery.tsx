"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const IMG_COUNT = 5;
const IMAGES = Array.from(
  { length: IMG_COUNT },
  (_, i) => `/images/${i + 1}.JPG`
);

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="glass rounded-2xl p-4">
        <h2 className="text-center text-3xl font-display">Thư viện ảnh</h2>

        {/* Masonry bằng multi-column */}
        <div className="mt-3 columns-2 sm:columns-3 lg:columns-4 gap-3">
          {IMAGES.map((src, i) => (
            <MasonryItem key={src} index={i} onOpen={() => setOpenIndex(i)}>
              <img
                src={src}
                alt={`Ảnh ${i + 1}`}
                width={800}
                height={1200}
                loading={i < 6 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.JPG";
                }}
              />
            </MasonryItem>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={IMAGES}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}

function MasonryItem({
  children,
  index,
  onOpen,
}: {
  children: React.ReactNode;
  index: number;
  onOpen: () => void;
}) {
  const prefersReduced = useReducedMotion();

  const delay = Math.min(0.18, index * 0.015);

  return (
    <motion.figure
      initial={{
        opacity: 0,
        y: prefersReduced ? 0 : 14,
        scale: prefersReduced ? 1 : 0.985,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ amount: 0.12, margin: "0px 0px -15% 0px", once: true }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay }}
      className="mb-3 rounded-xl
                 [break-inside:avoid-column] [-webkit-column-break-inside:avoid] [page-break-inside:avoid]"
    >
      <button
        type="button"
        onClick={onOpen}
        className="block w-full overflow-hidden rounded-xl group cursor-zoom-in"
        aria-label={`Xem ảnh ${index + 1}`}
      >
        {children}
      </button>
    </motion.figure>
  );
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const n1 = new Image();
    n1.src = images[(idx + 1) % images.length];
    const n2 = new Image();
    n2.src = images[(idx - 1 + images.length) % images.length];
  }, [idx, images]);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-[420px] aspect-[9/16] flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img
          src={images[idx]}
          alt={`Ảnh ${idx + 1}`}
          className="max-w-[92vw] max-h-[78vh] w-auto h-auto object-contain select-none"
          draggable={false}
          loading="eager"
        />

        <button
          onClick={onClose}
          className="absolute top-2 right-2 h-9 w-9 rounded-full bg-white/90 shadow flex items-center justify-center text-pink-600 hover:bg-white cursor-zoom-out"
          aria-label="Đóng"
        >
          ✕
        </button>

        <button
          onClick={prev}
          className="absolute left-0 top-12 h-full w-1/3 text-white/0 active:text-white/80"
          aria-label="Trước"
        >
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-2xl">
            ‹
          </span>
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-12 h-full w-1/3 text-white/0 active:text-white/80"
          aria-label="Sau"
        >
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl">
            ›
          </span>
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-full bg-black/50 text-white">
          {idx + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
