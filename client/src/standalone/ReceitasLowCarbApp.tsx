import BonusRecipeBookApp from "@/components/bonus/BonusRecipeBookApp";
import receitasLowCarbBook from "@/content/bonus/receitasLowCarbData";

export default function ReceitasLowCarbApp() {
  return <BonusRecipeBookApp book={receitasLowCarbBook} />;
}
