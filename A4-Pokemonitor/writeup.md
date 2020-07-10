# A4 Writeup
## Intro
For those who grew up in the 2000s, the Pokemon franchise is likely familiar territory. From the television series starring Ash Ketchum, to the plushies of Pikachu that sit atop many childrens' beds, it is easy to tell that Pokemon are beloved by many. How did this come to pass? 


It all began with two games: Pokemon Red and Blue, which took you on a journey throughout the fields and mountains of the Kanto region. But for many, what truly stood out wasn't the lush pixel scenery; nor was it the promise of stopping Team Rocket's goons. It was the Pokemon encounters themselves, with the promise of uncharted territories with creatures never seen before waiting right around the corner of each map; and thus, the childhood joy of collection was thus consolidated into a cartridge. We see now, 24 years later, that the old mantra--"Gotta catch 'em all!"--has withstood the test of time. 

We created PokeMonitor as a means of delving deeper into the narrative of a beginning Pokemon trainer's journey around Kanto, providing an intimate look at that which defined the novel experience of playing Pokemon for the first time: the wild Pokemon encounters that a trainer stumbles into on their quest to catch 'em all.

## Rationale
### **Map**
One of the main features of our viz is the map of the Kanto region, featured prominently on the left hand side of the screen. This feature was absolutely necessary, because we wanted to display the spatial narrative of a player who is exploring the areas throughout Pokemon Red, and needed a map to ground that exploration in context. 

Rather than using a pre-existing graphic, we ended up creating our own pixelated version of the Kanto region, and using this as our main map. This was motivated in part by a desire to pay homage to the pixel art of the original Pokemon games, and in part by our preference for maintaining a cohesive and consistent visual aesthetic across the entirety of our page. Creating a map ourselves, using the Kanto region maps on Google as reference for spatial alignments, allowed for increased creative freedom. 

We wanted to allow for users to view the spawn information for an area simply by selecting it on the map. To accomplish this, the map uses an SVG overlay to enable area selection across different routes and cities in the Kanto region. Each area has its own stroke and fill defined; on hover, a dashed stroke (in accordance with our pixel-style aesthetic) appears, along with a tooltip that labels what area is being hovered over; and on selection, the area's stroke remains, a translucent fill fades in, and the bar chart info on the right updates to show the statistics for the current region. The encodings make it easy for a user to figure out where selectable areas are, since the fade-in time for the hover stroke is very low, and peruse the different areas without committing to one when looking for a specific route or city, since the tooltip over the area selection box tells you what a location's name is without you needing to select it first. Likewise, the fill makes it obvious which area you have selected, adding a new visual aspect to the border--so even while scrubbing over other areas, it always clear which area you have currently selected.

### **Player Icon**
The icon representing where the player is has two purposes: its shape is reminiscent of both an arrow, pointing to the current location of the player, and of a person, reminding us that we're monitoring how a real person might interact with the world of Pokemon Red. This, too, was made by us in a pixel style to further solidify our overall aesthetic. We first used a static .png as the visual for this graphic, but decided later that an animated .gif would aid us by encouraging interaction. As the icon "turns" in place, it serves as something of an "idle animation", which reminds us that the player is waiting for us, too. They're waiting in place for the next step on their journey, be it something you determine by selecting it on the map, or be it the next step on the optimal path we've built in for a first-time player.

### **Buttons**

There are four buttons on the map. One allows the player to toggle between playing and pausing the player's journey on a route we based off the StrategyWiki walkthrough; two of them allow the player to step forward and backward one step from where they currently are; and the last one resets their journey, placing them back at Pallet Town. These buttons serve as the basic controls to view a player's adventure, in a recommended order that doesn't rely upon or necessitate user interaction. You can simply play the route, and watch what the user might encounter in the bar chart on the right, which allows you to observe spawns from a hands-off point of view. Furthermore, we have greyed-out "disabled" versions of the buttons; the grey visual encodings tell you that you cannot use the step or restart functions mid-play, and instead, must pause first.

