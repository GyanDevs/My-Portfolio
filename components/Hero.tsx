"use client";

import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-center bg-zinc-900 text-white p-4">
            <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold tracking-tight"
            >
                Floating Upward
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="mt-4 text-xl text-zinc-400"
            >
                A minimal portfolio experience.
            </motion.p>
        </section>
    );
};

export default Hero;
