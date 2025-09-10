"use client";
import SectionReveal from "./SectionReveal";
export default function Map() {
  const place = encodeURIComponent("122B Lý Thái Tông, TP. Đà Nẵng, Việt Nam");
  const url = `https://www.google.com/maps?q=${place}&output=embed`;
  return (
    <SectionReveal>
      <div className="glass rounded-2xl p-2">
        <div className="rounded-2xl overflow-hidden">
          <iframe
            src={url}
            className="w-full h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          className="mt-3 block text-center w-full btn-primary"
          href={`https://www.google.com/maps/dir/?api=1&destination=${place}`}
          target="_blank"
        >
          Mở Google Maps
        </a>
      </div>
    </SectionReveal>
  );
}
