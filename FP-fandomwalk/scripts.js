var panelCount = 1;
var fandom_categories = ['anime', 'book', 'game', 'movie', 'tv show']
var fandom_names = {'anime':['Bleach', 'Dragon Ball Z', 'Fairy Tail', 'Fullmetal Alchemist', 'Hetalia - Axis Powers', 'Inuyasha', 'Naruto', 'Yu-Gi-Oh'], 
                    'book':['Harry Potter', 'Hunger Games', 'Lord of the Rings', 'Maximum Ride', 'Mortal Instruments', 'Percy Jackson and the Olympians', 'Twilight', 'Warriors'],
                    'game':['Dragon Age', 'Final Fantasy VII', 'Fire Emblem', 'Kingdom Hearts', 'Legend of Zelda', 'Mass Effect', 'Pokemon', 'Sonic the Hedgehog'],
                    'tv show':['Buffy: The Vampire Slayer', 'Doctor Who', 'Glee', 'NCIS', 'Once Upon a Time', 'Sherlock', 'Supernatural', 'Vampire Diaries'],
                    'movie':['Avengers', 'High School Musical', 'How to Train Your Dragon', 'Pirates of the Caribbean', 'Rise of the Guardians', 'Star Trek: 2009', 'Star Wars', 'X-Men: The Movie']}
// var words = ['< 5,000', '5,000 to 20,000', '> 20,000']
var words = ['short', 'medium', 'long']
var ratings = ['K','K+','T','M']
var genres = ['Adventure', 'Angst', 'Crime', 'Drama', 'Family', 'Fantasy', 'Friendship', 'Horror', 'Humor', 'Hurt/Comfort', 'Mystery', 'Parody', 'Poetry', 'Romance', 'Sci-Fi', 'Spiritual', 'Supernatural', 'Suspense', 'Tragedy', 'Western']
var all_categories = [fandom_categories, fandom_names, , genres, words, ratings];
// var filterOn = {'fandom_category': '', 'fandom_name': '', 'genre': '', 'words': '', 'rating': ''};
var filterOn = {'fandom_category': 'anime', 'fandom_name': 'Bleach', 'genre': 'Drama', 'words': 'long', 'rating': 'T'};
var filterKey = 'fandom_category';
var linkHtoS = {'genre': '', 'rating':''};
var yourData = [];

var url_link = "https://gist.githubusercontent.com/jgerr/df5fb4c38d8e21f511fa3d870573d5ae/raw/af8826c552a90820cd92acb91ae031293ffe04bc/final_10k.csv"

var popupIDs = ["viz_1","viz_2","viz_3", "viz_4"];
var blockTyping = true;
var parentID = "frag_1";
var activeID = "typing_0";
var inputID = "input_0";
var listID = "list_0";
var blinkerID = "blinking_1";

var fandom_chosen = "Naruto";
var fragIndex = 0;
var fragments = [{text: "I'm writing fic for my favorite",
                    typingID: "typing_1",
                    choiceID: "choice_1",
                    inputID: "input_1",
                    listID: "list_1",
                    parentID: "frag_1",
                    blinkerID: "blinking_1",
                    filterKey: 'fandom_category',
                    space: ""},
                {text: ", which is ",
                    typingID: "typing_2",
                    choiceID: "choice_2",
                    inputID: "input_2",
                    listID: "list_2",
                    parentID: "frag_1",
                    blinkerID: "blinking_1",
                    filterKey: 'fandom_name',
                    space: ""},
                {text: ".",
                    typingID: "typing_2.5",
                    choiceID: "choice_2.5",
                    inputID: "input_2.5",
                    listID: "list_2.5",
                    parentID: "frag_1",
                    blinkerID: "blinking_1",
                    filterKey: '',
                    space: ""},
                {text: "It'll be in the",
                    typingID: "typing_3",
                    choiceID: "choice_3",
                    inputID: "input_3",
                    listID: "list_3",
                    parentID: "frag_2",
                    blinkerID: "blinking_2",
                    filterKey: 'genre',
                    space: ""},
                {text: "genre, ",
                    typingID: "typing_4",
                    choiceID: "choice_4",
                    inputID: "input_4",
                    listID: "list_4",
                    parentID: "frag_2",
                    blinkerID: "blinking_2",
                    filterKey: 'words',
                    space: "&nbsp;"},
                {text: "in length, and rated",
                    typingID: "typing_5",
                    choiceID: "choice_5",
                    inputID: "input_5",
                    listID: "list_5",
                    parentID: "frag_2",
                    blinkerID: "blinking_2",
                    filterKey: 'rating',
                    space: "&nbsp;"},
                {text: ".",
                    typingID: "typing_6",
                    choiceID: "choice_6",
                    inputID: "input_6",
                    listID: "list_6",
                    parentID: "frag_2",
                    blinkerID: "blinking_2",
                    filterKey: '',
                    space: ""}
                ]


