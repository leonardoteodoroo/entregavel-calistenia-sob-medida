import { type ReactNode } from "react";

import PlannerChoiceButton from "@/components/meal-planner/PlannerChoiceButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MealDefinition } from "@/lib/mealPlanData";
import type { MealCustomizationViewModel } from "@/lib/mealPlannerCustomization";

interface MealCustomizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  meal: MealDefinition;
  viewModel: MealCustomizationViewModel;
  disabled?: boolean;
  onSelectVariant: (variantId: "base" | string) => void;
  onSelectOption: (slotId: string, optionId: string | null) => void;
  onSave: () => void;
}

function DialogSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        borderTop: "1px solid rgba(95,86,75,0.14)",
        paddingTop: "1rem",
      }}
    >
      <div className="mb-3">
        <p
          className="font-body"
          style={{
            fontSize: "0.76rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-rose)",
          }}
        >
          {title}
        </p>
        {description ? (
          <p
            className="font-body mt-1"
            style={{
              fontSize: "0.82rem",
              color: "var(--color-charcoal-light)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function MealCustomizationDialog({
  open,
  onOpenChange,
  meal,
  viewModel,
  disabled = false,
  onSelectVariant,
  onSelectOption,
  onSave,
}: MealCustomizationDialogProps) {
  const isBaseActive = viewModel.variantChoices.some(
    choice => choice.id === "base" && choice.active
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[90vh] overflow-y-auto border-0 p-0 sm:max-w-4xl"
        showCloseButton={false}
        style={{
          background:
            "linear-gradient(180deg, rgba(255,250,243,0.99) 0%, rgba(245,235,221,0.98) 100%)",
          boxShadow: "0 28px 80px rgba(45,33,25,0.22)",
          borderRadius: "28px",
        }}
      >
        <div style={{ padding: "1.4rem 1.4rem 1.25rem" }}>
          <DialogHeader className="mb-4 text-left">
            <DialogTitle
              className="font-display"
              style={{
                fontSize: "1.5rem",
                color: "var(--color-charcoal)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {meal.label}
            </DialogTitle>
            <DialogDescription
              className="font-body"
              style={{
                fontSize: "0.92rem",
                color: "var(--color-charcoal-light)",
                lineHeight: 1.65,
              }}
            >
              {meal.subtitle}
            </DialogDescription>
            <div
              style={{
                marginTop: "0.35rem",
                borderRadius: "20px",
                border: "1px solid rgba(95,86,75,0.14)",
                background: "rgba(255,255,255,0.58)",
                padding: "0.95rem 1rem",
              }}
            >
              <p
                className="font-body"
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-teal)",
                }}
              >
                Resumo atual
              </p>
              <ul className="mt-3 space-y-2">
                {viewModel.currentSummary.map(item => (
                  <li
                    key={`${item.name}-${item.portion}`}
                    className="flex items-start justify-between gap-3"
                  >
                    <span
                      className="font-body"
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--color-charcoal)",
                        fontWeight: 500,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="font-body text-right"
                      style={{
                        fontSize: "0.76rem",
                        color: "var(--color-charcoal-light)",
                        lineHeight: 1.45,
                        maxWidth: "40%",
                      }}
                    >
                      {item.portion}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <DialogSection
              title="Versão da refeição"
              description="Escolha a base do plano ou uma combinação pronta para esta refeição."
            >
              <div className="grid gap-2 md:grid-cols-2">
                {viewModel.variantChoices.map(choice => (
                  <PlannerChoiceButton
                    key={choice.id}
                    label={choice.id === "base" ? "Base do plano" : choice.label}
                    hint={
                      choice.id === "base"
                        ? "Libera a montagem manual desta refeição"
                        : "Usa uma combinação pronta"
                    }
                    active={choice.active}
                    disabled={disabled}
                    onClick={() => onSelectVariant(choice.id)}
                  />
                ))}
              </div>
            </DialogSection>

            {isBaseActive ? (
              <DialogSection
                title="Monte seu prato"
                description="Escolha item por item apenas onde esta refeição permite troca."
              >
                <div className="space-y-4">
                  {viewModel.editableGroups.map(group => (
                    <div
                      key={group.slotId}
                      style={{
                        borderRadius: "20px",
                        border: "1px solid rgba(95,86,75,0.14)",
                        background: "rgba(255,255,255,0.54)",
                        padding: "1rem",
                      }}
                    >
                      <div className="mb-3">
                        <p
                          className="font-body"
                          style={{
                            fontSize: "0.84rem",
                            fontWeight: 600,
                            color: "var(--color-charcoal)",
                          }}
                        >
                          {group.groupLabel}
                        </p>
                        <p
                          className="font-body mt-1"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--color-charcoal-light)",
                            lineHeight: 1.6,
                          }}
                        >
                          {group.modalDescription}
                        </p>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2">
                        <PlannerChoiceButton
                          label={`Manter ${group.from}`}
                          hint="Segue com o item base do plano"
                          active={!group.selectedOptionId}
                          disabled={disabled}
                          onClick={() => onSelectOption(group.slotId, null)}
                        />
                        {group.options.map(option => (
                          <PlannerChoiceButton
                            key={option.id}
                            label={option.name}
                            hint={option.portion}
                            active={option.active}
                            disabled={disabled}
                            onClick={() => onSelectOption(group.slotId, option.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogSection>
            ) : null}

            <DialogSection
              title="Mantidos automaticamente"
              description="Itens que continuam na refeição sem depender de troca manual."
            >
              {viewModel.fixedItems.length > 0 ? (
                <div className="grid gap-2 md:grid-cols-2">
                  {viewModel.fixedItems.map(item => (
                    <div
                      key={`${item.name}-${item.portion}`}
                      style={{
                        borderRadius: "18px",
                        border: "1px solid rgba(95,86,75,0.14)",
                        background: "rgba(255,255,255,0.58)",
                        padding: "0.85rem 0.95rem",
                      }}
                    >
                      <p
                        className="font-body"
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 600,
                          color: "var(--color-charcoal)",
                        }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-body mt-1"
                        style={{
                          fontSize: "0.76rem",
                          color: "var(--color-charcoal-light)",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.portion}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p
                  className="font-body"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-charcoal-light)",
                    lineHeight: 1.6,
                  }}
                >
                  Nesta base, todos os itens podem ser ajustados manualmente.
                </p>
              )}
            </DialogSection>
          </div>

          <DialogFooter
            className="mt-5 border-t pt-4 sm:justify-between"
            style={{ borderColor: "rgba(95,86,75,0.14)" }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onSave}
              disabled={disabled}
              style={{
                backgroundColor: "var(--color-rose)",
                borderColor: "var(--color-rose)",
                color: "white",
              }}
            >
              Salvar refeição
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
