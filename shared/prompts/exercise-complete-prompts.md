# Prompts JSON para Geração de Imagens dos 24 Exercícios

Este arquivo foi reestruturado para `Nano Banana Pro / Gemini image generation` usando `Markdown + blocos JSON válidos`. A ideia é reduzir ambiguidade e separar claramente `output`, `personagem`, `cena`, `câmera`, `fase`, `segurança` e `continuidade`.

## Como usar

- O arquivo continua em `.md`, mas cada prompt está dentro de um bloco `json`.
- Copie `somente o JSON` da fase que você quer gerar.
- No `Nano Banana Pro`, prefira `16:9 landscape` também na interface quando houver essa opção.
- Fluxo recomendado para consistência:
  1. Gere `início` com o prompt JSON do início.
  2. Quando o início ficar correto, anexe essa imagem e rode o JSON do `meio`.
  3. Quando o meio ficar correto, anexe essa imagem e rode o JSON do `fim`.
- Isso segue a recomendação oficial de `iterative refinement` e `be explicit about what to keep the same`.
- Para este projeto, `pose correctness` e `safe biomechanics` têm prioridade maior que detalhe facial fino.

## Observações práticas

- Para `Bird dog`, `Dead bug`, `agachamentos` e `push-ups`, o melhor resultado costuma vir de `edição sequencial`, não de três gerações independentes.
- Se o modelo começar a driftar câmera, lado do corpo ou suporte, recomece o exercício usando `a última imagem correta como única referência`.
- O campo `on_image_graphics` já força `sem texto`, `sem setas`, `sem números` e `sem watermark` de forma positiva, alinhada com as melhores práticas do Gemini.

## Base de pesquisa

- `Google AI for Developers — Nano Banana image generation`, atualizado em `2026-02-26`.
- `Google Cloud — Gemini image generation best practices`, atualizado em `2026-03-05`.
- `Google Cloud Blog — Ultimate prompting guide for Nano Banana`, publicado em `2026-03-06`.
- `Google Blog — 7 tips to get the most out of Nano Banana Pro`, publicado em `2025-11-20`.
- Fontes complementares: guia de JSON prompting do Roberto Dias Duarte, vídeo do Hongzhao sobre `JSON prompting` em `2026-03-02` e o nosso relatório técnico em [2026-03-08-relatorio-execucao-24-exercicios.md](../../docs/research/2026-03-08-relatorio-execucao-24-exercicios.md).

---

## 1. Agachamento assistido

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Use sempre uma cadeira de jantar simples e estável, com toque leve das mãos e posição fixa.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento assistido",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, feet hip-width apart, knees extended but relaxed, hips stacked over heels, arms extended lightly holding the chair, neutral spine, gaze forward",
    "safety_priority": "Conservative quarter-squat only, heels fully grounded, chair for light balance only, knees aligned with the feet",
    "support_and_spatial_rule": "standard dining chair centered in front of the character, chair back around lower chest height, both palms resting lightly on the top edge, support used for balance and depth reference only",
    "support_visibility": "chair back and both hands on the chair must stay fully visible",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the chair contact and support role are readable at a glance",
      "heel grounding and squat depth are clearly visible",
      "the image shows that the hips lead the descent, not the knees alone"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop the chair back",
    "do not turn the movement into a deep athletic squat",
    "do not hide heel contact",
    "do not exaggerate lumbar arch"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento assistido",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "hips move back before depth increases, knees bend softly, and chair contact stays light and constant",
    "pose_to_show": "hips moving back, knees softly bent, torso slightly inclined forward, arms still extended on the chair, heels grounded, neutral spine, gaze forward",
    "safety_priority": "Conservative quarter-squat only, heels fully grounded, chair for light balance only, knees aligned with the feet",
    "support_and_spatial_rule": "standard dining chair centered in front of the character, chair back around lower chest height, both palms resting lightly on the top edge, support used for balance and depth reference only",
    "support_visibility": "chair back and both hands on the chair must stay fully visible",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the chair contact and support role are readable at a glance",
      "heel grounding and squat depth are clearly visible",
      "the image shows that the hips lead the descent, not the knees alone"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop the chair back",
    "do not turn the movement into a deep athletic squat",
    "do not hide heel contact",
    "do not exaggerate lumbar arch"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento assistido",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "depth increases without losing heel contact, chest stays open, and the chair remains centered as balance support",
    "pose_to_show": "conservative supported quarter-squat depth, hips back, knees aligned with the feet, heels grounded, chest open, hands lightly on the chair, gaze forward",
    "safety_priority": "Conservative quarter-squat only, heels fully grounded, chair for light balance only, knees aligned with the feet",
    "support_and_spatial_rule": "standard dining chair centered in front of the character, chair back around lower chest height, both palms resting lightly on the top edge, support used for balance and depth reference only",
    "support_visibility": "chair back and both hands on the chair must stay fully visible",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the chair contact and support role are readable at a glance",
      "heel grounding and squat depth are clearly visible",
      "the image shows that the hips lead the descent, not the knees alone"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop the chair back",
    "do not turn the movement into a deep athletic squat",
    "do not hide heel contact",
    "do not exaggerate lumbar arch"
  ]
}
```

## 2. Agachamento parcial

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento parcial",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, feet hip-width apart, knees extended but relaxed, arms naturally in front for balance, neutral spine, gaze forward",
    "safety_priority": "Mini-squat only, hips clearly above the knees, no deep descent, heels grounded",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "arms", "gaze"],
    "clarity_checks": [
      "the movement reads as partial rather than deep",
      "the knees, hips, and feet remain fully readable",
      "the image shows a controlled squat pattern without support"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show full-depth squat",
    "do not let knees collapse inward",
    "do not crop feet or knees",
    "do not turn this into a jump squat"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento parcial",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "hips shift back first, knees soften, and the torso inclines slightly without changing the exercise into a full squat",
    "pose_to_show": "mini-squat middle phase, hips slightly back, knees softly bent, torso slightly inclined forward, heels grounded, arms balancing in front, neutral spine",
    "safety_priority": "Mini-squat only, hips clearly above the knees, no deep descent, heels grounded",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "arms", "gaze"],
    "clarity_checks": [
      "the movement reads as partial rather than deep",
      "the knees, hips, and feet remain fully readable",
      "the image shows a controlled squat pattern without support"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show full-depth squat",
    "do not let knees collapse inward",
    "do not crop feet or knees",
    "do not turn this into a jump squat"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Agachamento parcial",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "depth increases only enough to show a partial squat, while alignment and heel contact remain clear",
    "pose_to_show": "shallow mini-squat only, hips back, knees aligned with the feet, thighs far above parallel, heels grounded, chest open, gaze forward",
    "safety_priority": "Mini-squat only, hips clearly above the knees, no deep descent, heels grounded",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "arms", "gaze"],
    "clarity_checks": [
      "the movement reads as partial rather than deep",
      "the knees, hips, and feet remain fully readable",
      "the image shows a controlled squat pattern without support"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show full-depth squat",
    "do not let knees collapse inward",
    "do not crop feet or knees",
    "do not turn this into a jump squat"
  ]
}
```