function gelm(id){
    return document.getElementById(id);
} 
var navi = gelm("navigator");

function moveLeft(id){
    var object = gelm(id);
    object.classList.add('panel');
    object.onclick = "";
    object.addEventListener('animationend', moveTo);
    object.addEventListener("webkitAnimationEnd", moveTo);
    
    function moveTo(){ 
        object.classList.remove('panel');
        object.style.transform = 'translate(-150%, -50%)';
    }
}

function nextLevel(numNodes){
    var column = gelm("column_1");
    var node = gelm("template");
    for (var i = 0; i < numNodes; i++){
        var clone = node.cloneNode(true);
        panelCount += 1;
        clone.style.display = "block";
        clone.id = "panel_" + panelCount;
        clone.onclick = `moveLeft(${clone.id}); nextLevel(10);`;
        column.appendChild(clone);
    }   
}

function animateTyping(id, fragment){
    blockTyping = true;
    typingHelper(gelm(id), fragment, 0);
}

function typingHelper(object, fragment, index){
    if (index < fragment.length){
        var timestep = 35 + Math.random() * 50; 
        setTimeout(function(){ 
            object.innerHTML += fragment.charAt(index); 
            typingHelper(object, fragment, index + 1);
        },timestep);
    } else {
        blockTyping = false;
        blinker(gelm(blinkerID));
        gelm(listID).classList.add('animated');
        gelm(listID).classList.add('fadeIn');
    }
}

const blink = 500;
function blinker(object){
    if (blockTyping) object.innerHTML = "";
    else{
        setTimeout(function(){ 
            if (object.innerHTML == "|"){
                object.innerHTML = "";
            }
            else object.innerHTML = "|"; 
            blinker(object);
        }, blink);   
    }
}

function createFragment(idx, endSentence){
    if (endSentence){
        var htmlText = `<div id=${fragments[idx]["typingID"]} class="static">${fragments[idx]["text"]} </div>`;
        return htmlText;
    }

    if (idx == 1){
        insertList = "&nbsp;" + all_categories[idx][filterOn['fandom_category']].join("<br>&nbsp;");
    } else var insertList = (idx < all_categories.length)? "&nbsp;" + all_categories[idx].join("<br>&nbsp;"): "";
    var htmlText = `<div id=${fragments[idx]["typingID"]} class="static">${fragments[idx]["space"]}</div>
                    <div id=${fragments[idx]["choiceID"]} class="choice">
                        <div id=${fragments[idx]["inputID"]} class="dynamic"> &nbsp;</div>
                        <div id=${fragments[idx]["listID"]} class="list">
                            ${insertList}
                        </div>
                    </div>`;
    return htmlText;
}

function buildSentence(){
    if (fragIndex < fragments.length){
        parentID = fragments[fragIndex]["parentID"];
        var par = gelm(parentID);
        if ("." == fragments[fragIndex]["text"]){
            par.innerHTML += createFragment(fragIndex, true);
            fragIndex += 1;
            buildSentence();
        }
        else{
            blinkerID = fragments[fragIndex]["blinkerID"];
            par.innerHTML += createFragment(fragIndex, false);
            activeID = fragments[fragIndex]["typingID"];
            inputID = fragments[fragIndex]["inputID"];
            listID = fragments[fragIndex]["listID"];
            filterKey = fragments[fragIndex]["filterKey"];
            animateTyping(activeID, fragments[fragIndex]["text"]);
            fragIndex += 1;
        }
    } else { //SHOW RESULTS hERE!!      
        scatter("viz_1", "viz_1_body", "viz_scatter", fandom_chosen, true);
        heatmap("viz_2", "viz_2_body", "viz_heatmap", fandom_chosen);
        // tree("viz_3", "viz_3_body", "viz_tree");
    }
}

function zoomEntrance(id){
    var popup = gelm(id);
    popup.style.display='block';
    popup.classList.add('animated');
    popup.classList.add('zoomIn'); 
}

function zoomExit(id){
    var popup = gelm(id);
    popup.classList.add('zoomOut'); 
    setTimeout(function(){ 
        popup.classList.remove('animated');
        popup.classList.remove('zoomIn');
        popup.classList.remove('zoomOut');
        popup.style.display='none';
    }, 1000);
}

