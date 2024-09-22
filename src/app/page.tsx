import Logo from "@/components/vector/logo";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="p-8">
        <div className="flex items-center gap-2">
          <Logo />
          <h1>My Task Board</h1>
        </div>
      </div>
    </main>
  );
}
