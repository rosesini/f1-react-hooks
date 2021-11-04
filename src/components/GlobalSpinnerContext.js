import { createContext, useContext, useMemo, useState } from 'react'

export const GlobalSpinnerContext = createContext()
export const useGlobalSpinnerContext = () => useContext(GlobalSpinnerContext.Provider)

const GlobalSpinnerContextProvider = ({ children }) => {
  const [isGlobalSpinnerOn, setGlobalSpinner] = useState(false)

  const value = useMemo(() => ({
    isGlobalSpinnerOn,
    setGlobalSpinner
  }), [isGlobalSpinnerOn])

  return (
    <GlobalSpinnerContext.Provider
      value={value}
    >
      {children}
    </GlobalSpinnerContext.Provider>
  )
}

export default GlobalSpinnerContextProvider
