"use client";
import { motion } from "framer-motion";
import { Phone, Star, MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  return (
    <div className="flex fixed bottom-[88px] md:bottom-10 right-4 md:right-6 z-[45] flex-col items-end gap-3 pointer-events-none">
      {/* Review button */}
      <motion.a
        href="https://www.google.com/search?q=G.+S+Trade+link+%28+Taraju+pasa%29+Reviews&sa=X&ved=2ahUKEwjqsdqxtICTAxXESWwGHXBNLhoQ0bkNegQIIRAI&biw=2046&bih=918&dpr=0.67"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 220, damping: 18 }}
        className="pointer-events-auto flex items-center justify-center bg-white text-primary-900 border border-primary-100 w-12 h-12 md:w-auto md:h-auto md:pl-4 md:pr-5 md:py-3 rounded-full shadow-lg md:shadow-xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all group"
        aria-label="Read our Google Reviews"
      >
        <Star size={22} className="shrink-0 text-accent-500 fill-accent-500 md:w-5 md:h-5" />
        <span className="hidden md:inline font-bold text-sm whitespace-nowrap ml-2.5">Reviews</span>
      </motion.a>

      {/* WhatsApp button */}
      <motion.a
        href="https://wa.me/9779845541939"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
        className="pointer-events-auto flex items-center justify-center bg-[#25D366] text-white w-14 h-14 md:w-auto md:h-auto md:pl-4 md:pr-5 md:py-3 rounded-full shadow-lg md:shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} fill="white" className="shrink-0 md:w-[22px] md:h-[22px]" />
        <span className="hidden md:inline font-bold text-sm whitespace-nowrap ml-2.5">WhatsApp</span>
      </motion.a>

      {/* Call button */}
      <motion.a
        href="tel:+9779845541939"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 220, damping: 18 }}
        className="pointer-events-auto flex items-center justify-center bg-primary-700 text-white w-12 h-12 md:w-auto md:h-auto md:pl-4 md:pr-5 md:py-3 rounded-full shadow-lg md:shadow-xl hover:bg-primary-800 hover:-translate-y-0.5 transition-all"
        aria-label="Call Us"
      >
        <Phone size={20} className="shrink-0 text-white md:w-[18px] md:h-[18px]" />
        <span className="hidden md:inline font-bold text-sm whitespace-nowrap ml-2.5">Call Us</span>
      </motion.a>
    </div>
  );
};
