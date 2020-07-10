// Information and names on regions stored in localeInfo variable in localeInfo.js

// INITIALIZATION:
var current_locale = 0;

// left and top of player icon, in percent relative to parent
// hardcoded (also in CSS) for first locale location
var current_player_rel_left_pct = 39.9;
var current_player_rel_top_pct = 66.3;

// whether in play mode
var playing = false;

// setting margins + dimensions

// var margin = { top: 20, right: 10, bottom: 40, left: 120 },
//   width = 500 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

var margin = { top: 2, right: 10, bottom: 60, left: 120 },
  width = document.body.clientWidth * 0.3 - margin.left - margin.right,
  height = document.body.clientHeight * 0.45 - margin.top - margin.bottom;

// append svg to page
var svg = d3
  .select("#spawn_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// init x axis; this does not change!
var x = d3
  .scaleLinear()
  .domain([0, 100])
  .range([0, width]);
var x_axis = svg
  .append("g")
  .attr("class", "axis x_axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-30)")
  .attr("class", "unselectable")
  .attr("font-family", "CyborgSister")
  .attr("font-size", "1.2vw")
  .style("text-anchor", "end");

svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                      (height + margin.bottom - 5) + ")")  
  .attr("class", "whiteblue2")
  .style("text-anchor", "middle")
  .text("% of total spawn");

// init y axis; this DOES change!
var y = d3
  .scaleBand()
  .range([0, height])
  .padding(0.2);
var y_axis = svg.append("g");

// SPAWN BARGRAPH METHODS:
// parsing data with async csv mthd:
function update_graph(key) {
  // Update highlighting/border of locales
  try {
    switchLocaleVisuals(current_locale, key);
  } catch (err) {
    console.log("Could not update map highlighting");
    console.log(err);
  }
  // Update player location - IMPORTANT that this comes before current_locale is updated
  movePlayerIconToLocale(key);

  current_locale = key;

  // Update displayed text
  document.getElementById("region_name").innerHTML =
    localeInfo[key]["display_name"];
  document.getElementById("blurb").innerHTML = localeInfo[key]["blurb"];

  // Hide tooltip with any info from past graph
  hideTooltip();

  d3.csv(
    "https://gist.githubusercontent.com/jgerr/3e3f049b216bca33b9309d9aa06cea2b/raw/f01a9cd397625d15fa9cc0a95215dc106d936aba/kanto_red_fullspawns",
    //"https://gist.githubusercontent.com/jgerr/a911c953e8f84b36a89baeb7e197fe13/raw/6f695ba38ddc9c6158955028ced45918891411cb/kanto_red_spawnrates",
    function(data_init) {
      var data_full = data_init;
      var data_filtered = data_init.filter(function(d) {
        return d[localeInfo[key]["column_name"]] > 0;
      });
      display(data_filtered, key);
    }
  );
}

function display(data, key) {
  var tip = document.getElementById("tooltipContent");
  // update ze y axis
  y.domain(
    data
      .sort(function(a, b) {
        //this doesn't entirely work, :thinking:
        return d3.descending(
          a[localeInfo[key]["column_name"]],
          b[localeInfo[key]["column_name"]]
        );
      })
      .sort(function(a, b) {
        return d3.ascending(a.location, b.location);
      })
      .map(function(d) {
        return d.pokemon;
      })
  );

  y_axis
    .attr("class", "axis y_axis")
    .transition()
    .duration(300)
    .call(d3.axisLeft(y))
    // .call(g => g.select(".domain").remove()) // to remove the y axis line--but transition delay undesirable
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .attr("class", "unselectable")
    .attr("font-family", "CyborgSister")
    .attr("font-size", "1.4vw")
    .style("text-anchor", "end");

  var bars = svg.selectAll("rect").data(data);

  bars
    .enter()
    .append("rect") // add rects for new elements
    .merge(bars) // merge into existing
    .on("mouseover", function(d) {
      showTooltip(d, d3.select(this.parent));
    })
    .on("mouseout", function(d) {
      hideTooltip();
    })
    .transition()
    .duration(300)
    .attr("x", x(0))
    .attr("y", function(d) {
      return y(d.pokemon);
    })
    .attr("width", function(d) {
      return x(d[localeInfo[key]["column_name"]]);
    })
    .attr("height", y.bandwidth())
    .attr("rx", 4) //to get rounded corners
    .attr("class", "bar_style")
    .attr("fill", function(d) {
      return color(d.location);
    });

  // delete excess bars if fewer bars now than before
  bars
    .exit()
    .attr("fill-opacity", 1)
    .attr("stroke-opacity", 1)
    .transition()
    .duration(100)
    .attr("fill-opacity", 0)
    .attr("stroke-opacity", 0)
    .remove(); //remove after fadeout
}

