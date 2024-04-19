import React, { createContext, useState } from 'react';

const SelectedOptionContext = createContext();
const defaultOption = 'USD'; 

const SelectedOptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption); 

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};

export { SelectedOptionProvider, SelectedOptionContext, defaultOption };
