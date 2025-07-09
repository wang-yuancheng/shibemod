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
          <div className="section-description mt-5">
            <div className="flex flex-col md:flex-row md:justify-center">
              <span>Keep your community clean, </span>
              <span>the easy way.</span>
            </div>
            <span>Because your mods could really use a break right now.</span>
          </div>
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
        <div className="flex flex-col md:flex-row gap-2 mt-10 justify-center items-center">
          <a
            href="https://discord.com/oauth2/authorize?client_id=1388455924510887966&permissions=8&integration_type=0&scope=applications.commands+bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">Invite to server</button>
          </a>
          <div className="hidden md:block">
            <button className="px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight border border-[#222]/10 gap-1">
              <a
                href="https://github.com/wang-yuancheng/shibemod"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex gap-1">
                  <span>Like This Project? </span>
                  <span>Star It On GitHub!</span>
                </div>
              </a>
              <Image src={StarIcon} alt="Star" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
