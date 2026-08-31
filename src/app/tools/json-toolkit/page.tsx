import { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { JsonToolkitContainer } from "@/components/tools/json-toolkit/json-toolkit-container";

export const metadata: Metadata = {
  title: "JSON Toolkit — Formatter, Validator, Minifier & TypeScript Generator | Developer Tools",
  description:
    "Free, fast, client-side JSON toolkit to format, validate, minify JSON, and generate clean TypeScript types and interfaces from JSON payloads.",
};

export default function JsonToolkitPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="pt-24 pb-16 flex-1 flex flex-col">
        <JsonToolkitContainer />
      </main>

      <Footer />
    </div>
  );
}