function color(location) {
  if (location == "Land") return "#27d956";
  else if (location == "Cave") return "#cfa737";
  else if (location == "Fishing") return "#4ac9ff";
  else if (location == "Surfing") return "#1742ff";
  //"#1b1bb4";
  else if (location == "Special") return "#ff6421";
  //"#fff237";
  else return "#000000";
}

//increments current_locale and adjusts graph accordingly
function next_locale() {
  update_graph((current_locale + 1) % Object.keys(localeInfo).length);
}

function prev_locale() {
  update_graph(
    (current_locale - 1 + Object.keys(localeInfo).length) %
      Object.keys(localeInfo).length
  );
}

function goto_locale(idx) {
  update_graph(idx);
}

function next_locale_limited() {
  // if before end, go to next locale; else, stop playing
  if (current_locale + 1 < Object.keys(localeInfo).length) {
    update_graph(current_locale + 1);
  } else {
    clearTimeout(play_var);
    toggle_play();
  }
}

var play_var;
function play_locales() {
  play_var = setInterval(next_locale_limited, 1800);
}

function pause_locales() {
  clearTimeout(play_var);
}

function toggle_play() {
  var butt = document.getElementById("play_button");
  if (playing) {
    butt.src = "images/button_play.png";
    butt.onmousedown = function() {
      play_locales();
      toggle_play();
    };
    enable_jump_buttons();
    playing = false;
  } else {
    butt.src = "images/button_pause.png";
    butt.onmousedown = function() {
      pause_locales();
      toggle_play();
    };
    disable_jump_buttons();
    playing = true;
  }
}

// enable back, fwd, rewind buttons
function enable_jump_buttons() {
  var bb = document.getElementById("back_button");
  var fb = document.getElementById("fwd_button");
  var rb = document.getElementById("rewind_button");

  bb.disabled = false;
  bb.src = "images/button_back.png";
  fb.disabled = false;
  fb.src = "images/button_fwd.png";
  rb.disabled = false;
  rb.src = "images/button_rewind.png";
}

// disable back, fwd, rewind buttons
function disable_jump_buttons() {
  var bb = document.getElementById("back_button");
  var fb = document.getElementById("fwd_button");
  var rb = document.getElementById("rewind_button");

  bb.disabled = true;
  bb.src = "images/button_back_disabled.png";
  fb.disabled = true;
  fb.src = "images/button_fwd_disabled.png";
  rb.disabled = true;
  rb.src = "images/button_rewind_disabled.png";
}

// BEGIN OVERLAY CODE

// Add listeners to SVG rectangles on map
function addMapOverlayListeners() {
  for (let i = 0; i < 51; i++) {
    let regionId = i;
    let outline = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById("overlay" + regionId.toString() + "Line");
    let box = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById("overlay" + regionId.toString() + "Box");
    let tooltip = document.getElementById("region_tooltip");

    // Hide outline for all initially
    outline.style.setProperty("opacity", "0.0", "");
    outline.style.setProperty("stroke", "rgb(255, 239, 14)", "");
    box.style.setProperty("fill", "rgb(255, 242, 55)", "");
    // box.classList.add("blendy");

    outline.style.setProperty("stroke-width", "4", "");
    outline.style.setProperty("stroke-dasharray", "12,6", "");
    outline.style.setProperty("stroke-linejoin", "miter", "");
    outline.style.setProperty("transition", "opacity .25s", "");
    box.style.setProperty("transition", "fill-opacity .25s", "");
    box.style.setProperty("transition", "fill-opacity .25s", "");

    outline.addEventListener(
      "click",
      function(event) {
        if (!playing) {
          update_graph(regionId);
        }
      },
      false
    );

    box.addEventListener(
      "click",
      function(event) {
        if (!playing) {
          update_graph(regionId);
        }
      },
      false
    );

    // Color in when hover over
    box.addEventListener("mouseover", function(event) {
      outline.style.setProperty("opacity", "1", "");
      var ttcoords = getLocaleTop(regionId);
      var map_width = 0.6; //60% hardcoded from style
      tooltip.style.left = ttcoords[0] * 100 * map_width + "%";
      tooltip.style.top = ttcoords[1] * 100 + "%";
      tooltip.style.setProperty("opacity", "1", "");
      tooltip.innerHTML = localeInfo[regionId]["display_name"];
      // box.style.setProperty("fill-opacity", ".6", "");
    });
    box.addEventListener("mouseout", function(event) {
      // If the box the hover is leaving is NOT the currently selected, unhighlight
      if (current_locale != regionId) {
        outline.style.setProperty("opacity", "0", "");
        tooltip.style.setProperty("opacity", "0", "");
        // box.style.setProperty("fill-opacity", "0", "");
      }
    });
  }
}

