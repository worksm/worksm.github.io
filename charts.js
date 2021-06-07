function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset")
  // Use the list of sample names to populate the select options
  d3.json("../data/samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
// Initialize the dashboard
init();
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample)  
}
// Demographics Panel 
function buildMetadata(sample) {
  d3.json("../data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}
// 1. Create the buildCharts function.
  function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("../data/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result2 = resultArray[0];
    var wfreq = result2.wfreq;
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples; 
    console.log(samples) 
    // 4. Create a variable that filters the samples for the object with the desired sample number.
      //  5. Create a variable that holds the first sample in the array.
    var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = samplesArray[0];
    // // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    // var otu_ids = result.filter(sampleObj => sampleObj.otu_id == sample);
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    // var yticks =  
    // / Slice the first 10 objects for plotting
    // Reverse the array due to Plotly's defaults
    var data = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: "bar", 
    orientation: "h"
    }]
  // //   // 9. Create the layout for the bar chart. 
    var layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  //          
  //   // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", data, layout);
  var bubbleData = [
    {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        color: otu_ids,
        size: sample_values,
        colorscale: "Jet"
      }
    }
  ];
  // 2. Create the layout for the bubble chart.
  var bubbleLayout = {
  title: 'Bacteria Cultures Per Sample',
  showlegend: false,
};  
  // 3. Use Plotly to plot the data with the layout.
  Plotly.newPlot('bubble',bubbleData, bubbleLayout);  
  var gaugedata= [{  
  domain: { x: [0, 1], y: [0, 1] },
    value: wfreq,
    title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: { range: [null, 10] },
      bar: { color: "black"},
      steps: [
        { range: [0, 2], color: "#F0F7D4" },
        { range: [2, 4], color: "#B2D732" },
        { range: [4, 6], color: "#FE2712" },
        { range: [6, 8], color: "#347B98" },
        { range: [8, 10], color: "#092834" }
      ],
    }
  }
];
    // 5. Create the layout for the gauge chart.
    var layout = {
    width: 500,
    height: 400,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Helvetica" }
  };
  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('gauge', gaugedata, layout);
  });
  // Bar and Bubble charts
}