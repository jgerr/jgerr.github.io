# Planning
## Features desired
### **Site Interactions**
- [X] Typing input
- [X] Sentence fragmentation
  - [X] Alternating divs of text output, typing input
  - [X] Blinking cursor
  - [X] Display possible options in grey
  - [X] Highlight choices in hotpink-red
- [ ] Pseudo-text generation
  - [ ] Title
  - [ ] Lorem ipsum
- [ ] Clippy-esque helper
- [ ] Text-editor buttons
  - [ ] New
  - [ ] Random
  - [ ] Help
  - [ ] Sources
- [ ] On-site icons
  - [ ] Poster 
  - [ ] Writeup
  - [ ] Github link
  - [ ] Trash (animate for "new" or "random")

### **D3**
- [X] Popup graphs
  - [X] Resize in proportion to window size
- [ ] Scatter plot - "CONGRATULATIONS! YOU ARE THE 1000th RANKED"
  - [X] Base scatter plot off ranking within fandom
  - [ ] Add tooltip - ranking, tags
  - [ ] Add popup styling
- [ ] Heatmap - "Get Popular QUICK With These Easy Tips!"
  - [X] Base heatmap off rating vs. category fic quantity within fandom
  - [ ] Add tooltip - numerical quantity
  - [ ] Add popup styling
- [ ] Fic filtration - "Welcome to FansOfOurFiction.org!" 
  - [ ] See vast possibility space, and explore it. update graphs in response to filtration. Ridgeline plot...?

### **AESTHETIC**
- [X] Choose a font
  - **Courier prime.**
- [X] Choose a scheme
  - **Desktop. Text-editor. Online.**
- [X] CSS the shit out of everything to achieve desired scheme and animations.
- [x] Accent color
  - **hot pink**

## Current todo-list
- First, D3 popup styling and additions.
- Then, pseudo-text generation.
- Clippy is your friend. B-)
- Finally, all buttons and icons links.
- GOALS: for me
  - reveal hidden labor through interaction
  - encodings that reflect how we interface with things. how we view things. clippy = annoying, terminal = under the hood
  - something more realtime would be really cool, but i don't have the data for that (realtime = how ppl view it as it comes out, fn of time from release)
- GOALS: for someone else
  - to gain inspiration, maybe
  - meta analysis/commentary. idea of comparison, see what does well, see how well what you did does; intrusive popups, intrusive thoughts.
  - sheer size of possibility space


## Buglist
- No "/" input for "Hurt/Comfort"
## Completed tasks
- Main initial interactivity. Text input to graph output cycle.