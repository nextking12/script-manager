import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Welcome <span className="text-[hsl(280,100%,70%)]">to</span> Script Manager
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground hover:bg-secondary border border-border"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Start from Scratch?→</h3>
            <div className="text-lg">
              Create, name and store your script. More reliable than our brains
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-card p-4 text-card-foreground hover:bg-secondary border border-border"
            href="https://create.t3.gg/en/introduction"
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
  );
}
