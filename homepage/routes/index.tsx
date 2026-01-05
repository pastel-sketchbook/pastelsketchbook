import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../src/components/Hero";
import { Philosophy } from "../src/components/Philosophy";
import { SparkAI } from "../src/components/SparkAI";
import { GrowthDynamic } from "../src/components/GrowthDynamic";
import { SketchErrorBoundary } from "../src/components/ui/SketchErrorBoundary";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-[#FAF9F6]">
      <Hero />
      <Philosophy />
      <SketchErrorBoundary name="Spark AI">
        <SparkAI />
      </SketchErrorBoundary>
      <SketchErrorBoundary name="Growth & Charts">
        <GrowthDynamic />
      </SketchErrorBoundary>
    </div>
  );
}
