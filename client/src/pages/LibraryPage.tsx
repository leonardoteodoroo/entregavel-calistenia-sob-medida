import ExerciseLibrarySection from "@/components/ExerciseLibrarySection";
import Layout from "@/components/Layout";

export default function LibraryPage() {
  return (
    <Layout>
      <div
        style={{
          padding: 0,
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <ExerciseLibrarySection />
      </div>
    </Layout>
  );
}
