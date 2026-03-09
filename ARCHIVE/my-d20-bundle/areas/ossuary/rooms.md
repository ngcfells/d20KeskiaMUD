- id: 0
  title: "The Obsidian Ridge"
  description: "A narrow, wind-whipped plateau overlooking a sea of gray mist. The ground beneath your feet is composed of jagged volcanic glass and pulverized bone. To the south, the skeletal remains of a stone structure cling to the cliffside, its silhouette blurred by the relentless downpour."
  first_entry: "You wake upon the cold stone with no memory of the ascent. The air tastes of salt and ancient sorrow; your journey begins at the edge of the world."
  coordinates: [0, 1, 0]
  metadata:
    room_type: "outdoors"
    hazard_level: 0
    # Custom flags are now stored as boolean metadata
    is_dark: false
    is_outdoors: true
    is_windy: true
    extra_descriptions:
      mist: "A roiling sea of grey that hides the world below."
      bone: "Tiny fragments of jaw and rib, crushed by centuries of wind."
    ambient_effects:
      aural: "The wind howls through the jagged rocks, sounding like the distant screams of the lost."
      visual: "Lightning flickers behind the heavy clouds, momentarily illuminating the vast, empty drop-off to the north."
  exits:
    - direction: south
      roomId: "ossuary:1"
      
- id: 1
  title: "The Crumbling Gatehouse"
  description: "Rain lashes against a heavy granite archway, the last line of defense for a forgotten civilization. The ceiling has long since collapsed, leaving the interior exposed to the elements. In the center of the floor, a set of steep, slick stairs descends into a suffocating darkness."
  coordinates: [0, 0, 0]
  metadata:
    is_dark: false
    is_outdoors: true
    has_rain: true
    extra_descriptions:
      archway: "The granite is pitted and scarred, as if clawed by something massive."
      stairs: "Slick with rain and moss, they vanish into a lightless maw."
  items:
    - id: "ossuary:starter_chest" # Items moved here
  npcs:
    - id: "ossuary:npc_gatekeeper_spirit"
      respawnChance: 100
  exits:
    - direction: north
      roomId: "ossuary:0"
    - direction: down
      roomId: "ossuary:2"

