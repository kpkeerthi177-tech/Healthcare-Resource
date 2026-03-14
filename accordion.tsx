import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

const emergencies = [
  { id: 1, text: 'AMB-042 en route to City General — ETA 8 min', severity: 'high' },
  { id: 2, text: 'Trauma alert: MVA patient incoming — ICU standby', severity: 'critical' },
];

export function GlobalStatusHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % emergencies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = emergencies[currentIndex];

  return (
    <div className="flex items-center gap-3 rounded-lg bg-emergency/5 border border-emergency/20 px-4 py-2">
      <div className="relative flex-shrink-0">
        <Radio className="h-4 w-4 text-emergency" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emergency sos-ring" />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-2 min-w-0"
        >
          <AlertTriangle className="h-3.5 w-3.5 text-emergency flex-shrink-0" />
          <span className="text-sm font-medium text-emergency truncate">{current.text}</span>
        </motion.div>
      </AnimatePresence>
      <span className="ml-auto text-xs font-medium text-emergency/60 flex-shrink-0">LIVE</span>
    </div>
  );
}
