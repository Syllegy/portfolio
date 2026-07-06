"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { personal } from "@/data/personal";

export function Hero() {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Gradient blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {personal.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">{personal.name}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-2xl sm:text-3xl font-medium text-muted-foreground"
          >
            {personal.title}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {personal.tagline}
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
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/contact">Contact Me</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="gap-2">
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="gap-2">
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-6 max-w-sm"
          >
            {[
              { value: "5+", label: "Years Experience" },
              { value: "20+", label: "Projects Delivered" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
