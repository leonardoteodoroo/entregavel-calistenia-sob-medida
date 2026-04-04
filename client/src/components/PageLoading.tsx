import React from "react";

export default function PageLoading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 w-full"
      style={{
        backgroundColor: "var(--color-ivory)",
      }}
    >
      <div className="flex flex-col items-center max-w-sm w-full mx-auto animate-pulse">
        {/* Skeleton para Título */}
        <div
          className="h-10 w-2/3 mb-8 rounded"
          style={{ backgroundColor: "var(--color-ivory-dark)" }}
        />

        {/* Skeleton para Linha Separadora (Rose) */}
        <div
          className="h-[1px] w-8 mb-10"
          style={{ backgroundColor: "var(--color-rose-muted)" }}
        />

        {/* Blocos em formato de Cards */}
        <div className="w-full space-y-4">
          <div
            className="w-full h-32 rounded-lg"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-taupe-light)",
            }}
          />
          <div
            className="w-full h-32 rounded-lg"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-taupe-light)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
