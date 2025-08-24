"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const handleSubmission = async (
  event: React.FormEvent<HTMLFormElement>,
  name: string,
  language: string,
  scriptContent: string,
  clearForm: () => void,
) => {
  event.preventDefault();

  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
    const response = await fetch(`${apiBaseUrl}/api/scripts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, language, scriptContent }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Submission failed:", errorData);
      alert(`Error: ${errorData.message || "Failed to save script."}`);
      return;
    }

    const result = await response.json();
    console.log("Submission successful:", result);
    alert("Script saved successfully!");
    clearForm();
  } catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred while saving the script. Please try again.");
  }
};

export default function CreatePage() {
  const [name, setName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [scriptContent, setScriptContent] = useState("");

  const clearForm = () => {
    setName("");
    setSelectedLanguage("");
    setScriptContent("");
  };

  return (
    <>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
        <form
          onSubmit={(e) =>
            handleSubmission(
              e,
              name,
              selectedLanguage,
              scriptContent,
              clearForm,
            )
          }
          className="container flex flex-col items-center justify-center gap-12 px-4 py-16"
        >
          <h1 className="mb-16 text-center text-6xl font-extrabold">
            <span style={{ color: "hsl(25, 60%, 55%)" }}>Create and Store</span>{" "}
            Scripts Here
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              id="name"
              placeholder="Add your script name here"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border-0 bg-[#111] p-4 text-xl placeholder:text-gray-600 focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div className="space-y-4">
            <select
              id="language"
              required
              className="w-full rounded-xl border-0 bg-[#111] p-4 text-xl text-white focus:ring-1 focus:ring-gray-400"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="" disabled>
                Select your script language
              </option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="bash">Bash</option>
              <option value="powershell">PowerShell</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="cpp">C++</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Editor
                height="300px"
                width="50vw"
                language={selectedLanguage || "plaintext"}
                theme="vs-dark"
                value={scriptContent}
                onChange={(value) => setScriptContent(value || "")}
                options={{
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  fontSize: 18,
                  fontFamily:
                    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                  padding: { top: 16, bottom: 16 },
                  suggest: {
                    showKeywords: true,
                    showSnippets: true,
                  },
                }}
                className="overflow-hidden rounded-xl"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-card hover:bg-secondary inline-flex h-[60px] w-full min-w-[180px] items-center justify-center gap-2 rounded-full px-8 py-4 text-xl font-medium text-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-gray-200 sm:w-auto"
          >
            <span>Save Your Script</span>
          </button>
        </form>
      </main>
    </>
  );
}
