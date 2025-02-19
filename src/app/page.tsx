import MarkdownEditor from "./MarkdownEditor";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Markdown Notes</h1>
      <MarkdownEditor />
    </div>
  );
}