document.addEventListener('keydown', function(e) {
    if (blockTyping == false){
        var object = gelm(inputID);
        if (65 <= e.keyCode && e.keyCode <= 90){
            if (!e.shiftKey) object.innerHTML += String.fromCharCode(e.keyCode).toLowerCase();
            else object.innerHTML += String.fromCharCode(e.keyCode);
        }
        else if (e.keyCode == 32) object.innerHTML += String.fromCharCode(e.keyCode);
        else if (e.keyCode == 186) object.innerHTML += ":";
        else if (e.keyCode == 187) object.innerHTML += "+";
        else if (e.keyCode == 189) object.innerHTML += "-";
        else if (e.keyCode == 8){ //backspace
            object.innerHTML = object.innerHTML.substring(0, object.innerHTML.length-1 );            
        }
        else if (e.keyCode == 13){ //enter
            if (fragIndex == 2){
                var match = "";
                for (i of all_categories[fragIndex-1][filterOn['fandom_category']]){
                    if (i.toLowerCase() == object.innerHTML.substring(7).toLowerCase()) match = i;
                }
                if ( match.length > 0 ){
                    fandom_chosen = match;
                    filterOn['fandom_name'] = match;
                    
                    var listObj = gelm(listID);
                    listObj.classList.remove('fadeIn');
                    listObj.classList.add('fadeOut');
                    listObj.remove();

                    buildSentence();
                }
            } else{
                var match = "";
                for (i of all_categories[fragIndex-1]){
                    if (i.toLowerCase() == object.innerHTML.substring(7).toLowerCase()) match = i;
                }
                if ( match.length > 0 ){
                    filterOn[filterKey] = match;
                    console.log(filterOn);
                    
                    var listObj = gelm(listID);
                    listObj.classList.remove('fadeIn');
                    listObj.classList.add('fadeOut');
                    listObj.remove();

                    buildSentence();
                }
            }
                
        }
    }
});

