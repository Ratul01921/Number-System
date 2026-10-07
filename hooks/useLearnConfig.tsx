'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LearnConfigContextType {
  eli10: boolean;
  setEli10: (val: boolean) => void;
}

const LearnConfigContext = createContext<LearnConfigContextType>({
  eli10: false,
  setEli10: () => {},
});

export function LearnConfigProvider({ children }: { children: ReactNode }) {
  const [eli10, setEli10] = useState(false);

  return (
    <LearnConfigContext.Provider value={{ eli10, setEli10 }}>
      {children}
    </LearnConfigContext.Provider>
  );
}

export function useLearnConfig() {
  return useContext(LearnConfigContext);
}
