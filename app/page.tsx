import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Opinion from "@/components/Opinion";
import JapanStudy from "@/components/JapanStudy";
import Surmount from "@/components/Surmount";
import ThreeThings from "@/components/ThreeThings";
import Official from "@/components/Official";
import Conclusion from "@/components/Conclusion";
import References from "@/components/References";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Opinion />
        <JapanStudy />
        <Surmount />
        <ThreeThings />
        <Official />
        <Conclusion />
        <References />
      </main>
      <Footer />
    </>
  );
}