## 3. Alongamento de quadril

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Apoio opcional. Só mostrar se realmente melhorar a estabilidade ou a leitura do movimento.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento de quadril",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "left foot forward, right leg back, short comfortable split stance, torso upright, both feet grounded, hips square, hands relaxed by the sides",
    "safety_priority": "Short comfortable split stance, pelvis glides gently forward, stretch at the front of the back hip, no deep lunge",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "no support object unless needed for balance",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the split stance and front versus back leg roles are obvious",
      "the trunk stays upright instead of collapsing forward",
      "the exercise reads as a gentle stretch, not a strength lunge"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not force a deep lunge",
    "do not overarch the lower back",
    "do not hide pelvic alignment",
    "do not turn this into an advanced flexibility pose"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento de quadril",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the pelvis shifts forward softly while the front knee bends slightly and the trunk stays upright",
    "pose_to_show": "left foot forward, right leg back, gentle forward glide of the pelvis, left knee softly bent, right leg long, torso upright, abdomen engaged, gaze forward",
    "safety_priority": "Short comfortable split stance, pelvis glides gently forward, stretch at the front of the back hip, no deep lunge",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "no support object unless needed for balance",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the split stance and front versus back leg roles are obvious",
      "the trunk stays upright instead of collapsing forward",
      "the exercise reads as a gentle stretch, not a strength lunge"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not force a deep lunge",
    "do not overarch the lower back",
    "do not hide pelvic alignment",
    "do not turn this into an advanced flexibility pose"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento de quadril",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the stretch becomes clearer through the front of the back-leg hip without deepening into an athletic lunge",
    "pose_to_show": "left foot forward, right leg back, clear but gentle hip flexor stretch, pelvis slightly forward, chest open, neutral spine, stretch visible at the front of the right hip",
    "safety_priority": "Short comfortable split stance, pelvis glides gently forward, stretch at the front of the back hip, no deep lunge",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "no support object unless needed for balance",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the split stance and front versus back leg roles are obvious",
      "the trunk stays upright instead of collapsing forward",
      "the exercise reads as a gentle stretch, not a strength lunge"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not force a deep lunge",
    "do not overarch the lower back",
    "do not hide pelvic alignment",
    "do not turn this into an advanced flexibility pose"
  ]
}
```

## 4. Alongamento posterior

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento posterior",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, feet hip-width apart, knees softly unlocked, arms relaxed, neutral spine, gaze forward",
    "safety_priority": "Half hinge only, knees soft, long spine, no deep fold",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the exercise reads as a hamstring-focused hinge rather than a yoga forward fold",
      "the knees stay slightly soft and visible",
      "the spine line remains readable from hips to head"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not lock the knees aggressively",
    "do not collapse the chest onto the legs",
    "do not round the back excessively",
    "do not turn it into a full yoga fold"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento posterior",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the hips fold back, the torso inclines, and the hands travel down only as far as alignment stays readable",
    "pose_to_show": "hips folding back into a moderate hinge, knees slightly bent, spine long, hands reaching toward thighs or shins without forcing",
    "safety_priority": "Half hinge only, knees soft, long spine, no deep fold",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the exercise reads as a hamstring-focused hinge rather than a yoga forward fold",
      "the knees stay slightly soft and visible",
      "the spine line remains readable from hips to head"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not lock the knees aggressively",
    "do not collapse the chest onto the legs",
    "do not round the back excessively",
    "do not turn it into a full yoga fold"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Alongamento posterior",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the stretch deepens slightly through the posterior chain without locking the knees or collapsing the chest",
    "pose_to_show": "moderate half-hinge only, hips back, torso inclined forward, knees still soft, neck relaxed, spine long rather than rounded",
    "safety_priority": "Half hinge only, knees soft, long spine, no deep fold",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the exercise reads as a hamstring-focused hinge rather than a yoga forward fold",
      "the knees stay slightly soft and visible",
      "the spine line remains readable from hips to head"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not lock the knees aggressively",
    "do not collapse the chest onto the legs",
    "do not round the back excessively",
    "do not turn it into a full yoga fold"
  ]
}
```

## 5. Avanço curto com apoio

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Use uma cadeira ou apoio estável do lado da mão de apoio, sempre com toque leve e posição fixa.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Avanço curto com apoio",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "left foot forward, right foot back, short split stance, torso upright, both feet grounded, left hand lightly on the support, knees extended but relaxed, gaze forward",
    "safety_priority": "Short split stance, small lowering range, upright torso, support hand light only",
    "support_and_spatial_rule": "standard dining chair or stable support placed beside the front hand in a short split stance, one hand touches lightly for balance, support must stay aligned and properly scaled",
    "support_visibility": "chair or stable support must stay fully visible near the front hand",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the support position relative to the front hand is obvious",
      "the movement reads as a short supported lunge, not a long athletic one",
      "the front knee path and body balance are easy to read"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a long athletic lunge",
    "do not hide the support hand",
    "do not let the front knee travel excessively forward",
    "do not twist the torso away from the camera"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Avanço curto com apoio",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the body lowers only a little, the front and back knees soften, and the support hand remains fixed and readable",
    "pose_to_show": "left foot forward, right foot back, small lowering phase, front and back knees softly bending, pelvis centered, torso upright, left support hand still visible",
    "safety_priority": "Short split stance, small lowering range, upright torso, support hand light only",
    "support_and_spatial_rule": "standard dining chair or stable support placed beside the front hand in a short split stance, one hand touches lightly for balance, support must stay aligned and properly scaled",
    "support_visibility": "chair or stable support must stay fully visible near the front hand",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the support position relative to the front hand is obvious",
      "the movement reads as a short supported lunge, not a long athletic one",
      "the front knee path and body balance are easy to read"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a long athletic lunge",
    "do not hide the support hand",
    "do not let the front knee travel excessively forward",
    "do not twist the torso away from the camera"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Avanço curto com apoio",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the lunge depth becomes clear but stays short, with the pelvis centered and the support still functioning as balance aid",
    "pose_to_show": "left foot forward, right foot back, short supported lunge depth only, front knee comfortably bent, back heel may be lifted naturally, torso tall, neutral spine, light support with the left hand",
    "safety_priority": "Short split stance, small lowering range, upright torso, support hand light only",
    "support_and_spatial_rule": "standard dining chair or stable support placed beside the front hand in a short split stance, one hand touches lightly for balance, support must stay aligned and properly scaled",
    "support_visibility": "chair or stable support must stay fully visible near the front hand",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the support position relative to the front hand is obvious",
      "the movement reads as a short supported lunge, not a long athletic one",
      "the front knee path and body balance are easy to read"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a long athletic lunge",
    "do not hide the support hand",
    "do not let the front knee travel excessively forward",
    "do not twist the torso away from the camera"
  ]
}
```

## 6. Bird dog

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, hips toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Bird dog",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "all fours on the mat, hands under shoulders, knees under hips, neutral spine, neck long, gaze down and slightly forward",
    "safety_priority": "Pelvis level, trunk quiet, opposite arm and leg reach to trunk height only, no hip opening",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat edge should stay visible",
    "must_keep_visible": [
      "supporting hand",
      "supporting knee",
      "extended arm",
      "extended leg",
      "spine",
      "head",
      "gaze"
    ],
    "clarity_checks": [
      "all support points and reaching limbs remain visible",
      "the image shows opposite arm and leg action clearly",
      "the pelvis and spine look stable instead of twisted"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not rotate the hips open",
    "do not overarch the lower back",
    "do not crop hands, knees, or toes",
    "do not turn the head sharply upward"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, hips toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Bird dog",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one limb pair starts reaching away while the supporting hand and knee stay rooted and the trunk stays steady",
    "pose_to_show": "from all fours, right arm beginning to reach forward and left leg beginning to extend backward, pelvis stable, trunk steady, support points still grounded",
    "safety_priority": "Pelvis level, trunk quiet, opposite arm and leg reach to trunk height only, no hip opening",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat edge should stay visible",
    "must_keep_visible": [
      "supporting hand",
      "supporting knee",
      "extended arm",
      "extended leg",
      "spine",
      "head",
      "gaze"
    ],
    "clarity_checks": [
      "all support points and reaching limbs remain visible",
      "the image shows opposite arm and leg action clearly",
      "the pelvis and spine look stable instead of twisted"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not rotate the hips open",
    "do not overarch the lower back",
    "do not crop hands, knees, or toes",
    "do not turn the head sharply upward"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, hips toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Bird dog",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the reach becomes longer and clearer without opening the hips or arching the lower back",
    "pose_to_show": "full bird dog position with the right arm forward and the left leg back, both reaching only to trunk height, hips level, neutral spine, core engaged, gaze down slightly ahead",
    "safety_priority": "Pelvis level, trunk quiet, opposite arm and leg reach to trunk height only, no hip opening",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat edge should stay visible",
    "must_keep_visible": [
      "supporting hand",
      "supporting knee",
      "extended arm",
      "extended leg",
      "spine",
      "head",
      "gaze"
    ],
    "clarity_checks": [
      "all support points and reaching limbs remain visible",
      "the image shows opposite arm and leg action clearly",
      "the pelvis and spine look stable instead of twisted"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not rotate the hips open",
    "do not overarch the lower back",
    "do not crop hands, knees, or toes",
    "do not turn the head sharply upward"
  ]
}
```

