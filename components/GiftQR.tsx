"use client";
import { useState } from "react";
import SectionReveal from "./SectionReveal";

type Props = {
  title?: string;
  subtitle?: string;
  src?: string; // đường dẫn ảnh QR trong /public
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  note?: string; // nội dung chuyển khoản gợi ý
};

export default function GiftQR({
  title = "Góp quà / Chúc phúc",
  subtitle = "Quét mã QR dưới đây để gửi lời chúc",
  src = "/images/qr.jpg",
  bankName = "",
  accountName = "",
  accountNumber = "",
  note = "Chúc hai bạn trăm năm hạnh phúc 💕",
}: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const infoText = [
    accountName && `Chủ TK: ${accountName}`,
    bankName && `Ngân hàng: ${bankName}`,
    accountNumber && `Số TK: ${accountNumber}`,
    note && `Nội dung: ${note}`,
  ]
    .filter(Boolean)
    .join("\n");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(infoText || note);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <SectionReveal>
      <section className="glass rounded-2xl p-5 text-center">
        <h2 className="text-3xl font-display">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">{subtitle}</p>

        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative rounded-2xl overflow-hidden group"
            aria-label="Phóng to mã QR"
            title="Chạm để phóng to"
          >
            {/* vòng sáng mờ */}
            <span className="absolute -inset-3 bg-pink-200/60 blur-2xl rounded-3xl" />
            <div className="relative rounded-2xl bg-white p-3 shadow">
              <img
                src={src}
                alt="Mã QR chúc phúc"
                width={220}
                height={220}
                loading="lazy"
                className="block w-[240px] sm:w-[220px] h-auto"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/placeholder.jpg";
                }}
              />
            </div>
          </button>
        </div>

        {/* thông tin TK (nếu có) */}
        {(accountName || bankName || accountNumber) && (
          <div className="mt-4 text-sm text-slate-700 space-y-1">
            {accountName && (
              <div>
                <b>Chủ TK:</b> {accountName}
              </div>
            )}
            {bankName && (
              <div>
                <b>Ngân hàng:</b> {bankName}
              </div>
            )}
            {accountNumber && (
              <div>
                <b>Số TK:</b> {accountNumber}
              </div>
            )}
            {note && (
              <div className="text-slate-500">
                <b>Nội dung:</b> {note}
              </div>
            )}
          </div>
        )}

        {/* nút hành động */}
        <div className="mt-4 flex gap-2 justify-center">
          <a
            href={src}
            download="Wedding_QR.jpg"
            className="rounded-full bg-white px-4 py-2 shadow hover:shadow-md active:scale-95 text-pink-600"
          >
            Lưu QR
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-full bg-pink-600 text-white px-4 py-2 shadow hover:shadow-md active:scale-95"
          >
            {copied ? "Đã sao chép ✓" : "Sao chép thông tin"}
          </button>
        </div>
      </section>

      {/* modal phóng to */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-4 shadow-xl"
          >
            <img
              src={src}
              alt="Mã QR chúc phúc phóng to"
              width={480}
              height={480}
              className="w-[86vw] max-w-[420px] h-auto"
            />
            <div className="mt-3 flex justify-center gap-2">
              <a
                href={src}
                download="Wedding_QR.jpg"
                className="rounded-full bg-white px-4 py-2 shadow hover:shadow-md text-pink-600"
              >
                Lưu QR
              </a>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full bg-pink-600 text-white px-4 py-2 shadow hover:shadow-md"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </SectionReveal>
  );
}
