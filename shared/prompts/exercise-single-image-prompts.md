# Prompts JSON de Imagem Unificada para os 24 Exercícios

Este arquivo foi reestruturado para `Nano Banana Pro / Gemini image generation` usando `Markdown + blocos JSON válidos`. Aqui o objetivo não é gerar três imagens separadas, mas `uma única imagem contínua` com `início + meio + fim` do mesmo exercício.

## Como usar

- O arquivo continua em `.md`, mas cada prompt está dentro de um bloco `json`.
- Copie `somente o JSON` do exercício que você quer gerar.
- Para esse tipo de prompt, prefira `21:9` se a interface deixar. Se não deixar, use `16:9 landscape`.
- Leia a composição sempre da `esquerda para a direita`: `início`, `meio`, `fim`.
- Esse arquivo é melhor para `validação rápida de biomecânica e sequência visual` do que para consistência absoluta de personagem.
- Se a IA fundir as três poses, regenere o mesmo prompt antes de simplificar demais.

## Observações práticas

- A composição precisa ser `uma cena contínua`, não um tríptico com bordas.
- A mesma mulher deve aparecer `três vezes`, com o mesmo corpo, a mesma roupa, a mesma câmera e a mesma luz.
- Em exercícios com apoio, o apoio deve se repetir com a mesma escala, o mesmo lado e o mesmo papel em cada posição.
- O campo `on_image_graphics` já força `sem texto`, `sem legenda`, `sem números`, `sem setas` e `sem watermark` de forma positiva.

## Base de pesquisa

- `Google AI for Developers — Nano Banana image generation`, atualizado em `2026-02-26`.
- `Google Cloud — Gemini image generation best practices`, atualizado em `2026-03-05`.
- `Google Cloud Blog — Ultimate prompting guide for Nano Banana`, publicado em `2026-03-06`.
- `Google Blog — 7 tips to get the most out of Nano Banana Pro`, publicado em `2025-11-20`.
- Fontes complementares: guia de JSON prompting do Roberto Dias Duarte, vídeo do Hongzhao sobre `JSON prompting` em `2026-03-02` e o nosso relatório técnico em [2026-03-08-relatorio-execucao-24-exercicios.md](../../docs/research/2026-03-08-relatorio-execucao-24-exercicios.md).

---

## 1. Agachamento assistido

### Nota de uso