// D3 HERE!
function scatter(popupID, containerID, plotID, fandom, init){
    var initWidth = gelm(containerID).offsetWidth;
    var initHeight = gelm(containerID).offsetHeight;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 20, bottom: 50, left: 70},
        width = initWidth - margin.left - margin.right,
        height = initHeight - margin.top - margin.bottom;

    var svg;
    // append the svg object to the body of the page
    if (init){
        svg = d3.select("#"+plotID)
            .append("svg")
            .attr('width', '100%')
            .attr('viewBox', '0 0 ' + initWidth + ' ' + initHeight)
            // .attr("width", width + margin.left + margin.right)
            // .attr("height", height + margin.top + margin.bottom)
            .attr("id", "scatterplot")
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    }
    else svg = d3.select("#scatterplot");

    //Read the data
    d3.csv(url_link, function(data) {
        var data_filtered = data.filter(function(d) {
            return d.fandom_name == fandom;
        });
        display(data_filtered);
        var name = filterOn.fandom_name;
        if (name.length > 10) name = name.substr(0, 10) + "..."
        gelm("viz_1_fandom_name").innerHTML = name;
        zoomEntrance(popupID);
        zoomEntrance("viz_4");
        }
    );

    function display(data){
    //get extents
    var commentRanks = [];
    var favoriteRanks = [];
    for (d of data){
        commentRanks.push(parseInt(d.comments));
        favoriteRanks.push(parseInt(d.favorites));
    }
    commentRanks.sort((a, b) => b-a);
    favoriteRanks.sort((a, b) => b-a);

    //ceil to nearest 500
    var roundTo = 1000;
    var maxComments = commentRanks[0];
    var maxFavorites = favoriteRanks[0];
    maxComments = maxComments + (roundTo - (maxComments % roundTo));
    maxFavorites = maxFavorites + (roundTo - (maxFavorites % roundTo));

    var commentTicks = ~~(maxComments / 1000);
    var favoriteTicks = ~~(maxFavorites / 1000);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, maxFavorites])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "chartStyling")
        .call(d3.axisBottom(x).ticks(favoriteTicks));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, maxComments])
        .range([ height, 0]);
    svg.append("g")
        .attr("class", "chartStyling")
        .call(d3.axisLeft(y).ticks(commentTicks));

    //GRIDLINE CODE from: https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
    // gridlines in x axis function
    function make_x_gridlines() {		
        return d3.axisBottom(x)
            .ticks( 2*favoriteTicks )
    }

    // gridlines in y axis function
    function make_y_gridlines() {		
        return d3.axisLeft(y)
            .ticks( 2*commentTicks )
    }
        // add the X gridlines
    svg.append("g")			
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_gridlines()
        .tickSize(-height)
        .tickFormat("")
    )

    // add the Y gridlines
    svg.append("g")			
    .attr("class", "grid")
    .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat("")
    )

    var viableData = [];

    function fillColor(datum){
        if (datum.rating == filterOn['rating'])
            if (datum.genre.includes(filterOn['genre'])) 
                if ( (('short' == filterOn['words'])  && (parseInt(datum.words) < 5000)) || 
                     (('medium' == filterOn['words'])  && ((parseInt(datum.words) > 5000) && (parseInt(datum.words) < 20000))) ||
                     (('long' == filterOn['words'])  && (parseInt(datum.words) > 20000)) ){
                        viableData.push(datum);
                        return "rgba(185, 142, 150, 0.3)";
                        // return "rgba(255, 85, 113, 0.2)";
                }
        return "rgba(95, 223, 83, .1)";
    }
    function strokeColor(datum){
        if (datum.rating == filterOn['rating'])
            if (datum.genre.includes(filterOn['genre'])) 
                if ( (('short' == filterOn['words'])  && (parseInt(datum.words) < 5000)) || 
                     (('medium' == filterOn['words'])  && ((parseInt(datum.words) > 5000) && (parseInt(datum.words) < 20000))) ||
                     (('long' == filterOn['words'])  && (parseInt(datum.words) > 20000)) ){
                        viableData.push(datum);
                        return "rgba(95, 223, 83, .5)";
                        // return "rgb(128, 86, 93)";
                        // return "rgba(255, 85, 113, 0.6)";
                }
        return "rgba(95, 223, 83, .5)";
    }

    var prevColor = "rgba(95, 223, 83, .5)";
    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        var rankC = commentRanks.indexOf(parseInt(d.comments))+1;
        var rankF = favoriteRanks.indexOf(parseInt(d.favorites))+1;
        var percC = ((commentRanks.length - rankC) / commentRanks.length * 100).toFixed(2) ;
        var percF = ((favoriteRanks.length - rankF) / favoriteRanks.length * 100).toFixed(2) ;
        navi.innerHTML = `Selected fic: <br>
        <span class="pinktext smaller">  ${d.genre.replace(',', ' & ') } <br> ${d.rating},  ${d.words} words<br></span>===========================<br>
        &nbsp;* <span class="pinktext"> ${d.comments}</span> comments<br>
        &nbsp;&nbsp;&nbsp;-rank <span class="pinktext"> #${ rankC }</span> by comments <br>
        &nbsp;&nbsp;&nbsp;-<span class="pinktext"> ${ percC }th</span> percentile <br>
        &nbsp;* <span class="pinktext"> ${d.favorites}</span> favorites<br>
        &nbsp;&nbsp;&nbsp;-rank <span class="pinktext"> #${ rankF }</span> by faves <br>
        &nbsp;&nbsp;&nbsp;-<span class="pinktext"> ${ percF }th</span> percentile <br>`;
        prevColor = d3.select(this).style("stroke");
        d3.select(this)
            .style("stroke", "rgba(255, 85, 113, 1)");
            
    }    

    var mouseleave = function(d) {      
        d3.select(this)
            .style("stroke", prevColor);
    }
    var linkHtoS = function(d) {    
        var params = d3.event.detail;
        if ((d.genre.includes(params.genre)) && (d.rating = params.rating)){
            d3.select(this)
                .style("stroke", "rgba(255, 85, 113, 1)");
        }
    }
    var unlinkHtoS = function(d) {    
        var params = d3.event.detail;
        if ((d.genre.includes(params.genre)) && (d.rating = params.rating)){
            d3.select(this)
                .style("stroke", prevColor);
        }
    }
      var mouseoverYours = function(d) {
        var rankC = commentRanks.indexOf(parseInt(d.comments))+1;
        var rankF = favoriteRanks.indexOf(parseInt(d.favorites))+1;
        var percC = ((commentRanks.length - rankC) / commentRanks.length * 100).toFixed(2) ;
        var percF = ((favoriteRanks.length - rankF) / favoriteRanks.length * 100).toFixed(2) ;
        navi.innerHTML = `Your fic: <br>
        <span class="pinktext smaller">  ${d.genre.replace(',', ' & ') } <br> ${d.rating},  ${d.words} words<br></span>===========================<br>
        &nbsp;* <span class="pinktext"> ${d.comments}</span> comments<br>
        &nbsp;&nbsp;&nbsp;-rank <span class="pinktext"> #${ rankC }</span> by comments <br>
        &nbsp;&nbsp;&nbsp;-<span class="pinktext"> ${ percC }th</span> percentile <br>
        &nbsp;* <span class="pinktext"> ${d.favorites}</span> favorites<br>
        &nbsp;&nbsp;&nbsp;-rank <span class="pinktext"> #${ rankF }</span> by faves <br>
        &nbsp;&nbsp;&nbsp;-<span class="pinktext"> ${ percF }th</span> percentile <br>`;
      }

    var dotsz = 4;
    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.favorites); } )
            .attr("cy", function (d) { return y(d.comments); } )
            .attr("r", dotsz)
            .style("fill", function (d) {return fillColor(d);}) //#69b3a2
            .attr("stroke", function (d) {return strokeColor(d);})         
            .style("stroke-width", 1)            
        .on("mouseover", mouseover)  
        .on("linkHtoS", linkHtoS)   
        .on("unlinkHtoS", unlinkHtoS)    
        .on("mouseout", mouseleave);

    svg.append('g')
        .selectAll("dot")
        .data(viableData)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.favorites); } )
            .attr("cy", function (d) { return y(d.comments); } )
            .attr("r", dotsz)
            .style("fill", function (d) {return fillColor(d);}) //#69b3a2
            .attr("stroke", function (d) {return strokeColor(d);})
            .style("stroke-width", 1)        
        .on("mouseover", mouseover)
        .on("linkHtoS", linkHtoS)   
        .on("unlinkHtoS", unlinkHtoS)     
        .on("mouseout", mouseleave);


    
    yourData = [];
    var idx = Math.floor(Math.random() * viableData.length);
    console.log(idx);
    yourData.push(viableData[idx]);
    fanfic(viableData[idx]);
    console.log(yourData);
    svg.append('g')
        .selectAll("dot")
        .data(yourData)
        .enter()
        .append("circle")
            .attr("cx", function (d) { return x(d.favorites); } )
            .attr("cy", function (d) { return y(d.comments); } )

            .attr("r", dotsz)
            .style("fill", function (d) {return "rgba(255, 85, 113, 1)";}) //#69b3a2
            .attr("stroke", function (d) {return "rgba(255, 85, 113, 1)";})        
            .style("stroke-width", 1)     
            .on("mouseover", mouseoverYours);

    // mouseoverYours(yourData);
    }
    
    
    // text labels for the x,y axes
    svg.append("text")             
    .attr("transform",
            "translate(" + (width/2) + " ," + 
                        (initHeight - 20) + ")")
    .style("text-anchor", "middle")
    .attr("class", "chartStyling")
    .text("Favorites");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chartStyling")
      .text("Comments"); 

      
}

