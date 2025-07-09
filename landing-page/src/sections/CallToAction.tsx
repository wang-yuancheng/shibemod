"use client";

import StarIcon from "@/assets/star-emoji.png";
import Image from "next/image";
import starImage from "@/assets/star.png";
import springImage from "@/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#E0E3FF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title">Invite shibemod today!</h2>
          <p className="section-description mt-5">
            Keep your community clean, the easy way.
            <br></br> Because your mods could really use a break right now.
          </p>
          <motion.img
            src={starImage.src}
            alt="Star Image"
            width={360}
            className="hidden md:block absolute -left-[350px] -top-[137px]"
            style={{ translateY }}
          />
          <motion.img
            src={springImage.src}
            alt="Spring Image"
            width={360}
            className="hidden md:block absolute -right-[331px] -top-[19px]"
            style={{ translateY }}
          />
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Invite to server</button>
          <button className="px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight border border-[#222]/10 gap-1">
            <span>Like This Project? Star It On GitHub!</span>
            <Image src={StarIcon} alt="Star" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
