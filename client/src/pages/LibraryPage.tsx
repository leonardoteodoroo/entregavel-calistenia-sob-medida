import ExerciseLibrarySection from "@/components/ExerciseLibrarySection";
import Layout from "@/components/Layout";

export default function LibraryPage() {
  return (
    <Layout>
      <div
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <ExerciseLibrarySection />
      </div>
    </Layout>
  );
}
