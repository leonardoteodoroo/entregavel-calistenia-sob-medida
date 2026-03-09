# Character Base Prompts (Image AI)

Use these prompts together with `shared/exercise-visual-specs.json`.

The character, outfit, room, and illustration style stay fixed across the whole project.
Camera angle, framing, support logic, biomechanical readability, and phase pose must come from the exercise spec for the current exercise.

## Locked Character Identity

- Brazilian woman, 30+ years old, neutral and approachable appearance
- Medium-light tan skin, oval face, dark brown almond eyes
- Dark brown hair tied in a low ponytail, center part, no bangs
- Athletic but realistic body, average height, natural proportions
- Calm facial expression, focused and confident
- Outfit fixed in all images: teal sports bra, charcoal high-waist leggings, white training sneakers
- No accessories, no jewelry, no hat, no gloves
- Illustration style fixed in all images: semi-realistic digital illustration, clean anatomy, soft edge shading
- Scene fixed in all images: minimal home workout corner, neutral wall, light wood floor, exercise mat available in the room and visible only when the framing or exercise requires it
- Lighting fixed in all images: soft diffused daylight from the left side, low contrast, natural tones
- Sequence rule: camera and framing stay fixed inside the same exercise sequence, but can change between exercises according to the exercise visual spec
- Output constraints: no text, no logo, no watermark, no collage, no split panel, no extra people

## Universal Prompt Criteria

Every exercise image must preserve these eight layers of consistency:

1. Fixed character identity
2. Fixed project world and room styling
3. Predictable camera system
4. Visible biomechanics
5. Correct body-to-support relationship
6. Clear start / middle / end phase distinction
7. Functional visual clarity in 1 to 2 seconds
8. Stable negative constraints that prevent drift

Before generating any frame, answer these four questions from the current exercise spec:

1. What must stay visible for the movement to be understood immediately?
2. Which body parts determine whether the execution looks correct?
3. Is there external support, and if yes, where is it, how is it touched, and what is it doing?
4. What visibly changes between initial, middle, and final phase?

## Prompt Assembly Inputs

Replace these placeholders with values from the current exercise spec:

- `{{exercise_name}}`
- `{{camera_preset_description}}`
- `{{camera_detail_preset_description}}`
- `{{framing_preset_description}}`
- `{{required_points}}`
- `{{support_object_preset_description}}`
- `{{support_object_visibility}}`
- `{{biomechanics_summary}}`
- `{{phase_delta}}`
- `{{clarity_checks}}`
- `{{phase_description}}`
- `{{negative_constraints}}`

## Global Negative Constraints

Always keep these restrictions in every generated frame:

- no text
- no watermark
- no logo
- no extra people
- no anatomical distortion
- no duplicated limbs
- no missing fingers
- no hidden support object when the exercise uses support
- no outfit change
- no hairstyle change
- no lighting change
- no room change
- no camera drift inside the same exercise sequence
- no support height drift inside the same exercise sequence
- no support distance drift inside the same exercise sequence
- no support side swap inside the same exercise sequence
- no impossible body-to-support contact
- no perspective distortion or wide-angle body warping
- do not crop hands, feet, knees, elbows, or the exercise mat edge when they are relevant to the movement
- do not turn the pose into advanced gym fitness posing
- do not turn the image into lifestyle advertising, beauty posing, or editorial fitness imagery

## character_base_inicio

```text
Create a semi-realistic digital illustration of the same fixed character in a home workout scene.

Character lock:
- Brazilian woman, 30+ years old, medium-light tan skin, oval face, dark brown almond eyes
- Dark brown hair in a low ponytail with center part
- Athletic but realistic body proportions
- Calm, focused expression

Wardrobe lock:
- Teal sports bra
- Charcoal high-waist leggings
- White training sneakers
- No accessories or jewelry

Scene and camera lock:
- Minimal home workout corner, neutral wall, light wood floor, exercise mat available when relevant
- Camera preset: {{camera_preset_description}}
- Camera detail preset: {{camera_detail_preset_description}}
- Framing preset: {{framing_preset_description}}
- Required visible points: {{required_points}}
- Support object preset: {{support_object_preset_description}}
- Support object visibility: {{support_object_visibility}}
- Biomechanics summary: {{biomechanics_summary}}
- Phase delta from the sequence logic: {{phase_delta}}
- Functional clarity checks: {{clarity_checks}}
- Soft diffused daylight from the left side, natural color grading

Task:
- Exercise: {{exercise_name}}
- Moment: initial position
- Pose description: {{phase_description}}
- The frame must make the support role, lead joint action, and movement direction readable without text
- Preserve strict identity continuity for future middle and final frames

Negative constraints:
- Apply all global negative constraints
- Extra exercise constraints: {{negative_constraints}}
```

## character_base_meio

```text
Create a semi-realistic digital illustration of the same fixed character in the exact same home workout scene.

Character lock:
- Brazilian woman, 30+ years old, medium-light tan skin, oval face, dark brown almond eyes
- Dark brown hair in a low ponytail with center part
- Athletic but realistic body proportions
- Calm, focused expression

Wardrobe lock:
- Teal sports bra
- Charcoal high-waist leggings
- White training sneakers
- No accessories or jewelry

Scene and camera lock:
- Minimal home workout corner, neutral wall, light wood floor, exercise mat available when relevant
- Camera preset: {{camera_preset_description}}
- Camera detail preset: {{camera_detail_preset_description}}
- Framing preset: {{framing_preset_description}}
- Required visible points: {{required_points}}
- Support object preset: {{support_object_preset_description}}
- Support object visibility: {{support_object_visibility}}
- Biomechanics summary: {{biomechanics_summary}}
- Phase delta from the sequence logic: {{phase_delta}}
- Functional clarity checks: {{clarity_checks}}
- Keep the exact same room, framing, perspective, and lighting as the initial frame

Task:
- Exercise: {{exercise_name}}
- Moment: intermediate position
- Pose description: {{phase_description}}
- The intermediate frame must show the point where the movement pattern is most legible
- Keep strict visual continuity with the initial frame

Negative constraints:
- Apply all global negative constraints
- Extra exercise constraints: {{negative_constraints}}
```

## character_base_fim

```text
Create a semi-realistic digital illustration of the same fixed character in the exact same home workout scene.

Character lock:
- Brazilian woman, 30+ years old, medium-light tan skin, oval face, dark brown almond eyes
- Dark brown hair in a low ponytail with center part
- Athletic but realistic body proportions
- Calm, focused expression

Wardrobe lock:
- Teal sports bra
- Charcoal high-waist leggings
- White training sneakers
- No accessories or jewelry

Scene and camera lock:
- Minimal home workout corner, neutral wall, light wood floor, exercise mat available when relevant
- Camera preset: {{camera_preset_description}}
- Camera detail preset: {{camera_detail_preset_description}}
- Framing preset: {{framing_preset_description}}
- Required visible points: {{required_points}}
- Support object preset: {{support_object_preset_description}}
- Support object visibility: {{support_object_visibility}}
- Biomechanics summary: {{biomechanics_summary}}
- Phase delta from the sequence logic: {{phase_delta}}
- Functional clarity checks: {{clarity_checks}}
- Keep the exact same room, framing, perspective, and lighting as the previous frames

Task:
- Exercise: {{exercise_name}}
- Moment: final position
- Pose description: {{phase_description}}
- The final frame must read as the end of the repetition or an intentional return position, never as a different exercise
- Keep strict visual continuity with the initial and intermediate frames

Negative constraints:
- Apply all global negative constraints
- Extra exercise constraints: {{negative_constraints}}
```
