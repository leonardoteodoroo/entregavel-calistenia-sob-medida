/**
 * Mapeamento de URLs de imagens dos exercícios
 * Cada exercício tem 3 imagens: início, meio, fim
 * URLs são CDN e persistem com o ciclo de vida do site
 */

export const exerciseImages: Record<
  string,
  { inicio: string; meio: string; fim: string }
> = {
  "Marcha parada": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-inicio-gs74nU6GmwAnAbKGJwdmgo.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-meio-DPzr9QdgpB3R5U2Hd73TAR.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-fim-QC5WkcVdhVoQSJAc89dX9d.webp",
  },
  "Agachamento assistido": {
    inicio: "/exercises/agachamento-assistido/inicio.webp",
    meio: "/exercises/agachamento-assistido/meio.webp",
    fim: "/exercises/agachamento-assistido/fim.webp",
  },
  "Ponte de glúteos": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-inicio-WV4crZawxr8WCHFZFncsyk.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-meio-Ti6XcK2fBzw7equarsqdyZ.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-fim-A3yQ43QPhyL4aATpWBKjt8.webp",
  },
  "Dead bug": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-dead-bug-inicio-44WEXDf7ViXkDNAoHyvZ4R.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-dead-bug-meio-W9jUCGcFySP5BxjuLKZapS.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-dead-bug-fim-jyqc4Mt3EaxJLGrVXAFzuS.webp",
  },
  "Wall push-up": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-wall-pushup-inicio-mS4LP95d3Dh8irZfEewnEi.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-wall-pushup-meio-n3n33gt4sGhGBfEgAcKVT8.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-wall-pushup-fim-89ztHwdbQUgV7SsiVuKFkF.webp",
  },
  "Bird dog": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-bird-dog-inicio-GQ8JJBJt59XCAh6Y52haYh.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-bird-dog-meio-ZfwVT2ormaUTSDiMY37MLM.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-bird-dog-fim-9ejNyBH56HZHWjH7C7Fwnw.webp",
  },
  "Prancha adaptada": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-prancha-adaptada-inicio-C97UK2VcvChDNQERZCxFUo.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-prancha-adaptada-meio-PyfwBAHJDRj7bACCFN2E7Z.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-prancha-adaptada-fim-nmQWfLen2RC7sMacBaepSU.webp",
  },
  "Elevação de panturrilha": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-panturrilha-inicio-ZdAXCd2SngvDMLiB2ru9MQ.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-panturrilha-meio-mWDD6bF3tQMBXsSifc9weA.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-panturrilha-fim-NWiYZR6ES6nkoMpfTCRpUP.webp",
  },
  "Avanço curto com apoio": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-avanço-curto-inicio-TY47mBfHLhiBXZB8gAxoim.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-avanço-curto-meio-gvZBSbnLDXby87nSMWgRAU.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-avanço-curto-fim-3BaYK2uMb4WkECkQn4V94o.webp",
  },
  "Mobilidade de quadril": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-quadril-inicio-NFL9BNSvgMVLUnUVxkzJ5R.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-quadril-meio-ZPs29RRowdmpo3DEvLqo4C.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-quadril-fim-o5nQrx7rGePfQ6hBFJoN77.webp",
  },
  "Polichinelo sem salto": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-polichinelo-sem-salto-inicio-EwFqAgnQ2aF2k3zfUmwTxF.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-polichinelo-sem-salto-meio-44TyjfGXGcTK5fb5fi9mgV.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-polichinelo-sem-salto-fim-cf67ArZviETNswjmeFytAv.webp",
  },
  "Good morning sem peso": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-good-morning-inicio-ALin6d69AxYtmokdf9B3Gy.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-good-morning-meio-TqAk3EGdPqr9AVjVM74W8A.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-good-morning-fim-DrManoRYfSTbW5WC7YBsUQ.webp",
  },
  "Push-up inclinada": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-pushup-inclinada-inicio-gK2WiLckAL3p5bCPF5JXXE.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-pushup-inclinada-meio-Zt5whvrLF7GrjZdEZbjKCf.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-pushup-inclinada-fim-ACkpsZDJqmsUq2kVKF3wak.webp",
  },
  "Elevação de joelhos leve": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-joelhos-leve-inicio-ji6gbTLyN7X5Dryyj8C2dC.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-joelhos-leve-meio-mSpCQ7ZiqPhehVn4hEstSg.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-joelhos-leve-fim-E7ptZNnLV6HG7KNnoHYjMK.webp",
  },
  "Alongamento posterior": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-posterior-inicio-TUbdLpewCBwXYRc9tPABcB.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-posterior-meio-QF2RdDRJhYd6Pc9FQamCeg.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-posterior-fim-RJBycfHoRwUZgLcNyURMPG.webp",
  },
  "Elevação pélvica": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-pelvica-inicio-WAcLPwvBpCG39WFsQvp6Hk.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-pelvica-meio-V9CXqZbmPJ4vCodxvfRkwR.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-elevacao-pelvica-fim-knGKk3j5VQhXpcQgM5WA5b.webp",
  },
  "Step touch lateral": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-step-touch-lateral-inicio-FckL8ghBEUwrE5mLtP7h7c.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-step-touch-lateral-meio-gbCSAGvTMa33mbtCWVaJ5t.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-step-touch-lateral-fim-8GZs79VkpDjthb9sv7FCaD.webp",
  },
  "Mobilidade de coluna": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-coluna-inicio-g7sXsCjzHe4RFS5reAj68A.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-coluna-meio-PsBghRVfHPYb35i39yKzwK.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-mobilidade-coluna-fim-ZpyYPQy9QvpdrugxU8uDpA.webp",
  },
  "Alongamento de quadril": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-quadril-inicio-g6jdizPxa3B2SBd39NqSZQ.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-quadril-meio-ey6ghk9P5TNJ2gjcYJEtUb.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-alongamento-quadril-fim-hxvhbJKTyvbZt9LxH9qoi4.webp",
  },
  "Respiração profunda": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-profunda-inicio-9nKdZZoLSoYkRxzBYmmGLW.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-profunda-meio-MgLzGdJ5ggFmXMDuVY6vfi.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-profunda-fim-6xVWEkJyzJemF9SHpesaKD.webp",
  },
  "Agachamento parcial": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-agachamento-parcial-inicio-mx85WrE4N5zx8Wn3HRdQvx.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-agachamento-parcial-meio-JWH9esU9F9kX6WjDzW3DF9.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-agachamento-parcial-fim-ZwcJZVkwGVfKDjrwutUqMt.webp",
  },
  "Ponte de glúteos com pausa": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-pausa-inicio-F74tNrcqfPnrhCPhs3bnSe.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-pausa-meio-UwHyr98fhu8J32QWmoJ6tA.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-ponte-gluteos-pausa-fim-eqWxdm6BCVNnYZi3GLcNrX.webp",
  },
  "Marcha parada leve": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-leve-inicio-mntdQMLHUYYCRQgFxxubrK.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-leve-meio-A7EQHdeNk9F5KPnmZaMg7X.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-marcha-parada-leve-fim-K77mJ4areUGbHEy5GaahKz.webp",
  },
  "Respiração e mobilidade leve": {
    inicio:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-mobilidade-leve-inicio-WBv8U8B98KqEzZPxrhU3GT.webp",
    meio: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-mobilidade-leve-meio-bdzHma8F4QJQT3v4rY8Tkj.webp",
    fim: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411973649/9JzcKUqfdZQZb7N89fhNM8/ex-respiracao-mobilidade-leve-fim-Bje2tuvutYpM2gLfLQN32t.webp",
  },
};

export function getExerciseImages(
  exerciseName: string
): { inicio: string; meio: string; fim: string } | null {
  return exerciseImages[exerciseName] || null;
}