function ridgeRatings(){
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 30, bottom: 20, left:110},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#viz_ridge")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "ridge")
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //read data
    // d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {
    d3.csv(url_link, function(data) {

        // Get the different categories and count them
        //   var categories = data.columns
        // var categories = ["favorites","comments"]
        var categories = ratings//genres
        var n = categories.length

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-10, 100])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Create a Y scale for densities
        var y = d3.scaleLinear()
            .domain([0, 0.4])
            .range([ height, 0]);

        // Create the Y axis for names
        var yName = d3.scaleBand()
            .domain(categories)
            .range([0, height])
            .paddingInner(1)
        svg.append("g")
            .call(d3.axisLeft(yName));

        var kde = kernelDensityEstimator(kernelEpanechnikov(10), x.ticks(40)) // increase this 40 for more accurate density.
        var allDensity = []
        for (i = 0; i < categories.length; i++) {
            var data_filtered = data.filter(function(d) {
                return d.rating == categories[i];
            });
            density = kde( data_filtered.map(function(d){  return d.words; }) )
            allDensity.push({key: categories[i], density: density})
            console.log(density)
        }

        // Add areas
        svg.selectAll("areas")
            .data(allDensity)
            .enter()
            .append("path")
            .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
            .datum(function(d){return(d.density)})
            .attr("fill", "#69b3a2")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
            )
        
        })

        // This is what I need to compute kernel density estimation
        function kernelDensityEstimator(kernel, X) {
        return function(V) {
            return X.map(function(x) {
                // console.log(V);
                return [x, d3.mean(V, function(v) {  return kernel(x - Math.log10(v)); })]; //where x is 0, 200, etc. ticks. v is actual wordct value (90, 13... etc)
            }); //console.log(x); console.log(v); console.log( Math.log10(v));
        };    
        }

        function kernelEpanechnikov(k) {
            return function(v) {
                return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;//v;
        };
    }
}

