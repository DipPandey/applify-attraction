import { useState, useEffect } from 'react';
import { analyzeTone } from '../utils/toneAnalysis';

export function useToneAnalysis(message) {
  const [toneAnalysis, setToneAnalysis] = useState(null);

  useEffect(() => {
    if (message) {
      const analysis = analyzeTone(message);
      setToneAnalysis(analysis);
    }
  }, [message]);

  return toneAnalysis;
}
