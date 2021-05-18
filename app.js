// use D3 to read in the data
// create variables for all of the plot elements 
function forPlots(id){
    d3.json("samples.json").then((importedData)=>{
        console.log(importedData);
        // var metadata = importedData.metadata;
        // console.log(metadata);

        var searchResult = importedData.samples.filter(demo => demo.id.toString()===id)[0];

        // var sampleId = searchResult.samples[0].otu_ids;
        var sampleId = searchResult.otu_ids;
        console.log(sampleId);

        // var sampleValues = searchResult.samples[0].sample_values;
        var sampleValues = searchResult.sample_values;
        console.log(sampleValues);
        
        // var otuLabels = searchResult.samples[0].otu_labels;
        var otuLabels = searchResult.otu_labels;
        console.log(otuLabels) ;      
         

// organize plot data 

    // top 10 otus
    var topOtu = (sampleId.slice(0,10)).reverse();
    // format IDs
    var otuId = topOtu.map(d => "OTU" + d);
    console.log("id:" + otuId);

    // get top 10 sample values 
    var topSamples = (sampleValues.slice(0,10)).reverse();
    console.log (topSamples);

    // top 10 labels 
    var labels = otuLabels.slice(0,10);
    console.log("labels:" + labels);

    // create a horizontal bar chart with dropdown menu to display top 10 OTUs found in individual
    // sample_values as values for bar chart
    // otu_ids as labels
    // otu_labels as hoverchart
    // all of these identifiers are in the samples.json file
    var trace = {
        x: topSamples,
        y: otuId,
        text: labels,
        marker: {
            color: 'blue'},
            type: "bar",
            orientation: "h",
        };
    var data = [trace];
    var layout = {
        title: " OTU Occurrence per Sample",
        yaxis: {
            tickmode: "linear",
        },
        margin: {
            l:50,
            r:50,
            t:50,
            b:20
        }
    };

    Plotly.newPlot("bar", data, layout);
    

// create a bubble chart that displays each sample
    // otu_ids for x value
    // sample_values for y value
    // sample_values for marker size
    // otu_ids for marker colors
    // otu_labels for text values 

    var trace1 = {
        x: sampleId,
        y: sampleValues,
        mode: "markers",
        marker: {
            size: sampleValues,
            color: sampleId,
        },
        text: otuLabels
    };

    var data1 = [trace1];
    var layout1 = {
        title: "OTU Values per Sample",
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Value"},
        height: 500,
        width: 1000,
    };

    Plotly.newPlot("bubble", data1, layout1);

});

}; 

// display sample metadata (ie demographic info)
// display each key-value pair from the metadata json object somewhere on the page
// ID, ETHNICITY, GENDER, AGE , LOCATION, BBTYPE, WASH FREQ
// Create a function that will filter by id 

function getDemo(id) {
    d3.json("samples.json").then((importedData)=>{
        // console.log(importedData);
        var metadata = importedData.metadata;
        // console.log(metadata);
        var searchResult = metadata.filter(demo => demo.id.toString()=== id)[0];
        // select panel from html to drop the data
        var demoInfo = d3.select("#sample-metadata");

        // clear the panel 
        demoInfo.html("");

        // append data from filter to the panel
        Object.entries(searchResult).forEach((key) => {demoInfo.append("p").text(key [0]. toLowerCase() + ":" + key[1]);
    });
});

};       

// set all plots to update any time a new sample is selected 
// called optionChanged in the html
function optionChanged(id) {
    forPlots(id);
    getDemo(id);
}

// inital data rendering

function  init() {
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((importedData) => {
        var namesData = importedData.names;
        console.log(importedData);
        namesData.forEach((name) => {
            selector.append("option").text(name).property("value", name);
        });

    // display data and plots to page

    forPlots(importedData.names[0]);
    getDemo(importedData.names[0]);

    });
}

init();

