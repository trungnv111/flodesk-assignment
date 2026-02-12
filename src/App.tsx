import Home from "@/pages/Home"
import { TemplateBuilderProvider } from "@/context/TemplateBuilderContext"

function App() {
  return (
    <TemplateBuilderProvider>
      <Home />
    </TemplateBuilderProvider>
  )
}

export default App