## 7. Dead bug

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, legs toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Dead bug",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "lying on the back on the mat, hips and knees bent around tabletop, arms reaching up over the chest, head relaxed, ribs down",
    "safety_priority": "Ribs quiet, lower back supported, opposite arm and leg extend only through a comfortable low range",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; mat edges should remain visible",
    "must_keep_visible": [
      "head",
      "shoulders",
      "hands",
      "lower back",
      "hips",
      "knees",
      "feet"
    ],
    "clarity_checks": [
      "the lower-back control is visually believable",
      "the opposite arm-leg pattern is obvious",
      "hands, feet, and bent knee angles remain readable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back off the mat",
    "do not hide the bent knee angle",
    "do not crop hands or feet",
    "do not turn the pose into a dramatic ab crunch"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, legs toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Dead bug",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one arm and the opposite leg begin extending away while the bent tabletop shape remains readable on the other side",
    "pose_to_show": "lying on the back, right arm moving backward and left leg extending away on a low diagonal, lower back staying close to the mat, abdomen engaged, the other arm and leg still bent",
    "safety_priority": "Ribs quiet, lower back supported, opposite arm and leg extend only through a comfortable low range",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; mat edges should remain visible",
    "must_keep_visible": [
      "head",
      "shoulders",
      "hands",
      "lower back",
      "hips",
      "knees",
      "feet"
    ],
    "clarity_checks": [
      "the lower-back control is visually believable",
      "the opposite arm-leg pattern is obvious",
      "hands, feet, and bent knee angles remain readable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back off the mat",
    "do not hide the bent knee angle",
    "do not crop hands or feet",
    "do not turn the pose into a dramatic ab crunch"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward the left side of the frame, legs toward the right side of the frame, left side of the body slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Dead bug",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the extension increases without losing lumbar control, rib position, or neck relaxation",
    "pose_to_show": "lying on the back, right arm overhead only as far as the ribs stay quiet, left leg extended on a comfortable low diagonal, lower back controlled against the mat, the other arm and leg still bent",
    "safety_priority": "Ribs quiet, lower back supported, opposite arm and leg extend only through a comfortable low range",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; mat edges should remain visible",
    "must_keep_visible": [
      "head",
      "shoulders",
      "hands",
      "lower back",
      "hips",
      "knees",
      "feet"
    ],
    "clarity_checks": [
      "the lower-back control is visually believable",
      "the opposite arm-leg pattern is obvious",
      "hands, feet, and bent knee angles remain readable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back off the mat",
    "do not hide the bent knee angle",
    "do not crop hands or feet",
    "do not turn the pose into a dramatic ab crunch"
  ]
}
```

## 8. Elevação de joelhos leve

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de joelhos leve",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, both feet on the floor, arms relaxed in marching position, chest open, gaze forward",
    "safety_priority": "Low-to-medium knee lift below hip height, no run posture, no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads as low-impact marching rather than running",
      "the support foot and lifted knee remain fully visible",
      "the trunk stays vertical and calm"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a running sprint pose",
    "do not lift the knee excessively high",
    "do not crop feet",
    "do not show airborne jumping"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de joelhos leve",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one knee lifts while the opposite arm swings naturally and the support foot stays fully grounded",
    "pose_to_show": "upright low-impact march, left knee beginning to lift, right arm swinging naturally, right support foot grounded, trunk upright",
    "safety_priority": "Low-to-medium knee lift below hip height, no run posture, no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads as low-impact marching rather than running",
      "the support foot and lifted knee remain fully visible",
      "the trunk stays vertical and calm"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a running sprint pose",
    "do not lift the knee excessively high",
    "do not crop feet",
    "do not show airborne jumping"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de joelhos leve",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the lifted side changes or reaches its clearest controlled height without creating a sprint or jump look",
    "pose_to_show": "upright low-impact march, left knee lifted to a low or medium height and clearly below hip height, right arm swinging naturally, right support foot grounded",
    "safety_priority": "Low-to-medium knee lift below hip height, no run posture, no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads as low-impact marching rather than running",
      "the support foot and lifted knee remain fully visible",
      "the trunk stays vertical and calm"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a running sprint pose",
    "do not lift the knee excessively high",
    "do not crop feet",
    "do not show airborne jumping"
  ]
}
```

## 9. Elevação de panturrilha

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Apoio opcional. Só mostrar se realmente melhorar a estabilidade ou a leitura do movimento.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de panturrilha",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright with both feet flat, knees softly unlocked, arms relaxed or lightly supported, gaze forward",
    "safety_priority": "Moderate heel lift only, both heels rise together, ankles stacked, no forward lean",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if used, hands and support edge must remain visible",
    "must_keep_visible": ["feet", "ankles", "calves", "knees", "hips", "gaze"],
    "clarity_checks": [
      "heel lift is clearly visible from side view",
      "ankle stacking and balance look realistic",
      "any optional support looks light, not load-bearing"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop heels or toes",
    "do not turn the pose into tiptoe ballet styling",
    "do not lean the torso forward",
    "do not hide ankle position"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de panturrilha",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the heels begin to rise while the body stays tall and the ankle line remains readable",
    "pose_to_show": "heels beginning to rise, weight moving to the balls of the feet, body stacked upright, ankles clearly visible",
    "safety_priority": "Moderate heel lift only, both heels rise together, ankles stacked, no forward lean",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if used, hands and support edge must remain visible",
    "must_keep_visible": ["feet", "ankles", "calves", "knees", "hips", "gaze"],
    "clarity_checks": [
      "heel lift is clearly visible from side view",
      "ankle stacking and balance look realistic",
      "any optional support looks light, not load-bearing"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop heels or toes",
    "do not turn the pose into tiptoe ballet styling",
    "do not lean the torso forward",
    "do not hide ankle position"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação de panturrilha",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the heels lift higher but the body remains aligned, with no forward lean or collapsed ankles",
    "pose_to_show": "both heels lifted together through a moderate rise only, weight on the balls of the feet, ankles stacked, knees soft, torso vertical, controlled balance",
    "safety_priority": "Moderate heel lift only, both heels rise together, ankles stacked, no forward lean",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if used, hands and support edge must remain visible",
    "must_keep_visible": ["feet", "ankles", "calves", "knees", "hips", "gaze"],
    "clarity_checks": [
      "heel lift is clearly visible from side view",
      "ankle stacking and balance look realistic",
      "any optional support looks light, not load-bearing"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not crop heels or toes",
    "do not turn the pose into tiptoe ballet styling",
    "do not lean the torso forward",
    "do not hide ankle position"
  ]
}
```

## 10. Elevação pélvica

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação pélvica",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "lying on the back, knees bent, feet flat on the mat, arms by the sides, head relaxed, pelvis neutral",
    "safety_priority": "Smaller than a full bridge, gentle lift, shoulders grounded, ribs controlled",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should be visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a short pelvic lift rather than a dramatic bridge",
      "shoulder anchoring and foot placement remain visible",
      "the top position stays controlled and realistic"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the ribs aggressively",
    "do not hide foot placement",
    "do not turn it into a fitness glam bridge pose"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação pélvica",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the pelvis lifts off the mat gently while the shoulders stay anchored and the knees keep their line",
    "pose_to_show": "pelvis lifting gently off the mat, knees still bent, trunk forming a gradual diagonal line, shoulders grounded",
    "safety_priority": "Smaller than a full bridge, gentle lift, shoulders grounded, ribs controlled",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should be visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a short pelvic lift rather than a dramatic bridge",
      "shoulder anchoring and foot placement remain visible",
      "the top position stays controlled and realistic"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the ribs aggressively",
    "do not hide foot placement",
    "do not turn it into a fitness glam bridge pose"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Elevação pélvica",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the top position becomes clearer without turning into a full high bridge or lumbar arch",
    "pose_to_show": "pelvis lifted gently off the mat, knees aligned, shoulders grounded, ribs controlled, trunk forming only a moderate diagonal, final height clearly smaller than a full bridge",
    "safety_priority": "Smaller than a full bridge, gentle lift, shoulders grounded, ribs controlled",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should be visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a short pelvic lift rather than a dramatic bridge",
      "shoulder anchoring and foot placement remain visible",
      "the top position stays controlled and realistic"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the ribs aggressively",
    "do not hide foot placement",
    "do not turn it into a fitness glam bridge pose"
  ]
}
```

## 11. Good morning sem peso

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Good morning sem peso",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, feet hip-width apart, knees softly unlocked, hands crossed over the chest or on the hips, neutral spine, gaze forward",
    "safety_priority": "Hip hinge only, knees soft, long spine, stop well before horizontal",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a hip hinge, not a squat",
      "the back line remains long and readable",
      "the hips are visibly leading the movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not round the back",
    "do not turn it into a barbell exercise",
    "do not lock the knees",
    "do not crop hips or feet"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Good morning sem peso",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the hips travel backward first and the torso tips forward while the spine stays long",
    "pose_to_show": "hips hinging back, torso angled forward, knees still soft, spine long, chest open",
    "safety_priority": "Hip hinge only, knees soft, long spine, stop well before horizontal",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a hip hinge, not a squat",
      "the back line remains long and readable",
      "the hips are visibly leading the movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not round the back",
    "do not turn it into a barbell exercise",
    "do not lock the knees",
    "do not crop hips or feet"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Good morning sem peso",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the hinge deepens just enough to show the pattern clearly without rounding the back",
    "pose_to_show": "clear but conservative hip hinge, hips pushed back, torso angled forward well before horizontal, knees still soft, spine long, chest open, neck aligned",
    "safety_priority": "Hip hinge only, knees soft, long spine, stop well before horizontal",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "gaze"
    ],
    "clarity_checks": [
      "the movement reads as a hip hinge, not a squat",
      "the back line remains long and readable",
      "the hips are visibly leading the movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not round the back",
    "do not turn it into a barbell exercise",
    "do not lock the knees",
    "do not crop hips or feet"
  ]
}
```

## 12. Marcha parada

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, both feet on the floor, arms relaxed naturally, chest open, gaze forward",
    "safety_priority": "Low-impact march, knee below hip height, natural arm swing, no running mechanics",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads instantly as marching in place",
      "foot placement and soft support exchange remain visible",
      "the body posture looks calm and controlled"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a run",
    "do not crop feet",
    "do not show jumping",
    "do not exaggerate arm swing"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one foot lifts slightly and the opposite arm swings while the body stays upright",
    "pose_to_show": "upright march in place, left knee beginning to rise, right arm swinging naturally, right support foot grounded, calm low-impact rhythm",
    "safety_priority": "Low-impact march, knee below hip height, natural arm swing, no running mechanics",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads instantly as marching in place",
      "foot placement and soft support exchange remain visible",
      "the body posture looks calm and controlled"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a run",
    "do not crop feet",
    "do not show jumping",
    "do not exaggerate arm swing"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the opposite side becomes readable or the lifted step becomes a little clearer without changing the movement into a run",
    "pose_to_show": "upright march in place, left knee slightly raised below hip height, right arm moving naturally, right support foot grounded, shoulders relaxed, low-impact rhythm",
    "safety_priority": "Low-impact march, knee below hip height, natural arm swing, no running mechanics",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads instantly as marching in place",
      "foot placement and soft support exchange remain visible",
      "the body posture looks calm and controlled"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a run",
    "do not crop feet",
    "do not show jumping",
    "do not exaggerate arm swing"
  ]
}
```

