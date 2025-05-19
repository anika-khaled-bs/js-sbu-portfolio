import { Loader2 } from 'lucide-react'

const LoadingUI = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <p className="text-lg font-medium text-foreground">Loading your experience...</p>
    </div>
  </div>
)

export default LoadingUI
