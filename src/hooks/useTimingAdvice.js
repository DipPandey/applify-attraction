import { useState, useEffect } from 'react';
import { getTimingAdvice } from '../utils/timing';

export function useTimingAdvice(lastMessageTimestamp) {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    if (lastMessageTimestamp) {
      const timingAdvice = getTimingAdvice(lastMessageTimestamp);
      setAdvice(timingAdvice);
    }
  }, [lastMessageTimestamp]);

  return advice;
}