## 13. Marcha parada leve

### Nota de uso

Se o orçamento apertar, o início pode servir como base principal, mas os prompts abaixo já separam as fases. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada leve",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing in a relaxed marching stance, both feet near the floor, shoulders soft, chest open, calm breathing",
    "safety_priority": "Very small recovery march, minimal arm swing, low effort, no cardio intensity",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the movement reads as very light marching",
      "the body language stays relaxed instead of athletic",
      "the frame preserves low-impact intent even if reused"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into cardio intensity",
    "do not crop feet",
    "do not show impact or jump",
    "do not use exaggerated athletic posture"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada leve",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one knee lifts softly with minimal arm swing while the body remains relaxed",
    "pose_to_show": "very gentle recovery march, left knee beginning a small lift, right arm moving with minimal swing, trunk relaxed and upright",
    "safety_priority": "Very small recovery march, minimal arm swing, low effort, no cardio intensity",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the movement reads as very light marching",
      "the body language stays relaxed instead of athletic",
      "the frame preserves low-impact intent even if reused"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into cardio intensity",
    "do not crop feet",
    "do not show impact or jump",
    "do not use exaggerated athletic posture"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Marcha parada leve",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the movement quality remains intentionally similar, with only a subtle shift of support and rhythm",
    "pose_to_show": "very gentle recovery march, very small left knee lift below hip height, minimal right arm swing, right support foot grounded, trunk upright and relaxed",
    "safety_priority": "Very small recovery march, minimal arm swing, low effort, no cardio intensity",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the movement reads as very light marching",
      "the body language stays relaxed instead of athletic",
      "the frame preserves low-impact intent even if reused"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into cardio intensity",
    "do not crop feet",
    "do not show impact or jump",
    "do not use exaggerated athletic posture"
  ]
}
```

## 14. Mobilidade de coluna

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de coluna",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "neutral standing position, feet comfortable apart, knees soft, arms relaxed, spine tall, head aligned",
    "safety_priority": "Gentle upper-trunk mobility only, pelvis quiet, no deep twist or backbend",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the spine-focused motion is visible without needing text",
      "the pelvis looks stable relative to the trunk",
      "the end range still reads as beginner-friendly"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not exaggerate twist or backbend",
    "do not hide the spine line with arm placement",
    "do not turn it into a yoga contortion pose",
    "do not crop torso or head"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de coluna",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the upper trunk begins the mobility action while the base stays calm and the posture remains tall",
    "pose_to_show": "gentle spinal mobility movement beginning, shoulders and upper back moving while pelvis stays calm, breath controlled",
    "safety_priority": "Gentle upper-trunk mobility only, pelvis quiet, no deep twist or backbend",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the spine-focused motion is visible without needing text",
      "the pelvis looks stable relative to the trunk",
      "the end range still reads as beginner-friendly"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not exaggerate twist or backbend",
    "do not hide the spine line with arm placement",
    "do not turn it into a yoga contortion pose",
    "do not crop torso or head"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de coluna",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the mobility range becomes clearer without turning into a deep twist, backbend, or contortion",
    "pose_to_show": "gentle upper-trunk and shoulder mobility toward the subject's right side, pelvis quiet, chest readable, spine long, no aggressive twist or backbend",
    "safety_priority": "Gentle upper-trunk mobility only, pelvis quiet, no deep twist or backbend",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the spine-focused motion is visible without needing text",
      "the pelvis looks stable relative to the trunk",
      "the end range still reads as beginner-friendly"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not exaggerate twist or backbend",
    "do not hide the spine line with arm placement",
    "do not turn it into a yoga contortion pose",
    "do not crop torso or head"
  ]
}
```

