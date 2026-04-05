import TipCard from "../../components/TipCard/TipCard";
import SabotageCard from "../../components/SabotageCard/SabotageCard";
import mindsetData from "../../data/mindset.json";
import tipsData from "../../data/tips.json";
import type { MindsetData, Tip } from "../../data/types";
import styles from "./MindsetPage.module.css";

const tips = (tipsData as Tip[]).filter(tip => tip.number > 0);
const mindset = mindsetData as MindsetData;

export default function MindsetPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className="headline-lg">Mentalidade</h1>
        <p className="body-md text-variant mt-4">
          Seu espaço para respirar e reprogramar
        </p>
      </header>

      <section aria-label="Dicas de Bem-Estar" className={styles.tipsSection}>
        {tips.map(tip => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </section>

      <section
        aria-label="Reprograme sua mente"
        className={styles.pairsSection}
      >
        <p className="label-md text-variant">Reprograme sua mente</p>

        <div className={styles.pairsList}>
          {mindset.pairs.map(pair => (
            <SabotageCard key={pair.id} pair={pair} />
          ))}
        </div>
      </section>
    </div>
  );
}
