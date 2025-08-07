import Link from "next/link";

export default function CreatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">Here</span> 
        </h1>
       
      </div>
    </main>
  );
}
