"use client"

import { useState, useEffect } from "react"
import ReactMarkdown from "react-markdown"
import { getNotes, addNote, deleteNote } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

export default function MarkdownEditor() {
  const [notes, setNotes] = useState<{ id: number; title: string; content: string }[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notesData = await getNotes()
        setNotes(notesData)
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }
    fetchNotes()
  }, [])

  async function handleSaveNote() {
    if (!title || !content) return alert("Title and content are required!")

    try {
      const newNote = await addNote(title, content)
      if (newNote.length > 0) {
        setNotes([...notes, ...newNote])
      }
      setTitle("")
      setContent("")
    } catch (error) {
      console.error("Error adding note:", error)
    }
  }

  async function handleDeleteNote(id: number) {
    try {
      await deleteNote(id)
      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      {/* Markdown Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note in Markdown..."
        className="w-full flex-1 p-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring min-h-[200px]"
      />

      {/* Save Button */}
      <button
        onClick={handleSaveNote}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-lg transition-colors"
      >
        Save Note
      </button>

      {/* Live Preview */}
      <div className="flex-1 min-h-[200px]">
        <h2 className="font-semibold mb-2">Live Preview</h2>
        <div className="h-full p-3 rounded-lg border border-input bg-background/50 overflow-auto">
          <ReactMarkdown
            className="prose prose-sm dark:prose-invert max-w-none"
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-semibold" {...props} />,
              p: ({ node, ...props }) => <p className="text-muted-foreground break-words" {...props} />,
            }}
          >
            {content || "Start typing to see a live preview..."}
          </ReactMarkdown>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 min-h-[200px]">
        <h2 className="font-semibold mb-2">Saved Notes</h2>
        <div className="h-full overflow-auto">
          {notes.length === 0 ? (
            <p className="text-muted-foreground">No notes yet. Start writing!</p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li
                  key={note.id}
                  className="flex justify-between items-center p-3 rounded-lg border border-input bg-background/50"
                >
                  <span className="text-foreground">{note.title}</span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-destructive hover:text-destructive/90 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

