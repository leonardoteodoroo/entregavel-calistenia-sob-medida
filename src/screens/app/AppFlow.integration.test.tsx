import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { AppProvider } from "../../context/AppContext";

const renderFlow = () =>
  render(
    <MemoryRouter initialEntries={["/"]}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>,
  );

describe("MVP app flow", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("executa onboarding até conclusão do treino e atualiza progresso", async () => {
    renderFlow();

    fireEvent.click(screen.getByRole("button", { name: /acessar meu plano/i }));
    await screen.findByText(/bem-vinda ao seu plano/i);

    fireEvent.click(screen.getByRole("button", { name: /continuar/i }));
    await screen.findByText(/seu perfil no sistema/i);

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar e seguir/i }),
    );
    await screen.findByText(/ajustes rápidos/i);

    fireEvent.click(screen.getByRole("button", { name: /gerar meu plano/i }));
    await screen.findByText(/seu plano foi montado assim/i);

    fireEvent.click(screen.getByRole("button", { name: /entrar no app/i }));
    expect(await screen.findByText(/pronta para hoje/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /INICIAR TREINO/i }));
    await screen.findByText(/treino dia/i);

    fireEvent.click(screen.getByRole("button", { name: /próximo exercício/i }));
    fireEvent.click(screen.getByRole("button", { name: /próximo exercício/i }));
    fireEvent.click(screen.getByRole("button", { name: /finalizar treino/i }));

    await screen.findByText(/treino concluído/i);
    fireEvent.click(
      screen.getByRole("button", { name: /salvar e ver progresso/i }),
    );

    expect(await screen.findByText(/1\/28/i)).toBeInTheDocument();
  }, 20000);
});
