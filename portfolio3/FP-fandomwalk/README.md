# fandom-walk
### Joanna Gerr (gerr@mit.edu)

![Fandom-walk in action](https://i.imgur.com/f11rz5Z.png)

## Abstract
Fandom-walk is a choice-driven narrative data visualization that centers around the experience of writing fanfiction within fandom. Through explicit visual encodings that draw direct connections between the process of writing fanfiction and the choices made when designing a data visualization, and specifically-designed interactions that further cement the tangible presence of normally-hidden labor, fandom-walk encourages the user to consider both the deliberate processes that go into construction of these final processes--and the instinctive reactions that arise when certain expectations for success go unmet.

[Link to project.](https://github.mit.edu/pages/6894-sp20/FP-fandomwalk/)

[Link to paper.](https://github.mit.edu/6894-sp20/FP-fandomwalk/blob/master/final/gerr_fandomwalk_paper.pdf)


## Research + Development
The research for this project entailed looking into different datasets for fandom (specifically fanfiction) data and weighing the pros and cons of different ones. I debated between breadth--meaning, having a large number of fandoms and a sizable quantity of samples from each--and depth--meaning, I'd focus on one fandom and just use tons of samples from the one. In the end, I felt it was more meaningful to look across different fandoms, instead of doing a deep dive into one alone. Likewise, I already had some intuition for what to expect (having read fanfiction and been in fandom or fandom-tangential spaces much of my teenage life), but there were still moments I was surprised by the results I saw. 

## Design
This system has 3 major design components:
### Text Editor
The text editor was designed in a manner such that both the interactions performed and the visual encodings themselves would be reminiscent of basic text editors, like Notepad. To that end, the text itself appears as though it is being typed (with a relatively fast, but slightly randomized pace between letters); and when waiting for user input, a "blinking" cursor appears, like is the case when using a real text editor. Likewise, menus at the top left provide extra functionality, like recalling a "Help" prompt or starting a "New" document. The "popup title" title also contributes to clueing the user in as to what they're doing; it is literally called "fanfiction.txt", after all!

### Terminals
The three terminal windows serve to display most of D3 data-viz here. They consist of: 
- **Scatterplot:** a large plot that shows how popular various fanfiction pieces are, with popularity measured as a function of the number of comments received against the number of times other users favorited the work. Immediately, you are able to compare how "your fanfic" did against all the others, view a general distribution of work popularity, and mouse over all the data points to inspect the finer attributes of how they compare to your fanfic in terms of genre, rating, and length. Likewise, the three key values on the scatterplot indicate what kinds of 
- **Heatmap:** the heatmap shows bins of genre against rating, and serves to display which genres combined with which ratings are the most popular sources of inspriation for authors. Mousing over the different heatmap bins also causes the corresponding data points to light up on the plot, thereby revealing clusters (or the lack thereof).
- **Tooltip:** the tooltip is the main information-displaying terminal. Extra information is shown here when the scatterplot and heatmap are moused over; there is not enough space on the graphs themselves, and they are already visually intensive, so for usability, extra info is cordoned off into a designated terminal window.
  
I chose terminals to represent the D3 because, in some sense, terminals represent what goes on at a lower-level when we operate our computers. Likewise, the desire to know how well our creative pieces do, and how they compare to others' works, is a low-level desire that is hard for us to drop, try as we may.
### Fanfiction Site
This popup takes the form of an ffnet/AO3 inspired Fanfiction Site. It shows what your "fanfiction" looked like, with your "fanfiction" being randomly chosen from the subset of all fanfics that fit the filters you applied. Then, the pseudo text and title are blurred out, to preserve the "anonymity" of the work--though in reality, the text is placeholder lorem ipsum. One stretch goal in the future would be to replace the lorem ipsum with GPT-2, which would similarly maintain anonymity and not require use of real people's writings to convey the same idea of the user authoring their own fanfiction. Originally, I wanted to do more with this area--make it a full-fledged site, with filters and dropdowns and radio boxes. In the end, I didn't have the time to build that functionality out, but I at least wanted to make clear the narrative connection between the user writing out their intentions in a text document, then publishing it online, and seeing the holistic results in the terminals.

## Workload
As a group of 1, I did all the work on this project. This included:
- Performing lots of preprocessing on the data to cull the dataset down to a usable, wieldy size. Determining which columns were most useful, randomly sampling the tens of thousands of datapoints per each of the largest fandoms, etc.
- Designing the text-editor-like interactions present in the project. Making a custom system of alternating static-dyanmic divs, and a fake blinking cursor, and then using those to filter on the data.
- Doing CSS to make the whole thing visually cohesive and appealing. So much CSS. Making that fake website based off AO3 and ffnet, the text editor based off notepad, and the terminals based off general bash terminals but also a healthy dose of movie hackerman black-and-green scheming. CSS is so good.
- Making so many D3 visualizations oh my god. I went from scatterplots to heatmaps to different ridgeline plots, and almost turned my heatmap into a circular heatmap--it would've looked so good but the inner ring's smallest bars would be too small--and in the end, I went with ones that I feel were pretty simple. Simple's not always bad, though; the scatterplot was by far the visualisation I enjoyed playing with most.
- Linking together multiple D3 visualizations; making it so the heatmap also works as a fandom filter on the scatterplot, and they both give you useful tooltips regarding the relative success and rankings of individual data points.
- Designing and partially implementing a fake website for showing off the "result" of one writing their "fanfiction". I wanted to do a lot more with this, but there was no time. Perhaps in a stretch goal down the line!
- "Text document"-like desktop links that open up to the other necessary pages (eg. this readme, and my paper!)
- New button that allows you to restart the interaction without refreshing the page.
- Help and Sources buttons on the page that let you know what the point of this is, and how you interact with the system properly if the interactions seem unintuitive.
- Using the animate.css library to make them funky popup animations and stuff... minimal editing really, animate.css is love.
- Presenting the milestone
- Writing a final paper
- Recording the final video

## Acknowledgements
The [data I used](http://research.fru1t.me/) was from UWash researchers Kodlee Yin, Cecilia Aragon, Sarah Evans, and Katie Davis; much thanks to them for amassing such a wide, comprehensive, and anonymized dataset. In addition, I also used D3 and Animate.css in this project.
