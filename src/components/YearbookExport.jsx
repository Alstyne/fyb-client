import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateYearbookPDF } from '../utils/generateYearbook';
import toast from 'react-hot-toast';

const YearbookExport = ({ students }) => {
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    if (!students?.length) {
      return toast.error('No students to export.');
    }

    setExporting(true);
    setProgress(0);

    try {
      await generateYearbookPDF(students, (p) => setProgress(p));
      toast.success('Yearbook downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Export failed. Try again.');
    } finally {
      setExporting(false);
      setProgress(0);
    }
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleExport}
        disabled={exporting}
        whileHover={{ scale: exporting ? 1 : 1.03 }}
        whileTap={{ scale: exporting ? 1 : 0.97 }}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                    font-body text-sm transition-all duration-300
                    ${exporting
                      ? 'bg-gold/20 text-gold cursor-not-allowed'
                      : 'bg-gold text-ink hover:bg-gold/90 shadow-lg shadow-gold/20'
                    }`}
      >
        {/* Icon */}
        <span className="text-base">
          {exporting ? '⏳' : '📥'}
        </span>

        {/* Label */}
        <span>
          {exporting
            ? `Generating… ${progress}%`
            : 'Download Yearbook PDF'
          }
        </span>
      </motion.button>

      {/* Progress bar */}
      <AnimatePresence>
        {exporting && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-2 left-0 right-0 h-0.5
                       bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-gold rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearbookExport;