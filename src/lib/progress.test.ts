import { buildProgressSnapshot } from "./progress";

describe("buildProgressSnapshot", () => {
  it("monta métricas básicas de progresso", () => {
    const snapshot = buildProgressSnapshot(
      [1, 2, 3],
      3,
      "2026-03-07T10:00:00.000Z",
    );

    expect(snapshot.completedDaysCount).toBe(3);
    expect(snapshot.currentWeek).toBe(1);
    expect(snapshot.nextDayNumber).toBe(4);
    expect(snapshot.streak).toBe(3);
    expect(snapshot.needsReactivation).toBe(false);
  });

  it("sinaliza reativação quando streak está baixo com histórico", () => {
    const snapshot = buildProgressSnapshot(
      [1, 2, 3],
      1,
      "2026-03-07T10:00:00.000Z",
    );
    expect(snapshot.needsReactivation).toBe(true);
  });
});
