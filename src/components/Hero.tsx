"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "./icons";
import { personal } from "@/data/personal";
import { useRef } from "react";
import { NeutronStars } from "./NeutronStars";

export function Hero() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, prefersReduced ? 0 : -60]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
    >
      <NeutronStars />
      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Building Modern<br />
            <span className="text-gradient">Websites</span> That Perform.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-foreground/60 leading-relaxed max-w-xl"
          >
            {personal.subheading}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/projects">
                View Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="gap-2">
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
