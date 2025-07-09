"use client";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const messages = [
  {
    text: "Steam gift 50$ - steamcommunity.com/gift-card/payme/50 @everyone",
    imageSrc: avatar1.src,
    name: "Sam Carter",
    username: "@shadowbannedSam",
  },
  {
    text: "I will help earn $100,000 within a week but you will pay me 10% of your profit when you receive it. Note only interested people should apply, drop a message let's get started by asking me (HOW) https://t.me/MikeCollins_099",
    imageSrc: avatar2.src,
    name: "Mike Collins",
    username: "@mutedMike",
  },
  {
    text: "I need help testing this Nitro QR code, it should give 1 month Nitro",
    imageSrc: avatar3.src,
    name: "Toby Lane",
    username: "@timeoutToby",
  },
  {
    text: "hello, thanks for being part of my community. Btw to protect yourself from the increased spambot activity Head to settings and tap on content and social, and unselect all option for your friend request. Let me know when you're done",
    imageSrc: avatar4.src,
    name: "Casey Jordan",
    username: "@sneakyScammer",
  },
  {
    text: "Hello, I’m from Discord Trust & Safety. We need to verify your account, please reply with your password",
    imageSrc: avatar5.src,
    name: "Sophie Kim",
    username: "@suspendedSophie",
  },
  {
    text: "Hi bro can I ask something? :((! Sorry to bother you bro, I just wanna clarify if you know this guy? because he put your steam link on his profile and said it's his main. hmmm",
    imageSrc: avatar6.src,
    name: "Riley Smith",
    username: "@autoMuted77",
  },
  {
    text: "hey ummm idk what happened or if its really you but it was your name and the same avatar and you sent a girl erm stuff like what the fck?",
    imageSrc: avatar7.src,
    name: "Jordan Patels",
    username: "@botFlooderX",
  },
  {
    text: "Discord has selected you to win FREE Nitro for 3 months! Grab it now: https://nitrogiveaway.com/redeem",
    imageSrc: avatar8.src,
    name: "Sam Dawson",
    username: "@banneduser03",
  },
  {
    text: "@everyone take nitro faster, it's already running out https://discordc.gift/FGk24Djqo5s",
    imageSrc: avatar9.src,
    name: "Casey Harper",
    username: "@rulebreaker66",
  },
];

const DetectedMessagesColumn = (props: {
  className?: string;
  messages: typeof messages;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
      {[...new Array(2)].fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {props.messages.map(({ text, imageSrc, name, username }, i) => (
            <div className="card" key={`${username}-${i}`}>
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);
const firstColumn = messages.slice(0, 3);
const secondColumn = messages.slice(3, 6);
const thirdColumn = messages.slice(6, 9);

export const DetectedMessages = () => {
  return (
    <section className="bg-white">
      <div className="container">
        <div className="max-w-[700px] mx-auto pt-10">
          <h2 className="section-title mt-5">Purge Scams Automatically</h2>
          <p className="section-description mt-5">
            Tactics below? Caught instantly, every time.
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <DetectedMessagesColumn messages={firstColumn} duration={15} />
          <DetectedMessagesColumn
            messages={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <DetectedMessagesColumn
            messages={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};
