import React from 'react';
import { useShop } from '../context/ShopContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#18181c] border border-[#c5a880]/30 px-5 py-3.5 shadow-2xl text-stone-100 max-w-md rounded-none"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#c5a880]/20 text-[#c5a880] shrink-0">
            <Check size={12} strokeWidth={2.5} />
          </span>
          <p className="text-xs tracking-wide uppercase font-light text-stone-200">
            {toast}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
