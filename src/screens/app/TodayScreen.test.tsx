import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { AppProvider } from "../../context/AppContext";

const STORAGE_KEY = "calistenia-sob-medida:v1";

const renderToday = () =>
  render(
    <MemoryRouter initialEntries={["/app/hoje"]}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>,
  );

describe("Today screen", () => {
  beforeEach(() => {
    window.localStorage.clear();

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
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
        completedDays: [],
        workoutFeedbackByDay: {},
        streak: 2,
        lastCompletedAt: "2026-03-06T10:00:00.000Z",
      }),
    );
  });

  it("renderiza blocos principais e mantém CTA de treino", async () => {
    renderToday();

    expect(await screen.findByText(/pronta para hoje/i)).toBeInTheDocument();
    expect(screen.getByText(/foco:/i)).toBeInTheDocument();
    expect(screen.getByText(/treino do dia/i)).toBeInTheDocument();
    expect(screen.getByText(/próximos dias/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar treino/i }),
    ).toBeInTheDocument();
  }, 12000);

  it("card bloqueado leva para aba Plano", async () => {
    renderToday();

    const firstLockedDay = await screen.findByRole("button", {
      name: /dia 2 bloqueado, abrir plano/i,
    });

    fireEvent.click(firstLockedDay);

    expect(
      await screen.findByText(/jornada guiada de 28 dias/i),
    ).toBeInTheDocument();
  });

  it("ícone de perfil em destaque abre a aba Perfil", async () => {
    renderToday();

    fireEvent.click(
      await screen.findByRole("button", { name: /abrir perfil/i }),
    );

    expect(await screen.findByText(/^perfil$/i)).toBeInTheDocument();
  });
});
