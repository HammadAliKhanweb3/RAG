'use client'
import * as React from "react"
import { UploadCloud } from "lucide-react"

export const FileUpload: React.FC = () => {

  const handleFileSubmit = () => {
    const el = document.createElement('input')
    el.type = 'file'
    el.accept = 'application/pdf'

    el.onchange = async () => {
      if (el.files && el.files.length > 0) {
        const file = el.files[0]
        const formData = new FormData()
        formData.append("pdf", file)

        const res = await fetch("http://localhost:8000/upload/pdf", {
          method: "POST",
          body: formData
        })

        const data = await res.json()
        console.log(data)
      }
    }

    el.click()
  }

  return (
    <div
      onClick={handleFileSubmit}
      className="w-full cursor-pointer rounded-2xl border border-white/10 bg-[#0b0f17] p-6 hover:bg-[#111827] transition"
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="p-3 rounded-full bg-white/5">
          <UploadCloud className="w-6 h-6 text-white/80" />
        </div>

        <h3 className="text-sm font-medium text-white/90">
          Upload PDF Document
        </h3>

        <p className="text-xs text-white/40">
          Click to upload and analyze with AI
        </p>
      </div>
    </div>
  )
}