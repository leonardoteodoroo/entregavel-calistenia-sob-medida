import { Suspense, lazy, useEffect, useState } from "react";

import {
  getOleosDetailViewModel,
  getOleosHomeViewModel,
  getOleosSectionViewModel,
  type OleosDetailEntityId,
  type OleosSectionId,
} from "./oleosEssenciaisEmagrecimentoMvpData";
import {
  buildOleosHash,
  readOleosRouteFromHash,
} from "./oleosEssenciaisRouting";
const HomeView = lazy(() => import("./OleosEssenciaisEmagrecimentoHomeApp"));
const SectionView = lazy(() => import("./OleosEssenciaisSectionListView"));
const DetailView = lazy(() => import("./OleosEssenciaisDetailView"));

function LoadingStandaloneView() {
  return (
    <div
      className="min-h-[100dvh] px-4 py-8 md:px-8"
      style={{
        background:
          "radial-gradient(circle at 14% 12%, rgba(234, 223, 202, 0.48) 0%, rgba(250, 247, 241, 1) 60%)",
      }}
    >
      <div className="mx-auto w-full max-w-4xl rounded-[22px] border bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7b614a]">
          Carregando bônus
        </p>
        <p className="mt-3 text-base leading-7 text-[#4f544d]">
          Preparando o conteúdo semântico da próxima tela...
        </p>
      </div>
    </div>
  );
}

export default function OleosEssenciaisEmagrecimentoApp() {
  const [route, setRoute] = useState(() =>
    typeof window === "undefined"
      ? ({ view: "home" } as const)
      : readOleosRouteFromHash(window.location.hash)
  );

  useEffect(() => {
    const syncRoute = () =>
      setRoute(readOleosRouteFromHash(window.location.hash));

    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  const navigateTo = (nextHash: string) => {
    window.location.hash = nextHash;
    setRoute(readOleosRouteFromHash(nextHash));
  };

  const handleOpenSection = (sectionId: OleosSectionId) => {
    navigateTo(buildOleosHash({ view: "section", sectionId }));
  };

  const handleOpenDetail = (entityId: OleosDetailEntityId) => {
    navigateTo(buildOleosHash({ view: "detail", entityId }));
  };

  const handleBackHome = () => {
    navigateTo(buildOleosHash({ view: "home" }));
  };

  const handleBackToSectionFromDetail = (entityId: OleosDetailEntityId) => {
    const detailView = getOleosDetailViewModel(entityId);
    if (detailView?.sectionId) {
      navigateTo(
        buildOleosHash({ view: "section", sectionId: detailView.sectionId })
      );
      return;
    }
    handleBackHome();
  };

  const renderView = () => {
    if (route.view === "section") {
      return (
        <SectionView
          viewModel={getOleosSectionViewModel(route.sectionId)}
          onBack={handleBackHome}
          onOpenDetail={handleOpenDetail}
        />
      );
    }

    if (route.view === "detail") {
      const detailView = getOleosDetailViewModel(route.entityId);
      if (!detailView) {
        return (
          <HomeView
            viewModel={getOleosHomeViewModel()}
            onOpenSection={handleOpenSection}
          />
        );
      }

      return (
        <DetailView
          viewModel={detailView}
          onBackHome={handleBackHome}
          onBackToSection={() => handleBackToSectionFromDetail(route.entityId)}
        />
      );
    }

    return (
      <HomeView
        viewModel={getOleosHomeViewModel()}
        onOpenSection={handleOpenSection}
      />
    );
  };

  return (
    <Suspense fallback={<LoadingStandaloneView />}>{renderView()}</Suspense>
  );
}