function ridgeGenres(){
    // set the dimensions and margins of the graph
    var margin = {top: 60, right: 30, bottom: 20, left:110},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#viz_ridge")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //read data
    // d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {
    d3.csv(url_link, function(data) {

        // Get the different categories and count them
        //   var categories = data.columns
        // var categories = ["favorites","comments"]
        var categories = ratings//genres
        var n = categories.length

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-10000, 100000])
            .range([ 0, width ]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Create a Y scale for densities
        var y = d3.scaleLinear()
            .domain([0, 0.4])
            .range([ height, 0]);

        // Create the Y axis for names
        var yName = d3.scaleBand()
            .domain(categories)
            .range([0, height])
            .paddingInner(1)
        svg.append("g")
            .call(d3.axisLeft(yName));

        // Compute kernel density estimation for each column:
        // var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
        // var allDensity = []
        // for (i = 0; i < n; i++) {
        //     key = categories[i]
        //     density = kde( data.map(function(d){  return d[key]; }) )
        //     allDensity.push({key: key, density: density})
        // }

        var kde = kernelDensityEstimator(kernelEpanechnikov(10), x.ticks(40)) // increase this 40 for more accurate density.
        var allDensity = []
        for (i = 0; i < categories.length; i++) {
            var data_filtered = data.filter(function(d) {
                return d.rating == categories[i];
            });
            density = kde( data_filtered.map(function(d){  return d.words; }) )
            allDensity.push({key: categories[i], density: density})
            console.log(density)
        }
            // Compute the mean of each group
    // allMeans = []
    // for (i in categories){
    //     var data_filtered = data.filter(function(d) {
    //         return d.rating == categories[i];
    //     });
    //     mean = d3.mean(data_filtered, function(d) { return +d.words })
    //     allMeans.push(mean)
    // }

        // Add areas
        svg.selectAll("areas")
            .data(allDensity)
            .enter()
            .append("path")
            .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
            .datum(function(d){return(d.density)})
            .attr("fill", "#69b3a2")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("d",  d3.line()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y(function(d) { return y(d[1]); })
            )
        })

        // This is what I need to compute kernel density estimation
        function kernelDensityEstimator(kernel, X) {
        return function(V) {
            return X.map(function(x) {
                // console.log(V);
                return [x, d3.mean(V, function(v) {  return kernel(x - v); })]; //where x is 0, 200, etc. ticks. v is actual wordct value (90, 13... etc)
            }); //console.log(x); console.log(v); console.log( Math.log10(v));
        };    
        }

        function kernelEpanechnikov(k) {
            return function(v) {
                return Math.abs(v /= k) <= 1 ? 1000* 0.75 * (1 - v * v) / k : 0;//v;
        };
    }
}

