import React from 'react';
import { AIInsights } from '../../services/aiService';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SmartSummaryProps {
  data: AIInsights;
}

export const SmartSummary: React.FC<SmartSummaryProps> = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start gap-3 max-w-lg mx-auto bg-white/5 p-4 rounded-2xl border border-white/5 my-4"
    >
      <Sparkles className="w-5 h-5 text-yellow-200 shrink-0 mt-1" />
      <div>
        <p className="text-sm font-light leading-relaxed opacity-90">
          {data.summary} <span className="opacity-60">{data.outfit}</span>
        </p>
      </div>
    </motion.div>
  );
};
