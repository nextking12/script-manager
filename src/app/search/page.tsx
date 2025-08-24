"use client";
import { useState } from "react";

export default function SearchPage() {
  const [scriptName, setScriptName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const params = new URLSearchParams();
      if (scriptName) params.append("name", scriptName);
      if (selectedLanguage) params.append("language", selectedLanguage);

      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiBaseUrl}/api/scripts/search?${params}`,
      );
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setScriptName("");
        setSelectedLanguage("");
      } else {
        console.error("Search failed");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  return (
    <>
      <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="mb-16 text-center text-6xl font-extrabold">
            <span style={{ color: "hsl(25, 60%, 55%)" }}>Search For</span> Your
            Scripts
          </h1>

          <form
            onSubmit={handleSearch}
            className="flex flex-col items-center gap-6"
          >
            <div className="space-y-4">
              <input
                type="text"
                id="scriptName"
                placeholder="Enter your script name"
                value={scriptName}
                onChange={(e) => setScriptName(e.target.value)}
                className="w-full rounded-xl border-0 bg-[#111] p-4 text-xl placeholder:text-gray-600 focus:ring-1 focus:ring-gray-400"
              />
            </div>

            <div>OR</div>

            <div className="space-y-4">
              <select
                id="language"
                className="w-full rounded-xl border-0 bg-[#111] p-4 text-xl text-white focus:ring-1 focus:ring-gray-400"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="" disabled>
                  Select script language
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

            <button
              type="submit"
              className="bg-card hover:bg-secondary inline-flex h-[60px] w-full min-w-[180px] items-center justify-center gap-2 rounded-full px-8 py-4 text-xl font-medium text-white transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-gray-200 sm:w-auto"
            >
              <span>Search</span>
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-8 w-full max-w-4xl">
              <h2 className="mb-4 text-2xl font-bold">Search Results:</h2>
              <div className="grid gap-4">
                {searchResults.map((script: any) => (
                  <div key={script.id} className="rounded-lg bg-[#111] p-4">
                    <h3 className="text-xl font-semibold">{script.name}</h3>
                    <p className="text-gray-400">{script.language}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
