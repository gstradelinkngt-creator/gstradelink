"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Desktop-only WhatsApp button pinned bottom-right. Hidden on mobile, where
 * BottomNav already carries a WhatsApp action.
 */
export const FloatingWhatsApp = () => {
  return (
    <motion.a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 22 }}
      className="btn-wa fixed bottom-6 right-6 z-40 hidden h-12 rounded-full pl-4 pr-5 text-sm shadow-float md:inline-flex"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={19} className="shrink-0" />
      Chat on WhatsApp
    </motion.a>
  );
};