- id: 2
  title: "The Antechamber of Lament"
  description: "A cold hall where the walls are adorned with murals of saints, their eyes gouged out by unseen hands. Shattered stone benches, once used for prayer, now lie in ruin along the damp perimeter."
  coordinates: [0, 0, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      murals: "The paint is peeling, but the cruelty is clear. Every saint is depicted in a moment of martyrdom, their faces scraped away by iron tools."
      benches: "Heavy granite seats snapped like dry kindling. You see faint, bloody handprints on the stone."
      saints: "The figures seem to weep real moisture from their blinded eyes."
  exits:
    - direction: up
      roomId: "ossuary:1"
    - direction: south
      roomId: "ossuary:3"
    - direction: west
      roomId: "ossuary:4"

- id: 3
  title: "The Crossroads of the Dead"
  description: "A vast vaulted dome rises high above, supported by pillars carved in the likeness of weeping angels. The marble mosaic floor, though cracked, still depicts a grand celestial map."
  coordinates: [0, -1, -2]
  metadata:
    is_dark: true
    is_hub: true
    extra_descriptions:
      pillars: "Four weeping angels, each covering their eyes, as if afraid to see where the stars lead. They are carved with such detail you can almost see the stone feathers tremble."
      angels: "As you look at them, you get the distinct, prickling sensation that they moved when you blinked."
      mosaic: "A map of the cosmos. Several constellations appear to have been deliberately scratched out, but if you have the knowledge, you might 'touch' a specific star to align the vault."
      stars: "The stars are inlaid with faint bioluminescent stones that pulse with a weak, dying light. Four specific stars on the map seem to be points of interaction: neon-blue, chrome-white, emerald, and crimson."
  exits:
    - direction: north
      roomId: "ossuary:2"
    - direction: west
      roomId: "ossuary:6"
    - direction: east
      roomId: "ossuary:16"
    - direction: south
      roomId: "ossuary:26"
    - direction: down
      roomId: "ossuary:5"

- id: 4
  title: "The Guard's Recess"
  description: "A cramped, claustrophobic chamber tucked behind heavy iron grates. Splintered tables and rusted armor pieces are scattered across the floor, discarded in some ancient, frantic struggle."
  coordinates: [-1, 0, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      grates: "Heavy iron bars, thick with rust and pitted by age. They look as if they were designed to keep something *in* rather than out."
      tables: "Once sturdy oak, now reduced to kindling. Deep gouges in the wood suggest claws or blades were driven into them with desperate force."
      armor: "Scraps of boiled leather and rusted chainmail. Most of the pieces are missing their straps, torn away violently."
      floor: "Beneath the debris, the stone is stained with dark, irregular patches that never quite dried."
      struggle: "The chaos in the room tells a story of a last stand. Footprints in the dust suggest the guards were surrounded before the end."
  npcs:
    - id: "ossuary:skeleton_guard"
      respawnChance: 100
  exits:
    - direction: east
      roomId: "ossuary:2"

- id: 5
  title: "The Vestibule of Cleansing"
  description: "A shallow stone basin filled with stagnant, brackish water dominates the center of the floor. Statues of priests in various poses of prayer line the walls, their features eroded by centuries of damp."
  coordinates: [0, -1, -3]
  metadata:
    is_dark: true
    is_water: true
    water_state: "brackish" # Initial state
    extra_descriptions:
      basin: "A wide, waist-high font carved from grey stone. The water within is currently cloudy and smells of salt."
      priests: "Four distinct statues stand here: one with open palms, one with a raised finger, one with a bowed head, and one with clenched fists."
      statue_palms: "A priest offering an open-handed gesture of welcome. It feels oddly warm."
      statue_finger: "A priest pointing toward the heavens in a stern warning."
      statue_head: "A priest hunched in deep, sorrowful contemplation."
      statue_fists: "A priest with knuckles white and face contorted in silent rage."
  exits:
    - direction: north
      roomId: "ossuary:3"
    - direction: south
      roomId: "ossuary:36"

- id: 6
  title: "The Hall of Penance"
  description: "A narrow corridor flanked by cramped kneeling alcoves. The floor is buried under a thick layer of fine, white bone-ash that puffs into the air with every step."
  coordinates: [-1, -1, -2]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    extra_descriptions:
      alcoves: "There are six alcoves in total, three on each side. Each contains a small stone ledge and a floor stained by the knees of thousands of penitents."
      ash: "The bone-ash is surprisingly heavy and reaches mid-calf. It is the pulverized remains of those who failed their trials here."
      alcove: "Most are empty, but the central alcove on the north wall has a small iron spike protruding from the prayer ledge."
      spike: "A jagged iron needle, rusted and dark with dried blood. It seems designed to take a small offering of flesh."
  exits:
    - direction: east
      roomId: "ossuary:3"
    - direction: west
      roomId: "ossuary:7"

- id: 7
  title: "The Scriptorium of Shadows"
  description: "Rotted wooden carrels and piles of crumbling parchment suggest a place of former study. A massive stone-bound book remains chained to a heavy lectern in the center of the room."
  coordinates: [-2, -1, -2]
  metadata:
    is_dark: true
    has_negative_energy: true
    extra_descriptions:
      book: "The 'Liturgy of the Obsidian Veil.' The stone cover is cool to the touch. You might be able to <yellow>read book</yellow>."
      lectern: "A solid block of granite carved with weeping faces. The faces are positioned as if trying to read the book themselves."
      carrels: "Simple wooden desks, now home to rot and dust."
      parchment: "Most is dust, but you see fragments of diagrams detailing the 'Transcendence of Valerius'."
  npcs:
    - id: "ossuary:lesser_shadow"
      respawnChance: 0.5 # Increased spawn so players get to fight
  exits:
    - direction: east
      roomId: "ossuary:6"
    - direction: north
      roomId: "ossuary:8"
    - direction: south
      roomId: "ossuary:9"
    - direction: west
      roomId: "ossuary:11"

- id: 8
  title: "The Belfry Access"
  description: "A spiral iron staircase winds upward into a dark, oily shaft. The metal is slick with a strange, dark residue that smells of old grease."
  coordinates: [-2, 0, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      staircase: "The iron is rusted through in places, and the spiral is so tight it forces you to climb sideways. Every step is coated in a thick, black sludge."
      residue: "It has the consistency of rendered fat but smells of sulfur and industrial lubricant. It seems to be seeping from the stones above."
      shaft: "The vertical tunnel is perfectly circular, its walls smooth and light-swallowing. Far above, you can hear the faint, hollow groan of metal."
      grease: "The smell is cloying, sticking to the back of your throat like stagnant oil."
  exits:
    - direction: south
      roomId: "ossuary:7"
    - direction: up
      roomId: "ossuary:10"

- id: 9
  title: "The Mortuary Washroom"
  description: "Stone slabs with deep drainage grooves occupy the space. Heavy, rusted hooks hang from the ceiling, swaying slightly in a phantom breeze."
  coordinates: [-2, -2, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      slabs: "Massive blocks of cold granite. The drainage grooves are stained a dark, permanent rust color."
      hooks: "Large, meat-handling hooks. They never seem to stay perfectly still."
      grooves: "Expertly carved channels. They are currently choked with hair and bits of leathery skin."
  npcs:
    - id: "ossuary:ghoul"
      respawnChance: 0.6
  exits:
    - direction: north
      roomId: "ossuary:7"

- id: 10
  title: "The Ashen Balcony"
  description: "A high vantage point overlooking the silent cloisters below. A massive, cracked bronze bell sits silent in the corner, its surface covered in verdigris."
  coordinates: [-2, 0, -1]
  metadata:
    is_dark: true
    bell_repaired: false
    runes_silenced: true
    extra_descriptions:
      bell: "The massive instrument is cold and dead. A jagged crack runs from the rim to the crown, and the interior is etched with <magenta>runes of silencing</magenta> that seem to absorb all vibration."
      runes: "Twisted, light-drinking sigils. They feel oily to the touch. A student of <yellow>spellcraft</yellow> or <yellow>religion</yellow> might know how to break them."
      crack: "The fissure is wide. It would need to be filled with a <yellow>conductive metal</yellow> or <yellow>alchemical resin</yellow> to ring true again."
      verdigris: "The green patina of ages. Beneath it, the bronze is etched with the image of a saint being deafened by a golden hammer."
  exits:
    - direction: down
      roomId: "ossuary:8"
    - direction: west
      roomId: "ossuary:15"
      
- id: 11
  title: "The Trapped Confessional"
  description: "An intact wooden booth stands in a freezing, silent room. Rhythmic, frantic scratching echoes from within the dark slats of the confessional."
  coordinates: [-3, -1, -2]
  metadata:
    is_dark: true
    is_silent: true # Blocks 'say' and 'yell'
    extra_descriptions:
      booth: "The wood is ancient cedar, blackened by age. The door is jammed shut from the outside by a heavy iron bar."
      slats: "Thin openings designed for anonymity. You can see a pale, flickering light moving behind them."
      bar: "A simple iron lever. It can be <yellow>lifted</yellow> to open the booth."
  npcs:
    - id: "ossuary:npc_trapped_ghost_martha"
      respawnChance: 100
  exits:
    - direction: east
      roomId: "ossuary:7"
    - direction: west
      roomId: "ossuary:12"

- id: 12
  title: "The Collapsed Ossuary Wall"
  description: "The corridor has partially caved in here, leaving a treacherous path through piles of stone rubble and yellowed, ancient femurs. The ceiling groans under the weight of the earth above."
  coordinates: [-4, -1, -2]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    extra_descriptions:
      rubble: "A massive mound of masonry and bone. You could try to <yellow>heave</yellow> the heavy stones aside or <yellow>scramble</yellow> over the top of the pile."
      femurs: "Thousands of leg bones, brittle and slick with dust. They offer no stable footing."
      ceiling: "Cracked granite slabs hanging by a thread of ancient mortar."
  exits:
    - direction: east
      roomId: "ossuary:11"
    - direction: south
      roomId: "ossuary:13"
    - direction: north
      roomId: "ossuary:14"

- id: 13
  title: "The Priest's Pantry"
  description: "What was once a mundane storage room is now a tomb of rot. Petrified sacks of grain sit like slumped corpses against the walls, while rotted barrels leak a thick, black ichor into the cracks of the floor."
  coordinates: [-4, -2, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      nest: "A repulsive mound of shredded liturgical vestments, gnawed bone, and dried moss. Something metallic glints deep within the filth."
      sacks: "Hardened by time and damp, these sacks are filled with what was once flour or grain. One has a jagged hole gnawed into the side."
      barrels: "The wood is soft and pulpy. The black ichor leaking from them is nauseatingly sweet, attracting a swarm of small, biting insects."
      ichor: "A sticky, viscous fluid. It looks highly flammable, or perhaps useful as a base for a <yellow>poison</yellow>."
      grain: "Spilled across the floor, the grain is covered in a grey, fuzzy mold that seems to pulse faintly."
      mold: "A patch of <yellow>pulsing grey mold</yellow> clings to the northern wall. It expands and contracts with a rhythmic, wet sound, as if breathing."
      insects: "A swarm of <yellow>fat, translucent beetles</yellow> crawls over the rotted grain. They seem attracted to the black ichor."
      rat: "The dire rat has carved a nest out of shredded burlap and bone fragments."
  npcs:
    - id: "ossuary:dire_rat"
      respawnChance: 0.7
  exits:
    - direction: north
      roomId: "ossuary:12"

- id: 14
  title: "The Secret Vault"
  description: "A square, windowless chamber reached only by a tight crawlspace through the rubble. In the center of the dust-free floor sits a heavy, iron-bound chest, its massive bolts appearing untarnished by the passage of time."
  coordinates: [-4, 0, -2]
  metadata:
    is_dark: true
    is_secure: true
    is_locked: true
    extra_descriptions:
      chest: "Crafted from blackened ironwood and reinforced with silver-etched steel. There is no traditional keyhole, only a circular indentation on the lid and a series of faint, pulsing crystalline veins."
      bolts: "They aren't just fasteners; they are inscribed with tiny abjuration runes. They look remarkably resistant to tools."
      veins: "These faint blue lines respond to mental presence. A <yellow>psionic</yellow> or <yellow>magic</yellow> user might be able to 'attune' to them."
      indentation: "Exactly the size of a <yellow>signet ring</yellow>."
  items:
    - id: "ossuary:vault_chest"
  exits:
    - direction: south
      roomId: "ossuary:12"

- id: 15
  title: "The Western Terminus"
  description: "A smooth stone wall marks the abrupt end of the corridor. Intricate carvings depict the start of a great journey, showing pilgrims setting out under a twin-mooned sky. The eyes of the pilgrims seem to follow you with unnerving precision."
  coordinates: [-3, 0, -1]
  metadata:
    is_dark: true
    has_secret_nearby: true
    extra_descriptions:
      wall: "The masonry here is perfect, almost too perfect. No mortar lines are visible, suggesting the stone was shaped by magic or extreme heat."
      carvings: "The pilgrims are depicted carrying lanterns and staves. Their journey looks somber, and one specific figure at the edge of the scene holds a jagged violet crystal."
      eyes: "Small dark gems serve as eyes for the pilgrims. They seem to catch any stray light in the room."
      journey: "A religious procession or an exodus. Without a scholar's eye, its name and purpose are lost to time."
  exits:
    - direction: east
      roomId: "ossuary:10"
    - direction: south
      roomId: "ossuary:7"

- id: 16
  title: "The Echoing Corridor"
  description: "The walls here are polished obsidian, reflecting your light source in distorted, violet-tinted shapes. Every sound you make—a footfall, a breath, a whisper—echoes three distinct times, each repetition sounding more mocking and distorted than the last."
  coordinates: [1, -1, -2]
  metadata:
    is_dark: true
    is_wild_magic: true
    extra_descriptions:
      walls: "The obsidian is so smooth it feels like frozen liquid. Your reflection within looks gaunt, its eyes hollow and hungry."
      reflections: "They don't move quite in sync with you. There is a perceptible delay, as if the glass were contemplating its own version of your actions."
      violet: "The tint is unnatural, pulsing faintly with the heartbeat of the Ossuary."
  exits:
    - direction: west
      roomId: "ossuary:3"
    - direction: east
      roomId: "ossuary:17"

- id: 17
  title: "The Chamber of Muted Prayers"
  description: "Beyond a heavy, lead-lined door lies a room of absolute sound-death. No echo exists here; the silence is a physical pressure against your eardrums. A glowing crystal sphere rests atop a waist-high stone pedestal, pulsing with a faint, rhythmic light."
  coordinates: [2, -1, -2]
  metadata:
    is_dark: true
    is_silent: true
    extra_descriptions:
      sphere: "A perfect orb of milky quartz. It pulses with a soft white light that seems to push back the oppressive silence."
      pedestal: "A simple pillar of grey granite. Its surface is worn smooth, as if by the touch of thousands of hands."
      door: "The door is faced with heavy sheets of lead, designed to seal sound within... or without."
  items:
    - id: "ossuary:crystal_sphere" # The player might try to take this
  npcs:
    - id: "ossuary:monstrous_spider_small"
      respawnChance: 0.6
  exits:
    - direction: west
      roomId: "ossuary:16"
    - direction: north
      roomId: "ossuary:18"
    - direction: south
      roomId: "ossuary:19"

- id: 18
  title: "The Librarian’s Nook"
  description: "Floating scrolls drift lazily in magical currents like schools of paper fish. A heavy oak desk sits in the corner, almost entirely buried under mountains of melted black wax and half-burnt candles."
  coordinates: [2, 0, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      scrolls: "Hundreds of vellum fragments. They are protected by a faint, static hum that makes your hair stand on end."
      desk: "The wood is groaning under the weight of centuries of candle drippings. Something appears to be <yellow>embedded</yellow> deep within the wax."
      wax: "Layers of black and violet wax. It is hard as stone in some places, but still tacky in others."
      currents: "The air here moves in a predictable spiral, keeping the scrolls in a slow, eternal dance."
  exits:
    - direction: south
      roomId: "ossuary:17"

- id: 19
  title: "The Hall of Mirrors"
  description: "The walls are composed of tarnished, silvered glass. As you move through the room, your reflections linger in the mirrors after you have passed, their faces distorting into grimaces of agony before vanishing."
  coordinates: [2, -2, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      mirrors: "The silver backing is peeling away in long, vertical strips. Behind the tarnish, you see a version of this room that looks much older—and much bloodier."
      reflections: "They move with a sluggish, liquid grace. One of them is currently watching you from behind a layer of heavy grime."
      tarnish: "A thick, greasy residue covers the glass. It looks like it could be <yellow>cleaned</yellow> with a bit of effort."
  exits:
    - direction: north
      roomId: "ossuary:17"
    - direction: east
      roomId: "ossuary:20"

- id: 20
  title: "The Resonance Chamber"
  description: "Five man-sized bronze tuning forks are arranged in a perfect circle. The eastern wall is not stone, but a solid plate of seamless bronze that vibrates with a low, sub-harmonic frequency when approached."
  coordinates: [3, -2, -2]
  metadata:
    is_dark: true
    is_puzzle_room: true
    forks_aligned: 0
    extra_descriptions:
      forks: "Each fork is ten feet tall and capped with silver. They are dull and out of alignment; some need to be <yellow>struck</yellow> or <yellow>turned</yellow>."
      wall: "A massive bronze sheet. It acts as a gateway, but only for a specific frequency."
      plate: "The surface is etched with a single, giant rune for 'Unison'."
  exits:
    - direction: west
      roomId: "ossuary:19"
    - direction: east
      roomId: "ossuary:21"
      
- id: 21
  title: "The Golem's Alcove"
  description: "A tight alcove barely large enough to stand in. A dormant stone armored guardian stands motionless against the back wall, its surface etched with deep, lightless runes. The air here feels 'thin' and empty, as if the very weave of reality has been pulled taut."
  coordinates: [4, -2, -2]
  metadata:
    is_dark: true
    is_anti_magic: true
    extra_descriptions:
      guardian: "A six-foot-tall construct of interlocking basalt plates. It has no eyes, only a smooth helm. It holds a massive stone flail across its chest."
      runes: "Unlike the glowing runes found elsewhere, these are cold and inert, appearing to 'drink' any magical light that approaches them."
      field: "The anti-magic field is palpable; it makes your skin crawl and dampens the hum of the Ossuary."
  exits:
    - direction: west
      roomId: "ossuary:20"
    - direction: north
      roomId: "ossuary:22"
    - direction: south
      roomId: "ossuary:23"

- id: 22
  title: "The Vermin Nest"
  description: "The floor and walls are covered in thick, sticky webbing that impedes movement. Large, wrapped cocoons hang ominously from the rafters above."
  coordinates: [4, -1, -2]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    extra_descriptions:
      webbing: "The silk is strong and coated in a caustic enzyme. It clings to cloth and skin with equal tenacity."
      cocoons: "Some are small (rats), but one in the corner is human-sized. It twitching slightly."
  npcs:
    - id: "ossuary:monstrous_spider_medium"
  exits:
    - direction: south
      roomId: "ossuary:21"

- id: 23
  title: "The Trapped Altar"
  description: "A hollowed stone altar is the source of an eternal, magical flame that casts harsh shadows. Visible abjuration runes glow softly on the floor around it."
  coordinates: [4, -3, -2]
  metadata:
    is_dark: false # The flame provides light
    has_positive_energy: true
    extra_descriptions:
      flame: "A pillar of white-hot fire that produces no smoke. It feels soothing rather than burning."
      altar: "Carved with scenes of healing. A shallow depression sits at the base of the flame, perfect for an <yellow>offering</yellow>."
      runes: "Protection wards. They feel warm and push back the 'thin' air of the Golem's alcove."
  exits:
    - direction: north
      roomId: "ossuary:21"
    - direction: east
      roomId: "ossuary:24"

- id: 24
  title: "The Shaman’s Sanctuary"
  description: "A dark shrine constructed of bone and dried blood. A ragged goblin shaman hunches over a bubbling, foul-smelling cauldron, his eyes reflecting the erratic violet flickers of the wild magic in the air."
  coordinates: [5, -3, -2]
  metadata:
    is_dark: true
    is_wild_magic: true
    extra_descriptions:
      cauldron: "A rusted iron pot filled with a thick, translucent green sludge. It smells of swamp gas and old copper."
      shrine: "A stack of skulls—some human, some not—arranged in a geometric pattern that hurts to look at for too long."
      shaman: "Covered in ritual tattoos and carrying a staff topped with a dire rat's skull. He seems more interested in his brew than your presence."
  npcs:
    - id: "ossuary:goblin_shaman"
      respawnChance: 1
  exits:
    - direction: west
      roomId: "ossuary:23"
    - direction: east
      roomId: "ossuary:25"

- id: 25
  title: "Eastern Loop Connector"
  description: "A short hallway made with surprisingly smooth masonry, contrasting with the jagged stone of the caves. A heavy, locked iron gate blocks progress to the south, its bars pulsing with a faint, rhythmic thrum."
  coordinates: [6, -3, -2]
  metadata:
    is_dark: true
    extra_descriptions:
      masonry: "The stones are perfectly rectangular and fit together without a visible seam. It looks like the work of the 'Silent Ones' rather than the goblins."
      gate: "Crafted from blackened iron and cold to the touch. The lock is a complex mechanical device fused into the stone wall."
      lock: "A deep, square keyhole. It looks like it requires a <yellow>heavy iron key</yellow> to turn."
  exits:
    - direction: west
      roomId: "ossuary:24"
    - direction: south
      roomId: "ossuary:36"
      door:
        id: "ossuary:gate_loop_east" # Unique ID for the door
        name: "heavy iron gate"
        locked: true
        closed: true
        key: "ossuary:iron_gate_key" # References the item ID in items.yml

- id: 26
  title: "The Inclined Descent"
  description: "A steep, treacherous slope drops sharply into darkness. The stone underfoot is polished smooth by centuries of pilgrims sliding or crawling their way downward. Thin rivulets of moisture run along the incline, making every step a gamble. Recesses carved into the walls hold the bleached bones of acolytes who never completed their descent—some arranged reverently, others scattered as if they slid violently to their end."
  coordinates: [0, -2, -2]
  metadata:
    is_dark: true
    is_difficult_terrain: true
  exits:
    - direction: north
      roomId: "ossuary:3"
    - direction: down"
      roomId: "ossuary:27"

- id: 27
  title: "The Flooded Crypts"
  description: "Waist‑deep black water fills the chamber, cold enough to numb the legs within moments. Stone sarcophagi drift lazily like ghost ships, bumping into one another with hollow, echoing knocks. Something unseen stirs beneath the surface, sending ripples across the stagnant pool. The air smells of mildew, rot, and old stone—an underwater graveyard forgotten by time."
  coordinates: [0, -2, -3]
  metadata:
    is_dark: true
    is_water: true
    is_difficult_terrain: true
  npcs:
    - id: "ossuary:dire_rat"
      respawnChance: 0.7
  exits:
    - direction: up
      roomId: "ossuary:26"
    - direction: south
      roomId: "ossuary:28"
    - direction: east
      roomId: "ossuary:29"

- id: 28
  title: "The Weeping Archway"
  description: "A stone archway perpetually drips with cold, mineral‑rich water that patters softly into the shallow pool below. Gravelight fungus clings to the stone in faintly glowing patches, casting a sickly blue‑green light across the chamber. The air is thick with humidity and the metallic tang of rust. Every drip echoes like a distant sob."
  coordinates: [0, -3, -3]
  metadata:
    is_dark: true
    is_water: true
  npcs:
    - id: "ossuary:zombie_human"
      respawnChance: 0.5
  exits:
    - direction: north
      roomId: "ossuary:27"
    - direction: south
      roomId: "ossuary:31"

- id: 29
  title: "The Ossuary Drain"
  description: "The murky water flows steadily toward a massive iron grate set into the eastern wall, its bars thick with mineral buildup. The current tugs gently at your legs, urging you toward the drain. Bronze plaques line the western wall, each etched with the names of the departed—some polished by reverent hands, others tarnished and forgotten. A faint sucking sound emanates from the grate, as if the crypt itself were breathing."
  coordinates: [1, -2, -3]
  metadata:
    is_dark: true
    is_water: true
  exits:
    - direction: west
      roomId: "ossuary:27"
    - direction: east
      roomId: "ossuary:30"

- id: 30
  title: "The Chamber of Drowned Hopes"
  description: "A dead‑end chamber where the water deepens ominously. A raised stone dais rises above the flood, supporting a single ornate sarcophagus carved with scenes of drowning pilgrims being “reborn” in the depths. The air is unnaturally cold, and a faint negative pressure seems to pull at your breath. Shadows cling to the corners, refusing to disperse even under magical light."
  coordinates: [2, -2, -3]
  metadata:
    is_dark: true
    is_water: true
    has_negative_energy: true
  npcs:
    - id: "ossuary:wight"
      respawnChance: 1
  exits:
    - direction: west
      roomId: "ossuary:29"
- id: 31
  title: "The Chasm of the Unhallowed"
  description: "The crypt opens into a vast natural cavern split by a roaring underground river far below. A narrow stone bridge—slick with spray and mineral deposits—spans the chasm. The drop is dizzying; the sound of the river is a constant thunder. Strange runes carved into the cavern walls pulse faintly, reacting to the moisture in the air."
  coordinates: [0, -4, -3]
  metadata:
    is_dark: true
    has_water: true
    is_difficult_terrain: true
  exits:
    - direction: north
      roomId: "ossuary:28"
    - direction: south
      roomId: "ossuary:32"

- id: 32
  title: "The Riverside Landing"
  description: "A small, relatively stable landing carved into the southern side of the chasm. Abandoned mining tools lie rusted and tangled in heaps, their wooden handles long since rotted away. Coils of rope crumble at the slightest touch. The air is damp and cold, carrying the distant roar of the river. Something skitters among the debris."
  coordinates: [0, -5, -3]
  metadata:
    is_dark: true
  npcs:
    - id: "ossuary:giant_centipede"
      respawnChance: 0.6
  exits:
    - direction: north
      roomId: "ossuary:31"
    - direction: east
      roomId: "ossuary:33"

- id: 33
  title: "The Moldy Crypt"
  description: "A claustrophobic chamber packed with stacked stone crypts reaching nearly to the ceiling. Every surface is coated in a thick carpet of fuzzy grey mold that releases a fine mist of spores when disturbed. The air is chokingly thick, irritating the throat and stinging the eyes. Shapes move beneath the mold, as if something is slowly growing—or breathing—within it."
  coordinates: [1, -5, -3]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    has_spores: true
  exits:
    - direction: west
      roomId: "ossuary:32"
    - direction: east
      roomId: "ossuary:34"

- id: 34
  title: "The Guardian's Post"
  description: "An ancient guard station frozen in time. A petrified skeleton sits slumped in a massive stone chair, still clad in fragments of rusted mail. Its eyeless sockets stare eternally toward the eastern door. Dust and cobwebs cling to the armor, yet the posture is rigid, as though the guardian might rise at any moment to resume its watch."
  coordinates: [2, -5, -3]
  metadata:
    is_dark: true
  exits:
    - direction: west
      roomId: "ossuary:33"
    - direction: east
      roomId: "ossuary:35"

- id: 35
  title: "The Catacomb Exit Loop"
  description: "The rough-hewn stone gives way to a smoother, more deliberate masonry. The passage slopes gently upward, and the oppressive chill of the lower crypts begins to fade. A faint warmth radiates from the stone itself, carrying with it the scent of cleaner air—an encouraging sign that the catacombs may soon give way to safer ground."
  coordinates: [3, -5, -3]
  metadata:
    is_stable: true
  exits:
    - direction: west
      roomId: "ossuary:34"
    - direction: north
      roomId: "ossuary:36"

- id: 36
  title: "The Great Crossing"
  description: >
    A vast circular hall opens before you, its polished marble floor depicting a
    radiant saint holding a golden lantern aloft. The mosaic’s tiles shimmer faintly,
    as though lit from within. The domed ceiling above is perfectly intact, catching
    and amplifying even the faintest light into a warm, steady glow. The air here
    feels lighter—almost buoyant—and the oppressive weight of the lower crypts
    seems to fall away the moment you step inside.
  coordinates: [3, -4, -3]
  metadata:
    is_hub: true
    has_positive_energy: true
    extra_descriptions:
      floor: "The polished marble floor is inlaid with a detailed mosaic of a saint holding a golden lantern aloft."
      mosaic: "Tiny tiles of gold, white, and deep blue form the image of a serene saint, lantern raised in blessing."
      saint: "The saint’s face is calm and compassionate, eyes cast downward as if watching over weary travelers."
      lantern: "The golden lantern in the mosaic seems to glow faintly, its light reflected in the polished stone."
      dome: "The domed ceiling is flawless, its curvature catching and amplifying every glimmer of light."
      ceiling: "The ceiling’s smooth stone surface reflects the hall’s gentle radiance like a muted mirror."
      light: "The light here is soft and steady, with no visible source beyond the sanctified architecture itself."
  exits:
    - direction: north
      roomId: "ossuary:5"
    - direction: west
      roomId: "ossuary:25"
    - direction: south
      roomId: "ossuary:37"
    - direction: east
      roomId: "ossuary:35"

- id: 37
  title: "The Hall of Statues"
  description: >
    A solemn procession of limestone knights lines the hall, each carved with
    immaculate detail. Their visors are lowered, hands resting on stone pommels,
    as though guarding a sacred passage. The air is unnaturally still, muffling
    every footstep into near silence. A faint trace of sandalwood incense lingers,
    as if the statues themselves remember ancient rituals performed here.
  coordinates: [3, -5, -3]
  metadata:
    is_stable: true
    is_silent: true
    extra_descriptions:
      statues: "Life-sized limestone knights stand in a row, each one frozen mid-vigil with visor lowered."
      knight: "The nearest knight’s armor is rendered in careful detail, every rivet and plate chiseled into stone."
      knights: "Each knight is slightly different, as if modeled after real individuals rather than idealized forms."
      visor: "The visors are all lowered, hiding whatever expressions the sculptor might have carved beneath."
      pommel: "Stone hands rest on the pommels of stone swords, a gesture of eternal readiness."
      incense: "A faint sandalwood scent lingers in the air, ghostly and comforting."
      silence: "The silence here is so deep it seems to swallow sound before it can fully form."
  exits:
    - direction: north
      roomId: "ossuary:36"
    - direction: south
      roomId: "ossuary:38"
    - direction: south_secret
      roomId: "ossuary:41"

- id: 38
  title: "The Chamber of the Golden Censer"
  description: >
    A massive golden censer hangs from a long chain in the center of the chamber,
    swaying gently despite the still air. Thick, sweet-smelling smoke drifts from
    its vents, curling in luminous ribbons that cling to your skin with a soothing
    warmth. The floor beneath the haze is cracked and uneven, forcing careful
    footing as the incense clouds obscure the ground.
  coordinates: [3, -6, -3]
  metadata:
    has_positive_energy: true
    is_difficult_terrain: true
    extra_descriptions:
      censer: "The golden censer is intricately worked with scenes of pilgrims and saints, its surface warm to the touch."
      chain: "A heavy iron chain suspends the censer from the ceiling, links worn smooth by centuries of motion."
      smoke: "Thick, sweet-smelling smoke pours from the censer, glowing faintly as it curls around you."
      incense: "The incense smells of honey, myrrh, and something bright and clean that clears your thoughts."
      floor: "The stone floor is cracked and uneven, hidden in places beneath the drifting smoke."
      cracks: "Jagged cracks spiderweb across the floor, hinting at old structural damage beneath the sanctity."
  npcs:
    - id: "ossuary:hell_hound"
      respawnChance: 0.3
  exits:
    - direction: north
      roomId: "ossuary:37"
    - direction: east
      roomId: "ossuary:39"
    - direction: west
      roomId: "ossuary:40"

- id: 39
  title: "The Tithe Collection Room"
  description: >
    Once a chamber of humble offerings, the room is now a graveyard of greed.
    Rusted lockboxes lie pried open and overturned, their contents long since
    plundered. Splintered chests and shattered donation bowls litter the floor.
    The darkness here feels thick and watchful, as though something unseen
    slithers between the broken containers.
  coordinates: [4, -6, -3]
  metadata:
    is_dark: true
    extra_descriptions:
      lockboxes: "Heavy iron lockboxes lie on their sides, lids twisted open by force rather than keys."
      lockbox: "This particular lockbox bears the faint engraving of a lantern and a pair of open hands."
      chests: "Wooden chests lie splintered, their iron bands bent and torn away."
      chest: "The nearest chest is split down the middle, its interior scraped clean of anything valuable."
      bowls: "Ceramic donation bowls lie shattered, their fragments scattered like broken teeth."
      darkness: "The shadows here seem to cling to the corners, reluctant to yield their secrets."
  npcs:
    - id: "ossuary:shadow"
      respawnChance: 0.5
  exits:
    - direction: west
      roomId: "ossuary:38"

- id: 40
  title: "The Armory of the Faithful"
  description: >
    Racks of decayed leather and corroded iron weapons line the walls, their
    former glory reduced to brittle remnants. Dust blankets everything except
    a detailed map etched directly into the northern wall—its lines sharp and
    deliberate, untouched by time. The faint outline of a “Secret Vault” is
    marked near a collapsed section of the ossuary.
  coordinates: [2, -6, -3]
  metadata:
    is_stable: true
    extra_descriptions:
      racks: "Empty weapon racks lean against the walls, their pegs stained where blades once rested."
      weapons: "Most of the weapons are little more than rusted shapes, their edges long since eaten away."
      leather: "The leather armor has rotted into stiff, cracked sheets that crumble at a touch."
      dust: "A thick layer of dust covers everything, except the map on the northern wall."
      map: "The etched map shows the catacombs in careful detail, with a ‘Secret Vault’ marked near a collapsed wall."
      etching: "The etching is sharp and deliberate, as if carved by a steady, practiced hand."
      vault: "The ‘Secret Vault’ marking suggests hidden wealth or relics, waiting beyond a fallen barrier."
  exits:
    - direction: east
      roomId: "ossuary:38"

- id: 41
  title: "The Hall of Asceticism"
  description: >
    A narrow, punishing corridor stretches ahead, its walls bristling with rusted
    spikes that glisten with a dark, oily residue. The air is thin and vibrates
    with a low, rhythmic chanting that seems to emanate from the stone itself.
    Each step feels like a test of endurance, as though the hall judges your
    resolve with every breath.
  coordinates: [3, -6, -3]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    extra_descriptions:
      spikes: "Rusted iron spikes jut from the walls at irregular intervals, their tips stained a dark, oily color."
      walls: "The stone walls are pitted and scarred, as if many have brushed too close to the spikes."
      residue: "The oily residue on the spikes smells faintly metallic and wrong, like old blood and poison."
      chanting: "A low, rhythmic chant thrums through the stone, just below the threshold of understanding."
      air: "The air is thin and dry, making each breath feel like a small act of will."
  exits:
    - direction: north
      roomId: "ossuary:37"
    - direction: south
      roomId: "ossuary:42"

- id: 42
  title: "The Chamber of the Blasphemous Altar"
  description: >
    Fresh black blood is smeared across the floor in spiraling, profane patterns.
    At the chamber’s center rises an altar constructed entirely of fused human
    skulls, their empty sockets glowing faintly with a sickly red light. Above it,
    a swirling crimson portal pulses with necrotic heat, warping the air around
    it like a living wound in reality.
  coordinates: [3, -7, -3]
  metadata:
    is_dark: true
    has_negative_energy: true
    extra_descriptions:
      blood: "The black blood is still tacky, arranged in spirals and sigils that hurt to look at too long."
      patterns: "The profane patterns twist in on themselves, forming symbols that seem to shift when not directly observed."
      altar: "The altar is a grotesque construction of fused skulls, each one locked in a silent scream."
      skulls: "The skulls are fused together seamlessly, as if melted into a single blasphemous mass."
      portal: "The crimson portal churns like liquid fire, radiating a suffocating necrotic heat."
      heat: "The heat from the portal is not physical alone—it presses against your thoughts and memories."
  npcs:
    - id: "ossuary:skeleton_human"
      respawnChance: 0.8
  exits:
    - direction: north
      roomId: "ossuary:41"
    - direction: south
      roomId: "ossuary:43"

- id: 43
  title: "The Bone Pit"
  description: >
    A cavernous hollow where the floor is composed entirely of loose, shifting
    bones. Each step sends brittle remains sliding and rattling beneath your feet,
    threatening to swallow your legs with every misstep. The air is dry and
    powdery, filled with the faint scent of ancient marrow.
  coordinates: [3, -8, -3]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    extra_descriptions:
      bones: "Countless bones—ribs, femurs, skull fragments—shift and clatter with every movement."
      floor: "There is no solid floor, only a deep layer of loose, treacherous remains."
      marrow: "A faint, chalky smell of old marrow hangs in the air, dry and unsettling."
      cavern: "The cavern walls rise steeply, their surfaces stained with the dust of long-decayed bodies."
  npcs:
    - id: "ossuary:bone_rat_swarm"
      respawnChance: 1
  exits:
    - direction: north
      roomId: "ossuary:42"
    - direction: east
      roomId: "ossuary:44"
    - direction: west
      roomId: "ossuary:45"

- id: 44
  title: "The Crypt of the Arch-Priest"
  description: >
    A pristine marble sarcophagus rests upon a raised platform, untouched by the
    decay that plagues the rest of the ossuary. A soft, holy radiance fills the
    chamber, repelling the surrounding darkness. A simple silver goblet sits atop
    the sarcophagus lid, gleaming with quiet reverence. The air hums with a gentle,
    protective force that dampens all arcane energies.
  coordinates: [4, -8, -3]
  metadata:
    is_dark: true
    has_positive_energy: true
    is_anti_magic_field: true
    extra_descriptions:
      sarcophagus: "The marble sarcophagus is flawless, its surface etched with scenes of blessing and pilgrimage."
      lid: "The lid bears the image of a robed figure at rest, hands folded over a stone lantern."
      goblet: "The silver goblet is polished to a mirror sheen, untouched by tarnish or dust."
      radiance: "A soft, holy glow suffuses the room, pushing back the shadows without a visible source."
      air: "The air feels calm and safe, but any attempt to summon magic seems to falter here."
  exits:
    - direction: west
      roomId: "ossuary:43"

- id: 45
  title: "The Final Ascent"
  description: >
    A spiraling staircase of polished black stone climbs upward, its steps worn
    smooth by centuries of pilgrims. Iron sconces line the walls, each holding a
    torch that burns with an eerie blue flame. The shadows cast by the unnatural
    fire dance and twist along the walls, moving with a life of their own.
  coordinates: [2, -8, -3]
  metadata:
    is_dark: true
    extra_descriptions:
      stairs: "The black stone steps spiral upward, their edges rounded by countless feet."
      staircase: "The staircase coils like a serpent, vanishing into the darkness above."
      sconces: "Iron sconces jut from the walls, their surfaces pitted with rust."
      torches: "Each torch burns with a steady blue flame that gives off little heat."
      flame: "The blue fire flickers in strange patterns, casting long, twitching shadows."
      shadows: "The shadows seem to move just out of sync with the flames, as if dancing to a different rhythm."
  exits:
    - direction: east
      roomId: "ossuary:43"
    - direction: up
      roomId: "ossuary:46"

- id: 46
  title: "The Threshold of Despair"
  description: >
    A wide landing opens into a chamber where the stone floor is fractured with
    glowing fissures. Through the cracks, molten rock casts a harsh orange light
    that flickers across the walls. Waves of suffocating heat rise from below,
    distorting the air and making every breath feel heavy and labored.
  coordinates: [2, -8, -2]
  metadata:
    is_dark: true
    has_lava: true
    extra_descriptions:
      fissures: "Jagged fissures split the stone, their depths glowing with molten rock."
      lava: "Far below, molten rock churns and bubbles, radiating a brutal, suffocating heat."
      heat: "The heat presses against your skin and lungs, making sweat bead instantly."
      walls: "The walls are scorched and cracked, stained with soot and mineral deposits."
      floor: "The floor is treacherous, its fractured surface forcing careful, deliberate steps."
  npcs:
    - id: "ossuary:mephit_fire"
      respawnChance: 0.4
  exits:
    - direction: down
      roomId: "ossuary:45"
    - direction: south
      roomId: "ossuary:47"

- id: 47
  title: "The Hall of Judgment"
  description: >
    A long gallery lined with high-backed stone chairs, each occupied by a
    translucent figure. The spectral council leans toward one another, their
    forms flickering like candle flames as they whisper silent judgments.
    The air crackles with unstable magic, warping sound and light in subtle,
    disorienting ways.
  coordinates: [2, -9, -2]
  metadata:
    is_wild_magic: true
    extra_descriptions:
      chairs: "High-backed stone chairs form two facing rows, like a tribunal frozen in session."
      council: "The spectral council members are robed and severe, their faces blurred by flickering light."
      specters: "Each specter seems half-present, as if they exist more in memory than in flesh or spirit."
      magic: "The air shimmers with unstable magic, bending light and sound in unsettling ways."
      judgments: "Though you cannot hear their words, you feel weighed and measured by their silent debate."
  npcs:
    - id: "ossuary:npc_spectral_judge"
      respawnChance: 100
  exits:
    - direction: north
      roomId: "ossuary:46"
    - direction: south
      roomId: "ossuary:48"

- id: 48
  title: "The Vestibule of Thorns"
  description: >
    The corridor is choked with pulsing Abyssal briars, their razor-sharp thorns
    glistening with a dark, rhythmic heartbeat. The vines twitch subtly as you
    approach, as though sensing your presence. The air is thick with negative
    energy, making your skin crawl with each step.
  coordinates: [2, -10, -2]
  metadata:
    is_dark: true
    is_difficult_terrain: true
    has_negative_energy: true
    extra_descriptions:
      briars: "Thick, black vines coil across the passage, their surfaces slick and pulsing with inner life."
      thorns: "The thorns are long and glassy, each one tipped with a bead of dark, viscous fluid."
      vines: "The vines twitch and flex in slow, unsettling rhythms, as if tasting the air."
      heartbeat: "A faint, rhythmic thrum pulses through the briars, echoing like a distant heartbeat."
      air: "The air feels heavy and hostile, prickling against your skin with unseen malice."
  npcs:
    - id: "ossuary:skeleton_human"
      respawnChance: 1
  exits:
    - direction: north
      roomId: "ossuary:47"
    - direction: south
      roomId: "ossuary:49"

- id: 49
  title: "The Sanctum of the Fallen"
  description: >
    A vast cathedral chamber opens before you. At its far end, a jagged spire of
    obsidian rises from the floor, crowned by a throne of fused dragon-bone. A
    fallen figure sits motionless upon it, shrouded in a mantle of shadow and
    flickering wild magic. The air hums with power—both divine and corrupted.
  coordinates: [2, -11, -2]
  metadata:
    is_dark: true
    has_negative_energy: true
    is_wild_magic: true
    extra_descriptions:
      spire: "The obsidian spire thrusts upward like a black fang, its surface polished to a mirror sheen."
      throne: "The throne is made of fused dragon-bone, its curves and spikes forming a cruel, regal silhouette."
      bones: "The dragon-bones are massive, their surfaces etched with faint, burned-in sigils."
      figure: "The fallen figure sits slumped yet imposing, wrapped in a cloak of shadow and crackling magic."
      mantle: "The mantle of shadow around the figure shifts and writhes, never settling into a fixed shape."
      power: "The air vibrates with conflicting forces—blessing and blight locked in uneasy balance."
  npcs:
    - id: "ossuary:fallen_saint_valerius"
      respawnChance: 1
  exits:
    - direction: north
      roomId: "ossuary:48"
    - direction: south
      roomId: "ossuary:50"

- id: 50
  title: "The Portal of Ascension"
  description: >
    Behind the bone throne lies a tranquil pool of shimmering silver light. The
    air here is cool and sweet, a stark contrast to the sulfurous depths behind
    you. The pool’s surface ripples gently, reflecting a world beyond this one,
    inviting and serene.
  coordinates: [2, -12, -2]
  metadata:
    has_positive_energy: true
    is_teleport_room: true
    extra_descriptions:
      pool: "The pool is perfectly still at its center, its edges rippling with soft, silver light."
      water: "The liquid looks like water but moves like liquid moonlight, cool and impossibly clean."
      light: "Silver light rises from the pool, painting the walls with soft, shifting reflections."
      air: "The air is crisp and sweet, carrying the faint scent of rain on stone."
      portal: "The pool feels less like a body of water and more like a doorway waiting to be stepped through."
  exits:
    - direction: north
      roomId: "ossuary:49"
    - direction: up
      roomId: "sigil:0"
