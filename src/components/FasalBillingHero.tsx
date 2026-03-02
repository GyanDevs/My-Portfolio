"use client";
import React from "react";
export default function FasalBillingHero() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden group mb-8 border border-[var(--grid-line)] card-hover transition-all duration-300 ease-spring">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/fasal-farmer-cart.webp"
          alt="Farmer on cart"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-spring grayscale group-hover:grayscale-0"
        />
        {/* Dark overlay for readability - Solid skip gradients */}
        <div className="absolute inset-0 bg-black/60" />
      </div>{" "}
      {/* Content overlay */}{" "}
      <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end text-neutral-100">
        {" "}
        <div className="space-y-4 max-w-2xl">
          {" "}
          <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-white drop-shadow-sm">
            {" "}
            Designing Financial Trust for the{" "}
            <span className="font-serif italic font-normal">
              Indian Farmer.
            </span>{" "}
          </h3>{" "}
          <p className="text-base md:text-[16px] font-sans text-white/90 leading-snug drop-shadow-md">
            {" "}
            In rural India, trust is binary it takes years to build and seconds
            to break. For 50,000+ farmers using Fasal, our IoT platform wasn&apos;t
            just a gadget; it was the brain of their farm. But there was a
            silent trust-killer buried in our UX:{" "}
            <strong className="font-sans font-bold text-white">
              The Shared Wallet.
            </strong>{" "}
          </p>{" "}
          <p className="text-base md:text-[16px] font-sans text-white/90 leading-snug drop-shadow-md">
            {" "}
            Imagine a bank account that automatically deducts money every day,
            but refuses to tell you what for. That was the reality for our
            users. Farmers were seeing their balances drain for devices sitting
            in warehouses or on fallow land. They felt robbed.{" "}
          </p>{" "}
          <p className="text-base md:text-[16px] font-sans text-white/90 leading-snug drop-shadow-md">
            {" "}
            I was tasked not just to fix a billing UI, but to stop a crisis of
            confidence that was pushing our most loyal farmers to leave.{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