// Load SVG overlay
var svgOverlayMap = document.getElementById("kanto_overlay");
var svgOverlayMapContent;
svgOverlayMap.addEventListener(
  "load",
  function() {
    svgOverlayMapContent = svgOverlayMap.contentDocument;
    try {
      addMapOverlayListeners();
    } catch (err) {
      console.log("Couldn't add overlay event listeners");
      console.log(err);
    }
    // Don't update graph until SVG is loaded
    update_graph(0);
  },
  false
);

// Change highlighting when selecting new locale
function switchLocaleVisuals(oldLocaleId, newLocaleId) {
  if (0 <= oldLocaleId <= 50) {
    let oldOutline = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById(
        "overlay" + oldLocaleId.toString() + "Line"
      );
    let oldBox = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById(
        "overlay" + oldLocaleId.toString() + "Box"
      );
    oldOutline.style.setProperty("opacity", "0", "");
    oldBox.style.setProperty("fill-opacity", "0", "");
  }

  if (0 <= newLocaleId <= 50) {
    let outline = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById(
        "overlay" + newLocaleId.toString() + "Line"
      );
    let box = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById(
        "overlay" + newLocaleId.toString() + "Box"
      );
    outline.style.setProperty("opacity", "1.0", "");
    box.style.setProperty("fill-opacity", "0.4", "");
  }
}

// BEGIN ANIMATION CODE

// moves player icon to locale such that it is centered on the locale center
function movePlayerIconToLocale(key) {
  // no need to move if moving to same place
  if (current_locale === key) {
    return;
  }
  // Do not allow changes via buttons while animating
  pause_locales();
  disable_jump_buttons();

  // create path; if there are intermediate steps, add them in
  var path = [current_locale];

  // if playing, add in intermediate steps. however, if not playing, do not add in intermediate steps
  //    as this is a mvmt triggered by user click
  // exception is if click is to next locale in sequence - show the "path" in this case
  if (playing || current_locale + 1 == key) {
    let intermediate = localeInfo[current_locale]["path_to_next"];
    for (let i = 0; i < intermediate.length; i++) {
      path.push(intermediate[i]);
    }
  }

  path.push(key);

  var finalPos = getPlayerLeftTopPosForRegion(key);

  // pct distance to move in any direction in one step
  // if there are multiple steps, should take less steps
  const PCT_INCREMENT_BY_STEP = 0.2 * Math.pow(path.length - 1, 0.5);

  // used in frame to deterine how much to move x, y (%) per step
  var deltasPerStep = [];

  var playerIcon = document.getElementById("player_icon");

  // locale ID of current locale, can be one of the intermediate locales
  var currentLocaleOnPath = current_locale;

  for (let i = 1; i < path.length; i++) {
    var mvmtMethod = localeInfo[currentLocaleOnPath]["to_next_align_first"];
    var currentPos = getPlayerLeftTopPosForRegion(path[i - 1]);
    var newPos = getPlayerLeftTopPosForRegion(path[i]);

    // determine total deltas
    var dx = newPos[0] - currentPos[0];
    var dy = newPos[1] - currentPos[1];

    // If movement method is direct to next locale (or unregnozed) or
    //    mvmt is out of sequence/order of set path, jump via a CLICK (not currently playing)
    if (
      (mvmtMethod !== "H" && mvmtMethod !== "V") ||
      (current_locale + 1 != key && !playing)
    ) {
      // base number of steps on euclidean distance
      // these are generally bigger steps, so allow faster travel
      let steps = Math.floor(
        Math.pow(Math.pow(dx, 2) + Math.pow(dy, 2), 0.5) /
          (PCT_INCREMENT_BY_STEP * 2)
      );

      // amt to take per step
      let dx_step = dx / steps;
      let dy_step = dy / steps;
      for (let j = 0; j < steps; j++) {
        deltasPerStep.push([dx_step, dy_step]);
      }
    }
    // Align to next locale center's horizontal or vertical first
    else if (mvmtMethod === "H" || mvmtMethod === "V") {
      // base total number of steps on taxicab distance
      // x and y may take different number of steps
      let steps_x = Math.floor(Math.abs(dx / PCT_INCREMENT_BY_STEP));
      let steps_y = Math.floor(Math.abs(dy / PCT_INCREMENT_BY_STEP));

      // amt to take each step
      let dx_step = dx / steps_x;
      let dy_step = dy / steps_y;

      if (mvmtMethod === "H") {
        // if matching horizontal first, move x first, then y into position
        for (let j = 0; j < steps_x; j++) {
          deltasPerStep.push([dx_step, 0]);
        }
        for (let j = 0; j < steps_y; j++) {
          deltasPerStep.push([0, dy_step]);
        }
      } else {
        // if matching vertical first, move y first, then x into position
        for (let j = 0; j < steps_y; j++) {
          deltasPerStep.push([0, dy_step]);
        }
        for (let j = 0; j < steps_x; j++) {
          deltasPerStep.push([dx_step, 0]);
        }
      }
    }

    currentLocaleOnPath = path[i];
  }

  // set up counter and animate
  var pos = 0;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == deltasPerStep.length) {
      clearInterval(id);
      // after animation, update vars
      // in case of rounding errors
      playerIcon.style.left = finalPos[0] + "%";
      playerIcon.style.top = finalPos[1] + "%";
      // update location to match that corresponding to locale
      current_player_rel_left_pct = finalPos[0];
      current_player_rel_top_pct = finalPos[1];

      if (playing) {
        play_locales();
      } else {
        enable_jump_buttons();
      }
    } else {
      deltasPerStep[pos][0]; // increment, update current position slightly each time
      playerIcon.style.left =
        (current_player_rel_left_pct + deltasPerStep[pos][0]).toString() + "%";
      playerIcon.style.top =
        (current_player_rel_top_pct + deltasPerStep[pos][1]).toString() + "%";
      current_player_rel_left_pct =
        current_player_rel_left_pct + deltasPerStep[pos][0];
      current_player_rel_top_pct =
        current_player_rel_top_pct + deltasPerStep[pos][1];
      pos++;
    }
  }
}

