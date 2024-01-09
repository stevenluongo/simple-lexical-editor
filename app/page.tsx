import dynamic from "next/dynamic";
const LexicalEditor = dynamic(() => import("./app"), { ssr: false });

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#eee] p-12">
      <LexicalEditor />
    </main>
  );
}