## 15. Mobilidade de quadril

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. Apoio opcional. Só mostrar se realmente melhorar a estabilidade ou a leitura do movimento.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de quadril",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing neutral base, left leg as the support leg, right side as the moving side, knees soft, pelvis neutral, chest open, trunk steady, gaze forward",
    "safety_priority": "Very small controlled hip range, support leg steady, no dance-like swing",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if present it must stay visible",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the moving hip side versus support side are obvious",
      "the pelvis remains readable from the camera angle",
      "any optional support looks helpful but not central"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a large dance-like range of motion",
    "do not hide the hip line",
    "do not crop feet or knees",
    "do not tilt the torso dramatically"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de quadril",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one hip begins a controlled path while the support leg and trunk stay stable",
    "pose_to_show": "left leg steady as the support leg, right hip beginning a very small controlled outward path, right knee low, pelvis readable, trunk quiet",
    "safety_priority": "Very small controlled hip range, support leg steady, no dance-like swing",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if present it must stay visible",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the moving hip side versus support side are obvious",
      "the pelvis remains readable from the camera angle",
      "any optional support looks helpful but not central"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a large dance-like range of motion",
    "do not hide the hip line",
    "do not crop feet or knees",
    "do not tilt the torso dramatically"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Mobilidade de quadril",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the hip reaches a clearer end position without becoming a dance-like or overly large movement",
    "pose_to_show": "left support leg steady, right hip taken through a very small controlled outward end range, right knee low and slightly opened, pelvis readable, trunk quiet, chest open",
    "safety_priority": "Very small controlled hip range, support leg steady, no dance-like swing",
    "support_and_spatial_rule": "optional stable support may appear only if needed for balance; if present it must look intentional, properly scaled, and consistently placed",
    "support_visibility": "support is optional; if present it must stay visible",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the moving hip side versus support side are obvious",
      "the pelvis remains readable from the camera angle",
      "any optional support looks helpful but not central"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show a large dance-like range of motion",
    "do not hide the hip line",
    "do not crop feet or knees",
    "do not tilt the torso dramatically"
  ]
}
```

## 16. Polichinelo sem salto

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Polichinelo sem salto",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing tall, feet together or near together, arms by the sides, gaze forward",
    "safety_priority": "Low-impact opening only, both feet grounded, arms stop around shoulder height or slightly above",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "hands", "gaze"],
    "clarity_checks": [
      "the image reads as a modified jumping jack without impact",
      "arm and leg coordination are obvious",
      "the open position is clearly distinct from the start position"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop fingertips or feet",
    "do not turn it into high-intensity cardio",
    "do not hyperextend the lower back"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Polichinelo sem salto",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one side step opens the stance while the arms move outward and upward in sync",
    "pose_to_show": "low-impact opening phase, side step beginning, both feet grounded, arms moving outward and upward through a smooth arc, trunk upright",
    "safety_priority": "Low-impact opening only, both feet grounded, arms stop around shoulder height or slightly above",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "hands", "gaze"],
    "clarity_checks": [
      "the image reads as a modified jumping jack without impact",
      "arm and leg coordination are obvious",
      "the open position is clearly distinct from the start position"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop fingertips or feet",
    "do not turn it into high-intensity cardio",
    "do not hyperextend the lower back"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Polichinelo sem salto",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the body reaches its clearest open position without turning into a jump or high-intensity cardio image",
    "pose_to_show": "feet apart in a comfortable open stance, arms raised in coordination to shoulder height or only slightly above, knees soft, trunk upright, both feet grounded",
    "safety_priority": "Low-impact opening only, both feet grounded, arms stop around shoulder height or slightly above",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "hands", "gaze"],
    "clarity_checks": [
      "the image reads as a modified jumping jack without impact",
      "arm and leg coordination are obvious",
      "the open position is clearly distinct from the start position"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop fingertips or feet",
    "do not turn it into high-intensity cardio",
    "do not hyperextend the lower back"
  ]
}
```

