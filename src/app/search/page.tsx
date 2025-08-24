"use client";
import { useState } from "react";

export default function SearchPage() {
  const [scriptName, setScriptName] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateScript, setUpdateScript] = useState<any>(null);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    language: "",
    scriptContent: "",
  });

  const handleDelete = async (scriptName: string) => {
    if (
      !confirm(
        `Are you sure you want to delete "${scriptName}"? This action cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiBaseUrl}/api/scripts/byName/${encodeURIComponent(scriptName)}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setSearchResults(
          searchResults.filter((script: any) => script.name !== scriptName),
        );
        alert(`Script "${scriptName}" has been deleted successfully.`);
      } else {
        alert("Failed to delete script. Please try again.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the script. Please try again.");
    }
  };

  const handleUpdate = async (script: any) => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiBaseUrl}/api/scripts/search/name/${encodeURIComponent(script.name)}`,
      );

      if (response.ok) {
        const fullScript = await response.json();
        setUpdateScript(fullScript);
        setUpdateForm({
          name: fullScript.name,
          language: fullScript.language,
          scriptContent: fullScript.scriptContent || "",
        });
        setShowUpdateModal(true);
      } else {
        alert("Failed to fetch script details.");
      }
    } catch (error) {
      console.error("Error fetching script:", error);
      alert("An error occurred while fetching script details.");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiBaseUrl}/api/scripts/update/${encodeURIComponent(updateScript.name)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateForm),
        },
      );

      if (response.ok) {
        const updatedScript = await response.json();
        setSearchResults(
          searchResults.map((script: any) =>
            script.id === updatedScript.id ? updatedScript : script,
          ),
        );
        setShowUpdateModal(false);
        alert(`Script "${updateForm.name}" has been updated successfully.`);
      } else {
        alert("Failed to update script. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while updating the script. Please try again.");
    }
  };

  const handleUpdateCancel = () => {
    setShowUpdateModal(false);
    setUpdateScript(null);
    setUpdateForm({ name: "", language: "", scriptContent: "" });
  };

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
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{script.name}</h3>
                        <p className="text-gray-400">{script.language}</p>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleUpdate(script)}
                          className="bg-card hover:bg-secondary rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(script.name)}
                          className="rounded-lg border border-gray-700 bg-[#111] px-4 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showUpdateModal && (
            <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
              <div className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#111] p-6">
                <h2 className="mb-6 text-2xl font-bold">Update Script</h2>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Script Name
                    </label>
                    <input
                      type="text"
                      value={updateForm.name}
                      onChange={(e) =>
                        setUpdateForm({ ...updateForm, name: e.target.value })
                      }
                      className="w-full rounded-xl border-0 bg-[#222] p-4 text-white focus:ring-1 focus:ring-gray-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Language
                    </label>
                    <select
                      value={updateForm.language}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          language: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border-0 bg-[#222] p-4 text-white focus:ring-1 focus:ring-gray-400"
                    >
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
                    <label className="mb-2 block text-sm font-medium">
                      Script Content
                    </label>
                    <textarea
                      value={updateForm.scriptContent}
                      onChange={(e) =>
                        setUpdateForm({
                          ...updateForm,
                          scriptContent: e.target.value,
                        })
                      }
                      rows={12}
                      className="w-full rounded-xl border-0 bg-[#222] p-4 font-mono text-sm text-white focus:ring-1 focus:ring-gray-400"
                      placeholder="Enter your script content here..."
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={handleUpdateCancel}
                    className="rounded-lg bg-[#222] px-6 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateSubmit}
                    className="bg-card hover:bg-secondary rounded-lg px-6 py-2 font-medium text-white transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
