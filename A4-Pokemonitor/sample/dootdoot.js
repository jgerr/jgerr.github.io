//make sure you save ALL files to see updates on refresh!
var order = {
  1: "pallet_town",
  2: "route_1",
  3: "viridian_city",
  4: "route_22",
  5: "route_2",
  6: "viridian_forest",
  7: "pewter_city",
  8: "route_3",
  9: "mt_moon",
  10: "route_4",
  11: "cerulean_city",
  12: "route_24",
  13: "route_25",
  14: "route_5",
  15: "route_6",
  16: "vermillion_city",
  17: "ss_anne",
  18: "route_11",
  19: "digletts_cave",
  20: "route_9",
  21: "route_10",
  22: "rock_tunnel",
  23: "lavender_town",
  24: "route_8",
  25: "route_7",
  26: "celadon_city",
  27: "team_rocket_hq",
  28: "pokemon_tower",
  29: "saffron_city",
  30: "silph_co",
  31: "route_16",
  32: "route_17",
  33: "route_18",
  34: "fuchsia_city",
  35: "safari_zone",
  36: "route_12",
  37: "route_13",
  38: "route_14",
  39: "route_15",
  40: "route_21",
  41: "cinnabar_island",
  42: "pokemon_mansion",
  43: "power_plant",
  44: "route_19",
  45: "route_20",
  46: "seafoam_island",
  47: "viridian_city",
  48: "route_23",
  49: "victory_road",
  50: "indigo_plateau",
  51: "unknown_dungeon"
};

regionSelect = document.getElementById("region_select");
for (var i in Object.keys(order)) {
  if (order[i] === undefined) {
    continue;
  }
  var opt = document.createElement("option");
  opt.value = i;
  namePieces = order[i]
    .split("_")
    .map(x => x.charAt(0).toUpperCase() + x.slice(1));
  var formattedName = namePieces.join(" ");
  opt.innerHTML = formattedName;

  regionSelect.appendChild(opt);
}

// set the dimensions and margins of the graph
var margin = { top: 20, right: 30, bottom: 40, left: 90 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
var data_full;
d3.csv(
  "https://gist.githubusercontent.com/jgerr/a911c953e8f84b36a89baeb7e197fe13/raw/7a45c1a487b7c506b1e521ae32c2532864651da2/kanto_red_spawnrates",
  function(data_init) {
    var data_full = data_init;
    var key = 1; //change this to see different areas' spawns!
    var data_filtered = data_init.filter(function(d) {
      return d[order[key]] > 0;
    });
    display(data_filtered, key);
  }
);

// setting margins + dimensions
var margin = { top: 20, right: 10, bottom: 40, left: 90 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append svg to page
var svg = d3
  .select("#spawn_chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

function display(data, key) {
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([0, 100])
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .style("text-anchor", "end");

  // Y axis
  var y = d3
    .scaleBand()
    .range([0, height])
    .domain(
      data.map(function(d) {
        return d.pokemon;
      })
    )
    .padding(0.1);
  svg
    .append("g")
    .call(d3.axisLeft(y))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-30)")
    .style("text-anchor", "end");

  //Bars
  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", function(d) {
      return y(d.pokemon);
    })
    .attr("width", function(d) {
      return x(d[order[key]]);
    })
    .attr("height", y.bandwidth())
    .attr("fill", "#69b3a2");
}

// Handler for dropdown value change
function changeRegion(newRegion) {
  console.log(newRegion);
  // oof ouch copied code
  var data_filtered;
  d3.csv(
    "https://gist.githubusercontent.com/jgerr/a911c953e8f84b36a89baeb7e197fe13/raw/7a45c1a487b7c506b1e521ae32c2532864651da2/kanto_red_spawnrates",
    function(data_init) {
      var data_full = data_init;
      data_filtered = data_init.filter(function(d) {
        return d[order[newRegion]] > 0;
      });
      svg.selectAll("*").remove();

      display(data_filtered, newRegion);
    }
  );
}

function onSelectRegionChange() {
  var d = document.getElementById("region_select");
  var newRegion = parseInt(d.options[d.selectedIndex].value);
  changeRegion(newRegion);
}

document
  .getElementById("region_select")
  .addEventListener("change", onSelectRegionChange);

// Add listeners to SVG rectangles on map
function addMapOverlayListeners() {
  let addedRegionIds = [1, 2, 5];
  for (let i = 0; i < addedRegionIds.length; i++) {
    console.log(i);
    let regionId = addedRegionIds[i];
    var outline = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById("overlay" + regionId.toString() + "Line");
    var box = document
      .getElementById("kanto_overlay")
      .contentDocument.getElementById("overlay" + regionId.toString() + "Box");

    outline.addEventListener(
      "click",
      function(event) {
        changeRegion(regionId);
      },
      false
    );
    box.addEventListener(
      "click",
      function(event) {
        changeRegion(regionId);
      },
      false
    );
  }
}

// Load SVG overlay
var svgOverlayMap = document.getElementById("kanto_overlay");
var svgOverlayMapContent;
svgOverlayMap.addEventListener(
  "load",
  function() {
    svgOverlayMapContent = svgOverlayMap.contentDocument;
    console.log(svgOverlayMapContent);
    addMapOverlayListeners();
  },
  false
);
