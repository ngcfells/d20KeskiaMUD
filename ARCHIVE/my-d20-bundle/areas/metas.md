# This file will contain all of the different metadata tags that can be used by our engines.

- terrain:
  | Metadata Key | Description | Standard d20 Effect |
  |---|---|---|---|
  | | ## Movement-Impeding Terrain | |
  |---|---|---|---|
  | RUBBLE_LIGHT | Small debris, uneven floors. | Difficult Terrain: x2 Move Cost. |
  | RUBBLE_DENSE | Large chunks of masonry, collapsed walls. | Difficult Terrain: x4 Move Cost, +2 Tumble DC. |
  | UNDERGROWTH_LIGHT | Tall grass, vines, or light brush. | Difficult Terrain: x2 Move Cost, provides Concealment. |
  | UNDERGROWTH_HEAVY | Dense briars, thickets. | Difficult Terrain: x4 Move Cost, provides 30% Cover. |
  | STEEP_SLOPE | Significant incline (upward). | Difficult Terrain: x2 Move Cost. |
  | WATER_SHALLOW | Knee-deep water or flooding.| Difficult Terrain: x2 Move Cost. |
  |---|---|---|---|
  | | ## Hazardous/Skill-Gate Terrain | |
  |---|---|---|---|
  | SLIPPERY | Ice, oil, or wet smooth stone. | x2 Move Cost, requires Balance check to run/charge. |
  | NARROW_LEDGE | Rafters, narrow beams, or ledge. | Requires Balance check; failure results in falling. |
  | BOG_DEEP | Waist-deep mud or swamp. | x4 Move Cost, requires Swim or Strength check. |
  |---|---|---|---|

- isDifficult: true/false boolean