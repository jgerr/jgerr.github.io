// Explanation of var
// Key: ID of locale
// column_name: column name corresponding to locale in data
// display_name: locale name to show
// blurb: text desc of locale to show
// path_to_next: to get to next locale, any intermediate locales if relevant.
//    For example, if going from 5 to 6 means going through 4, then input would be [4]. If no intermediate, leave empty
//    For each intermediate locale moving to next will use the to_next_align_first property of that intermediate locale
// to_next_align_first: "H", "V", or "D"
//  when moving to next locale, whether to shift first horizontally (H) or vertically (V) to match X or Y coordinataes with next locale
//  if D, shift horizontal and vertical simultaneously

var localeInfo = {
  0: {
    column_name: "pallet_town",
    display_name: "Pallet Town",
    blurb:
      "Pallet Town is where you'll start your journey. You can go fishing here!",
    path_to_next: [],
    to_next_align_first: "H"
  },
  1: {
    column_name: "route_1",
    display_name: "Route 1",
    blurb: "A peaceful area with Pokemon hiding in tall grass.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  2: {
    column_name: "viridian_city",
    display_name: "Viridian City",
    blurb:
      "A small city, complete with a Pokemon Center. You can go fishing here.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  3: {
    column_name: "route_22",
    display_name: "Route 22",
    blurb: "West of Viridian City, there are many Rattata hiding in the grass.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  4: {
    column_name: "route_2",
    display_name: "Route 2",
    blurb: "This route bridges the area from Viridian City to Viridian Forest.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  5: {
    column_name: "viridian_forest",
    display_name: "Viridian Forest",
    blurb: "Many Bug and Flying-Type Pokemon await you in this forest!",
    path_to_next: [],
    to_next_align_first: "H"
  },
  6: {
    column_name: "pewter_city",
    display_name: "Pewter City",
    blurb: "Home to Brock, the Rock-type gym leader. No Pokemon to catch here!",
    path_to_next: [],
    to_next_align_first: "V"
  },
  7: {
    column_name: "route_3",
    display_name: "Route 3",
    blurb:
      "This hilly route leads into Mt. Moon. You'll find Pokemon in grass along the way.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  8: {
    column_name: "mt_moon",
    display_name: "Mt. Moon",
    blurb:
      "This mountain is home to many Zubats. Rumor says fossils are hidden inside!",
    path_to_next: [],
    to_next_align_first: "V"
  },
  9: {
    column_name: "route_4",
    display_name: "Route 4",
    blurb:
      "The route that leads from Mt. Moon to Cerulean City, few Pokemon reside here.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  10: {
    column_name: "cerulean_city",
    display_name: "Cerulean City",
    blurb: "Home to Misty, the Water-type gym leader. You can fish in her Gym.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  11: {
    column_name: "route_24",
    display_name: "Route 24",
    blurb:
      "This route spans Nugget Bridge. You can find Pokemon in grass or by fishing.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  12: {
    column_name: "route_25",
    display_name: "Route 25",
    blurb: "At the end of this route lives Bill, the Pokemaniac.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  13: {
    column_name: "route_5",
    display_name: "Route 5",
    blurb:
      "This route between Cerulean City and Saffron City houses the Pokemon Daycare.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  14: {
    column_name: "route_6",
    display_name: "Route 6",
    blurb:
      "Connected to Route 5 by tunnel, Pokemon live in the grass and water here.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  15: {
    column_name: "vermillion_city",
    display_name: "Vermillion City",
    blurb:
      "Home to Lt. Surge, the Electric-type gym leader. You can fish in the harbor.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  16: {
    column_name: "ss_anne",
    display_name: "S.S. Anne",
    blurb:
      "A cruise liner full of trainers thirsty for a fight! No Pokemon spawn here.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  17: {
    column_name: "route_11",
    display_name: "Route 11",
    blurb:
      "East of Vermillion City, this route connects to Route 2 via Diglett's Cave.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  18: {
    column_name: "digletts_cave",
    display_name: "Diglett's Cave",
    blurb:
      "As one may expect, this cave is filled with Digletts. A few Dugtrios, too.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  19: {
    column_name: "route_9",
    display_name: "Route 9",
    blurb:
      "Many pokemon can be encountered along this route outside the Rock Tunnel.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  20: {
    column_name: "route_10",
    display_name: "Route 10",
    blurb:
      "This route has a Pokemon Center, Power Plant, and the Rock Tunnel's entrance.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  21: {
    column_name: "rock_tunnel",
    display_name: "Rock Tunnel",
    blurb: "Connecting Route 10 to Lavender Town, this tunnel is pitch black.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  22: {
    column_name: "lavender_town",
    display_name: "Lavender Town",
    blurb: "This town is the final resting place for many departed Pokemon.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  23: {
    column_name: "route_8",
    display_name: "Route 8",
    blurb:
      "East of Saffron City, many trainers lie in wait for a battle on this Route.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  24: {
    column_name: "route_7",
    display_name: "Route 7",
    blurb: "West of Saffron City, this route connects to Route 8 underground.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  25: {
    column_name: "celadon_city",
    display_name: "Celadon City",
    blurb:
      "Home to Erika, the Grass-type gym leader. You can fish in the pond.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  26: {
    column_name: "team_rocket_hq",
    display_name: "Team Rocket HQ",
    blurb:
      "Nefarious criminals want to battle you! You won't find wild pokemon here.",
    path_to_next: [25],
    to_next_align_first: "H"
  },
  27: {
    column_name: "pokemon_tower",
    display_name: "Pokemon Tower",
    blurb:
      "Rumor has it ghosts haunt the Pokemon Tower, causing havoc in Lavender Town.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  28: {
    column_name: "saffron_city",
    display_name: "Saffron City",
    blurb:
      "Home to Sabrina, the Psychic-type gym leader. You can win Pokemon in the dojo.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  29: {
    column_name: "silph_co",
    display_name: "Silph Co.",
    blurb:
      "After saving Silph Co. from Team Rocket, you can get a Lapras as a gift.",
    path_to_next: [28, 25],
    to_next_align_first: "H"
  },
  30: {
    column_name: "route_16",
    display_name: "Route 16",
    blurb: "West of Celadon City, this is the start of Cycling Road.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  31: {
    column_name: "route_17",
    display_name: "Route 17",
    blurb:
      "The intense slope on Route 17 will have you speed past trainers and grass!",
    path_to_next: [],
    to_next_align_first: "V"
  },
  32: {
    column_name: "route_18",
    display_name: "Route 18",
    blurb: "Outside of Fuchsia City, you can roam grass or go fishing here.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  33: {
    column_name: "fuchsia_city",
    display_name: "Fuchsia City",
    blurb:
      "Home to Koga, the Poison-type gym leader. You can go fishing in the city.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  34: {
    column_name: "safari_zone",
    display_name: "Safari Zone",
    blurb:
      "You can catch numerous wild Pokemon here without fighting them first!",
    path_to_next: [33, 31, 25, 22],
    to_next_align_first: "V"
  },
  35: {
    column_name: "route_12",
    display_name: "Route 12",
    blurb: "You can fish or explore the grass in this water-locked route!",
    path_to_next: [],
    to_next_align_first: "V"
  },
  36: {
    column_name: "route_13",
    display_name: "Route 13",
    blurb: "This maze-like route has lots of grass, and a spot to fish, too.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  37: {
    column_name: "route_14",
    display_name: "Route 14",
    blurb:
      "There's grass to forage through and trainers to battle on this route.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  38: {
    column_name: "route_15",
    display_name: "Route 15",
    blurb: "More grass to forage through and trainers to battle on this route.",
    path_to_next: [33, 43, 44, 40],
    to_next_align_first: "V"
  },
  39: {
    column_name: "route_21",
    display_name: "Route 21",
    blurb:
      "You can wade through grass, surf on water, or go fishing on this route.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  40: {
    column_name: "cinnabar_island",
    display_name: "Cinnabar Island",
    blurb:
      "Home to Blaine, the Fire-type gym leader. You can fish from the island.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  41: {
    column_name: "pokemon_mansion",
    display_name: "Pokemon Mansion",
    blurb: "This abandoned mansion is overrun with Pokemon and burglars!",
    path_to_next: [1, 2, 6, 10],
    to_next_align_first: "H"
  },
  42: {
    column_name: "power_plant",
    display_name: "Power Plant",
    blurb:
      "Full of Eletric-type Pokemon, the Legendary bird Zapdos is found here.",
    path_to_next: [35, 36, 37, 38, 33],
    to_next_align_first: "H"
  },
  43: {
    column_name: "route_19",
    display_name: "Route 19",
    blurb: "You can go surfing along this route.",
    path_to_next: [],
    to_next_align_first: "V"
  },
  44: {
    column_name: "route_20",
    display_name: "Route 20",
    blurb: "You can go surfing along this route.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  45: {
    column_name: "seafoam_island",
    display_name: "Seafoam Island",
    blurb:
      "With caves full of Pokemon, the Legendary bird Articuno is found here.",
    path_to_next: [40, 1],
    to_next_align_first: "V"
  },
  46: {
    column_name: "viridian_city_2",
    display_name: "Viridian City",
    blurb:
      "Home to Giovanni, the Ground-type gym leader. You can go fishing here.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  47: {
    column_name: "victory_road",
    display_name: "Victory Road",
    blurb:
      "Cavernous entrance to the League, and home to Legendary bird Moltres.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  48: {
    column_name: "route_23",
    display_name: "Route 23",
    blurb:
      "This long route leads to Victory Road, entrance to the Pokemon League.",
    path_to_next: [],
    to_next_align_first: "H"
  },
  49: {
    column_name: "indigo_plateau",
    display_name: "Indigo Plateau",
    blurb: "Battle the Elite Four, Kanto's finest! No wild encounters here.",
    path_to_next: [47, 6, 10],
    to_next_align_first: "H"
  },
  50: {
    column_name: "unknown_dungeon",
    display_name: "Unknown Dungeon",
    blurb: "This final dungeon is home to the experimental Legendary, Mewtwo.",
    path_to_next: [],
    to_next_align_first: "D"
  }
};
