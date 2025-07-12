"use client";

import discordImage from "@/assets/discord.png";
import { motion } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="pt-14 pb-20 md:pt-8 md:pb-15 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#5865F2,#E0E3FF_100%)] overflow-x-clip "
    >
      <div className="container">
        <div className="md:flex items-center">
          <div className="md:w-[478px]">
            <div className="tag">Last Update: 15 July 2025</div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Shibemod
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6">
              Revolutionizing Discord moderation using NLP to understand intent,
              not just match patterns.
            </p>
            <div className="flex flex-row gap-1 md:items-center mt-[30px]">
              <a
                href="https://discord.com/oauth2/authorize?client_id=1388455924510887966&permissions=8&integration_type=0&scope=applications.commands+bot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary">Invite to server</button>
              </a>
              <a
                href="https://github.com/wang-yuancheng/shibemod"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-github">
                  <span>Documentation</span>
                </button>
              </a>
            </div>
          </div>
          <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
            <motion.img
              src={discordImage.src}
              alt="Discord image"
              className="md:absolute md:h-full md:w-auto md:max-w-none md:-left-6 lg:left-0"
              animate={{
                translateY: [-30, 30],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
