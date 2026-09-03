/* =====================================================================
   Zu-nique Pet Shop: species care data
   ---------------------------------------------------------------------
   One record per animal. care.html renders every card from this file, so
   adding a species means adding one object here and nothing else.

   Fields
     id         unique slug, used for the card link (care.html#ball-python)
     group      aquatics | reptiles | amphibians | birds | mammals | inverts
     name       common name
     sci        scientific name, printed in italics
     level      Beginner | Intermediate | Advanced | Specialist
     size       adult size
     life       typical lifespan in captivity
     home       minimum housing for one adult
     temp       temperatures, including gradient and night drop
     env        humidity for terrestrial species, water chemistry for aquatics
     light      UVB or lighting requirement
     substrate  substrate, bedding or decor
     diet       what it actually eats
     health     what to watch for, and when to call a vet
     notes      the things people get wrong, in plain words
     permit     optional: paperwork that applies in South Africa
     img        optional photo path, e.g. "/assets/images/stock/beardie.jpg"
     wiki       Wikipedia article title, used for the background link

   Reptile temperature, humidity and UVB figures follow ReptiFiles, which
   publishes current research-based parameters. Invertebrate husbandry
   follows The Bio Dude and the keeper consensus on Arachnoboards.
   Everything here is a working range for a healthy captive animal, not a
   substitute for asking us about the individual you are taking home.
   ===================================================================== */