## 17. Ponte de glúteos

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "lying on the back, knees bent, feet flat hip-width apart, arms by the sides, pelvis neutral, head relaxed",
    "safety_priority": "Controlled bridge, knees aligned over the feet, ribs quiet, no hyperextension",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the diagonal line from shoulders through hips is readable",
      "foot placement and knee tracking remain visible",
      "the movement reads as glute-driven rather than neck- or lumbar-driven"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the rib cage",
    "do not hide foot placement",
    "do not turn it into a glamorous hyperextended bridge"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the hips begin lifting while the shoulders stay anchored and the diagonal body line starts to appear",
    "pose_to_show": "hips lifting gradually, knees still bent, trunk creating a diagonal line, shoulders grounded, neck relaxed",
    "safety_priority": "Controlled bridge, knees aligned over the feet, ribs quiet, no hyperextension",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the diagonal line from shoulders through hips is readable",
      "foot placement and knee tracking remain visible",
      "the movement reads as glute-driven rather than neck- or lumbar-driven"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the rib cage",
    "do not hide foot placement",
    "do not turn it into a glamorous hyperextended bridge"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the bridge reaches its clearest top position without losing knee alignment or rib control",
    "pose_to_show": "hips lifted into a clean diagonal from shoulders to knees, knees aligned over the feet, feet grounded, ribs controlled, shoulders and head relaxed on the mat",
    "safety_priority": "Controlled bridge, knees aligned over the feet, ribs quiet, no hyperextension",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the diagonal line from shoulders through hips is readable",
      "foot placement and knee tracking remain visible",
      "the movement reads as glute-driven rather than neck- or lumbar-driven"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not overarch the lower back",
    "do not flare the rib cage",
    "do not hide foot placement",
    "do not turn it into a glamorous hyperextended bridge"
  ]
}
```

## 18. Ponte de glúteos com pausa

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos com pausa",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "lying on the back, knees bent, feet flat, arms long by the sides, pelvis neutral, head relaxed",
    "safety_priority": "Stable top hold, knees aligned, ribs quiet, no extra arching",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the held top position is obviously intentional",
      "the top hold looks stable rather than drifting",
      "the bridge line remains controlled without extra arching"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not change the frame into a different pose between middle and final",
    "do not overarch the lower back",
    "do not hide the knees or feet",
    "do not turn it into a yoga wheel preparation"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos com pausa",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the bridge rises to its hold position while the base and body line stabilize",
    "pose_to_show": "top bridge position reached and held, hips high, ribs controlled, knees aligned, shoulders anchored",
    "safety_priority": "Stable top hold, knees aligned, ribs quiet, no extra arching",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the held top position is obviously intentional",
      "the top hold looks stable rather than drifting",
      "the bridge line remains controlled without extra arching"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not change the frame into a different pose between middle and final",
    "do not overarch the lower back",
    "do not hide the knees or feet",
    "do not turn it into a yoga wheel preparation"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, feet on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Ponte de glúteos com pausa",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the visual difference is minimal on purpose because the isometric top hold must remain stable and controlled",
    "pose_to_show": "top bridge held steadily, hips high but controlled, diagonal line from shoulders to knees, knees aligned, ribs quiet, shoulders and head relaxed on the mat",
    "safety_priority": "Stable top hold, knees aligned, ribs quiet, no extra arching",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat should remain visible",
    "must_keep_visible": [
      "feet",
      "knees",
      "hips",
      "pelvis",
      "spine",
      "shoulders",
      "head"
    ],
    "clarity_checks": [
      "the held top position is obviously intentional",
      "the top hold looks stable rather than drifting",
      "the bridge line remains controlled without extra arching"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not change the frame into a different pose between middle and final",
    "do not overarch the lower back",
    "do not hide the knees or feet",
    "do not turn it into a yoga wheel preparation"
  ]
}
```

## 19. Prancha adaptada

### Nota de uso

