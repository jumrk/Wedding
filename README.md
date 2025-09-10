# Wedding Invite Neo PRO (v3)

- 3D background (R3F) + particles + sparkles
- Scroll-driven hero (Framer Motion)
- Smooth scrolling (Lenis)
- **Confetti overlay** (mưa + burst khi RSVP thành công)
- **Music player** (autoplay muted, bấm nút để bật/tắt)
- Glassmorphism, section reveal
- RSVP API (ghi `.data/rsvps.json` trong môi trường chạy Node local)
- Map nhúng, QR góp quà, Gallery, Floating Nav

Chạy:
```bash
npm i
npm run dev
```

Tùy biến: sửa nội dung ở các component; đổi địa chỉ map, QR, nhạc (`/public/music.wav`), màu 3D trong `CanvasBG.tsx`.
