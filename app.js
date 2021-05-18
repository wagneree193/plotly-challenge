// use D3 to read in the data
// create variables for all of the plot elements 
function idFilter(id){
    d3.json("data/samples.json").then((importedData)=>{
        // console.log(importedData);
        var metadata = importedData.metadata;
        console.log(metadata);

        var sampleId = metadata.samples[0].otu_ids;
        // console.log(sampleID)

        var sampleValues = metadata.samples[0].sample_values;
        // console.log(sampleValues)
        
        var otuLabels = metadata.samples[0].otu_labels;
        // console.log(otuLabels)
    
    })
};     

// create a horizontal bar chart with dropdown menu to display top 10 OTUs found in individual
    // sample_values as values for bar chart
    // otu_ids as labels
    // otu_labels as hoverchart
    // all of these identifiers are in the samples.json file



// create a bubble chart that displays each sample
    // otu_ids for x value
    // sample_values for y value
    // sample_values for marker size
    // otu_ids for marker colors
    // otu_labels for text values 

// display sample metadata (ie demographic info)
// display each key-value pair from the metadata json object somewhere on the page

// set all plots to update any time a new sample is selected 