Início e fim precisam ser claramente diferentes; o meio pode ser mais sutil, mas ainda deve ser uma pose própria. O tapete faz parte da leitura do movimento e deve permanecer legível em todas as fases.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, knees on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Prancha adaptada",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "adapted plank setup on the mat, knees down, hands or forearms under shoulders, trunk long, gaze down",
    "safety_priority": "Knees stay on the mat, straight line from head to knees, no hip sag and no pike",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat line should stay readable",
    "must_keep_visible": [
      "elbows or hands",
      "shoulders",
      "hips",
      "knees",
      "ankles or feet",
      "head"
    ],
    "clarity_checks": [
      "the exercise reads as a modified plank, not a full plank",
      "the line from shoulders to knees remains clear",
      "the support points on the floor stay visible and believable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back",
    "do not lift the hips into a pike",
    "do not crop elbows, knees, or feet",
    "do not turn it into a full advanced plank unless specified"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, knees on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Prancha adaptada",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the setup becomes an active support position with the trunk long and the hips aligning between shoulders and knees",
    "pose_to_show": "body line more engaged, hips aligned between shoulders and knees, abdomen active, neck long",
    "safety_priority": "Knees stay on the mat, straight line from head to knees, no hip sag and no pike",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat line should stay readable",
    "must_keep_visible": [
      "elbows or hands",
      "shoulders",
      "hips",
      "knees",
      "ankles or feet",
      "head"
    ],
    "clarity_checks": [
      "the exercise reads as a modified plank, not a full plank",
      "the line from shoulders to knees remains clear",
      "the support points on the floor stay visible and believable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back",
    "do not lift the hips into a pike",
    "do not crop elbows, knees, or feet",
    "do not turn it into a full advanced plank unless specified"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of the frame, knees on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Prancha adaptada",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the hold becomes fully stable without visible sagging, piking, or shoulder collapse",
    "pose_to_show": "stable line from head to knees, shoulders stacked over the support points, core braced, knees grounded on the mat, neck long, pelvis aligned between shoulders and knees",
    "safety_priority": "Knees stay on the mat, straight line from head to knees, no hip sag and no pike",
    "support_and_spatial_rule": "exercise mat is part of the scene and must stay fully readable when the body is on the floor",
    "support_visibility": "no support object; full mat line should stay readable",
    "must_keep_visible": [
      "elbows or hands",
      "shoulders",
      "hips",
      "knees",
      "ankles or feet",
      "head"
    ],
    "clarity_checks": [
      "the exercise reads as a modified plank, not a full plank",
      "the line from shoulders to knees remains clear",
      "the support points on the floor stay visible and believable"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not arch the lower back",
    "do not lift the hips into a pike",
    "do not crop elbows, knees, or feet",
    "do not turn it into a full advanced plank unless specified"
  ]
}
```

## 20. Push-up inclinada

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Use uma superfície elevada estável, sempre na mesma altura e posição.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, support surface on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Push-up inclinada",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "inclined push-up start with arms extended, hands on support surface, body in a straight diagonal line, heels grounded or feet planted, gaze down slightly forward",
    "safety_priority": "Comfortable moderate bend only, body in one straight diagonal line, no floor push-up look",
    "support_and_spatial_rule": "stable elevated surface such as bench, table, or sturdy counter, both palms planted symmetrically, support height remains fixed across the sequence and defines exercise load",
    "support_visibility": "the support surface must stay fully visible and uncropped",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "the support height and hand placement are obvious",
      "the body reads as one diagonal line rather than segmented",
      "the chest movement toward the support is easy to understand"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the support surface",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a floor push-up"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, support surface on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Push-up inclinada",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the elbows begin bending and the chest travels toward the support while the body line stays intact",
    "pose_to_show": "controlled lowering phase, elbows bending back, chest moving toward the support, body line still straight",
    "safety_priority": "Comfortable moderate bend only, body in one straight diagonal line, no floor push-up look",
    "support_and_spatial_rule": "stable elevated surface such as bench, table, or sturdy counter, both palms planted symmetrically, support height remains fixed across the sequence and defines exercise load",
    "support_visibility": "the support surface must stay fully visible and uncropped",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "the support height and hand placement are obvious",
      "the body reads as one diagonal line rather than segmented",
      "the chest movement toward the support is easy to understand"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the support surface",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a floor push-up"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, support surface on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Push-up inclinada",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the bottom position becomes clear without collapsing the hips or changing the exercise into a floor push-up",
    "pose_to_show": "elbows bent through a comfortable moderate range, chest lowered toward the support surface, body still in one straight diagonal line, hips aligned with shoulders and heels, neck neutral",
    "safety_priority": "Comfortable moderate bend only, body in one straight diagonal line, no floor push-up look",
    "support_and_spatial_rule": "stable elevated surface such as bench, table, or sturdy counter, both palms planted symmetrically, support height remains fixed across the sequence and defines exercise load",
    "support_visibility": "the support surface must stay fully visible and uncropped",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "the support height and hand placement are obvious",
      "the body reads as one diagonal line rather than segmented",
      "the chest movement toward the support is easy to understand"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the support surface",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a floor push-up"
  ]
}
```

## 21. Respiração e mobilidade leve

### Nota de uso

Se o orçamento apertar, o início pode servir como base principal, mas os prompts abaixo já separam as fases. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração e mobilidade leve",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "comfortable upright position, shoulders relaxed, chest open, hands placed to support breathing awareness, calm gaze",
    "safety_priority": "Very small restorative motion only, shoulders quiet, no workout posing",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as breathing-focused, not strength or cardio",
      "hands near ribs or chest remain visible",
      "the phase difference stays subtle but intentional"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a workout pose",
    "do not exaggerate the motion",
    "do not crop hands near the rib cage",
    "do not use intense fitness expression"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração e mobilidade leve",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the breath leads a small visible change through the ribs, hands, or upper trunk with no large displacement",
    "pose_to_show": "gentle mobility or breathing cue in progress, no large displacement, body relaxed, movement subtle and readable",
    "safety_priority": "Very small restorative motion only, shoulders quiet, no workout posing",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as breathing-focused, not strength or cardio",
      "hands near ribs or chest remain visible",
      "the phase difference stays subtle but intentional"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a workout pose",
    "do not exaggerate the motion",
    "do not crop hands near the rib cage",
    "do not use intense fitness expression"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração e mobilidade leve",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the movement quality remains intentionally subtle so the image still reads as calm breathing and gentle mobility",
    "pose_to_show": "same calm breathing and mobility quality as the middle frame, no athletic intensity, posture soft and accessible",
    "safety_priority": "Very small restorative motion only, shoulders quiet, no workout posing",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as breathing-focused, not strength or cardio",
      "hands near ribs or chest remain visible",
      "the phase difference stays subtle but intentional"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a workout pose",
    "do not exaggerate the motion",
    "do not crop hands near the rib cage",
    "do not use intense fitness expression"
  ]
}
```

## 22. Respiração profunda

### Nota de uso

Se o orçamento apertar, o início pode servir como base principal, mas os prompts abaixo já separam as fases. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração profunda",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "comfortable upright stance, shoulders relaxed, hands lightly placed to guide breathing, chest open, calm gaze",
    "safety_priority": "Subtle rib and belly expansion only, shoulders quiet, no dramatic arm movement",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as deep breathing rather than posing",
      "hands near the rib cage or belly remain visible",
      "the inhale and exhale states look intentionally different"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a yoga performance pose",
    "do not exaggerate arm movement",
    "do not crop the hands",
    "do not create a strained facial expression"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração profunda",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the inhalation becomes readable through gentle rib and belly expansion with calm posture",
    "pose_to_show": "inhalation emphasis, rib cage gently expanding, posture relaxed, face calm",
    "safety_priority": "Subtle rib and belly expansion only, shoulders quiet, no dramatic arm movement",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as deep breathing rather than posing",
      "hands near the rib cage or belly remain visible",
      "the inhale and exhale states look intentionally different"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a yoga performance pose",
    "do not exaggerate arm movement",
    "do not crop the hands",
    "do not create a strained facial expression"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Respiração profunda",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the exhale softens the rib cage and returns the body toward neutral without dramatic movement",
    "pose_to_show": "soft exhalation emphasis, shoulders still relaxed, neutral spine, no dramatic movement",
    "safety_priority": "Subtle rib and belly expansion only, shoulders quiet, no dramatic arm movement",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": [
      "feet",
      "spine",
      "shoulders",
      "hands",
      "rib area",
      "gaze"
    ],
    "clarity_checks": [
      "the image reads as deep breathing rather than posing",
      "hands near the rib cage or belly remain visible",
      "the inhale and exhale states look intentionally different"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not turn it into a yoga performance pose",
    "do not exaggerate arm movement",
    "do not crop the hands",
    "do not create a strained facial expression"
  ]
}
```

