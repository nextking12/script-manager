import Link from "next/link";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
       <h1 className="text-6xl font-extrabold mb-16 text-center"><span style={{color: 'hsl(25, 60%, 55%)'}}>Create and Store</span> Scripts Here</h1>

       <div className="space-y-4">
      
        <input
          type="text"
          id="info"
          name="info"
          placeholder="Add your script name here"
          required
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="message" className="block text-xl text-gray-400">
          Details:
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your script here "
          required
          rows={6}
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600 resize-none"
        />
      </div>

      <button
      type="submit"
      className="bg-card hover:bg-secondary text-white px-8 py-4 rounded-full text-xl font-medium inline-flex items-center justify-center gap-2 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:hover:bg-gray-200 min-w-[180px] h-[60px] w-full sm:w-auto"
    >
       <span>Save Your Script</span>
        
    </button>
        
       
      </div>
    </main>
  );
}
