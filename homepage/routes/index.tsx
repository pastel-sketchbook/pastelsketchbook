import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../src/components/Hero";
import { Philosophy } from "../src/components/Philosophy";
import { SparkAI } from "../src/components/SparkAI";
import { Growth } from "../src/components/Growth";

export const Route = createFileRoute("/")({
  component: Index,
});

import { SketchErrorBoundary } from "../src/components/ui/SketchErrorBoundary";

function Index() {
  return (
    <div className="bg-[#FAF9F6]">
      <Hero />
      <Philosophy />
      <SketchErrorBoundary name="Spark AI">
        <SparkAI />
      </SketchErrorBoundary>
      <SketchErrorBoundary name="Growth & Charts">
        <Growth />
      </SketchErrorBoundary>
    </div>
  );
}