function heatmap(popupID, containerID, plotID, fandom){
    
    var initWidth = gelm(containerID).offsetWidth;
    var initHeight = gelm(containerID).offsetHeight;

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 40, bottom: 30, left: 110},
      width = initWidth - margin.left - margin.right,
      height = initHeight - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#" + plotID)
    .append("svg")
      .attr('width', '100%')
      .attr('viewBox', '0 0 ' + initWidth + ' ' + initHeight)
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
      .attr("id", "heatmap")
    .append("g")
      .attr("class", "chartStyling")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    // Labels of row and columns
    var myGroups = ratings //["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    var myVars = genres //["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

    // Build X scales and axis:
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(myGroups)
      .padding(0.25);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "chartStyling")
      .call(d3.axisBottom(x))
    
    // Build X scales and axis:
    var y = d3.scaleBand()
      .range([ height, 0 ])
      .domain(myVars)
      .padding(0.25);
    svg.append("g")
      .attr("class", "chartStyling")
      .call(d3.axisLeft(y));
    
    // Build color scale
    var myColor = d3.scaleLinear()
    .range(["rgba(95, 223, 83, 0)", "rgba(95, 223, 83, 1)"])
      .domain([1,1000]) //50000 for all
    
    //Read the data
    d3.csv(url_link, function(data) {
        
      function select_x_axis_label(datum) {
        return d3.select('.chartStyling')
            .selectAll('text')
            .filter(function(x) { return x == datum.rating; });
      }

      function select_y_axis_label(datum) {
        return d3.select('.chartStyling')
            .selectAll('text')
            .filter(function(y) { return y == datum.genre; });
      }

    var dictCounts = {}
    for (i of myVars) {
        dictCounts[i] = {};
        for (j of myGroups){
            dictCounts[i][j] = 0
        }
    }

    var data_filtered = data.filter(function(d) {
        return d.fandom_name == fandom;
    });
    
    // console.log(dictCounts)
    for (d of data_filtered){
        var tags = d.genre.split(",");
        for (t of tags) dictCounts[t][d.rating] += 1;
    }

    var localCounts = []
    for (i of myVars) {
        for (j of myGroups){
            localCounts.push({var: i, group: j, count: dictCounts[i][j]})
        }
    }

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {        
        var ratingSum = 0;
        var genreSum = 0;
        genreSum += dictCounts[d.var]['K'] + dictCounts[d.var]['K+'] + dictCounts[d.var]['T'] + dictCounts[d.var]['M'];
        // for (i of genres) ratingSum +=  dictCounts[i][d.group];
        for (i of data_filtered) {
            if (i.rating == d.group) ratingSum += 1;
        }
        navi.innerHTML = `Out of 8000 fics in this fandom, there are: <br>
                            ============================ <br>
                            * <span class="pinktext"> ${d.count}</span> in <span class="pinktext"> ${d.var}</span> rated <span class="pinktext"> ${d.group}</span> <br>
                            * <span class="pinktext"> ${genreSum}</span> total in <span class="pinktext"> ${d.var}</span> <br>
                            * <span class="pinktext"> ${ratingSum}</span> total rated <span class="pinktext"> ${d.group}</span> <br>`
        select_x_axis_label(d).attr('style', "font-weight: bold;");
        select_y_axis_label(d).attr('style', "font-weight: bold;");
        d3.select(this)
                .style("stroke", "rgba(255, 85, 113, 1)");
        
        d3.selectAll('circle').dispatch('linkHtoS', {detail: {'genre':d.var, 'rating':d.group}});
    }    

    var mouseleave = function(d) {      
        d3.select(this)
            .style("stroke", "none");
        d3.selectAll('circle').dispatch('unlinkHtoS', {detail: {'genre':d.var, 'rating':d.group}});
    
    }

    var highlight = function(d){
        if (d3.select(this).style("stroke") == "none"){
            d3.select(this)
                .style("stroke", "rgba(255, 85, 113, 1)");
            filterOn.genre = d.var;
            filterOn.rating = d.group;
        } else {
            d3.select(this)
                .style("stroke", "none");
            filterOn.genre=d.var;
            filterOn.rating=d.group;
        }
        
    }

    function strokeColor(datum){
        if (datum.group == filterOn.rating){
            if (datum.var == filterOn.genre)
                // return "rgba(255, 85, 113, 1)";
                return "none";
        }
        return "none";
    }
    function fillColor(datum){
        var alpha = (parseInt(datum.count) / 1000);
        if (datum.group == filterOn.rating){
            if (datum.var == filterOn.genre)
                return `rgba(255, 85, 113, ${alpha})`;
        }
        return `rgba(95, 223, 83, ${alpha})`;
    }

      // add the squares
      svg.selectAll()
        // .data(data, function(d) {return d.genre+':'+d.rating;})
        .data(localCounts.slice(0,79))
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.group) })
          .attr("y", function(d) { return y(d.var) })
          .attr("width", x.bandwidth() )
          .attr("height", y.bandwidth() )
          .attr("rx", 2)
          .attr("ry", 2)
          .style("stroke-width", 2)
          .style("stroke", function(d) { return strokeColor(d) })
          .style("fill", function(d) { return fillColor(d)} )
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave);
        // .on("click", highlight);
        // .on("mousemove", mousemove)
    
    
    zoomEntrance(popupID);
    })   

}

function tree(popupID, containerID, plotID){
    
    // set the dimensions and margins of the graph
    var width = gelm(containerID).offsetWidth;
    var height = gelm(containerID).offsetHeight;

    // append the svg object to the body of the page
    var svg = d3.select("#"+plotID)
    .append("svg")
        .attr('width', '100%')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        // .attr("width", width)
        // .attr("height", height)
        .attr("id", "tree")
    .append("g")
        .attr("transform", "translate(40,0)");  // bit of margin on the left = 40

    // read json data
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram.json", function(data) {

    // Create the cluster layout:
    var cluster = d3.cluster()
        .size([height, width - 100]);  // 100 is the margin I will have on the right side

    // Give the data to this cluster layout:
    var root = d3.hierarchy(data, function(d) {
        return d.children;
    });
    cluster(root);


    // Add the links between nodes:
    svg.selectAll('path')
        .data( root.descendants().slice(1) )
        .enter()
        .append('path')
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                    + "C" + (d.parent.y + 50) + "," + d.x
                    + " " + (d.parent.y + 150) + "," + d.parent.x // 50 and 150 are coordinates of inflexion, play with it to change links shape
                    + " " + d.parent.y + "," + d.parent.x;
                })
        .style("fill", 'none')
        .attr("stroke", '#ccc')


    // Add a circle for each node.
    svg.selectAll("g")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + d.y + "," + d.x + ")"
        })
        .append("circle")
            .attr("r", 7)
            .style("fill", "#69b3a2")
            .attr("stroke", "black")
            .style("stroke-width", 2)
    
    zoomEntrance(popupID);

    })

}

