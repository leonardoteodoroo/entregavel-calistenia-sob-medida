import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { AppProvider } from "../../context/AppContext";

const STORAGE_KEY = "calistenia-sob-medida:v1";

const baseState = {
  quizProfile: {
    name: "Maria",
    profileLabel: "Mulher com rotina corrida e foco em consistência",
    mainGoal: "tonificar",
    currentLevel: "iniciante",
    bodyFocus: "Glúteos e abdômen",
    availableMinutes: 15,
  },
  onboarding: {
    accessGranted: true,
    welcomeSeen: true,
    profileConfirmed: true,
    adjustments: {
      trainingDaysPerWeek: 4,
      sessionPreference: 15,
      floorTraining: true,
      kneePain: false,
      wristPain: false,
      lowImpact: true,
      perceivedLevel: "iniciante",
    },
    planReasonSeen: true,
  },
  derivedProfile: {
    profileBase: "Perfil ativo",
    goal: "tonificar",
    focus: "Saúde",
    sessionMinutes: 15,
    restrictions: [],
    copyTone: "confiante e técnico",
    weekOneFocus: "Movimentos controlados",
    todayInstruction:
      "Lembre-se do seu objetivo. 15 min é tudo que você precisa hoje.",
  },
  workoutFeedbackByDay: {},
  streak: 2,
  lastCompletedAt: "2026-03-06T10:00:00.000Z",
};

const renderPlanWithCompletedDays = (completedDays: number[]) => {
  window.localStorage.clear();
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      ...baseState,
      completedDays,
    }),
  );

  return render(
    <MemoryRouter initialEntries={["/app/plano"]}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>,
  );
};

describe("Plan screen", () => {
  it("abre em modo focado com apenas semana vigente expandida", async () => {
    renderPlanWithCompletedDays([]);

    expect(await screen.findByText(/progresso geral/i)).toBeInTheDocument();
    expect(screen.getByText(/dia 1 de 28/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ver plano completo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^semana 1$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/dia 1 • base de pernas e core/i),
    ).toBeInTheDocument();

    expect(screen.getByText(/^semana 2$/i)).toBeInTheDocument();
    expect(
      screen.getByText(/complete a semana 1 para liberar/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/dia 8 • base de pernas e core/i),
    ).not.toBeInTheDocument();
  });

  it("expande para visão completa e mantém semanas bloqueadas em read-only", async () => {
    renderPlanWithCompletedDays([]);

    const toggle = await screen.findByRole("button", {
      name: /ver plano completo/i,
    });
    fireEvent.click(toggle);

    expect(
      screen.getByRole("button", { name: /voltar para semana vigente/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/dia 8 • base de pernas e core/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/complete a semana 1 para liberar/i).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(/bloqueado/i).length).toBeGreaterThan(0);
  });
});
