import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { ProductShowcase } from "@/sections/ProductShowcase";
import { DetectedMessages } from "@/sections/DetectedMessages";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductShowcase />
      <DetectedMessages />
      <CallToAction />
      <Footer />
    </>
  );
}