function giveInfo(index){
    if (index==0){
        navi.innerHTML = "These points indicate <span class='pinktext'>all other fanfiction</span> within this fandom."
    } else if (index==1){
        navi.innerHTML = "These points indicate other fanfiction <span class='pinktext'> meeting the same criteria</span> (word count, genre, rating) as yours within this fandom."
    } else if (index==2){
        navi.innerHTML = "This point indicates the fanfic <span class='pinktext'>you wrote</span> for this fandom."
    }
}

function manualSVGResize(){
    console.log("resize called");
    var list = document.getElementsByTagName("svg");
    for (elm of list){
        console.log(elm.id);
        console.log(elm.width[0] + ", " + elm.parentNode.parentNode.offsetWidth);
        elm.width[0] = elm.parentNode.parentNode.offsetWidth;
        elm.height[0] = elm.parentNode.parentNode.offsetHeight;
        console.log(elm.width[0] + ", " + elm.parentNode.parentNode.offsetWidth);
    }
}

var txt = "Donec porttitor ex mauris, vel commodo libero maximus vel. Nunc vulputate nunc sed feugiat iaculis. Nam elementum semper purus"
function fanfic(d){
    var list_title = txt.split(' ');
    console.log(list_title);
    var length_title = 1 + (Math.random() * 5); 
    gelm("fic_title").innerHTML = '';
    for (i = 0; i < length_title; i++){
        gelm("fic_title").innerHTML += list_title[(Math.random()*list_title.length).toFixed(0)] + " ";
    }

    gelm("genre_fill").innerHTML = "Genre: " + d.genre;
    gelm("rating_fill").innerHTML = "Rating: " + d.rating;
    gelm("words_fill").innerHTML = "Words: " + d.words;
    gelm("favorites_fill").innerHTML = d.favorites;
    gelm("comments_fill").innerHTML = d.comments;
    zoomEntrance("viz_3");
}

function restart(){
    for (i of popupIDs){
        if ( window.getComputedStyle(gelm(i)).getPropertyValue("opacity") > 0 ){
            zoomExit(i);
        }
    }

    gelm('sentence').innerHTML = `<div id="frag_1" class="frag">                    
                                                
    </div> 
    <div id="blinking_1" class="static"> </div>
    <br>
    <div id="frag_2" class="frag"> 
       
    </div>
    <div id="blinking_2" class="static"> </div>`;
    
    blockTyping = true;
    parentID = "frag_1";
    activeID = "typing_0";
    inputID = "input_0";
    listID = "list_0";
    blinkerID = "blinking_1";
    fragIndex = 0;

    setTimeout(function(){ 
        gelm('scatterplot').remove();
        gelm('heatmap').remove();
        gelm('navigator').innerHTML = `Hover over scatterplot:<br>
        &nbsp;* See fanfic <span class="pinktext"> tags</span><br>
        &nbsp;* View popularity <span class="pinktext"> stats</span><br>
        &nbsp;&nbsp;&nbsp;-Raw <span class="pinktext"> counts</span>  <br>
        &nbsp;&nbsp;&nbsp;-Category <span class="pinktext"> ranks</span>  <br>
        Hover over heatmap: <br>
        &nbsp;* See <span class="pinktext"> tags</span> statistics<br>
        &nbsp;* View spread on <span class="pinktext"> plot</span><br>`
    }, 1500);

    buildSentence();
}

function main(){
    buildSentence();
    // window.addEventListener('resize', manualSVGResize);
    // ridgeRatings();
    // ridgeGenres();
    // scatter("viz_1", "viz_1_body", "viz_scatter", fandom_chosen, true);
    // heatmap("viz_2", "viz_2_body", "viz_heatmap", fandom_chosen);
    // tree("viz_3", "viz_3_body", "viz_tree");
    // fanfic();
    // zoomEntrance("viz_3");
    // navi("viz_4", "navigator");
}

main();