Os três estados precisam aparecer claramente diferentes na mesma imagem. Use o mesmo modelo de cadeira simples em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Agachamento assistido",
    "support_layout": "Use three identical dining chairs, one for each body instance, with the same chair design, height, distance, and hand contact",
    "left_pose": "standing upright, feet hip-width apart, knees extended but relaxed, hips stacked over heels, arms extended lightly holding the chair, neutral spine, gaze forward",
    "center_pose": "hips moving back, knees softly bent, torso slightly inclined forward, arms still extended on the chair, heels grounded, neutral spine, gaze forward",
    "right_pose": "conservative supported quarter-squat depth, hips back, knees aligned with the feet, heels grounded, chest open, hands lightly on the chair, gaze forward",
    "safety_priority": "Conservative quarter-squat only, heels fully grounded, chair for light balance only, knees aligned with the feet",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the chair contact and support role are readable at a glance",
      "heel grounding and squat depth are clearly visible",
      "the image shows that the hips lead the descent, not the knees alone"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Agachamento parcial",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, feet hip-width apart, knees extended but relaxed, arms naturally in front for balance, neutral spine, gaze forward",
    "center_pose": "mini-squat middle phase, hips slightly back, knees softly bent, torso slightly inclined forward, heels grounded, arms balancing in front, neutral spine",
    "right_pose": "shallow mini-squat only, hips back, knees aligned with the feet, thighs far above parallel, heels grounded, chest open, gaze forward",
    "safety_priority": "Mini-squat only, hips clearly above the knees, no deep descent, heels grounded",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "arms", "gaze"],
    "clarity_checks": [
      "the movement reads as partial rather than deep",
      "the knees, hips, and feet remain fully readable",
      "the image shows a controlled squat pattern without support"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Apoio opcional. Só mostrar se realmente melhorar estabilidade ou leitura.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Alongamento de quadril",
    "support_layout": "Prefer no support object. If a support object is necessary, repeat the same support consistently for the three positions with the same scale and placement",
    "left_pose": "left foot forward, right leg back, short comfortable split stance, torso upright, both feet grounded, hips square, hands relaxed by the sides",
    "center_pose": "left foot forward, right leg back, gentle forward glide of the pelvis, left knee softly bent, right leg long, torso upright, abdomen engaged, gaze forward",
    "right_pose": "left foot forward, right leg back, clear but gentle hip flexor stretch, pelvis slightly forward, chest open, neutral spine, stretch visible at the front of the right hip",
    "safety_priority": "Short comfortable split stance, pelvis glides gently forward, stretch at the front of the back hip, no deep lunge",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the split stance and front versus back leg roles are obvious",
      "the trunk stays upright instead of collapsing forward",
      "the exercise reads as a gentle stretch, not a strength lunge"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Alongamento posterior",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, feet hip-width apart, knees softly unlocked, arms relaxed, neutral spine, gaze forward",
    "center_pose": "hips folding back into a moderate hinge, knees slightly bent, spine long, hands reaching toward thighs or shins without forcing",
    "right_pose": "moderate half-hinge only, hips back, torso inclined forward, knees still soft, neck relaxed, spine long rather than rounded",
    "safety_priority": "Half hinge only, knees soft, long spine, no deep fold",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. Use o mesmo apoio ao lado da mão de apoio em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Avanço curto com apoio",
    "support_layout": "Use three identical support objects, one beside the support hand of each body instance, with the same side, height, scale, and distance",
    "left_pose": "left foot forward, right foot back, short split stance, torso upright, both feet grounded, left hand lightly on the support, knees extended but relaxed, gaze forward",
    "center_pose": "left foot forward, right foot back, small lowering phase, front and back knees softly bending, pelvis centered, torso upright, left support hand still visible",
    "right_pose": "left foot forward, right foot back, short supported lunge depth only, front knee comfortably bent, back heel may be lifted naturally, torso tall, neutral spine, light support with the left hand",
    "safety_priority": "Short split stance, small lowering range, upright torso, support hand light only",
    "must_keep_visible": ["feet", "knees", "hips", "spine", "hands", "gaze"],
    "clarity_checks": [
      "the support position relative to the front hand is obvious",
      "the movement reads as a short supported lunge, not a long athletic one",
      "the front knee path and body balance are easy to read"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward frame left, hips toward frame right, left side of the body slightly closer to the camera, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Bird dog",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "all fours on the mat, hands under shoulders, knees under hips, neutral spine, neck long, gaze down and slightly forward",
    "center_pose": "from all fours, right arm beginning to reach forward and left leg beginning to extend backward, pelvis stable, trunk steady, support points still grounded",
    "right_pose": "full bird dog position with the right arm forward and the left leg back, both reaching only to trunk height, hips level, neutral spine, core engaged, gaze down slightly ahead",
    "safety_priority": "Pelvis level, trunk quiet, opposite arm and leg reach to trunk height only, no hip opening",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "3/4 view from slightly above floor level, head toward frame left, legs toward frame right, left side of the body slightly closer to the camera, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Dead bug",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "lying on the back on the mat, hips and knees bent around tabletop, arms reaching up over the chest, head relaxed, ribs down",
    "center_pose": "lying on the back, right arm moving backward and left leg extending away on a low diagonal, lower back staying close to the mat, abdomen engaged, the other arm and leg still bent",
    "right_pose": "lying on the back, right arm overhead only as far as the ribs stay quiet, left leg extended on a comfortable low diagonal, lower back controlled against the mat, the other arm and leg still bent",
    "safety_priority": "Ribs quiet, lower back supported, opposite arm and leg extend only through a comfortable low range",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Elevação de joelhos leve",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, both feet on the floor, arms relaxed in marching position, chest open, gaze forward",
    "center_pose": "upright low-impact march, left knee beginning to lift, right arm swinging naturally, right support foot grounded, trunk upright",
    "right_pose": "upright low-impact march, left knee lifted to a low or medium height and clearly below hip height, right arm swinging naturally, right support foot grounded",
    "safety_priority": "Low-to-medium knee lift below hip height, no run posture, no jump",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads as low-impact marching rather than running",
      "the support foot and lifted knee remain fully visible",
      "the trunk stays vertical and calm"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Apoio opcional. Só mostrar se realmente melhorar estabilidade ou leitura.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Elevação de panturrilha",
    "support_layout": "Prefer no support object. If a support object is necessary, repeat the same support consistently for the three positions with the same scale and placement",
    "left_pose": "standing upright with both feet flat, knees softly unlocked, arms relaxed or lightly supported, gaze forward",
    "center_pose": "heels beginning to rise, weight moving to the balls of the feet, body stacked upright, ankles clearly visible",
    "right_pose": "both heels lifted together through a moderate rise only, weight on the balls of the feet, ankles stacked, knees soft, torso vertical, controlled balance",
    "safety_priority": "Moderate heel lift only, both heels rise together, ankles stacked, no forward lean",
    "must_keep_visible": ["feet", "ankles", "calves", "knees", "hips", "gaze"],
    "clarity_checks": [
      "heel lift is clearly visible from side view",
      "ankle stacking and balance look realistic",
      "any optional support looks light, not load-bearing"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of each body instance and feet on the right side, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Elevação pélvica",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "lying on the back, knees bent, feet flat on the mat, arms by the sides, head relaxed, pelvis neutral",
    "center_pose": "pelvis lifting gently off the mat, knees still bent, trunk forming a gradual diagonal line, shoulders grounded",
    "right_pose": "pelvis lifted gently off the mat, knees aligned, shoulders grounded, ribs controlled, trunk forming only a moderate diagonal, final height clearly smaller than a full bridge",
    "safety_priority": "Smaller than a full bridge, gentle lift, shoulders grounded, ribs controlled",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Good morning sem peso",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, feet hip-width apart, knees softly unlocked, hands crossed over the chest or on the hips, neutral spine, gaze forward",
    "center_pose": "hips hinging back, torso angled forward, knees still soft, spine long, chest open",
    "right_pose": "clear but conservative hip hinge, hips pushed back, torso angled forward well before horizontal, knees still soft, spine long, chest open, neck aligned",
    "safety_priority": "Hip hinge only, knees soft, long spine, stop well before horizontal",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Marcha parada",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, both feet on the floor, arms relaxed naturally, chest open, gaze forward",
    "center_pose": "upright march in place, left knee beginning to rise, right arm swinging naturally, right support foot grounded, calm low-impact rhythm",
    "right_pose": "upright march in place, left knee slightly raised below hip height, right arm moving naturally, right support foot grounded, shoulders relaxed, low-impact rhythm",
    "safety_priority": "Low-impact march, knee below hip height, natural arm swing, no running mechanics",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the image reads instantly as marching in place",
      "foot placement and soft support exchange remain visible",
      "the body posture looks calm and controlled"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Se precisar simplificar, o foco principal é deixar início, meio e fim inteligíveis sem exagero. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Marcha parada leve",
    "support_layout": "Do not show any support object",
    "left_pose": "standing in a relaxed marching stance, both feet near the floor, shoulders soft, chest open, calm breathing",
    "center_pose": "very gentle recovery march, left knee beginning a small lift, right arm moving with minimal swing, trunk relaxed and upright",
    "right_pose": "very gentle recovery march, very small left knee lift below hip height, minimal right arm swing, right support foot grounded, trunk upright and relaxed",
    "safety_priority": "Very small recovery march, minimal arm swing, low effort, no cardio intensity",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the movement reads as very light marching",
      "the body language stays relaxed instead of athletic",
      "the frame preserves low-impact intent even if reused"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Mobilidade de coluna",
    "support_layout": "Do not show any support object",
    "left_pose": "neutral standing position, feet comfortable apart, knees soft, arms relaxed, spine tall, head aligned",
    "center_pose": "gentle spinal mobility movement beginning, shoulders and upper back moving while pelvis stays calm, breath controlled",
    "right_pose": "gentle upper-trunk and shoulder mobility toward the subject's right side, pelvis quiet, chest readable, spine long, no aggressive twist or backbend",
    "safety_priority": "Gentle upper-trunk mobility only, pelvis quiet, no deep twist or backbend",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. Apoio opcional. Só mostrar se realmente melhorar estabilidade ou leitura.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, left side slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body in side or 3/4 side view with both feet, knees, and hips fully visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Mobilidade de quadril",
    "support_layout": "Prefer no support object. If a support object is necessary, repeat the same support consistently for the three positions with the same scale and placement",
    "left_pose": "standing neutral base, left leg as the support leg, right side as the moving side, knees soft, pelvis neutral, chest open, gaze forward",
    "center_pose": "left leg steady as the support leg, right hip beginning a very small controlled outward path, right knee low, pelvis readable, upper body steady",
    "right_pose": "left support leg steady, right hip taken through a very small controlled outward end range, right knee low and slightly opened, pelvis readable, trunk quiet, chest open",
    "safety_priority": "Very small controlled hip range, support leg steady, no dance-like swing",
    "must_keep_visible": ["feet", "knees", "hips", "pelvis", "spine", "gaze"],
    "clarity_checks": [
      "the moving hip side versus support side are obvious",
      "the pelvis remains readable from the camera angle",
      "any optional support looks helpful but not central"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Polichinelo sem salto",
    "support_layout": "Do not show any support object",
    "left_pose": "standing tall, feet together or near together, arms by the sides, gaze forward",
    "center_pose": "low-impact opening phase, side step beginning, both feet grounded, arms moving outward and upward through a smooth arc, trunk upright",
    "right_pose": "feet apart in a comfortable open stance, arms raised in coordination to shoulder height or only slightly above, knees soft, trunk upright, both feet grounded",
    "safety_priority": "Low-impact opening only, both feet grounded, arms stop around shoulder height or slightly above",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "hands", "gaze"],
    "clarity_checks": [
      "the image reads as a modified jumping jack without impact",
      "arm and leg coordination are obvious",
      "the three positions are clearly distinct from one another"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of each body instance and feet on the right side, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Ponte de glúteos",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "lying on the back, knees bent, feet flat hip-width apart, arms by the sides, pelvis neutral, head relaxed",
    "center_pose": "hips lifting gradually, knees still bent, trunk creating a diagonal line, shoulders grounded, neck relaxed",
    "right_pose": "hips lifted into a clean diagonal from shoulders to knees, knees aligned over the feet, feet grounded, ribs controlled, shoulders and head relaxed on the mat",
    "safety_priority": "Controlled bridge, knees aligned over the feet, ribs quiet, no hyperextension",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of each body instance and feet on the right side, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Ponte de glúteos com pausa",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "lying on the back, knees bent, feet flat, arms long by the sides, pelvis neutral, head relaxed",
    "center_pose": "top bridge position reached and held, hips high, ribs controlled, knees aligned, shoulders anchored",
    "right_pose": "top bridge held steadily, hips high but controlled, diagonal line from shoulders to knees, knees aligned, ribs quiet, shoulders and head relaxed on the mat",
    "safety_priority": "Stable top hold, knees aligned, ribs quiet, no extra arching",
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
      "the held position looks stable rather than drifting",
      "the bridge line remains controlled without extra arching"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

O início e o fim precisam contrastar bem; o meio pode ser mais sutil, mas deve continuar legível. O tapete precisa ficar legível e coerente em todas as três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "clean side view, head on the left side of each body instance and knees on the right side, natural lens, level horizon",
    "framing": "full body on the mat with the full mat edges, hands, feet, and limb reach visible",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Prancha adaptada",
    "support_layout": "Use three identical exercise mats, one under each body instance, aligned left to right with mat edges clearly readable",
    "left_pose": "adapted plank setup on the mat, knees down, hands or forearms under shoulders, trunk long, gaze down",
    "center_pose": "body line more engaged, hips aligned between shoulders and knees, abdomen active, neck long",
    "right_pose": "stable line from head to knees, shoulders stacked over the support points, core braced, knees grounded on the mat, neck long, pelvis aligned between shoulders and knees",
    "safety_priority": "Knees stay on the mat, straight line from head to knees, no hip sag and no pike",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. A superfície elevada precisa manter a mesma altura e escala nas três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, support surface on the right side of each body instance, natural lens, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Push-up inclinada",
    "support_layout": "Use three identical elevated support surfaces, one for each body instance, keeping height, angle, and hand placement consistent",
    "left_pose": "inclined push-up start with arms extended, hands on support surface, body in a straight diagonal line, heels grounded or feet planted, gaze down slightly forward",
    "center_pose": "controlled lowering phase, elbows bending back, chest moving toward the support, body line still straight",
    "right_pose": "elbows bent through a comfortable moderate range, chest lowered toward the support surface, body still in one straight diagonal line, hips aligned with shoulders and heels, neck neutral",
    "safety_priority": "Comfortable moderate bend only, body in one straight diagonal line, no floor push-up look",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Se precisar simplificar, o foco principal é deixar início, meio e fim inteligíveis sem exagero. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 front view, left shoulder slightly closer to the camera, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Respiração e mobilidade leve",
    "support_layout": "Do not show any support object",
    "left_pose": "comfortable upright position, shoulders relaxed, chest open, hands placed to support breathing awareness, calm gaze",
    "center_pose": "subtle rib and upper-trunk motion visible, shoulders quiet, posture soft and upright, movement clearly small and controlled",
    "right_pose": "gentle breathing and light mobility end state, hands still near the rib area if present, shoulders quiet, posture soft and upright",
    "safety_priority": "Very small restorative motion only, shoulders quiet, no workout posing",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Se precisar simplificar, o foco principal é deixar início, meio e fim inteligíveis sem exagero. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Respiração profunda",
    "support_layout": "Do not show any support object",
    "left_pose": "comfortable upright stance, shoulders relaxed, hands lightly placed to guide breathing, chest open, calm gaze",
    "center_pose": "gentle visible rib and belly expansion, shoulders still quiet, trunk relaxed and upright, hands lightly guiding the breath",
    "right_pose": "soft return from the breath or maintained gentle expansion, shoulders quiet, trunk relaxed, hands still lightly guiding the breath",
    "safety_priority": "Subtle rib and belly expansion only, shoulders quiet, no dramatic arm movement",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. Sem apoio externo. O corpo e o alinhamento devem explicar o exercício.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "centered frontal view, natural lens, level horizon, stable full-body distance",
    "framing": "full body visible with extra space above the head and around the limbs",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Step touch lateral",
    "support_layout": "Do not show any support object",
    "left_pose": "standing upright, feet near together, knees soft, arms relaxed, chest open, gaze forward",
    "center_pose": "small side step to the subject's right beginning, weight shifting laterally in a controlled way, trunk upright, arms moving naturally",
    "right_pose": "small side step to the subject's right completed with the left foot tapping in, weight shifted laterally in a controlled way, trunk upright, both feet grounded",
    "safety_priority": "Small side step to the subject's right, controlled weight shift, no dance styling and no jump",
    "must_keep_visible": ["feet", "knees", "hips", "arms", "spine", "gaze"],
    "clarity_checks": [
      "the side step direction is obvious",
      "the weight shift and tap-in role are readable",
      "the image reads as low-impact lateral movement"
    ]
  },
  "continuity_rules": [
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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

Os três estados precisam aparecer claramente diferentes na mesma imagem. A parede precisa continuar no mesmo plano visual nas três posições.

### Prompt JSON único

```json
{
  "instruction": "Create one unified instructional image for a beginner-friendly home workout guide.",
  "priority_order": [
    "clear left-to-right phase differentiation",
    "safe beginner biomechanics",
    "clean separation between the three body instances",
    "camera and support consistency",
    "character consistency"
  ],
  "output_goal": {
    "image_type": "single realistic composite instructional fitness still",
    "aspect_ratio_preference": "21:9 wide landscape if available, otherwise 16:9 landscape",
    "style": "photorealistic",
    "use_case": "home workout guide and fast visual validation before video generation",
    "composition_rule": "one continuous scene with the same woman shown exactly three times",
    "on_image_graphics": "clean image-only frame with no on-image text, title, caption, label, arrow, number, logo, watermark, panel border, cut line, infographic box, comic layout, or collage sticker"
  },
  "reference_handling": {
    "recommended_use": "Usually best as a text-only generation. If a reference image is attached, use it only to preserve the same woman, room, camera, and support while converting the scene into a three-position instructional composition.",
    "guidance": "If a reference image is attached, preserve the same woman, room, camera, lighting, body scale, support placement, and left-right orientation. Do not collapse the three poses into one fused body."
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
  "composition_lock": {
    "scene_type": "one single continuous scene, not a triptych and not three separate panels",
    "body_instances": 3,
    "layout": "left figure = initial position, center figure = intermediate position, right figure = final position",
    "spacing_rule": "the three body instances are equally sized, evenly spaced, fully separate, and never overlap",
    "fusion_prevention": "no transparent motion trail, no merged limbs, no shared support object between adjacent figures unless the object is intentionally repeated in matching positions"
  },
  "camera_lock": {
    "shot_description": "slight 3/4 lateral view, subject facing frame right, wall on the right side of the composition, natural lens, level horizon",
    "framing": "full body visible with the support object fully visible and uncropped",
    "consistency_rule": "Keep the same room, same camera, same lighting, same body scale, and the same support logic across the three positions"
  },
  "unified_exercise_task": {
    "exercise_name": "Wall push-up",
    "support_layout": "Use one continuous wall plane across the composition, with the three body instances equally spaced along the same wall logic",
    "left_pose": "standing facing the wall in a slight 3/4 side view, arms extended, hands on the wall at chest height, body in a straight line from head to heels",
    "center_pose": "controlled lowering toward the wall, elbows bending, chest moving forward, heels grounded, trunk aligned",
    "right_pose": "elbows bent through a comfortable moderate range, chest moved closer to the wall, both hands still fully visible on the wall, body still in one straight line from head to heels, heels grounded",
    "safety_priority": "Comfortable moderate bend only, straight body line, heels grounded, no desk push-up look",
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
    "Keep the same woman, same room, same camera, same lighting, same body scale, and the same support logic across the three positions.",
    "Preserve the same left-right orientation and the same body side facing the camera in all three positions.",
    "Make the three phases readable in one to two seconds from left to right.",
    "Prioritize biomechanical readability over dramatic styling or cinematic flair."
  ],
  "avoid": [
    "no text",
    "no title",
    "no labels",
    "no captions",
    "no arrows",
    "no numbers",
    "no logo",
    "no watermark",
    "no extra people",
    "no panel borders",
    "no cut lines",
    "no comic layout",
    "no infographic boxes",
    "no collage stickers",
    "no anatomical distortion",
    "no duplicated or fused limbs inside the same body instance",
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
