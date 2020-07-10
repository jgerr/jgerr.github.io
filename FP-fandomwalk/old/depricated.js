
        // gelm("scatterplot").addEventListener('load', zoomEntrance('viz_1'));
        // gelm("heatmap").addEventListener('load', zoomEntrance('viz_2'));
        // gelm("tree").addEventListener('load', zoomEntrance('viz_3'));
        // for (i of popupIDs){   
        //     var popup = gelm(i);
        //     popup.classList.add('animated');
        //     popup.classList.add('zoomIn');         
        // }

// const blink = 500;
// function blinker(object){
//     setTimeout(function(){ 
//         if (object.innerHTML.charAt( object.innerHTML.length - 1 ) == "|"){
//             object.innerHTML = object.innerHTML.substring(0, object.innerHTML.length-1 );
//         }
//         else object.innerHTML += "|"; 
//         blinker(object);
//     }, blink);
// }

function ridge(){
    // set the dimensions and margins of the graph
    var margin = {top: 80, right: 30, bottom: 50, left:110},
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
    var categories = ["rating","words","comments"]//["Almost Certainly", "Very Good Chance", "We Believe", "Likely", "About Even", "Little Chance", "Chances Are Slight", "Almost No Chance" ]
    var n = categories.length

    // Compute the mean of each group
    // allMeans = []
    // for (i in categories){
    //     var data_filtered = data.filter(function(d) {
    //         return d.rating == categories[i];
    //     });
    //     mean = d3.mean(data_filtered, function(d) { return +d.words })
    //     allMeans.push(mean)
    // }

    // Compute the mean of each group
    allMeans = []
    for (i in categories){
        currentGroup = categories[i]
        mean = d3.mean(data, function(d) { return ++d[currentGroup] })
        allMeans.push(mean)
    }

    // Compute the mean of each group
    // allMeans = []
    // for (i in categories){
    //     currentGroup = categories[i]
    //     mean = d3.mean(data, function(d) { return +d[currentGroup] })
    //     allMeans.push(mean)
    // }

    // Create a color scale using these means.
    var myColor = d3.scaleSequential()
        .domain([0,100])
        .interpolator(d3.interpolateViridis);

    // Add X axis
    var x = d3.scaleLinear()
        .domain([-10, 120])
        .range([ 0, width ]);
    svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues([0,25, 50, 75, 100]).tickSize(-height) )
        .select(".domain").remove()

    // Add X axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Probability (%)");

    // Create a Y scale for densities
    var y = d3.scaleLinear()
        .domain([0, 0.25])
        .range([ height, 0]);

    // Create the Y axis for names
    var yName = d3.scaleBand()
        .domain(categories)
        .range([0, height])
        .paddingInner(1)
    svg.append("g")
        .call(d3.axisLeft(yName).tickSize(0))
        .select(".domain").remove()

    // Compute kernel density estimation for each column:
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
    var allDensity = []
    for (i = 0; i < n; i++) {
        key = categories[i]
        density = kde( data.map(function(d){  return d[key]; }) )
        allDensity.push({key: key, density: density})
    }

    // Add areas
    svg.selectAll("areas")
        .data(allDensity)
        .enter()
        .append("path")
        .attr("transform", function(d){return("translate(0," + (yName(d.key)-height) +")" )})
        .attr("fill", function(d){
            grp = d.key ;
            index = categories.indexOf(grp)
            value = allMeans[index]
            return myColor( value  )
        })
        .datum(function(d){return(d.density)})
        .attr("opacity", 0.7)
        .attr("stroke", "#000")
        .attr("stroke-width", 0.1)
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
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
        });
    };
    }
    function kernelEpanechnikov(k) {
    return function(v) {
        return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
    };
    }
}



function ridge3(){
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
    d3.csv("https://raw.githubusercontent.com/zonination/perceptions/master/probly.csv", function(data) {

        // Get the different categories and count them
        var categories = data.columns
        var n = categories.length

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-10, 140])
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
        var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
        var allDensity = []
        for (i = 0; i < n; i++) {
            key = categories[i]
            density = kde( data.map(function(d){  return d[key]; }) )
            allDensity.push({key: key, density: density})
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
                return [x, d3.mean(V, function(v) { console.log(x); console.log(v);  return kernel(x - v); })]; //where x is 0, 200, etc. ticks. v is actual wordct value (90, 13... etc)
            });
        };    
        }

        function kernelEpanechnikov(k) {
            return function(v) {
                return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;//v;
        };
    }
}

function ridge5(){
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
        // var categories = ["favorites","comments"
        var categories = genres
        var n = categories.length

        // Add X axis
        var x = d3.scaleLinear()
            .domain([-10000, 50000])
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
                return d.genre == categories[i];
            });
            density = kde( data_filtered.map(function(d){  return d.words; }) )
            allDensity.push({key: categories[i], density: density})
            // console.log(density)
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
                return Math.abs(v /= k) <= 1 ? 100* 0.75 * (1 - v * v) / k : 0;//v;
        };
    }
}