// get center of a locale based on its coordinates, AS A PERCENT of the overall map image
function getLocaleCenter(key) {
  var x_offset = 2;
  console.log("HERE" + key.toString());
  var x =
    (localeCoord[key]["x0"] + localeCoord[key]["x1"] + x_offset) /
    2 /
    localeCoord["dim"]["x"];

  var y_offset = (localeCoord[key]["y1"] - localeCoord[key]["y0"]) / 4;
  // var y_offset = 0.04*localeCoord["dim"]["x"] / 2;
  var y =
    (localeCoord[key]["y0"] + localeCoord[key]["y1"] + y_offset) /
    2 /
    localeCoord["dim"]["y"];

  return [x, y];
}

function getLocaleTop(key) {
  var x_offset = 0;
  var x =
    (localeCoord[key]["x0"] + localeCoord[key]["x1"] + x_offset) /
    2 /
    localeCoord["dim"]["x"];

  var y_offset = (localeCoord[key]["y1"] - localeCoord[key]["y0"]) / 4;
  // var y_offset = 0.04*localeCoord["dim"]["x"] / 2;
  var y = localeCoord[key]["y0"] / localeCoord["dim"]["y"];

  return [x, y];
}

// get upper left corner coordinates for player icon so that it in region
function getPlayerLeftTopPosForRegion(key) {
  var initialPlace = getLocaleCenter(key);

  // hardcoded from CSS
  var currentWidth = 4;
  var left = initialPlace[0] * 100 - currentWidth / 2;
  var top = initialPlace[1] * 100 - currentWidth * 1.5;

  return [left, top];
}

// POKEMON TOOLTIP FUNCTIONS
function showTooltip(d, bar) {
  var tip = document.getElementById("tooltipContent");

  let name = d.pokemon;
  let location = d.location;
  var type = d.type1;
  if (d.type2 != "") {
    type += ", " + d.type2;
  }
  let weight = d.weight;
  let height = d.height;
  let male = d.male;
  let female = d.female;
  let index = d.index;
  index_str = index.toString();
  while (index_str.length < 3) index_str = "0" + index_str;

  var ratio_text = ` <span class=blue>${male *
    100}% Male</span> <span class=red>${female * 100}% Female</span>`;
  if (male == 0 && female == 0) ratio_text = "N/A";

  tip.innerHTML = `<table id="tablechan">
                    <tr>
                        <td id="pokemon_sprite"> <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index_str}.png" width=100%> </td>
                        <td id="pokemon_info">
                          <i> ${name}, #${index_str} </i><br/>
                          Type(s): ${type}<br/>
                          Weight: ${weight}<br/>
                          Height: ${height}<br/>
                          Ratio: ${ratio_text}
                        </td>
                    </tr>
                  </table>`;

  tip.style.visibility = "visible";
  tip.style.opacity = 1;
}

function hideTooltip() {
  var tip = document.getElementById("tooltipContent");
  tip.style.visibility = "hidden";
  tip.style.opacity = 0;
}
