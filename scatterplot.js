// Set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 40, left: 110},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
 
    const svg = d3.select("#scatter-plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", 400)
        .append("g")
        .attr("fill", "#f0f0f0")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#f0f0f0");
// Read the data
let promises = [d3.csv("dfPovertyAdultLit.csv")];
let allData = [];

Promise.all(promises).then(function (data) {
  data.forEach(function (eachDataset) {
    eachDataset.forEach(function (d) {
      d["Poverty Rate (%)"] = +d["Poverty Rate (%)"];
      d["Year"] = new Date(d["Year"]);
      if (
        d.hasOwnProperty(
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        )
      ) {
        d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ] = +d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ];
      }
    });
  });

  allData = data;

  updateChart(allData);
});

// Add in event listener for geographic choice
$("#geographicChoice").on("change", function () {
  updateChart(allData);
});

// Function that builds the right chart depending on user choice on website
function updateChart(someData) {
  let dataAdultLit = d3
    .nest()
    .key(function (d) {
      return d["Year"];
    })
    .entries(someData[0]);

  let filteredData = dataAdultLit[5];

  filteredData =
    $("#geographicChoice").val() === "allProv"
      ? filteredData["values"]
      : filteredData["values"].filter(
          (each) => each["Province"] === $("#geographicChoice").val()
        );

  // Add X axis
  let x = d3.scaleLinear().domain([0, 100]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add x-axis label
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")"
    )
    .style("text-anchor", "middle")
    .text("Adult Literacy");

  // Add Y axis
  let y = d3.scaleLinear().domain([0, 100]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
    .attr("x", 0 - height / 2)
    .style("text-anchor", "middle")
    .text("Poverty Rate");

  // Color scale: input a province name, output a color
  let color = d3
    .scaleOrdinal()
    .domain([
      "Balochistan",
      "Federal Capital Territory",
      "Khyber Pakhtunkhwa",
      "Punjab",
      "Sindh",
    ])
    .range(["#440154ff", "#21908dff", "#fde725ff", "#129490", "#CE1483"]);

  // JOIN data to elements
  let circles = svg.selectAll("circle").data(filteredData, function (d) {
    return d["District"];
  });

  // EXIT old elements not present in new data
  circles.exit().remove();

  // ENTER new elements present in new data
  circles
    .enter()
    .append("circle")
    .attr("class", "enter")
    .attr("fill", function (d) {
      return color(d["Province"]);
    })
    .attr("cy", function (d) {
      return y(d["Poverty Rate (%)"]);
    })
    .attr("cx", function (d) {
      return x(
        d[
          "Adult literacy, 25 or more years old (% of population aged 25 or more)"
        ]
      );
    })
    .attr("r", 5);
}
