"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const a = audioRef.current!;
    a.muted = true;
    a.volume = 0.6;
    a.loop = true;
    const onCan = () => setReady(true);
    a.addEventListener("canplaythrough", onCan);
    a.play().catch(() => {}); // autoplay muted
    return () => a.removeEventListener("canplaythrough", onCan);
  }, []);

  const toggle = async () => {
    const a = audioRef.current!;
    if (muted) {
      a.muted = false;
      try {
        await a.play();
      } catch {}
      setMuted(false);
    } else {
      a.muted = true;
      setMuted(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" preload="auto" />
      <button
        onClick={toggle}
        className="fixed right-4 bottom-20 z-50 rounded-full glass w-14 h-14 flex items-center justify-center active:scale-95"
        aria-label="Toggle music"
        title={muted ? "Bật nhạc" : "Tắt nhạc"}
      >
        {muted ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="#e85a88" strokeWidth="2" />
            <path d="M16 9l4 4m0-4-4 4" stroke="#e85a88" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="#e85a88" strokeWidth="2" />
            <path
              d="M17 8a5 5 0 010 8M15 10a3 3 0 010 4"
              stroke="#e85a88"
              strokeWidth="2"
            />
          </svg>
        )}
      </button>
    </>
  );
}
