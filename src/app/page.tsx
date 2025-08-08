import Link from "next/link";
import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground pt-16">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Welcome <span className="text-[hsl(280,100%,70%)]">to</span> <span style={{color: 'hsl(25, 60%, 55%)'}}>Script Manager</span>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground hover:bg-secondary border border-border"
            href="/components/create"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Start from Scratch?→</h3>
            <div className="text-lg">
              Create, name and store your script. More reliable than our brains
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground hover:bg-secondary border border-border"
            href="/components/search"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Find Your Script →</h3>
            <div className="text-lg">
              Welcome back. Find your securely stored scripts here
            </div>
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
