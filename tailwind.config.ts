import type { Config } from "tailwindcss"
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: { 50:"#fff1f5",100:"#ffe4ec",200:"#fec7d7",300:"#f8a5bf",400:"#f07aa1",500:"#e85a88",600:"#d9487b" }
      },
      fontFamily: { display:["ui-serif","Georgia","serif"], body:["Inter","system-ui","sans-serif"] },
      boxShadow: { soft: "0 10px 30px rgba(244,114,182,.22)" }
    }
  }, plugins: []
}
export default config
