"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { getNotes, addNote, deleteNote } from "@/lib/supabase";

export default function MarkdownEditor() {
  const [notes, setNotes] = useState<
    { id: number; title: string; content: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Load notes when component mounts
  useEffect(() => {
    async function fetchNotes() {
      try {
        const notesData = await getNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }
    fetchNotes();
  }, []);

  // Save new note
  async function handleSaveNote() {
    if (!title || !content) return alert("Title and content are required!");

    try {
      const newNote = await addNote(title, content);
      if (newNote.length > 0) {
        setNotes([...notes, ...newNote]); // Append new notes
      }
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // Delete note
  async function handleDeleteNote(id: number) {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id)); // Remove note from UI
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-200">Markdown Notes</h1>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        className="w-full p-2 mb-2 border rounded bg-gray-800 text-white placeholder-gray-400"
      />

      {/* Markdown Editor */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note in Markdown..."
        className="w-full h-40 p-2 border rounded bg-gray-800 text-white placeholder-gray-400"
      />

      {/* Save Button */}
      <button
        onClick={handleSaveNote}
        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded mt-2"
      >
        Save Note
      </button>

      {/* Notes List */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-300">Saved Notes</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet. Start writing!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="border p-4 my-2 rounded bg-gray-800">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-200">{note.title}</h3>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete
                </button>
              </div>
              <ReactMarkdown className="prose prose-invert">
                {note.content}
              </ReactMarkdown>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
