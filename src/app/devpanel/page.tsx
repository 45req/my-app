"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ShieldCheck, KeyRound, LogIn, Check, AlertCircle } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

interface SignInState {
  accountHash: string
  isLoading: boolean
  error: Error | null
  isSignedIn: boolean
  attempts: number
}

const ATTEMPT_TIMEOUT = 30000
const CORRECT_KEY = "PrsH2rspt2"  // <-- set your actual correct key here

export default function SignInPage() {
  const router = useRouter()
  const { state, handleSignIn, handleAccountHashChange } = useSignIn(router)
  const { accountHash, isLoading, error, isSignedIn, attempts } = state
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(false)

  useEffect(() => {
    const errorParam = searchParams.get("error")
    if (errorParam === "security_ip_mismatch") {
      setErrorMessage(
        "Your session was terminated for security reasons. Your account was accessed from a different location."
      )
    } else if (errorParam === "session_error") {
      setErrorMessage("There was a problem with your session. Please sign in again.")
    }
  }, [searchParams])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (attempts >= 3) {
      setCooldown(true)
      const timer = setTimeout(() => {
        setCooldown(false)
      }, ATTEMPT_TIMEOUT)
      return () => clearTimeout(timer)
    }
  }, [attempts])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background overlay layers */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-xl"></div>
        <div
          className="absolute rounded-full bg-primary/20"
          style={{
            width: "81.8134px",
            height: "120.471px",
            opacity: 0.2,
            transform: "translateX(30.4191%) translateY(32.0609%)",
          }}
        />
        <div
          className="absolute rounded-full bg-primary/20"
          style={{
            width: "118.497px",
            height: "122.474px",
            opacity: 0.2,
            transform: "translateX(61.8988%) translateY(64.5037%)",
          }}
        />
        <div
          className="absolute rounded-full bg-primary/20"
          style={{
            width: "97.1209px",
            height: "84.0133px",
            opacity: 0.2,
            transform: "translateX(77.8225%) translateY(47.8663%)",
          }}
        />
        <div
          className="absolute rounded-full bg-primary/20"
          style={{
            width: "99.2391px",
            height: "120.879px",
            opacity: 0.2,
            transform: "translateX(93.9826%) translateY(69.0018%)",
          }}
        />
        <div
          className="absolute rounded-full bg-primary/20"
          style={{
            width: "126.235px",
            height: "51.1473px",
            opacity: 0.2,
            transform: "translateX(42.8315%) translateY(65.2849%)",
          }}
        />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="w-full max-w-md overflow-hidden border border-border/30 bg-card/70 backdrop-blur-md shadow-2xl">
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          <CardHeader className="space-y-2 text-center pb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
            >
              <KeyRound className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-2xl font-bold tracking-tight">Sign In</CardTitle>
            <CardDescription className="text-muted-foreground">
              Welcome back! Please enter your Dev Panel Key
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            {errorMessage && (
              <motion.div className="mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            <form onSubmit={handleSignIn} className="grid gap-5">
              <motion.div className="grid gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
                <Label htmlFor="accountHash" className="text-sm font-medium">Account Hash</Label>
                <div className="relative">
                  <Input
                    id="accountHash"
                    type="text"
                    placeholder="Enter your Dev key"
                    required
                    value={accountHash}
                    onChange={handleAccountHashChange}
                    disabled={isLoading || isSignedIn || cooldown}
                    className="pr-10 bg-background/50 border-muted focus:border-primary transition-all duration-300"
                  />
                  <ShieldCheck className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                    <Alert variant="destructive" className="border-destructive/30 bg-destructive/10">
                      <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {cooldown && (
                <Alert variant="destructive" className="border-warning/30 bg-warning/10">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Too many attempts. Please wait {ATTEMPT_TIMEOUT / 1000} seconds before trying again.
                  </AlertDescription>
                </Alert>
              )}

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }}>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
                  disabled={isLoading || isSignedIn || !accountHash.trim() || cooldown}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-3 -ml-1 animate-spin" size={16} />
                      <span>Signing In</span>
                    </>
                  ) : isSignedIn ? (
                    <>
                      <Check className="mr-2 -ml-1" size={16} />
                      <span>Signed In</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 -ml-1" size={16} />
                      <span>Sign In</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function useSignIn(router: ReturnType<typeof useRouter>) {
  const [state, setState] = useState<SignInState>({
    accountHash: "",
    isLoading: false,
    error: null,
    isSignedIn: false,
    attempts: 0,
  })

  const handleAccountHashChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      accountHash: e.target.value,
      error: null,
    }))
  }, [])

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // If attempts exceeded, do nothing early
      if (state.attempts >= 3) return

      setState((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        // Simulate checking key validity
        if (state.accountHash === CORRECT_KEY) {
          // Store key in localStorage or wherever you want
          localStorage.setItem("dev_panel_key", state.accountHash)

          setState((prev) => ({ ...prev, isSignedIn: true }))
          router.push("/devdownload")
        } else {
          throw new Error("Wrong key. Please try again.")
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err : new Error("An unexpected error occurred"),
          attempts: prev.attempts + 1,
        }))
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [router, state.accountHash, state.attempts],
  )

  return {
    state,
    handleSignIn,
    handleAccountHashChange,
  }
}
