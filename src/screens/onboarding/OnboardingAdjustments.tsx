import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { plansMetadata } from "../../data/plans";
import type { OnboardingAdjustments } from "../../types/profile";
import type { allPlans } from "../../data/plans";

const defaultAdjustments: OnboardingAdjustments = {
  trainingDaysPerWeek: 4,
  sessionPreference: 15,
  floorTraining: true,
  kneePain: false,
  wristPain: false,
  lowImpact: true,
  perceivedLevel: "iniciante",
};

type ToggleField = "floorTraining" | "kneePain" | "wristPain" | "lowImpact";

export const OnboardingAdjustmentsScreen = () => {
  const navigate = useNavigate();
  const { applyAdjustments, switchPlan, state } = useAppContext();
  const [form, setForm] = useState<OnboardingAdjustments>(defaultAdjustments);
  const [selectedPlanId, setSelectedPlanId] = useState<keyof typeof allPlans>(
    state.activePlanId,
  );

  const updateBoolean = (field: ToggleField) => {
    setForm((previous) => ({ ...previous, [field]: !previous[field] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    switchPlan(selectedPlanId);
    applyAdjustments(form);
    navigate("/plano-montado");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex min-h-screen w-full max-w-[800px] flex-col px-5 py-8"
    >
      <h1 className="font-serif text-3xl text-[color:var(--color-text-primary)]">
        Ajustes rápidos
      </h1>
      <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
        Coletamos só o necessário para montar seu plano com segurança.
      </p>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
            Escolha seu plano
          </span>
          <select
            value={selectedPlanId}
            onChange={(event) =>
              setSelectedPlanId(event.target.value as keyof typeof allPlans)
            }
            className="w-full rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-2 text-[color:var(--color-text-primary)]"
          >
            {plansMetadata.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-[color:var(--color-text-tertiary)]">
            {plansMetadata.find((p) => p.id === selectedPlanId)?.description}
          </p>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
            Dias por semana
          </span>
          <select
            value={form.trainingDaysPerWeek}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                trainingDaysPerWeek: Number(event.target.value) as 3 | 4 | 5,
              }))
            }
            className="w-full rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-2 text-[color:var(--color-text-primary)]"
          >
            <option value={3}>3 dias</option>
            <option value={4}>4 dias</option>
            <option value={5}>5 dias</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
            Tempo por sessão
          </span>
          <select
            value={form.sessionPreference}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                sessionPreference: Number(event.target.value) as 10 | 15 | 20,
              }))
            }
            className="w-full rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-2 text-[color:var(--color-text-primary)]"
          >
            <option value={10}>10 minutos</option>
            <option value={15}>15 minutos</option>
            <option value={20}>20 minutos</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--color-text-secondary)]">
            Nível percebido
          </span>
          <select
            value={form.perceivedLevel}
            onChange={(event) =>
              setForm((previous) => ({
                ...previous,
                perceivedLevel: event.target.value as
                  | "iniciante"
                  | "intermediaria",
              }))
            }
            className="w-full rounded-md border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-card)] px-3 py-2 text-[color:var(--color-text-primary)]"
          >
            <option value="iniciante">Iniciante</option>
            <option value="intermediaria">Intermediária</option>
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            { key: "floorTraining", label: "Consegue treinar no chão" },
            { key: "kneePain", label: "Tem desconforto no joelho" },
            { key: "wristPain", label: "Tem desconforto no punho" },
            { key: "lowImpact", label: "Prefere baixo impacto" },
          ].map((item) => {
            const key = item.key as ToggleField;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => updateBoolean(key)}
                className={`rounded-lg border px-3 py-3 text-left transition ${
                  form[key]
                    ? "border-[color:var(--color-action-primary)] bg-[color:var(--color-action-secondary-hover)] text-[color:var(--color-text-primary)]"
                    : "border-[color:var(--color-border-default)] bg-[color:var(--color-surface-subtle)] text-[color:var(--color-text-secondary)]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg bg-[color:var(--color-action-primary)] px-4 py-3 font-bold text-[color:var(--color-text-on-brand)]"
      >
        Gerar meu plano
      </button>
    </form>
  );
};