window.SPECIES = [

  /* ============================== AQUATICS ============================== */
  {
    id: "betta", group: "aquatics", name: "Siamese fighting fish", sci: "Betta splendens",
    level: "Beginner", size: "6 to 7 cm", life: "3 to 5 years",
    home: "20 L minimum with a lid, gentle filter flow, one male only",
    temp: "24 to 28 °C, heater needed through a Klerksdorp winter",
    env: "pH 6.5 to 7.5, soft to moderately hard, ammonia and nitrite at zero",
    light: "Standard aquarium light, 8 hours a day, dimmed or shaded planting",
    substrate: "Sand or fine gravel, silk or live plants, nothing sharp",
    diet: "Betta pellets as the staple, frozen bloodworm or daphnia twice a week",
    health: "Clamped fins, a swollen belly or listlessness usually trace back to cold water or ammonia. Test before you medicate.",
    notes: [
      "Males fight to the death. One male per tank, and no other long-finned fish.",
      "They breathe air at the surface, so never fill a tank right to a sealed lid.",
      "Long fins tear on plastic plants. Use silk or live planting.",
      "An unheated bowl is the usual reason a betta dies within months."
    ],
    img: "", wiki: "Betta splendens"
  },
  {
    id: "guppy", group: "aquatics", name: "Guppy", sci: "Poecilia reticulata",
    level: "Beginner", size: "3 to 6 cm", life: "2 to 3 years",
    home: "40 L, two or three females per male",
    temp: "22 to 28 °C",
    env: "pH 7.0 to 8.0, hard water suits them better than soft",
    light: "Standard aquarium light, 8 to 10 hours",
    substrate: "Gravel or sand with floating plants for fry cover",
    diet: "Quality flake or micro pellets, frozen brine shrimp as a treat",
    health: "Wasting and a clamped look often means internal parasites. Fin rot follows poor water.",
    notes: [
      "They breed constantly. Plan for fry, or keep males only.",
      "Soft acidic water is the most common cause of unexplained losses.",
      "Good first fish, but only in a tank that has finished cycling."
    ],
    img: "", wiki: "Guppy"
  },
  {
    id: "platy", group: "aquatics", name: "Platy", sci: "Xiphophorus maculatus",
    level: "Beginner", size: "5 to 6 cm", life: "3 to 4 years",
    home: "60 L community tank",
    temp: "20 to 26 °C",
    env: "pH 7.0 to 8.2, hard water",
    light: "Standard aquarium light, 8 hours",
    substrate: "Gravel or sand, planted edges",
    diet: "Flake, micro pellets, blanched vegetable matter",
    health: "Hardy. White spot after a temperature crash is the usual complaint.",
    notes: [
      "One of the hardiest starter fish we stock.",
      "Livebearers, so mixed groups will produce young.",
      "Peaceful enough for a community with tetras and corydoras."
    ],
    img: "", wiki: "Xiphophorus maculatus"
  },
  {
    id: "molly", group: "aquatics", name: "Molly", sci: "Poecilia sphenops",
    level: "Beginner", size: "8 to 12 cm", life: "3 to 5 years",
    home: "80 L, more for sailfin varieties",
    temp: "24 to 28 °C",
    env: "pH 7.5 to 8.2, hard water, some keepers add a little marine salt",
    light: "Bright enough to grow algae for them to graze",
    substrate: "Sand or gravel with robust plants",
    diet: "Vegetable-based flake, algae, blanched courgette",
    health: "Shimmying in place points at soft water or low minerals rather than disease.",
    notes: [
      "Bigger than people expect, and they need the swimming space.",
      "Sensitive to nitrate, so keep up with water changes.",
      "A vegetable-poor diet leads to constant digestive trouble."
    ],
    img: "", wiki: "Poecilia sphenops"
  },
  {
    id: "neon", group: "aquatics", name: "Neon tetra", sci: "Paracheirodon innesi",
    level: "Beginner", size: "3 to 4 cm", life: "3 to 5 years",
    home: "60 L with a shoal of eight or more",
    temp: "21 to 27 °C",
    env: "pH 5.5 to 7.0, soft water",
    light: "Dim to moderate, with floating cover",
    substrate: "Dark sand, planted, driftwood tannins welcome",
    diet: "Micro flake, crushed pellets, frozen daphnia",
    health: "Neon tetra disease shows as a fading patch along the flank. It has no cure, so remove affected fish.",
    notes: [
      "Never add them to a tank that has not finished cycling. They are first to die in new water.",
      "A group of three looks nervous. A group of ten looks like a shoal.",
      "Angelfish will eat them once the angels grow."
    ],
    img: "", wiki: "Neon tetra"
  },
  {
    id: "cardinal-tetra", group: "aquatics", name: "Cardinal tetra", sci: "Paracheirodon axelrodi",
    level: "Intermediate", size: "4 to 5 cm", life: "4 to 5 years",
    home: "80 L with a shoal of ten or more",
    temp: "24 to 28 °C, warmer than neons",
    env: "pH 5.0 to 6.8, soft acidic blackwater",
    light: "Dim, with floating plants",
    substrate: "Dark sand, leaf litter, driftwood",
    diet: "Micro pellets, frozen daphnia and bloodworm",
    health: "Sensitive to nitrate and pH swings. Slow acclimatisation matters more than with neons.",
    notes: [
      "Better colour than a neon and a longer life, but far less forgiving of hard water.",
      "Only for a mature, stable tank.",
      "The red stripe runs the full body length, which is how you tell them from neons."
    ],
    img: "", wiki: "Cardinal tetra"
  },
  {
    id: "cory", group: "aquatics", name: "Peppered corydoras", sci: "Corydoras paleatus",
    level: "Beginner", size: "5 to 7 cm", life: "5 to 10 years",
    home: "80 L with a group of six or more",
    temp: "20 to 26 °C",
    env: "pH 6.5 to 7.5",
    light: "Any, they prefer shaded areas",
    substrate: "Smooth sand. Sharp gravel wears their barbels away.",
    diet: "Sinking pellets and wafers, frozen bloodworm",
    health: "Eroded barbels mean the substrate is wrong. Once infected they need clean sand and time.",
    notes: [
      "They are not a cleaning crew. They need their own food on the bottom.",
      "They gulp air at the surface now and then, which is normal.",
      "Six is the minimum for them to behave naturally."
    ],
    img: "", wiki: "Corydoras paleatus"
  },
  {
    id: "goldfish", group: "aquatics", name: "Goldfish", sci: "Carassius auratus",
    level: "Beginner", size: "20 to 30 cm single-tail, 15 to 20 cm fancy",
    life: "10 to 20 years, sometimes far longer",
    home: "Pond or 150 L plus for single-tails, 75 L per fancy goldfish",
    temp: "18 to 22 °C, no heater needed indoors",
    env: "pH 7.0 to 8.4, heavy filtration for the waste they produce",
    light: "Natural daylight cycle is fine",
    substrate: "Large smooth gravel or bare bottom. They swallow small stones.",
    diet: "Sinking pellets, blanched peas and greens",
    health: "Floating upside down after eating is a swim bladder problem, usually from floating food and constipation.",
    notes: [
      "A goldfish bowl is a death sentence. They are big, messy, long-lived fish.",
      "Comets and shubunkins belong in a pond, not a tank.",
      "Fancy varieties cannot compete with single-tails for food. Do not mix them."
    ],
    img: "", wiki: "Goldfish"
  },
  {
    id: "angelfish", group: "aquatics", name: "Freshwater angelfish", sci: "Pterophyllum scalare",
    level: "Intermediate", size: "15 cm long, up to 20 cm tall", life: "8 to 10 years",
    home: "150 L with at least 45 cm of water depth",
    temp: "24 to 28 °C",
    env: "pH 6.0 to 7.5, gentle flow",
    light: "Moderate, with tall planting for cover",
    substrate: "Sand or fine gravel, tall plants, driftwood",
    diet: "Cichlid pellets, frozen bloodworm and brine shrimp",
    health: "Hole-in-the-head lesions follow poor water and a thin diet. Fix both before medicating.",
    notes: [
      "They grow tall rather than long, so tank height matters more than length.",
      "A bonded pair claims the tank and bullies everything else at spawning time.",
      "Anything small enough to fit in the mouth eventually goes in it."
    ],
    img: "", wiki: "Pterophyllum scalare"
  },
  {
    id: "mbuna", group: "aquatics", name: "Malawi mbuna cichlids", sci: "Pseudotropheus and related genera",
    level: "Intermediate", size: "8 to 15 cm", life: "5 to 10 years",
    home: "200 L plus, packed with rock caves",
    temp: "24 to 27 °C",
    env: "pH 7.8 to 8.6, hard alkaline water",
    light: "Bright, which suits the rockwork and their colour",
    substrate: "Coral sand or aragonite to hold the pH up, stacked rock",
    diet: "Spirulina-based flake or pellets, low in protein",
    health: "Malawi bloat starts with refusing food and stringy white waste. It is a diet and stress problem, and it kills fast.",
    notes: [
      "Deliberately crowding them spreads aggression instead of concentrating it on one fish.",
      "Feeding bloodworm or beefheart causes bloat.",
      "Not a community fish. Plan the whole tank around them."
    ],
    img: "", wiki: "Mbuna"
  },
  {
    id: "discus", group: "aquatics", name: "Discus", sci: "Symphysodon aequifasciatus",
    level: "Advanced", size: "15 to 20 cm", life: "10 to 15 years",
    home: "250 L for a group of five or six",
    temp: "28 to 30 °C, warmer than most community fish",
    env: "pH 6.0 to 7.0, soft water, nitrate kept very low",
    light: "Subdued, with tall planting",
    substrate: "Bare bottom or fine sand for easy cleaning",
    diet: "Beefheart mixes, granules and frozen food, fed several times a day",
    health: "Darkening, hiding and clamped fins mean water quality first, parasites second.",
    notes: [
      "The most demanding freshwater fish we would sell anyone. Large frequent water changes are the whole job.",
      "Keep five or more. In smaller groups one bullies the rest.",
      "They will not tolerate the temperature swings a community tank sees."
    ],
    img: "", wiki: "Discus (fish)"
  },
  {
    id: "gourami", group: "aquatics", name: "Dwarf gourami", sci: "Trichogaster lalius",
    level: "Beginner", size: "7 to 9 cm", life: "3 to 5 years",
    home: "60 L with calm water and surface cover",
    temp: "24 to 28 °C",
    env: "pH 6.0 to 7.5, gentle flow",
    light: "Moderate, floating plants at the surface",
    substrate: "Sand or gravel, planted",
    diet: "Flake, micro pellets, frozen food",
    health: "Dwarf gourami iridovirus is common in mass-bred stock. Buy from a source that quarantines.",
    notes: [
      "They breathe air at the surface, so never seal the tank to the waterline.",
      "Males can be territorial with each other. One male per tank is safest.",
      "Strong filter flow stresses them."
    ],
    img: "", wiki: "Dwarf gourami"
  },
  {
    id: "zebra-danio", group: "aquatics", name: "Zebra danio", sci: "Danio rerio",
    level: "Beginner", size: "4 to 5 cm", life: "3 to 5 years",
    home: "60 L with a group of six or more, length matters more than depth",
    temp: "18 to 25 °C, no heater needed in most rooms",
    env: "pH 6.5 to 8.0, tolerant of a wide range",
    light: "Any",
    substrate: "Gravel or sand, open swimming space",
    diet: "Flake, micro pellets, frozen daphnia",
    health: "Very hardy. Problems almost always mean the tank was never cycled.",
    notes: [
      "Fast, busy fish that need length to swim, not height.",
      "They nip long fins, so do not keep them with a betta or angelfish.",
      "One of the few fish that genuinely does not need a heater here."
    ],
    img: "", wiki: "Zebrafish"
  },
  {
    id: "rainbowfish", group: "aquatics", name: "Boesemani rainbowfish", sci: "Melanotaenia boesemani",
    level: "Intermediate", size: "10 to 12 cm", life: "5 to 8 years",
    home: "200 L, groups of six with more females than males",
    temp: "24 to 28 °C",
    env: "pH 7.0 to 8.0, moderately hard",
    light: "Bright, which brings the colour out",
    substrate: "Sand or gravel with open swimming lanes",
    diet: "Flake, small pellets, frozen brine shrimp",
    health: "Robust once settled. Colour fades under stress or poor diet.",
    notes: [
      "Males only colour up properly with females present and space to display.",
      "Active swimmers that need a long tank, not a tall one.",
      "They can jump, so keep a lid on."
    ],
    img: "", wiki: "Boeseman's rainbowfish"
  },
  {
    id: "bristlenose", group: "aquatics", name: "Bristlenose pleco", sci: "Ancistrus sp.",
    level: "Beginner", size: "12 to 15 cm", life: "5 to 12 years",
    home: "100 L with driftwood and a cave",
    temp: "22 to 27 °C",
    env: "pH 6.5 to 7.8, good oxygenation",
    light: "Any, they hide by day",
    substrate: "Sand or gravel, and wood they can rasp on",
    diet: "Algae wafers, courgette, and wood",
    health: "A sunken belly means it is not getting its own food. Feed wafers after lights out.",
    notes: [
      "Buy this one, not the common pleco. The common pleco reaches 45 cm.",
      "Without wood in the tank their digestion suffers.",
      "Males grow the bristles. Females stay plain."
    ],
    img: "", wiki: "Ancistrus"
  },
  {
    id: "cherry-shrimp", group: "aquatics", name: "Cherry shrimp", sci: "Neocaridina davidi",
    level: "Beginner", size: "2 to 3 cm", life: "1 to 2 years",
    home: "20 L planted, mature and stable",
    temp: "18 to 26 °C",
    env: "pH 6.5 to 8.0, moderately hard, zero copper",
    light: "Moderate, enough to grow biofilm",
    substrate: "Fine sand, moss and leaf litter",
    diet: "Biofilm and algae, plus a shrimp pellet twice a week",
    health: "Failed moults and sudden deaths after a water change usually mean a mineral or copper problem.",
    notes: [
      "Copper kills them. Check plant fertilisers and any fish medication before it goes in.",
      "They breed readily in a stable tank, which is the sign you have it right.",
      "Most fish eat them, including small tetras."
    ],
    img: "", wiki: "Neocaridina davidi"
  },
  {
    id: "amano-shrimp", group: "aquatics", name: "Amano shrimp", sci: "Caridina multidentata",
    level: "Beginner", size: "4 to 5 cm", life: "2 to 3 years",
    home: "40 L planted with hiding places",
    temp: "20 to 27 °C",
    env: "pH 6.5 to 7.8, zero copper",
    light: "Moderate",
    substrate: "Sand or gravel with moss and wood",
    diet: "Algae, biofilm, sinking wafers",
    health: "They climb out when water quality drops. A shrimp on the carpet is a water test, not an accident.",
    notes: [
      "The best working algae eater in a planted tank.",
      "They will not breed in freshwater, so the population stays where you put it.",
      "Big enough that most community fish leave them alone."
    ],
    img: "", wiki: "Caridina multidentata"
  },
  {
    id: "mystery-snail", group: "aquatics", name: "Mystery snail", sci: "Pomacea bridgesii",
    level: "Beginner", size: "4 to 6 cm shell", life: "1 to 3 years",
    home: "40 L with a gap above the waterline and a lid",
    temp: "20 to 28 °C",
    env: "pH 7.0 to 8.0, calcium in the water for shell growth",
    light: "Any",
    substrate: "Sand or gravel, live plants they will mostly leave alone",
    diet: "Algae, blanched vegetables, calcium-rich sinking food",
    health: "A pitted or thin shell means the water is too soft. Add a cuttlebone or a mineral supplement.",
    notes: [
      "They lay egg clutches above the waterline. Remove them if you do not want more.",
      "They climb out and dry up, so a lid matters.",
      "Copper-based medication kills them along with the shrimp."
    ],
    img: "", wiki: "Pomacea bridgesii"
  },
  {
    id: "clownfish", group: "aquatics", name: "Ocellaris clownfish", sci: "Amphiprion ocellaris",
    level: "Intermediate", size: "8 to 11 cm", life: "10 to 15 years",
    home: "80 L marine tank with live rock, a pair only",
    temp: "24 to 27 °C",
    env: "Salinity 1.024 to 1.026 SG, pH 8.1 to 8.4, ammonia and nitrite zero",
    light: "Reef lighting if corals are present, otherwise standard marine",
    substrate: "Aragonite sand and live rock",
    diet: "Marine pellets, frozen mysis and brine shrimp",
    health: "Marine white spot and brooklynella move fast. Quarantine every new marine fish.",
    notes: [
      "Captive-bred clownfish are hardier than wild-caught and no anemone is needed.",
      "Marine keeping costs more to set up but is not harder once it is stable.",
      "Two is the group size. A third gets bullied."
    ],
    img: "", wiki: "Ocellaris clownfish"
  },
  {
    id: "royal-gramma", group: "aquatics", name: "Royal gramma", sci: "Gramma loreto",
    level: "Intermediate", size: "8 cm", life: "5 to 6 years",
    home: "100 L marine tank with plenty of rock caves",
    temp: "23 to 27 °C",
    env: "Salinity 1.024 to 1.026 SG, pH 8.1 to 8.4",
    light: "Standard marine or reef",
    substrate: "Aragonite sand, live rock with overhangs",
    diet: "Frozen mysis, marine pellets, small meaty foods",
    health: "Hiding constantly usually means too few caves rather than illness.",
    notes: [
      "Peaceful with everything except its own kind. One per tank.",
      "It claims a cave and defends the entrance, which is normal behaviour.",
      "Reef safe, so it suits a mixed coral tank."
    ],
    img: "", wiki: "Royal gramma"
  },

  /* ============================== REPTILES ============================== */
  {
    id: "bearded-dragon", group: "reptiles", name: "Bearded dragon", sci: "Pogona vitticeps",
    level: "Beginner", size: "40 to 60 cm", life: "8 to 12 years",
    home: "120 x 60 x 60 cm for an adult, one dragon per enclosure",
    temp: "Basking surface 42 to 45 °C, cool side 26 to 32 °C, night 18 to 21 °C",
    env: "Humidity 30 to 60 percent, dry with good airflow",
    light: "T5 HO UVB running across two thirds of the length, 25 to 30 cm above the basking spot over mesh. Replace it every 12 months.",
    substrate: "Washed play sand or a soil and sand mix, 10 cm deep, or a bioactive mix with isopods",
    diet: "Juveniles eat mostly insects daily. Adults eat roughly 80 percent greens.",
    health: "Head tremors, a soft jaw or dragging back legs point at metabolic bone disease, which means the UVB or the calcium has failed. See a vet.",
    notes: [
      "UVB is not optional, and the tube stops working long before it stops glowing.",
      "Two dragons in one enclosure ends in bitten toes and tails.",
      "Dust insects with calcium, and use calcium with D3 a couple of times a week.",
      "They slow right down in winter. Brumation is normal, but weigh the animal first."
    ],
    img: "", wiki: "Pogona vitticeps"
  },
  {
    id: "leopard-gecko", group: "reptiles", name: "Leopard gecko", sci: "Eublepharis macularius",
    level: "Beginner", size: "20 to 25 cm", life: "15 to 20 years",
    home: "90 x 45 x 45 cm, with three hides: warm, cool and humid",
    temp: "Basking surface 34 to 36 °C, cool side 21 to 25 °C, night down to 16 °C is fine",
    env: "Humidity 30 to 40 percent, with a humid hide at 70 to 80 percent for shedding",
    light: "Low-level UVB, UV index 0.5 to 1.5 at basking height. Albinos need the lower end.",
    substrate: "Tile, paper or a soil and sand mix. Never loose calcium sand.",
    diet: "Insects only. Gut-loaded crickets, roaches and the occasional waxworm.",
    health: "Stuck shed on the toes cuts off circulation and the toe is lost. That is what the humid hide prevents.",
    notes: [
      "Loose calcium sand causes impaction.",
      "They drop the tail when grabbed. Support the body, never hold the tail.",
      "Belly heat matters more than air temperature for digestion.",
      "UVB used to be called unnecessary for this species. Current research says low-level UVB improves them."
    ],
    img: "", wiki: "Leopard gecko"
  },
  {
    id: "crested-gecko", group: "reptiles", name: "Crested gecko", sci: "Correlophus ciliatus",
    level: "Beginner", size: "18 to 22 cm", life: "15 to 20 years",
    home: "45 x 45 x 60 cm tall and planted. Height matters more than floor space.",
    temp: "Top of the enclosure 28 to 29 °C, bottom 21 to 24 °C, night 18 to 22 °C",
    env: "Humidity 60 to 80 percent at night, drying out during the day",
    light: "Low UVB is optional but beneficial. UV index 1.0 to 2.0 at the basking branch.",
    substrate: "Coconut soil and orchid bark, or bioactive with springtails",
    diet: "A complete crested gecko diet powder, with insects once or twice a week",
    health: "Floppy tail syndrome and a kinked jaw both mean calcium is short. Check the diet powder is fresh.",
    notes: [
      "Above about 30 °C they overheat and die, which is the real risk in a Klerksdorp summer.",
      "A dropped tail never grows back, and that is normal for the species.",
      "They are arboreal, so give them branches and cork rather than floor decor."
    ],
    img: "", wiki: "Crested gecko"
  },
  {
    id: "gargoyle-gecko", group: "reptiles", name: "Gargoyle gecko", sci: "Rhacodactylus auriculatus",
    level: "Beginner", size: "20 to 25 cm", life: "15 to 20 years",
    home: "45 x 45 x 60 cm tall and planted",
    temp: "Warm end 26 to 28 °C, cool 21 to 24 °C, night 18 to 22 °C",
    env: "Humidity 50 to 70 percent, drying between mistings",
    light: "Low UVB, UV index 1.0 to 2.0, optional but useful",
    substrate: "Coconut soil and bark, bioactive works well",
    diet: "Complete gecko diet powder plus insects, and they take more insects than cresteds",
    health: "Watch for retained shed around the toes and eyes after a dry spell.",
    notes: [
      "Tougher than a crested gecko and the tail does regrow.",
      "They can be aggressive to each other, so house them alone.",
      "Handle briefly and low down until they settle."
    ],
    img: "", wiki: "Gargoyle gecko"
  },
  {
    id: "blue-tongue-skink", group: "reptiles", name: "Blue-tongued skink", sci: "Tiliqua scincoides",
    level: "Intermediate", size: "45 to 60 cm", life: "15 to 20 years",
    home: "120 x 60 x 60 cm floor space, one skink per enclosure",
    temp: "Basking surface 35 to 40 °C, cool side 24 to 27 °C, night 18 to 22 °C",
    env: "Humidity 40 to 60 percent depending on subspecies",
    light: "T5 HO UVB across a third of the length, UV index 3 to 4 at the basking spot",
    substrate: "Deep soil and bark mix, 10 to 15 cm, so they can burrow",
    diet: "Omnivore. Roughly half vegetables, plus insects, snails and a little lean meat or wet dog food.",
    health: "Obesity is the usual problem. A fat pad behind the head means cut back the protein.",
    notes: [
      "Calm, heavy-bodied and one of the better lizards for handling.",
      "They need floor area, not height.",
      "Strictly solitary outside breeding."
    ],
    img: "", wiki: "Blue-tongued skink"
  },
  {
    id: "veiled-chameleon", group: "reptiles", name: "Veiled chameleon", sci: "Chamaeleo calyptratus",
    level: "Advanced", size: "35 to 60 cm", life: "5 to 8 years",
    home: "Screen enclosure 60 x 60 x 120 cm, heavily planted, one animal only",
    temp: "Basking 32 to 35 °C, ambient 24 to 28 °C, night drop to 18 to 22 °C",
    env: "Humidity 40 to 60 percent, rising during misting cycles",
    light: "T5 HO UVB the length of the top, UV index 3 to 4 at the basking branch",
    substrate: "Bare floor or bioactive. Never loose particles they can swallow while hunting.",
    diet: "Varied insects, dusted, plus some greens for this species",
    health: "Sunken eyes mean dehydration. A swollen casque or bent limbs mean the UVB or calcium is wrong.",
    notes: [
      "They will not drink from a bowl. They drink droplets, so a dripper or misting is essential.",
      "Glass tanks trap stale air. Screen or part-screen keeps them healthy.",
      "Handling stresses them. This is an animal to watch, not to hold.",
      "Never house two together, even briefly."
    ],
    img: "", wiki: "Veiled chameleon"
  },
  {
    id: "flap-necked-chameleon", group: "reptiles", name: "Flap-necked chameleon", sci: "Chamaeleo dilepis",
    level: "Specialist", size: "25 to 35 cm", life: "3 to 5 years",
    home: "Outdoor or well-ventilated planted enclosure, one animal only",
    temp: "Basking 30 to 33 °C, ambient 22 to 28 °C, natural night drop",
    env: "Humidity 50 to 70 percent, with a daily drip or misting",
    light: "Natural sunlight where possible, otherwise T5 HO UVB at UV index 3 to 4",
    substrate: "Planted soil or bare floor, dense foliage above",
    diet: "Varied insects, dusted",
    health: "Wild-caught animals arrive with heavy parasite loads and need a vet faecal check.",
    notes: [
      "This is an indigenous South African species. Taking one from the garden or the road is not legal.",
      "Ask us about the permit position before you plan on keeping one.",
      "They do far better in an outdoor enclosure here than under lights indoors."
    ],
    permit: "Indigenous species. A provincial nature conservation permit is required to keep or transport one.",
    img: "", wiki: "Chamaeleo dilepis"
  },
  {
    id: "corn-snake", group: "reptiles", name: "Corn snake", sci: "Pantherophis guttatus",
    level: "Beginner", size: "120 to 150 cm", life: "15 to 20 years",
    home: "120 x 60 x 60 cm for an adult, with a genuinely secure lid",
    temp: "Basking surface 32 °C, cool side 24 to 27 °C, night 24 °C or room temperature",
    env: "Humidity around 65 to 75 percent, raised while shedding",
    light: "UVB is recommended, UV index 2 to 3 at the basking spot",
    substrate: "Aspen, cypress mulch or a soil mix deep enough to burrow into",
    diet: "Frozen-thawed rodents every 7 to 14 days",
    health: "Stuck shed in one piece is normal. Shed in patches means the humidity is too low.",
    notes: [
      "The best first snake there is: calm, hardy and easy to feed.",
      "They are escape artists. If the head fits through a gap, the rest follows.",
      "Frozen-thawed only. Live rodents injure snakes.",
      "A prey item should be about the width of the widest part of the snake."
    ],
    img: "", wiki: "Corn snake"
  },
  {
    id: "ball-python", group: "reptiles", name: "Ball python", sci: "Python regius",
    level: "Beginner", size: "120 to 150 cm", life: "20 to 30 years",
    home: "120 x 60 x 60 cm, with a tight hide at each end",
    temp: "Basking surface 30 to 32 °C, cool side 22 to 27 °C, night 21 to 26 °C",
    env: "Humidity 60 to 80 percent by day, rising to 80 percent or more at night",
    light: "Low-intensity T5 HO UVB, UV index 2 to 3 in the basking area",
    substrate: "Coconut husk or cypress mulch, deep enough to hold moisture",
    diet: "Frozen-thawed rodents every 7 to 14 days",
    health: "Open-mouth breathing or clicking is a respiratory infection and needs a vet, not more heat.",
    notes: [
      "Refusing food for weeks, especially in winter, is normal. Track weight, not meals.",
      "They want to feel enclosed. A big empty tank makes them stop eating.",
      "Thirty years is a realistic commitment.",
      "Old care sheets say 50 to 60 percent humidity. Current guidance is higher, and shed quality proves it."
    ],
    img: "", wiki: "Ball python"
  },
  {
    id: "king-snake", group: "reptiles", name: "Californian king snake", sci: "Lampropeltis californiae",
    level: "Beginner", size: "90 to 120 cm", life: "15 to 20 years",
    home: "90 x 45 x 45 cm, secure lid",
    temp: "Basking surface 30 to 32 °C, cool side 22 to 25 °C, night room temperature",
    env: "Humidity 40 to 60 percent",
    light: "UVB recommended, UV index 2 to 3",
    substrate: "Aspen or a soil mix they can burrow through",
    diet: "Frozen-thawed rodents weekly",
    health: "Regurgitation usually means it was handled too soon after feeding, or the enclosure is too cold.",
    notes: [
      "King snakes eat other snakes. Always house one to an enclosure, with no exceptions.",
      "Strong feeding response, so use tongs and let them settle before handling.",
      "Hardy, active and interesting to watch."
    ],
    img: "", wiki: "California kingsnake"
  },
  {
    id: "rainbow-boa", group: "reptiles", name: "Brazilian rainbow boa", sci: "Epicrates cenchria",
    level: "Intermediate", size: "150 to 200 cm", life: "20 to 25 years",
    home: "150 x 60 x 60 cm with climbing branches",
    temp: "Basking surface 30 to 31 °C, cool side 24 to 26 °C, night 22 to 24 °C",
    env: "Humidity 75 to 90 percent, which is the whole challenge with this species",
    light: "Low UVB, UV index 1 to 2",
    substrate: "Deep coconut husk or cypress that holds moisture without going sour",
    diet: "Frozen-thawed rodents every 10 to 14 days",
    health: "Low humidity causes stuck shed and respiratory problems very quickly in this species.",
    notes: [
      "The iridescence is the reason people want one. Good humidity is the reason it shows.",
      "They can be nippy as juveniles and settle with age.",
      "Not a first snake, but a reasonable second one."
    ],
    img: "", wiki: "Brazilian rainbow boa"
  },
  {
    id: "western-hognose", group: "reptiles", name: "Western hognose snake", sci: "Heterodon nasicus",
    level: "Beginner", size: "45 to 90 cm, females much larger", life: "15 to 20 years",
    home: "90 x 45 x 45 cm with deep substrate for burrowing",
    temp: "Basking surface 32 to 35 °C, cool side 22 to 25 °C, night room temperature",
    env: "Humidity 30 to 50 percent, dry with a humid hide",
    light: "UVB recommended, UV index 2 to 3",
    substrate: "Aspen or a sand and soil mix, deep enough to disappear into",
    diet: "Frozen-thawed mice every 5 to 7 days",
    health: "Fussy feeding is common. Scenting with tuna or frog is the usual fix, and a vet check rules out the rest.",
    notes: [
      "They play dead and they bluff-strike with the mouth closed. It is theatre, not aggression.",
      "Rear-fanged with a mild venom. A bite can swell, so avoid getting chewed.",
      "Small, charming and a good option where space is short."
    ],
    img: "", wiki: "Western hognose snake"
  },
  {
    id: "leopard-tortoise", group: "reptiles", name: "Leopard tortoise", sci: "Stigmochelys pardalis",
    level: "Specialist", size: "40 to 60 cm, 15 to 25 kg", life: "50 to 80 years and beyond",
    home: "A secure outdoor enclosure with sun, shade and a dry shelter. Not an indoor animal.",
    temp: "20 to 32 °C outdoors, with a heated shelter for cold nights",
    env: "Dry conditions, good drainage, room to graze",
    light: "Natural sunlight. Indoors it needs strong UVB, which is one more reason to keep it outside.",
    substrate: "Grass and natural soil, with a dry sheltered sleeping area",
    diet: "High-fibre grasses and weeds. No fruit, no dog food, no daily lucerne.",
    health: "Pyramiding of the shell is permanent and comes from a protein-rich diet and low humidity when young.",
    notes: [
      "This animal will outlive you. Plan who takes it on.",
      "Picking one up in the veld and taking it home is illegal, not a rescue.",
      "They need real grazing space. A tortoise table is not enough for an adult.",
      "Runny nose syndrome spreads between tortoises and needs a vet."
    ],
    permit: "Indigenous species. A provincial nature conservation permit is required to keep or transport one.",
    img: "", wiki: "Leopard tortoise"
  },
  {
    id: "hermanns-tortoise", group: "reptiles", name: "Hermann's tortoise", sci: "Testudo hermanni",
    level: "Advanced", size: "15 to 20 cm", life: "50 to 75 years",
    home: "Large outdoor pen in summer, tortoise table with a basking lamp in winter",
    temp: "Basking 32 to 35 °C, ambient 20 to 26 °C",
    env: "Dry and well ventilated, with a shallow dish for soaking",
    light: "T5 HO UVB indoors at UV index 3 to 4, or natural sunlight outdoors",
    substrate: "Soil and sand mix deep enough to dig, with hay and weeds growing",
    diet: "Weeds, dandelion, plantain and mixed greens",
    health: "Beak and nail overgrowth means the diet is too soft. A vet can trim them.",
    notes: [
      "Smaller than a leopard tortoise, and easier to house properly.",
      "They hibernate. Doing it wrong kills them, so speak to us before your first winter.",
      "Imported tortoises come with paperwork. Ask to see it before you buy from anyone."
    ],
    permit: "CITES Appendix II. Ask to see import and sale documentation.",
    img: "", wiki: "Hermann's tortoise"
  },
  {
    id: "angulate-tortoise", group: "reptiles", name: "Angulate tortoise", sci: "Chersina angulata",
    level: "Specialist", size: "20 to 30 cm", life: "30 to 50 years",
    home: "Outdoor enclosure with fynbos-style planting, sun and shelter",
    temp: "18 to 30 °C outdoors, sheltered from cold wet nights",
    env: "Dry, well drained, with natural grazing",
    light: "Natural sunlight",
    substrate: "Natural soil and low scrub for cover",
    diet: "Grasses, succulents and weeds",
    health: "Wet cold conditions cause respiratory disease in this species faster than heat ever does.",
    notes: [
      "Indigenous, protected, and not an animal to collect from the wild.",
      "Males fight and can flip each other, which is fatal in the sun.",
      "Ask us about the permit position first."
    ],
    permit: "Indigenous species. A provincial nature conservation permit is required to keep or transport one.",
    img: "", wiki: "Angulate tortoise"
  },

  /* ============================= AMPHIBIANS ============================= */
  {
    id: "axolotl", group: "amphibians", name: "Axolotl", sci: "Ambystoma mexicanum",
    level: "Intermediate", size: "23 to 30 cm", life: "10 to 15 years",
    home: "90 L per adult, fully aquatic, bare bottom or fine sand",
    temp: "16 to 19 °C, and never above 21 °C for long",
    env: "pH 7.4 to 7.8, ammonia and nitrite at zero, gentle flow",
    light: "Dim. They have no eyelids and bright light stresses them.",
    substrate: "Bare glass or fine sand. Gravel gets swallowed and blocks the gut.",
    diet: "Earthworms as the staple, plus sinking axolotl pellets",
    health: "Curled gill filaments and a curled tail tip mean stress, usually heat or ammonia. Fluffy white patches are fungus.",
    notes: [
      "Heat is the number one killer in South Africa. Without a cool room or a chiller, summer will get them.",
      "Housed together they bite each other's gills and legs. Keep them alone or exactly size matched.",
      "They are aquatic for life and do not need a land area.",
      "Tap water must be dechlorinated before it goes anywhere near them."
    ],
    img: "", wiki: "Axolotl"
  },
  {
    id: "green-tree-frog", group: "amphibians", name: "American green tree frog", sci: "Dryophytes cinereus",
    level: "Beginner", size: "5 to 6 cm", life: "5 to 6 years",
    home: "45 x 45 x 60 cm tall and planted, for two or three frogs",
    temp: "22 to 28 °C by day, 18 to 22 °C at night",
    env: "Humidity 60 to 80 percent, misted daily",
    light: "Low UVB, UV index 1 to 2, on a 12 hour cycle",
    substrate: "Coconut soil with moss and leaf litter, planted",
    diet: "Crickets and small roaches, dusted with calcium",
    health: "Red leg is a bacterial infection that follows dirty water. It is a vet job and it moves fast.",
    notes: [
      "Everything they touch goes through their skin. Chlorinated tap water is dangerous, so treat it first.",
      "Handle with clean wet hands and only when you have to.",
      "Males call loudly at night, which people do not always expect."
    ],
    img: "", wiki: "American green tree frog"
  },
  {
    id: "whites-tree-frog", group: "amphibians", name: "White's tree frog", sci: "Litoria caerulea",
    level: "Beginner", size: "7 to 11 cm", life: "15 to 20 years",
    home: "45 x 45 x 60 cm tall for two, planted with sturdy branches",
    temp: "24 to 28 °C by day, 20 to 24 °C at night",
    env: "Humidity 50 to 70 percent, higher at night",
    light: "Low UVB, UV index 1 to 2",
    substrate: "Coconut soil and bark with a large shallow water dish",
    diet: "Crickets, roaches and the occasional larger insect, dusted",
    health: "Obesity is the classic problem. Fat rolls over the eyes mean fewer and smaller feeds.",
    notes: [
      "Calm and long lived, and the most tolerant tree frog of gentle handling.",
      "They will eat until they cannot climb. Feed adults two or three times a week.",
      "A big water dish gets fouled nightly, so change it every day."
    ],
    img: "", wiki: "Australian green tree frog"
  },
  {
    id: "pacman-frog", group: "amphibians", name: "Ornate horned frog", sci: "Ceratophrys ornata",
    level: "Beginner", size: "10 to 16 cm", life: "6 to 10 years",
    home: "45 x 45 x 30 cm with deep damp substrate to burrow into",
    temp: "24 to 28 °C",
    env: "Humidity 60 to 80 percent, shallow water it can sit in",
    light: "Low UVB is optional. A day and night cycle matters more.",
    substrate: "Coconut soil or sphagnum, deep enough to bury itself",
    diet: "Insects mostly, with an occasional rodent for a large adult",
    health: "A bloated frog that will not pass waste is usually impacted or overfed. Soak it and call a vet.",
    notes: [
      "One frog per enclosure. They will try to eat each other.",
      "Feeding rodents weekly makes them obese and shortens their life.",
      "They sit still for days and then strike hard. That is the animal, not a sick animal.",
      "They can and do bite fingers."
    ],
    img: "", wiki: "Ceratophrys ornata"
  },
  {
    id: "fire-bellied-toad", group: "amphibians", name: "Oriental fire-bellied toad", sci: "Bombina orientalis",
    level: "Beginner", size: "4 to 6 cm", life: "10 to 15 years",
    home: "60 cm semi-aquatic setup, half shallow water and half land",
    temp: "20 to 24 °C",
    env: "Dechlorinated water changed often, moderate humidity",
    light: "Low UVB, UV index 1 to 2",
    substrate: "Gravel-free land area of soil and moss, with a filtered shallow pool",
    diet: "Crickets, small roaches and bloodworm",
    health: "Cloudy skin or lethargy after a water change usually means chlorine got in.",
    notes: [
      "Their skin secretion irritates. Wash your hands afterwards and keep it away from your eyes.",
      "They do well in small groups, which makes them good to watch.",
      "The water half fouls quickly, so filter it or change it often."
    ],
    img: "", wiki: "Oriental fire-bellied toad"
  },
  {
    id: "clawed-frog", group: "amphibians", name: "African clawed frog", sci: "Xenopus laevis",
    level: "Beginner", size: "10 to 13 cm", life: "15 to 20 years and more",
    home: "60 L fully aquatic tank with a weighted lid",
    temp: "18 to 24 °C",
    env: "pH 6.5 to 7.8, gentle filtration, dechlorinated water",
    light: "Low. They avoid bright light.",
    substrate: "Bare bottom or large smooth stones, nothing swallowable",
    diet: "Sinking pellets, earthworms, frozen bloodworm",
    health: "Bloat and floating are usually overfeeding. Skip a few days before assuming illness.",
    notes: [
      "Indigenous to South Africa and very good at escaping. The lid is not optional.",
      "Never release one into a dam or river. They are a serious invasive species elsewhere.",
      "They will eat any fish they can catch."
    ],
    img: "", wiki: "African clawed frog"
  },
  {
    id: "fire-salamander", group: "amphibians", name: "Fire salamander", sci: "Salamandra salamandra",
    level: "Advanced", size: "15 to 25 cm", life: "15 to 20 years",
    home: "60 x 45 x 45 cm woodland setup, cool and damp",
    temp: "15 to 20 °C, and above 24 °C is dangerous",
    env: "Humidity 70 to 90 percent, damp but never waterlogged",
    light: "Dim. No basking lamp.",
    substrate: "Deep leaf litter over damp soil, with cork bark hides",
    diet: "Earthworms, crickets, slugs",
    health: "Heat stress is the main killer here. A cool room is a requirement, not a preference.",
    notes: [
      "Keeping them cool through a South African summer is genuinely hard.",
      "Their skin secretion is toxic. Wash your hands and keep them away from other pets.",
      "A display animal, never a handling one."
    ],
    img: "", wiki: "Fire salamander"
  },
  {
    id: "tiger-salamander", group: "amphibians", name: "Tiger salamander", sci: "Ambystoma tigrinum",
    level: "Intermediate", size: "17 to 30 cm", life: "10 to 16 years",
    home: "75 x 45 x 45 cm terrestrial setup with deep substrate",
    temp: "18 to 22 °C, cooler at night",
    env: "Humidity 70 to 80 percent, damp substrate throughout",
    light: "Dim, on a normal day and night cycle",
    substrate: "Deep coconut soil and leaf litter for burrowing",
    diet: "Earthworms, crickets, roaches",
    health: "They gorge and get obese. Feed an adult twice a week at most.",
    notes: [
      "Hardier than a fire salamander and easier through summer.",
      "They spend most of the time underground, so deep substrate is the enclosure.",
      "Strong feeding response, so use tongs."
    ],
    img: "", wiki: "Tiger salamander"
  },

  /* =============================== BIRDS =============================== */
  {
    id: "cockatiel", group: "birds", name: "Cockatiel", sci: "Nymphicus hollandicus",
    level: "Beginner", size: "30 to 33 cm including tail", life: "15 to 20 years",
    home: "60 x 45 x 60 cm minimum, plus daily time out of the cage",
    temp: "18 to 28 °C indoors, out of draughts and direct sun",
    env: "Natural daylight, 10 to 12 hours of dark sleep, no kitchen fumes nearby",
    light: "Full-spectrum bird lighting helps indoor birds, or supervised time in real sunlight",
    substrate: "Paper cage lining, natural wood perches of varying diameter",
    diet: "Formulated pellets with fresh vegetables. Seed is part of the diet, not all of it.",
    health: "Tail bobbing at rest, sneezing or a change in droppings means an avian vet, quickly. Birds hide illness until it is advanced.",
    notes: [
      "They produce a fine powder down. Households with asthma should think twice.",
      "A single cockatiel needs your company for hours a day. Otherwise keep two.",
      "Night frights are common. A dim night light in the room helps.",
      "Non-stick pan fumes kill birds within minutes."
    ],
    img: "", wiki: "Cockatiel"
  },
  {
    id: "budgie", group: "birds", name: "Budgerigar", sci: "Melopsittacus undulatus",
    level: "Beginner", size: "18 cm", life: "7 to 12 years",
    home: "60 x 40 x 50 cm minimum, wider rather than taller, flight cage preferred",
    temp: "18 to 30 °C, no draughts",
    env: "10 to 12 hours of dark sleep, humidity is not critical",
    light: "Natural daylight or full-spectrum lighting",
    substrate: "Paper lining, natural perches, cuttlebone always available",
    diet: "Pellets or a good seed mix, plus greens. Millet as a treat only.",
    health: "A lump on the abdomen in an older budgie is often a tumour. Scaly face mites show as crust around the beak.",
    notes: [
      "Keep two. A budgie on its own spends most of its life bored.",
      "An all-seed diet causes fatty liver disease, which is what usually kills them early.",
      "Mirrors encourage a bird to bond with its reflection and regurgitate at it."
    ],
    img: "", wiki: "Budgerigar"
  },
  {
    id: "lovebird", group: "birds", name: "Rosy-faced lovebird", sci: "Agapornis roseicollis",
    level: "Intermediate", size: "15 to 18 cm", life: "10 to 15 years",
    home: "80 x 50 x 60 cm for a pair, larger for an aviary group",
    temp: "18 to 30 °C, sheltered from wind and rain",
    env: "Dry and draught-free, with 10 to 12 hours of dark sleep",
    light: "Natural daylight, or full-spectrum indoors",
    substrate: "Paper lining, plenty of chewable wood and rotating toys",
    diet: "Pellets, sprouted seed, fresh greens and a cuttlebone",
    health: "Feather plucking in lovebirds usually means boredom or a lost partner, not disease.",
    notes: [
      "They bond intensely, to a partner or to you, and can get nippy about it.",
      "They chew everything, including electrical cable and window frames.",
      "Indigenous to southern Africa, and hardy in an outdoor aviary here."
    ],
    img: "", wiki: "Rosy-faced lovebird"
  },
  {
    id: "green-cheek", group: "birds", name: "Green-cheeked conure", sci: "Pyrrhura molinae",
    level: "Intermediate", size: "25 cm", life: "20 to 30 years",
    home: "60 x 60 x 90 cm plus several hours out of the cage each day",
    temp: "18 to 30 °C",
    env: "Quiet dark sleeping spot, 10 to 12 hours",
    light: "Natural daylight or full-spectrum",
    substrate: "Paper lining, foraging toys and shreddable material",
    diet: "Pellets, vegetables and fruit, nuts sparingly",
    health: "Sudden feather destruction in a settled bird is a reason to see an avian vet, not to add more toys.",
    notes: [
      "Quieter than most conures, but they still shriek in bursts. Flats are a problem.",
      "Clever and mischievous. Without foraging toys they redecorate your house.",
      "Twenty to thirty years is a long time. Think about who takes over if you cannot."
    ],
    img: "", wiki: "Green-cheeked parakeet"
  },
  {
    id: "sun-conure", group: "birds", name: "Sun conure", sci: "Aratinga solstitialis",
    level: "Advanced", size: "30 cm", life: "20 to 30 years",
    home: "90 x 60 x 90 cm minimum with daily free flight time",
    temp: "18 to 30 °C",
    env: "Dark quiet sleep, and a household that tolerates noise",
    light: "Natural daylight or full-spectrum",
    substrate: "Paper lining, hardwood perches, heavy-duty toys",
    diet: "Pellets, vegetables, limited fruit and nuts",
    health: "Watch for beak and feather disease in young birds from unverified sources.",
    notes: [
      "Spectacular and extremely loud. The call carries across a suburb.",
      "Not a flat bird and not a bird for shift workers.",
      "Very affectionate with their person and often jealous of everyone else."
    ],
    img: "", wiki: "Sun conure"
  },
  {
    id: "african-grey", group: "birds", name: "African grey parrot", sci: "Psittacus erithacus",
    level: "Specialist", size: "33 cm", life: "40 to 60 years",
    home: "90 x 75 x 120 cm minimum, with a stand and daily free time",
    temp: "18 to 30 °C, stable, no fumes",
    env: "Routine and constant enrichment. They notice everything and get anxious about change.",
    light: "Full-spectrum lighting matters for this species, or real sunlight",
    substrate: "Paper lining, hardwood perches, foraging puzzles",
    diet: "Formulated pellets, vegetables, limited seed and nuts, with attention to calcium",
    health: "Greys are prone to low blood calcium, which can cause seizures. An avian vet should check levels.",
    notes: [
      "This bird will probably outlive you. It needs to be in your will, not just your budget.",
      "Feather plucking is nearly always boredom, stress or diet, not a disease.",
      "They are as intelligent as a small child and get bored just as fast."
    ],
    permit: "CITES Appendix I. Legal ownership requires the correct permits and paperwork. Ask to see them.",
    img: "", wiki: "Grey parrot"
  },
  {
    id: "indian-ringneck", group: "birds", name: "Indian ringneck parakeet", sci: "Psittacula krameri",
    level: "Advanced", size: "40 cm including tail", life: "25 to 30 years",
    home: "90 x 60 x 90 cm minimum, aviary preferred",
    temp: "10 to 32 °C, hardy outdoors here",
    env: "Sheltered aviary, dry roosting area",
    light: "Natural daylight",
    substrate: "Sand or paper, hardwood perches, constant chew material",
    diet: "Pellets, sprouted seed, vegetables, limited fruit",
    health: "Beak and feather disease circulates in this species. Buy from a breeder who tests.",
    notes: [
      "Excellent talkers and very demanding. They go through a difficult phase in their second year.",
      "Powerful beak. Cage bar spacing and toy quality both matter.",
      "They do well in an outdoor aviary in this climate."
    ],
    img: "", wiki: "Rose-ringed parakeet"
  },
  {
    id: "zebra-finch", group: "birds", name: "Zebra finch", sci: "Taeniopygia guttata",
    level: "Beginner", size: "10 cm", life: "5 to 9 years",
    home: "Flight cage 80 cm long or more, kept in groups",
    temp: "18 to 30 °C, sheltered",
    env: "Dry and draught-free",
    light: "Natural daylight",
    substrate: "Paper or sand, several perches, a nest basket only if you want chicks",
    diet: "Finch seed, egg food, greens, grit and cuttlebone",
    health: "Air sac mite causes clicking and open-mouth breathing. It needs veterinary treatment.",
    notes: [
      "Birds to watch rather than birds to handle.",
      "They breed readily. Take the nest out if you do not want a colony.",
      "Cheerful background chatter all day, which some people love and some do not."
    ],
    img: "", wiki: "Zebra finch"
  },
  {
    id: "gouldian-finch", group: "birds", name: "Gouldian finch", sci: "Chloebia gouldiae",
    level: "Intermediate", size: "13 to 15 cm", life: "6 to 8 years",
    home: "Planted aviary or a flight cage at least 1 m long, in groups",
    temp: "20 to 30 °C, and they dislike cold nights",
    env: "Dry, draught-free, warmer than most finches need",
    light: "Natural daylight",
    substrate: "Sand or paper, natural branches, nest boxes for breeding",
    diet: "Finch seed, egg food, sprouted seed, greens, grit",
    health: "Air sac mite is very common in this species and shows as clicking and tail bobbing.",
    notes: [
      "Beautiful and more delicate than a zebra finch. Not a starter finch.",
      "They moult heavily and need extra protein through it.",
      "Cold nights and damp are what usually kill them here."
    ],
    img: "", wiki: "Gouldian finch"
  },
  {
    id: "canary", group: "birds", name: "Canary", sci: "Serinus canaria domestica",
    level: "Beginner", size: "12 to 14 cm", life: "8 to 12 years",
    home: "Flight cage 60 cm or longer, or a planted aviary",
    temp: "15 to 28 °C, no draughts",
    env: "Dry, with a bathing dish and a natural daylight cycle",
    light: "Natural daylight, which drives the moult and the song cycle",
    substrate: "Sand or paper, varied perches",
    diet: "Canary seed mix, egg food during the moult, fresh greens",
    health: "Scaly leg mites and overgrown claws are the usual complaints in older birds.",
    notes: [
      "Males sing, females mostly do not. Ask before you buy if the song is the point.",
      "They are content on their own, unlike most parrots.",
      "Smoke, aerosols and non-stick fumes are lethal to them."
    ],
    img: "", wiki: "Domestic canary"
  },
  {
    id: "diamond-dove", group: "birds", name: "Diamond dove", sci: "Geopelia cuneata",
    level: "Beginner", size: "19 to 21 cm", life: "8 to 12 years",
    home: "Aviary or long flight cage, kept in pairs",
    temp: "15 to 32 °C, sheltered from wet cold",
    env: "Dry, with sheltered perches and a shallow bath",
    light: "Natural daylight",
    substrate: "Sand or paper, low perches, an open nest platform",
    diet: "Small seed mix, greens, grit and cuttlebone",
    health: "Canker shows as a cheesy growth in the mouth and needs veterinary treatment.",
    notes: [
      "Gentle and quiet, with a soft coo rather than a screech.",
      "They spend a lot of time on the ground, so floor space matters.",
      "Not handling birds, but very calm in a mixed aviary."
    ],
    img: "", wiki: "Diamond dove"
  },
  {
    id: "button-quail", group: "birds", name: "Chinese painted quail", sci: "Synoicus chinensis",
    level: "Beginner", size: "12 to 14 cm", life: "3 to 5 years",
    home: "Aviary floor or a 1 m long ground pen, one male with two or three females",
    temp: "15 to 32 °C, sheltered and dry",
    env: "Dry ground, dense low cover to hide in",
    light: "Natural daylight",
    substrate: "Sand or soft soil with grass tufts and low hides",
    diet: "Fine seed or game bird crumble, greens, insects, grit",
    health: "They flush straight up when startled and injure their heads on the roof. A soft roof or low ceiling helps.",
    notes: [
      "Useful ground cleaners in a finch aviary and charming in their own right.",
      "Two males will fight, so keep one male per group.",
      "They nest on the ground and the hen sits tight, so watch where you step."
    ],
    img: "", wiki: "King quail"
  },

  /* ============================== MAMMALS =============================== */
  {
    id: "chinchilla", group: "mammals", name: "Chinchilla", sci: "Chinchilla lanigera",
    level: "Intermediate", size: "25 to 35 cm", life: "12 to 20 years",
    home: "Multi-level cage at least a metre tall, metal and wood, no plastic",
    temp: "15 to 22 °C. Trouble starts above 25 °C.",
    env: "Humidity under 50 percent. Heat and damp together are lethal.",
    light: "Normal room daylight. They are crepuscular and sleep through the middle of the day.",
    substrate: "Kiln-dried pine shavings or paper bedding, wooden shelves, dust bath two or three times a week",
    diet: "Unlimited grass hay, a plain pellet, and very few treats",
    health: "Drooling, wet chin or dropped food means overgrown molar spurs. That needs a vet with rodent experience.",
    notes: [
      "Overheating is what kills chinchillas in this country. They cannot cool themselves.",
      "Never wash one in water. The coat holds it and rots underneath.",
      "Sugary treats, including raisins and fruit, cause serious gut problems.",
      "They chew constantly and they will chew plastic. Plan the cage accordingly."
    ],
    img: "", wiki: "Chinchilla lanigera"
  },
  {
    id: "sugar-glider", group: "mammals", name: "Sugar glider", sci: "Petaurus breviceps",
    level: "Advanced", size: "24 to 30 cm including tail", life: "12 to 15 years",
    home: "Tall cage from 90 x 60 x 120 cm, always for two or more animals",
    temp: "18 to 30 °C, with a warm sleeping pouch",
    env: "Humidity is not critical. Draughts and cold nights are.",
    light: "Nocturnal. A normal day and night cycle, and no bright light at night.",
    substrate: "Paper bedding below, fleece pouches and branches above",
    diet: "A proper nectar and insect based diet, plus limited fruit and vegetables",
    health: "Hind leg weakness is nutritional bone disease from a fruit-heavy diet. It is common and preventable.",
    notes: [
      "Never keep one on its own. A solitary glider self-mutilates and declines.",
      "They are nocturnal and noisy at night. Barking and crabbing carries through walls.",
      "Twelve to fifteen years of nightly attention is the real commitment.",
      "They need a vet who treats exotics, and not every practice does."
    ],
    img: "", wiki: "Sugar glider"
  },
  {
    id: "syrian-hamster", group: "mammals", name: "Syrian hamster", sci: "Mesocricetus auratus",
    level: "Beginner", size: "13 to 18 cm", life: "2 to 3 years",
    home: "Floor space from 100 x 50 cm, one hamster only",
    temp: "18 to 24 °C, away from direct sun",
    env: "Dry, draught-free, quiet during the day",
    light: "Normal daylight cycle. They are nocturnal.",
    substrate: "25 cm or more of paper or aspen bedding for burrowing, plus a sand bath",
    diet: "A varied hamster mix, some fresh vegetables, occasional protein",
    health: "Wet tail is sudden diarrhoea in a young hamster and it is an emergency.",
    notes: [
      "Strictly solitary. Two Syrians in one cage will fight until one dies.",
      "Most pet-shop cages are far too small. Bedding depth matters as much as floor area.",
      "A wheel under 28 cm bends the spine. Solid running surface only.",
      "Nocturnal, which makes them a poor pet for a young child's bedroom."
    ],
    img: "", wiki: "Golden hamster"
  },
  {
    id: "dwarf-hamster", group: "mammals", name: "Winter white dwarf hamster", sci: "Phodopus sungorus",
    level: "Beginner", size: "8 to 10 cm", life: "18 months to 2 years",
    home: "Floor space from 80 x 50 cm with deep bedding",
    temp: "18 to 24 °C",
    env: "Dry and draught-free",
    light: "Normal daylight cycle",
    substrate: "Deep paper or aspen bedding, a sand bath, plenty of cover",
    diet: "Low-sugar dwarf hamster mix, some protein, no fruit",
    health: "Diabetes is common. Excessive drinking and urination is the first sign and a vet can test for it.",
    notes: [
      "Fruit, honey sticks and yoghurt drops are genuinely harmful to this species.",
      "Same-sex pairs sometimes work and often do not. Be ready to separate them.",
      "Fast and small, so they are hard work for small children to handle safely."
    ],
    img: "", wiki: "Djungarian hamster"
  },
  {
    id: "gerbil", group: "mammals", name: "Mongolian gerbil", sci: "Meriones unguiculatus",
    level: "Beginner", size: "10 to 12 cm plus tail", life: "3 to 4 years",
    home: "A tank or hybrid cage of at least 100 x 50 cm with very deep bedding",
    temp: "18 to 26 °C",
    env: "Dry. They come from desert steppe and dislike damp.",
    light: "Normal daylight cycle. They are active in bursts day and night.",
    substrate: "30 cm or more of bedding mixed with hay so tunnels hold their shape",
    diet: "Gerbil mix, some fresh vegetables, sunflower seeds sparingly",
    health: "A sore nose usually means the bedding is dusty or the tank is too humid.",
    notes: [
      "Keep same-sex pairs. A single gerbil is a lonely gerbil.",
      "They dig constantly, so bedding depth is the whole enclosure.",
      "Never grab the tail. The skin sheds off it and does not grow back."
    ],
    img: "", wiki: "Mongolian gerbil"
  },
  {
    id: "guinea-pig", group: "mammals", name: "Guinea pig", sci: "Cavia porcellus",
    level: "Beginner", size: "20 to 30 cm", life: "5 to 8 years",
    home: "About 1.2 m² of ground-level space for a pair, solid floor",
    temp: "17 to 24 °C, no draughts, deep shade outdoors",
    env: "Dry, well ventilated, out of direct sun",
    light: "Normal daylight. They are active in the day.",
    substrate: "Fleece or paper bedding with hay everywhere, and two hides so neither gets cornered",
    diet: "Unlimited grass hay, daily vitamin C vegetables, a plain guinea pig pellet",
    health: "They cannot make vitamin C. Scurvy shows as a rough coat, limping and reluctance to move.",
    notes: [
      "Rabbit pellets will make them ill. The food must be guinea pig food.",
      "Keep at least two. A guinea pig alone is a stressed guinea pig.",
      "Wire-floored hutches cause foot sores.",
      "They rarely climb, so floor area matters and levels do not."
    ],
    img: "", wiki: "Guinea pig"
  },
  {
    id: "rabbit", group: "mammals", name: "Domestic rabbit", sci: "Oryctolagus cuniculus domesticus",
    level: "Intermediate", size: "1.5 to 8 kg depending on breed", life: "8 to 12 years",
    home: "3 m² minimum with permanent access to a run, not a hutch alone",
    temp: "10 to 24 °C. They cope with cold far better than heat.",
    env: "Dry, shaded, well ventilated, protected from flies in summer",
    light: "Normal daylight, most active at dawn and dusk",
    substrate: "Straw and hay over a solid floor, with a litter tray and something to dig",
    diet: "Around 80 percent grass hay, fresh greens, a small measured pellet portion",
    health: "A rabbit that stops eating or passing droppings for 12 hours is a gut stasis emergency. Go to a vet the same day.",
    notes: [
      "A hutch on its own is not enough space, whatever the box says.",
      "Neutering prevents fighting and uterine cancer, which is common in unspayed females.",
      "Rabbits are social. A bonded pair is far happier than a single rabbit.",
      "Not a good starter pet for young children. They dislike being picked up."
    ],
    img: "", wiki: "Domestic rabbit"
  },
  {
    id: "fancy-rat", group: "mammals", name: "Fancy rat", sci: "Rattus norvegicus domestica",
    level: "Beginner", size: "20 to 25 cm plus tail", life: "2 to 3 years",
    home: "Tall wire cage from 80 x 50 x 80 cm, always for two or more",
    temp: "18 to 26 °C, well ventilated",
    env: "Low ammonia. Ventilation matters more than cage size for their lungs.",
    light: "Normal daylight, active at dusk and through the night",
    substrate: "Paper or hemp bedding. Never cedar or pine shavings.",
    diet: "A formulated rat block with fresh vegetables and occasional protein",
    health: "Respiratory disease is near universal in the species. Clicking, sneezing and porphyrin staining need a vet early.",
    notes: [
      "Never keep a single rat. They are intensely social and a lone rat deteriorates.",
      "Mammary lumps in females are common and usually operable if caught early.",
      "Clever, affectionate and easy to tame, but two to three years is a short life to plan for."
    ],
    img: "", wiki: "Fancy rat"
  },
  {
    id: "fancy-mouse", group: "mammals", name: "Fancy mouse", sci: "Mus musculus",
    level: "Beginner", size: "7 to 10 cm plus tail", life: "18 months to 3 years",
    home: "60 x 40 cm with deep bedding and plenty of climbing",
    temp: "18 to 24 °C",
    env: "Dry and very well ventilated",
    light: "Normal daylight cycle, nocturnal",
    substrate: "Deep paper bedding, tunnels, nesting material, a small solid wheel",
    diet: "A mouse seed and grain mix with a little fresh food",
    health: "Skin sores from over-grooming often mean overcrowding or a mite infestation.",
    notes: [
      "Females live happily in groups. Males usually have to live alone.",
      "Male mice have a strong smell that no amount of cleaning removes.",
      "Very fast and very small, so they need careful handling."
    ],
    img: "", wiki: "Fancy mouse"
  },
  {
    id: "pygmy-hedgehog", group: "mammals", name: "African pygmy hedgehog", sci: "Atelerix albiventris",
    level: "Intermediate", size: "15 to 25 cm", life: "4 to 6 years",
    home: "About 1 m² of solid floor space, one hedgehog only",
    temp: "22 to 26 °C ambient, which nearly always means added heating",
    env: "Dry and draught-free, with a warm hide",
    light: "Normal daylight cycle, nocturnal",
    substrate: "Fleece liners or paper bedding, a large solid wheel, a hide",
    diet: "High-protein low-fat cat food as a base, plus insects",
    health: "Wobbly hedgehog syndrome causes progressive hind leg weakness and has no cure. Buy from a breeder who tracks it.",
    notes: [
      "Below about 20 °C they attempt hibernation, and captive hedgehogs often die doing it.",
      "Strictly solitary. Two will fight.",
      "Nocturnal and busy, so expect wheel noise all night."
    ],
    img: "", wiki: "Four-toed hedgehog"
  },
  {
    id: "ferret", group: "mammals", name: "Ferret", sci: "Mustela putorius furo",
    level: "Advanced", size: "40 to 60 cm including tail", life: "6 to 10 years",
    home: "Multi-level cage at least 1 m wide, plus several hours of supervised free time daily",
    temp: "15 to 24 °C. Above 27 °C they suffer heatstroke.",
    env: "Cool, shaded and ventilated. Heat is the main summer risk here.",
    light: "Normal daylight, and they sleep up to 18 hours a day",
    substrate: "Fleece bedding and hammocks, litter trays in the corners",
    diet: "High-protein high-fat ferret or kitten food. They cannot digest plant matter.",
    health: "Adrenal disease and insulinoma are both common in middle age. Hair loss or hind leg weakness means a vet visit.",
    notes: [
      "They must be kept in pairs or groups. A lone ferret is a bored ferret.",
      "They will get into everything, including gaps you did not know existed.",
      "Vaccination and a vet who treats ferrets are both essential before you buy."
    ],
    img: "", wiki: "Ferret"
  },
  {
    id: "degu", group: "mammals", name: "Degu", sci: "Octodon degus",
    level: "Intermediate", size: "25 to 31 cm including tail", life: "6 to 8 years",
    home: "Multi-level metal cage at least 1 m tall, for a group of two or more",
    temp: "18 to 24 °C, and above 28 °C is dangerous",
    env: "Dry, with a sand bath available",
    light: "Normal daylight. They are active in the day, unlike most rodents.",
    substrate: "Paper or aspen bedding, wooden shelves, constant chew wood",
    diet: "Unlimited hay, a sugar-free chinchilla or degu pellet, no fruit at all",
    health: "Degus develop diabetes and cataracts from any sugar in the diet. Cloudy eyes are the warning sign.",
    notes: [
      "Highly social. Keep at least two, and never a single animal.",
      "No fruit, no carrots, no treat sticks. Sugar is the one rule that matters.",
      "Never catch one by the tail. The skin strips off it."
    ],
    img: "", wiki: "Degu"
  },
  {
    id: "hermit-crab", group: "inverts", name: "Land hermit crab", sci: "Coenobita clypeatus",
    level: "Intermediate", size: "5 to 15 cm", life: "10 to 20 years with correct care",
    home: "A 60 L glass tank with a sealed lid, for a group of three or more",
    temp: "24 to 28 °C",
    env: "Humidity 70 to 80 percent, with both fresh and salt water pools",
    light: "A normal day and night cycle, low UVB is optional",
    substrate: "15 cm of damp sand and coconut soil, deep enough to bury and moult",
    diet: "Commercial crab food, fruit, vegetables, calcium from cuttlebone",
    health: "A crab that buries itself for weeks is moulting, not dead. Digging it up usually kills it.",
    notes: [
      "They are social. One crab on its own does badly.",
      "Provide several empty shells a size up, or they will fight over them.",
      "Painted shells flake and poison them. Buy natural shells only.",
      "Most die within a year because the tank was too dry and too shallow."
    ],
    img: "", wiki: "Coenobita clypeatus"
  },

  /* ============================ INVERTEBRATES =========================== */
  {
    id: "curly-hair", group: "inverts", name: "Curly hair tarantula", sci: "Tliltocatl albopilosus",
    level: "Beginner", size: "13 to 15 cm legspan", life: "Females 15 to 20 years, males 3 to 5",
    home: "A terrestrial enclosure three to five times the legspan across, filled at least half way with substrate",
    temp: "20 to 26 °C, room temperature in most homes",
    env: "Moderate. Keep the lower substrate slightly damp and the surface dry, with good ventilation.",
    light: "None. Ambient room light only, and never a heat lamp.",
    substrate: "Deep coconut soil, at least half the enclosure height, with a cork hide",
    diet: "Adults every two to three weeks, juveniles every 7 to 10 days, spiderlings twice weekly",
    health: "A tarantula on its back is moulting. Leave it completely alone and do not feed for five to ten days afterwards.",
    notes: [
      "The most forgiving tarantula for a first spider. Good appetite and steady growth.",
      "Keep the gap between substrate and lid under one and a half legspans. A fall can rupture the abdomen.",
      "Pour water onto one corner of the substrate rather than misting the whole enclosure.",
      "It flicks irritating hairs when annoyed. Enjoy it through the glass."
    ],
    img: "", wiki: "Tliltocatl albopilosus"
  },
  {
    id: "rose-hair", group: "inverts", name: "Chilean rose tarantula", sci: "Grammostola rosea",
    level: "Beginner", size: "12 to 14 cm legspan", life: "Females 15 to 20 years",
    home: "Terrestrial enclosure three to five times the legspan, half filled with substrate",
    temp: "20 to 26 °C",
    env: "Dry substrate with a full water dish. This is an arid species.",
    light: "None",
    substrate: "Dry coconut soil with a cork bark hide",
    diet: "One or two appropriately sized crickets a week, less for adults",
    health: "Long fasts are normal in this species. Weight loss with a shrivelled abdomen is not, and means dehydration.",
    notes: [
      "Famous for refusing food for months at a time. That is the species, not illness.",
      "Keeping the substrate wet does more harm than keeping it dry with a water dish.",
      "Handling risks a fall. Watch rather than hold.",
      "Do not disturb one that is on its back. It is moulting."
    ],
    img: "", wiki: "Grammostola rosea"
  },
  {
    id: "red-knee", group: "inverts", name: "Mexican red-knee tarantula", sci: "Brachypelma hamorii",
    level: "Beginner", size: "13 to 15 cm legspan", life: "Females 25 to 30 years",
    home: "Terrestrial enclosure three to five times the legspan",
    temp: "22 to 28 °C",
    env: "Mostly dry with a water dish, and a slightly damp corner",
    light: "None",
    substrate: "Coconut soil deep enough to burrow, plus a cork hide",
    diet: "Crickets or roaches weekly, less as an adult",
    health: "A bald patch on the abdomen is flicked hairs, not disease. It fills in at the next moult.",
    notes: [
      "Calm and slow moving, which is why it is the classic first tarantula.",
      "Slow growing. A spiderling takes years to reach adult size.",
      "Twenty-five years is realistic for a female, so it is a long commitment."
    ],
    permit: "CITES Appendix II. Ask to see the paperwork when buying.",
    img: "", wiki: "Brachypelma hamorii"
  },
  {
    id: "chaco-golden-knee", group: "inverts", name: "Chaco golden knee tarantula", sci: "Grammostola pulchripes",
    level: "Beginner", size: "16 to 20 cm legspan", life: "Females 20 to 25 years",
    home: "Terrestrial enclosure three to five times the legspan, 30 cm across for an adult",
    temp: "21 to 27 °C",
    env: "Mostly dry with a large water dish, one damp corner",
    light: "None",
    substrate: "Deep coconut soil and a cork hide. They dig.",
    diet: "Adults every two to three weeks, juveniles weekly",
    health: "Slow, deliberate movement is normal. A hunched posture with legs curled underneath means it is in trouble.",
    notes: [
      "Large, docile and a very good display spider.",
      "One of the fastest growing of the calm New World species.",
      "It will rearrange the enclosure and bury the water dish. Refill it anyway."
    ],
    img: "", wiki: "Grammostola pulchripes"
  },
  {
    id: "gbb", group: "inverts", name: "Green bottle blue tarantula", sci: "Chromatopelma cyaneopubescens",
    level: "Intermediate", size: "13 to 15 cm legspan", life: "Females 12 to 14 years",
    home: "Enclosure three to five times the legspan with height for heavy webbing",
    temp: "24 to 29 °C",
    env: "Dry, with a water dish and strong ventilation. This is a desert species.",
    light: "None",
    substrate: "Dry coconut soil with anchor points for web: cork, branches and leaf litter",
    diet: "Weekly for juveniles, every two to three weeks for adults. They rarely refuse.",
    health: "Damp stagnant conditions kill this species faster than almost anything else.",
    notes: [
      "The heaviest webber in the hobby. The enclosure disappears under silk.",
      "Skittish and fast rather than defensive. Not a handling spider.",
      "Spectacular colours, which is why people put up with the speed."
    ],
    img: "", wiki: "Chromatopelma cyaneopubescens"
  },
  {
    id: "brazilian-black", group: "inverts", name: "Brazilian black tarantula", sci: "Grammostola pulchra",
    level: "Beginner", size: "15 to 18 cm legspan", life: "Females 20 to 30 years",
    home: "Terrestrial enclosure three to five times the legspan",
    temp: "21 to 27 °C",
    env: "Mostly dry with a water dish",
    light: "None",
    substrate: "Coconut soil deep enough to burrow, with a cork hide",
    diet: "Adults every two to three weeks",
    health: "Very slow growing, so a long gap between moults is normal rather than a warning.",
    notes: [
      "Widely considered the calmest tarantula in the hobby, and priced accordingly.",
      "Grows slowly, so an adult female represents years of care.",
      "Still a spider. Calm is not the same as safe to handle."
    ],
    img: "", wiki: "Grammostola pulchra"
  },
  {
    id: "horned-baboon", group: "inverts", name: "Rear-horned baboon spider", sci: "Ceratogyrus darlingi",
    level: "Advanced", size: "10 to 13 cm legspan", life: "Females 12 to 15 years",
    home: "Deep burrowing setup with at least 15 cm of packed substrate",
    temp: "24 to 28 °C",
    env: "Dry surface with slightly damp lower substrate, and a water dish",
    light: "None",
    substrate: "Packed coconut soil deep enough for a permanent burrow, with a starter hide",
    diet: "Crickets and roaches, and they have a strong feeding response",
    health: "A defensive posture with front legs raised means back off. Bites are painful and avoidable.",
    notes: [
      "Fast, defensive and not a beginner animal. Never handle one.",
      "The venom is not considered deadly to people, but a bite is genuinely painful.",
      "Indigenous to southern Africa, so ask us about the permit position first.",
      "It spends most of its life in a burrow, which is part of the appeal."
    ],
    permit: "Indigenous species. Check the provincial permit requirements before keeping one.",
    img: "", wiki: "Ceratogyrus darlingi"
  },
  {
    id: "emperor-scorpion", group: "inverts", name: "Emperor scorpion", sci: "Pandinus imperator",
    level: "Intermediate", size: "15 to 20 cm", life: "6 to 8 years",
    home: "45 x 30 x 30 cm with 10 cm of damp substrate and cork bark",
    temp: "25 to 30 °C",
    env: "Humidity 70 to 80 percent with good ventilation, and a water dish",
    light: "None. They are nocturnal and avoid bright light.",
    substrate: "Damp coconut soil deep enough to burrow, with flat bark to hide under",
    diet: "Crickets, roaches and the occasional locust",
    health: "Failed moults are usually the result of substrate that dried out. Do not intervene during a moult.",
    notes: [
      "The venom is mild, but the pinch from those claws does the real damage.",
      "They can be kept in small groups if the enclosure is big enough and everyone is well fed.",
      "They glow under UV light, which is a party trick, not a reason to leave a UV lamp on."
    ],
    permit: "CITES Appendix II. Ask to see the paperwork when buying.",
    img: "", wiki: "Pandinus imperator"
  },
  {
    id: "asian-forest-scorpion", group: "inverts", name: "Asian forest scorpion", sci: "Heterometrus spinifer",
    level: "Intermediate", size: "10 to 13 cm", life: "5 to 8 years",
    home: "45 x 30 x 30 cm with deep damp substrate",
    temp: "24 to 29 °C",
    env: "Humidity 70 to 80 percent, ventilated, with a water dish",
    light: "None",
    substrate: "Damp coconut soil and bark, deep enough to dig",
    diet: "Crickets and roaches weekly",
    health: "More defensive than an emperor and quicker to sting. The sting is painful rather than dangerous.",
    notes: [
      "Often sold as an emperor scorpion. Ask which one you are actually buying.",
      "Not a handling animal, and not one for a household with children.",
      "House alone unless you have the space and the experience for a communal setup."
    ],
    img: "", wiki: "Heterometrus"
  },
  {
    id: "hissing-cockroach", group: "inverts", name: "Madagascar hissing cockroach", sci: "Gromphadorhina portentosa",
    level: "Beginner", size: "5 to 8 cm", life: "2 to 5 years",
    home: "A 30 L tub with a smooth barrier at the top, they climb glass easily",
    temp: "24 to 30 °C",
    env: "Humidity 60 to 70 percent with ventilation",
    light: "None. Nocturnal.",
    substrate: "Coconut soil with egg crate and bark to hide in",
    diet: "Vegetables, fruit and dry dog food",
    health: "Mites on the shell are usually harmless commensals. A dirty enclosure makes them explode in number.",
    notes: [
      "They climb glass and they escape. The barrier at the top is the whole job.",
      "They hiss when handled, which startles people but is harmless.",
      "They breed steadily, which makes them a useful feeder colony as well as a pet."
    ],
    img: "", wiki: "Gromphadorhina portentosa"
  },
  {
    id: "giant-millipede", group: "inverts", name: "Giant African millipede", sci: "Archispirostreptus gigas",
    level: "Beginner", size: "20 to 30 cm", life: "5 to 10 years",
    home: "60 x 30 x 30 cm with very deep substrate",
    temp: "24 to 28 °C",
    env: "Humidity 70 to 80 percent, damp throughout but not waterlogged",
    light: "None",
    substrate: "20 cm of coconut soil mixed with rotting hardwood leaves and bark, which is also their food",
    diet: "Decaying leaf litter and rotting wood, plus vegetables and a calcium source",
    health: "They burrow for weeks to moult. Digging one up during a moult usually kills it.",
    notes: [
      "The substrate is the diet. Plain soil with no leaf litter starves them slowly.",
      "They secrete a defensive fluid that stains skin and stings eyes. Wash your hands.",
      "Calcium matters for the exoskeleton, so keep cuttlebone in the enclosure."
    ],
    img: "", wiki: "Archispirostreptus gigas"
  },
  {
    id: "stick-insect", group: "inverts", name: "Indian stick insect", sci: "Carausius morosus",
    level: "Beginner", size: "8 to 10 cm", life: "1 to 2 years",
    home: "Mesh or ventilated enclosure at least three times the insect's length in height",
    temp: "20 to 26 °C",
    env: "Humidity 60 to 70 percent, misted lightly each day",
    light: "Ambient room light",
    substrate: "Paper towel floor for easy cleaning, with fresh cut foliage in water",
    diet: "Fresh bramble, privet or ivy, replaced every few days",
    health: "They must have vertical space to moult. A short enclosure causes deformed legs.",
    notes: [
      "All-female colonies reproduce without males, so numbers climb fast.",
      "Never let eggs or insects escape into the garden. They can establish.",
      "A good first invertebrate for children, with adult supervision."
    ],
    img: "", wiki: "Carausius morosus"
  }
];
