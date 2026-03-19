"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

// Components for the page
const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white origin-left" style={{ scaleX }} />;
};

const HeroSection = () => {
  const text = "We Build Brands";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-6xl md:text-8xl font-bold">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={child}
            style={{ marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.button
        className="mt-8 px-8 py-4 bg-white text-black rounded-full flex items-center space-x-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span>Get in Touch</span>
        <ArrowRight />
      </motion.button>
    </motion.div>
  );
};

const ServicesSection = () => {
  const services = [
    { title: "Web Design", description: "Crafting beautiful and intuitive web experiences." },
    { title: "Branding", description: "Building strong and memorable brand identities." },
    { title: "SEO", description: "Optimizing your site for search engines." },
    { title: "Content", description: "Creating engaging and effective content." },
  ];

  return (
    <div className="py-24">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="glass-effect p-8"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.2)" }}
          >
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="p-4 md:p-8">
      <ScrollProgressBar />
      <HeroSection />
      <ServicesSection />
    </main>
  );
}
