import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

interface AppModalsContextValue {
  catalogueOpen: boolean
  aiOpen: boolean
  openCatalogue: () => void
  closeCatalogue: () => void
  openAI: () => void
  closeAI: () => void
}

const AppModalsContext = createContext<AppModalsContextValue | null>(null)

export function AppModalsProvider({ children }: { children: ReactNode }) {
  const [catalogueOpen, setCatalogueOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)

  const openCatalogue = useCallback(() => {
    setAiOpen(false)
    setCatalogueOpen(true)
  }, [])

  const closeCatalogue = useCallback(() => setCatalogueOpen(false), [])

  const openAI = useCallback(() => {
    setCatalogueOpen(false)
    setAiOpen(true)
  }, [])

  const closeAI = useCallback(() => setAiOpen(false), [])

  return (
    <AppModalsContext.Provider
      value={{
        catalogueOpen,
        aiOpen,
        openCatalogue,
        closeCatalogue,
        openAI,
        closeAI,
      }}
    >
      {children}
    </AppModalsContext.Provider>
  )
}

export function useAppModals() {
  const ctx = useContext(AppModalsContext)
  if (!ctx) throw new Error('useAppModals must be used within AppModalsProvider')
  return ctx
}
