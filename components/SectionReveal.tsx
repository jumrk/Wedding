"use client"
import { motion } from "framer-motion"
export default function SectionReveal({ children }: { children: React.ReactNode }){
  return (
    <motion.section className="px-4 py-10" initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{ once:true, amount:.3 }} transition={{ duration:.6 }}>
      {children}
    </motion.section>
  )
}
