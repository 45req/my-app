"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { KeyRound, Download } from "lucide-react"

export default function DEVDownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadUrl = "https://example.com/test-program.exe" // Replace with your actual file URL

  const handleDownload = () => {
    setIsDownloading(true)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "dev.exe" // Force download filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsDownloading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center space-y-3">
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-full bg-primary/10 p-3"
              >
                <KeyRound className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
            <CardTitle className="text-2xl font-semibold">Download Dev Program</CardTitle>
            <CardDescription>Click the button below to download the Dev Program.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 flex justify-center">
            <Button onClick={handleDownload} disabled={isDownloading} className="w-full max-w-xs">
              {isDownloading ? "Downloading..." : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  Download Dev Program
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
