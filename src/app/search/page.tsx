"use client";
import Link from "next/link";
import { useState } from "react";

export default function CreatePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [scriptContent, setScriptContent] = useState("");

  return (
    <>
<main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
       <h1 className="text-6xl font-extrabold mb-16 text-center"><span style={{color: 'hsl(25, 60%, 55%)'}}>Search For</span> Your Scripts </h1>

       <div className="space-y-4">
      
        <input
          type="text"
          id="info"
          name="info"
          placeholder="Enter your script name"
          required
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>
      <div>OR</div>


<div className="space-y-4">
  <select
    id="language"
    name="language"
    required
    className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 text-white-600"
    value={selectedLanguage}
    onChange={(e) => setSelectedLanguage(e.target.value)}
  >
    <option value="" disabled>
      Enter your scripts language
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


  <div>
          <textarea
            id="message"
            name="message"
            value={scriptContent}
            onChange={(e) => setScriptContent(e.target.value)}
            className="sr-only"
            required
          />
        </div>
      </div>

      <button
      type="submit"
      className="bg-card hover:bg-secondary text-white px-8 py-4 rounded-full text-xl font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-gray-200 min-w-[180px] h-[60px] w-full sm:w-auto"
    >
       <span>Search</span>
        
    </button>
        
       
      
    </main>
    </>
  );
}
