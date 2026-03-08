import { computeNextStreak, mergeCompletedDays } from "./workoutState";

describe("workout state helpers", () => {
  it("incrementa streak quando o treino acontece em dias consecutivos", () => {
    const streak = computeNextStreak(
      2,
      "2026-03-05T10:00:00.000Z",
      new Date("2026-03-06T10:00:00.000Z"),
    );
    expect(streak).toBe(3);
  });

  it("reinicia streak quando há pausa de mais de um dia", () => {
    const streak = computeNextStreak(
      5,
      "2026-03-01T10:00:00.000Z",
      new Date("2026-03-04T10:00:00.000Z"),
    );
    expect(streak).toBe(1);
  });

  it("adiciona dia concluído sem duplicar", () => {
    expect(mergeCompletedDays([1, 2], 3)).toEqual([1, 2, 3]);
    expect(mergeCompletedDays([1, 2], 2)).toEqual([1, 2]);
  });
});