### **Bar chart**
The bar chart on the right-hand side of the screen displays the different spawn rates of Pokemon along each route, city, or cave. Different bars correlate to different Pokemon, and they are placed side-by-side to enable easy relative comparison between bars. The axis on the bottom representing percentage of total spawn goes from 0 to 100, and *stays there*; it does **not** adjust to match the highest percentage visible on the graph at a given point in time. This was a deliberate choice; we felt that resizing it to match the highest percentage could be misleading, because the highest percentage can range anywhere from 25% to 100% of the total spawn--but those two values are extremely different, and should not be equated in the users' mind. By establishing the scale from 0-100 and keeping it there, users can always tell what the fraction of Pokemon's spawning rate is relative to a full 100%, in addition to how a Pokemon's individual spawn rate measures up to other Pokemon in the same area.

The bar chart animates seamlessly from one chart to the next, which promotes our narrative visualization's sense of seamless temporality. Since bars blend in to other bars, and are removed and reordered without hassle, it makes it feel like all spawns are somewhat connected to each other--which is true, as all these Pokemon do live in the Kanto region, and oftentimes areas in close proximity share common Pokemon between them.

Different bar colors show whether a Pokemon spawns on land, in a cave, via fishing, from surfing, or through a special encounter. These colors help us show that the sum of all the spawns in a certain area adding to >100% is not incorrect; rather, it means that different areas with different ways to encounter Pokemon have varying Pokemon spawns for each encounter type, and those bars coded under the same individual type ought to add up to 100%.

### **Pokedex Tooltips**
By hovering over a bar, you can reveal more information about a Pokemon in a tooltip that appears underneath the bar chart. It shows you an image of the Pokemon, its Pokedex number, type, weight, height, and gender ratio of this Pokemon population if applicable; though some Pokemon, like legendaries and Ditto, have no gender. The tooltip appears when a user has shown that they are interested in learning more about the Pokemon in question, which they have demonstrated by hovering their cursor over the bar already. Since many Pokemon may coexist in a given area, we didn't want to overload the player with information about 10 Pokemon onscreen simultaneously--and, it would lead to a very cramped visualization design.

## Development

Overall, we spent about 35 hours developing PokeMonitor. We found that aspects which took a long time generally fell into one of two categories: they were either difficult to implement, or tedious to do. Tedious tasks included things like, perusing StrategyWiki for spawn rates and formatting that in a CSV, or inputting data into a CSV that defined each individual area across 50 different boxes. Redrawing a stylized Kanto map also took a few hours, though the grind was more enjoyable and less tedious. Features that required lots of testing and were prone to finnicky interference, like knowing when to disable narrative control buttons while the icon was mid-animation, or delineating paths along the SVG that would result in the player icon moving in a realistic manner across the map, required iteration to iron out.


Our work was split like thus:

#### Joanna
- Made the horizontal D3 bar graph of spawn-rates, its animated bar transitions, and the 5-color legend beneath it
- Drew the pixel-art map of Kanto used in the viz, drew and animated the turning player icon gif, drew enabled and disabled versions of pixel-art buttons for Step Forward/Backward, Play/Pause, Reset functionality
- Made tooltips with location name that are centered over each selectable area
- Gathered location spawn data from StrategyWiki & wrote descriptive blurbs for every location that describe notable features (eg. tunnels, Gym leaders, ...)
- Wrote a description for how to interact with the site, anchored to bottom left of screen
- Made initial HTML buttons to toggle between playing/pausing the player animation, step forward/backward, and reset to the start of a journey 
- A million front-end CSS shenanigans:
  - General layout and composition of body elements
  - Finding pixel fonts for title and body text, assigning opaque drop shadows to emphasize pixel-ness where necessary, and etc.
  - Styling SVG outline strokes to look pixel-art-esque
  - Refined Pokemon tooltips, anchoring beneath graph, styling them, and showing Pokemon image pulled from online database using Pokedex number

#### Jenny
- Wrote Python script to create SVG overlay based off localePoints CSV file
- Input map locations into localePoints CSV file, defining boxes as top-left/bottom-right coordinate pairs
- Created pseudo-JSON of locale information, localeInfo, linking data columns to display names, blurbs, and paths to next destination
- Wrote JS to allow for selection of different areas on the map by defining independent SVG boxes and strokes for each
- Refined buttons for flow control, disabling step forward/backward and reset while animation is playing; and also while the player icon is mid animation across the screen
- Made and populated initial Pokemon tooltip on bar hover
- Defined different types of locomotion for icon movement onscreen to allow for movement that stays on Kanto map routes:
  - Direct linear movement from one area to another when across the map
  - Horizontally-aligned movement between adjacent areas
  - Veretically-aligned movement between adjacent areas

