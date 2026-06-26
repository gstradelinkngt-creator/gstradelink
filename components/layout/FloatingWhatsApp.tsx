"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

/**
 * FloatingWhatsApp — a single, unobtrusive pill-shaped WhatsApp button pinned to
 * the bottom-right on desktop. Hidden on mobile, where BottomNav already provides
 * quick contact actions, so the two never overlap.
 */
export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/9779845541939"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 220, damping: 18 }}
      className="hidden md:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:brightness-110 hover:-translate-y-0.5 active:scale-[0.97]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={20} fill="white" className="shrink-0" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </motion.a>
  );
};