## 23. Step touch lateral

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. Sem apoio externo. O corpo, a base e o alinhamento precisam explicar o exercício.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Step touch lateral",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing upright, feet near together, knees soft, arms relaxed, chest open, gaze forward",
    "safety_priority": "Small side step to the subject's right, controlled weight shift, no dance styling and no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the side step direction is obvious",
      "the weight shift and tap-in role are readable",
      "the image reads as low-impact lateral movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop feet",
    "do not exaggerate hip sway",
    "do not turn it into a dance performance pose"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Step touch lateral",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "one foot steps out and the body weight begins shifting laterally while the opposite foot prepares to follow",
    "pose_to_show": "small side step to the subject's right beginning, weight shifting laterally in a controlled way, trunk upright, arms moving naturally",
    "safety_priority": "Small side step to the subject's right, controlled weight shift, no dance styling and no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the side step direction is obvious",
      "the weight shift and tap-in role are readable",
      "the image reads as low-impact lateral movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop feet",
    "do not exaggerate hip sway",
    "do not turn it into a dance performance pose"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Step touch lateral",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the tap-in becomes clear and completes the side step without turning the image into a dance pose or jump",
    "pose_to_show": "small side step to the subject's right completed with the left foot tapping in, weight shifted laterally in a controlled way, trunk upright, both feet grounded",
    "safety_priority": "Small side step to the subject's right, controlled weight shift, no dance styling and no jump",
    "support_and_spatial_rule": "no external support object; the body and environment alone must explain the movement",
    "support_visibility": "no support object",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the side step direction is obvious",
      "the weight shift and tap-in role are readable",
      "the image reads as low-impact lateral movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not show airborne jumping",
    "do not crop feet",
    "do not exaggerate hip sway",
    "do not turn it into a dance performance pose"
  ]
}
```

## 24. Wall push-up

### Nota de uso

Gere início, meio e fim como três imagens realmente diferentes. Não pule o meio. A parede precisa ficar claramente visível, com as duas mãos no mesmo plano.

### Prompt JSON de início

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Generate this frame first. Use it as the anchor reference frame for the rest of the sequence.",
    "guidance": "If no reference image is attached, generate the locked woman and scene exactly as described below. If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, and support placement."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, wall on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Wall push-up",
    "phase": "initial",
    "phase_instruction": "Show only the exact start setup for this exercise. If the exercise starts standing, the body should look organized and upright. If the exercise starts on the floor or in quadruped, show only the neutral setup described below. Do not anticipate the next phase",
    "transition_hint": "This frame is the neutral anchor frame for the sequence.",
    "pose_to_show": "standing facing the wall in a slight 3/4 side view, arms extended, hands on the wall at chest height, body in a straight line from head to heels",
    "safety_priority": "Comfortable moderate bend only, straight body line, heels grounded, no desk push-up look",
    "support_and_spatial_rule": "vertical wall plane with both palms clearly contacting it at chest to shoulder height, wall angle and hand spacing stay constant across the sequence",
    "support_visibility": "wall edge and both hands contacting the wall must remain visible",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "wall contact points remain fully visible",
      "the body line and hand spacing are easy to read",
      "the image reads as a wall push-up rather than a desk or floor push-up"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the wall contact point",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a desk push-up or floor push-up"
  ]
}
```

### Prompt JSON de meio

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved initial frame and editing only the pose into the clearest middle position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested middle phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, wall on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Wall push-up",
    "phase": "intermediate",
    "phase_instruction": "Show only the clearest active middle pose of the movement. This frame must not look like the initial setup and must not jump to the final pose",
    "transition_hint": "the elbows begin bending and the chest travels toward the wall while the body remains aligned",
    "pose_to_show": "controlled lowering toward the wall, elbows bending, chest moving forward, heels grounded, trunk aligned",
    "safety_priority": "Comfortable moderate bend only, straight body line, heels grounded, no desk push-up look",
    "support_and_spatial_rule": "vertical wall plane with both palms clearly contacting it at chest to shoulder height, wall angle and hand spacing stay constant across the sequence",
    "support_visibility": "wall edge and both hands contacting the wall must remain visible",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "wall contact points remain fully visible",
      "the body line and hand spacing are easy to read",
      "the image reads as a wall push-up rather than a desk or floor push-up"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the wall contact point",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a desk push-up or floor push-up"
  ]
}
```

### Prompt JSON de fim

```json
{
  "instruction": "Create an image for a beginner-friendly home workout guide.",
  "priority_order": [
    "pose correctness",
    "safe beginner biomechanics",
    "clear visibility of key joints and support",
    "camera and scene consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic instructional fitness still",
    "aspect_ratio": "16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide",
    "composition_rule": "one woman only, one scene only, one exercise phase only",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, collage sticker, or split layout"
  },
  "reference_handling": {
    "recommended_use": "Best result usually comes from attaching the approved middle frame, or the approved initial frame if needed, and editing only the pose into the safe final position.",
    "guidance": "If a reference image is attached, preserve the exact same woman, room, camera, aspect ratio, lighting, support placement, body scale, and left-right orientation. Change only the pose into the requested final phase."
  },
  "subject_lock": {
    "identity": "Brazilian woman around 35",
    "skin_tone": "medium-light tan skin",
    "face": "oval face",
    "eyes": "dark brown almond eyes",
    "hair": "dark brown hair in a low ponytail with a center part",
    "body": "realistic athletic-but-natural body proportions",
    "expression": "calm focused expression",
    "outfit": {
      "top": "teal sports bra",
      "bottom": "charcoal high-waist leggings",
      "shoes": "white training sneakers"
    },
    "accessories": "none"
  },
  "scene_lock": {
    "location": "minimal home workout corner",
    "wall": "neutral wall",
    "floor": "light wood floor",
    "lighting": "soft diffused daylight from the left",
    "grading": "natural color grading",
    "rendering": "photorealistic instructional still with clean realistic anatomy and natural skin and fabric texture",
    "styling": "no clutter and no editorial fitness styling"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, wall on the right side of the frame, natural lens, stable full-body distance, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same body scale, and the same support placement when support is present"
  },
  "phase_task": {
    "exercise_name": "Wall push-up",
    "phase": "final",
    "phase_instruction": "Show only the safe end position for this exercise. Do not show the return to the start. Keep the end range conservative and beginner-friendly",
    "transition_hint": "the closest controlled wall position becomes clear without sagging the hips or changing the support logic",
    "pose_to_show": "elbows bent through a comfortable moderate range, chest moved closer to the wall, both hands still fully visible on the wall, body still in one straight line from head to heels, heels grounded",
    "safety_priority": "Comfortable moderate bend only, straight body line, heels grounded, no desk push-up look",
    "support_and_spatial_rule": "vertical wall plane with both palms clearly contacting it at chest to shoulder height, wall angle and hand spacing stay constant across the sequence",
    "support_visibility": "wall edge and both hands contacting the wall must remain visible",
    "must_keep_visible": [
      "hands",
      "wrists",
      "shoulders",
      "spine",
      "hips",
      "feet",
      "gaze"
    ],
    "clarity_checks": [
      "wall contact points remain fully visible",
      "the body line and hand spacing are easy to read",
      "the image reads as a wall push-up rather than a desk or floor push-up"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same support placement, same body scale, and same lighting across the whole exercise sequence.",
    "Preserve the same left-right orientation and the same body side facing the camera.",
    "Keep the exercise readable in one to two seconds.",
    "Prioritize biomechanical fidelity over dramatic styling or facial micro-detail."
  ],
  "avoid": [
    "no text",
    "no logo",
    "no watermark",
    "no extra people",
    "no collage",
    "no split panel",
    "no anatomical distortion",
    "no duplicated limbs",
    "no missing fingers",
    "no outfit drift",
    "no hairstyle drift",
    "no lighting drift",
    "no room drift",
    "no camera drift",
    "no perspective distortion",
    "no wide-angle body warping",
    "no support drift",
    "no support side swap",
    "no impossible body-to-support contact",
    "no advanced gym fitness posing",
    "do not hide the wall contact point",
    "do not let the hips sag",
    "do not crop hands or feet",
    "do not turn it into a desk push-up or floor push-up"
  ]
}
```
