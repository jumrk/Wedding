// app/api/rsvp/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // Quan trọng: dùng Node runtime (không phải Edge)
export const dynamic = "force-dynamic";

type RSVPBody = {
  name: string;
  phone: string;
  attend: "yes" | "no" | "maybe" | string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const { name, phone, attend, message }: RSVPBody = await req.json();

    if (!name || !phone || !attend) {
      return json({ ok: false, error: "Missing fields" }, 400);
    }

    const attendMap: Record<string, string> = {
      yes: "Có mặt",
      no: "Xin phép vắng mặt",
      maybe: "Có thể",
    };
    const attendText = attendMap[attend] ?? attend;

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      RSVP_FROM_EMAIL,
      RSVP_TO_EMAIL,
    } = process.env as Record<string, string | undefined>;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !RSVP_FROM_EMAIL ||
      !RSVP_TO_EMAIL
    ) {
      return json({ ok: false, error: "Server email not configured" }, 500);
    }

    const secure = Number(SMTP_PORT) === 465;
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure, // 465 = SSL, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      tls: SMTP_HOST.includes("gmail.com")
        ? { servername: "smtp.gmail.com" }
        : undefined,
    });

    const subject = `RSVP mới từ ${name} (${attendText})`;
    const html = renderEmail({ name, phone, attendText, message });
    const text = renderText({ name, phone, attendText, message });

    await transporter.sendMail({
      from: RSVP_FROM_EMAIL, // nên là chính Gmail của bạn hoặc alias đã verify
      to: RSVP_TO_EMAIL, // người nhận thông báo
      subject,
      text,
      html,
      replyTo: RSVP_FROM_EMAIL, // có thể đổi thành email người gửi nếu bạn thu thập email người điền form
      headers: {
        "X-Entity-Ref-ID": `rsvp-${Date.now()}`,
      },
    });

    return json({ ok: true }, 200);
  } catch (e) {
    console.error("RSVP mail error:", e);
    return json({ ok: false, error: "Send failed" }, 500);
  }
}

/* ---------- Helpers ---------- */

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderText({
  name,
  phone,
  attendText,
  message,
}: {
  name: string;
  phone: string;
  attendText: string;
  message?: string;
}) {
  return `RSVP mới
- Họ tên: ${name}
- SĐT: ${phone}
- Tham dự: ${attendText}
- Lời nhắn: ${message || "-"}`;
}

function renderEmail({
  name,
  phone,
  attendText,
  message,
}: {
  name: string;
  phone: string;
  attendText: string;
  message?: string;
}) {
  // Màu badge theo trạng thái
  const palette: Record<string, { bg: string; text: string; border: string }> =
    {
      "Có mặt": { bg: "#ecfdf5", text: "#065f46", border: "#10b981" }, // xanh
      "Xin phép vắng mặt": {
        bg: "#f1f5f9",
        text: "#334155",
        border: "#94a3b8",
      }, // xám
      "Có thể": { bg: "#fff7ed", text: "#9a3412", border: "#f59e0b" }, // cam
    };
  const c = palette[attendText] ?? palette["Xin phép vắng mặt"];

  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeAttend = escapeHtml(attendText);
  const safeMsg = message ? escapeHtml(message).replace(/\n/g, "<br/>") : "";

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width"/>
    <title>RSVP mới</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f7f8;color:#0f172a;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
    <!-- Preheader -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;mso-hide:all;">
      RSVP mới từ ${safeName} — ${safeAttend}
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#ffffff;border-radius:16px;box-shadow:0 8px 24px rgba(2,6,23,0.06);overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="padding:0;">
                <div style="height:6px;background:linear-gradient(90deg,#f472b6,#f9a8d4,#fbcfe8);"></div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 0 24px;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:40px;height:40px;border-radius:999px;background:#fce7f3;display:flex;align-items:center;justify-content:center;">
                    <span style="font-size:20px;color:#db2777;">❤</span>
                  </div>
                  <h1 style="margin:0;font-size:20px;line-height:28px;color:#be185d;">Bạn có RSVP mới</h1>
                </div>
                <p style="margin:8px 0 0 0;font-size:13px;color:#64748b;">Thông tin được gửi từ biểu mẫu trên website.</p>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:16px 24px 4px 24px;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;">
                  <tr>
                    <td style="width:140px;font-size:13px;color:#64748b;">Họ tên</td>
                    <td style="font-size:15px;color:#0f172a;"><strong>${safeName}</strong></td>
                  </tr>
                  <tr>
                    <td style="width:140px;font-size:13px;color:#64748b;">Số điện thoại</td>
                    <td style="font-size:15px;color:#0f172a;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="width:140px;font-size:13px;color:#64748b;">Tham dự</td>
                    <td>
                      <span style="
                        display:inline-block;
                        padding:6px 10px;
                        font-size:12px;
                        border-radius:999px;
                        background:${c.bg};
                        color:${c.text};
                        border:1px solid ${c.border};
                      ">${safeAttend}</span>
                    </td>
                  </tr>
                </table>

                ${
                  safeMsg
                    ? `
                <div style="margin-top:12px;padding:12px 14px;border:1px solid #f1f5f9;border-radius:12px;background:#fafafa;">
                  <div style="font-size:13px;color:#64748b;margin-bottom:6px;">Lời nhắn</div>
                  <div style="font-size:14px;line-height:22px;color:#0f172a;">${safeMsg}</div>
                </div>`
                    : ""
                }
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px 22px 24px;">
                <p style="margin:14px 0 0 0;font-size:12px;color:#64748b;">
                  Email này được gửi tự động từ trang RSVP. Vui lòng trả lời email nếu cần liên hệ thêm.
                </p>
              </td>
            </tr>
          </table>

          <div style="text-align:center;margin-top:12px;font-size:12px;color:#94a3b8;">
            © ${new Date().getFullYear()} — Gửi từ website RSVP
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
