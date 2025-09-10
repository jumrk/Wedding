import ScrollHero from "@/components/ScrollHero";
import SectionReveal from "@/components/SectionReveal";
import Couple from "@/components/Couple";
import Schedule from "@/components/Schedule";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Map from "@/components/Map";
import MusicPlayer from "@/components/MusicPlayer";
import dynamic from "next/dynamic";
import InviteSplash from "@/components/InviteSplash";

export default function Page() {
  const Countdown = dynamic(() => import("@/components/Countdown"), {
    ssr: false,
  });

  return (
    <main className="mx-auto max-w-[520px] pb-16">
      <InviteSplash
        names="Kha & Hạ"
        subtitle="27.09.2025 — 11:00"
        oncePerSession={false}
      />

      <MusicPlayer />
      <ScrollHero />
      <SectionReveal>
        <Countdown />
      </SectionReveal>
      <Couple />
      <Schedule />
      <div id="map">
        <Map />
      </div>
      <Gallery />
      <div id="rsvp">
        <RSVPForm />
      </div>
    </main>
  );
}
