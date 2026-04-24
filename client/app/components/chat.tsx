'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Doc {
  pageContent?: string
  metadata?: {
    loc?: { pageNumber?: number }
    source?: string
  }
}

interface IMessage {
  role: "user" | "assistant"
  content?: string
  documents?: Doc[]
}

export const Chat: React.FC = () => {

  const [message, setMessage] = React.useState("")
  const [messages, setMessages] = React.useState<IMessage[]>([])

  const handlSendChat = async () => {
    if (!message.trim()) return

    const userMsg = message
    setMessage("")

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMsg }
    ])

    try {
      const res = await fetch(
        "http://localhost:8000/chat?message=" + encodeURIComponent(userMsg)
      )

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message,
          documents: data.docs
        }
      ])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message}`
        }
      ])
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0d14] text-white">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                ${msg.role === "user"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white border border-white/10"
                }
              `}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4 bg-[#0a0d14]">
        <div className="flex gap-3 items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about your document..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
          />

          <Button
            onClick={handlSendChat}
            disabled={!message.trim()}
            className="bg-white text-black hover:bg-white/80"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}