"use client"

import { useState, useEffect } from "react"
import { Timer, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MarkdownEditor from "./MarkdownEditor"

export default function ProductivityDashboard() {
  const [time, setTime] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Markdown Editor */}
        <Card className="md:col-span-3 h-[calc(100vh-3rem)]">
          <CardHeader className="pb-3">
            <CardTitle>Markdown Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownEditor />
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pomodoro Timer */}
          <Card className="border-0 drop-shadow-md h-[calc(50vh-1.5rem)] py-[100px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Timer className="w-4 h-4" />
                Pomodoro Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-mono text-center">{formatTime(time)}</div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsActive(!isActive)}
                  variant={isActive ? "destructive" : "default"}
                  className="flex-1 h-10"
                >
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button
                  onClick={() => {
                    setTime(25 * 60)
                    setIsActive(false)
                  }}
                  variant="outline"
                  className="flex-1 h-10"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Digital Clock */}
          <Card className="border-0 drop-shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4" />
                Digital Clock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono text-center">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

