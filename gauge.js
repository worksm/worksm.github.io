// Create the build Chart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("data/samples.json").then((data) => {
    console.log(data);

  // Create a variable that holds the samples array. 
  var samplesArray = data.samples; 
  // Create a variable that filters the samples for the object with the desired sample number.
  var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
  // 1. Create a variable that filters the metadata array for the object with the desired sample number.
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  
  // Create a variable that holds the first sample in the array.
  var result = samplesArray[0];

  // 2. Create a variable that holds the first sample in the metadata array.
  var result2 = resultArray[0];

  // // Create variables that hold the otu_ids, otu_labels, and sample_values.
  var otu_ids = result.otu_ids;
  var otu_labels = result.otu_labels;
  var sample_values = result.sample_values;

  // 3. Create a variable that holds the washing frequency.
  var wrfreq = result2.wrfreq;

  // Create the yticks for the bar chart.
  var data = [{
    x: sample_values.slice(0,10).reverse(),
    y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    text: otu_labels.slice(0,10).reverse(),
    type: "bar", 
    orientation: "h"
    }]

  //   // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", data, layout);
  // Use Plotly to plot the bubble data and layout.
  var bubbleData = [
  {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values,
      colorscale: "Earth"
    }
  }
];
// 2. Create the layout for the bubble chart.
var layout = {
title: 'Bacteria Cultures Per Sample',
showlegend: false,
};  
// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot('bubble',bubbleData, layout);  
});   
// 4. Create the trace for the gauge chart.
var data= [
  {
    type: "indicator",
    mode: "gauge+number",
    value: wrfreq, 
    title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
    gauge: {
      axis: { range: [null, 500], tickwidth: 1, tickcolor: "darkblue" },
      bar: { color: "black" },
      bgcolor: "white",
      borderwidth: 2,
      bordercolor: "black",
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange"},
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "lightgreen" },
        { range: [8, 10], color: "green" },
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
  }
  ];
// Create the layout for the gauge chart.    
  // 6. Use Plotly to plot the gauge data and layout.
  Plotly.newPlot('gauge', data);
}