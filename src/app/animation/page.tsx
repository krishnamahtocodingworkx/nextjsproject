'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimatedPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Rocket movement based on scroll progress
  const rocketY = useTransform(scrollYProgress, [0, 1], [300, -500]);
  
  // Door animation (opening effect)
  const doorScaleX = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Full-screen reveal effect
  const revealY = useTransform(scrollYProgress, [0.9, 1], [500, 0]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll bg-black text-white">
      {/* Initial Black Screen with Door */}
      <div className="relative h-screen flex items-center justify-center">
        <motion.div 
          style={{ scaleX: doorScaleX }}
          className="absolute w-40 h-60 bg-gray-700 border-2 border-white"
        ></motion.div>
      </div>

      {/* Rocket Section */}
      <div className="relative h-[200vh] flex justify-center">
        <motion.img 
          src="/rocket.png" 
          alt="Rocket" 
          className="w-20 h-40 absolute bottom-10"
          style={{ y: rocketY }}
        />
      </div>

      {/* Final Reveal */}
      <motion.div 
        style={{ y: revealY }}
        className="fixed inset-0 flex items-center justify-center bg-blue-500 text-5xl font-bold"
      >
        Hello World
      </motion.div>
    </div>
  );
}