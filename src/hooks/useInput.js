// src/hooks/useInput.js

import  { useState } from "react";

const useInput = (initialState) => {

  const [value, setValue] = useState(initialState);

  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler];
};

export default useInput;