import ExerciseLibrarySection from "@/components/ExerciseLibrarySection";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function LibraryPage() {
  useSEO({
    title: "Biblioteca de Exercícios | Calistenia Feminina",
    description:
      "Guia técnico completo com a execução correta passo a passo de todos os 24 movimentos do plano.",
  });

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
