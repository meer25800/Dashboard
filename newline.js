d3.text(
    'https://gist.githubusercontent.com/ducpham03/91fd67c7d67ef1317fc4f16aa4bfdd78/raw/fea7efddc769518ce3837dbcf8dba7ea3b11db9c/4_Cities_Temperature.csv',
  ).then(function (text) {
    // Split the text into lines
    const lines = text.trim().split('\n');
  
    // Initialize an empty array to store the data
    const data = [];
  
    for (let i = 1; i < lines.length; i++) {
      const [Month, NYC, LA, Chicago, Houston] =
        lines[i].split(',');
      console.log(Month, NYC, LA, Chicago, Houston); // Debugging
      data.push({
        Month: Month.trim(),
        NYC: +NYC.replace('°F', '').trim(),
        LA: +LA.replace('°F', '').trim(),
        Chicago: +Chicago.replace('°F', '').trim(),
        Houston: +Houston.replace('°F', '').trim(),
      });
    }
    // Ensure data parsing
    console.log(data); 
    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 50,
    };
    const width = 800 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    const svg = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    svg.append("rect")
    .attr("width", width)
    .attr("height", height+50)
    .attr("fill", "#f0f0f0");
    
   
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.Month))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3
      .scaleLinear()
      .domain([10, 90]) // Set domain to 0-100
      .range([height, 0]);
  

    const line = d3
      .line()
      .x((d) => xScale(d.Month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.NYC))
      .curve(d3.curveLinear);
  
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);
  
    const line2 = d3
      .line()
      .x((d) => xScale(d.Month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.LA))
      .curve(d3.curveLinear);
  
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('d', line2);
  
    const line3 = d3
      .line()
      .x((d) => xScale(d.Month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.Chicago))
      .curve(d3.curveLinear);
  
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 2)
      .attr('d', line3);
  
    const line4 = d3
      .line()
      .x((d) => xScale(d.Month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.Houston))
      .curve(d3.curveLinear);
  
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-width', 2)
      .attr('d', line4);
  
    
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'brown')
      .style('color', 'white')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.2)');
  
   
    svg
      .selectAll('.dot-NYC')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot-NYC')
      .attr(
        'cx',
        (d) => xScale(d.Month) + xScale.bandwidth() / 2,
      )
      .attr('cy', (d) => yScale(d.NYC))
      .attr('r', 4)
      .attr('fill', 'blue')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select('#tooltip');
        tooltip
          .style('visibility', 'visible')
          .html(
            `<strong>${d.Month}</strong><br/>NYC: ${d.NYC}&deg;F`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select('#tooltip').style('visibility', 'hidden');
      });
  
 
    svg
      .selectAll('.dot-LA')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot-LA')
      .attr(
        'cx',
        (d) => xScale(d.Month) + xScale.bandwidth() / 2,
      )
      .attr('cy', (d) => yScale(d.LA))
      .attr('r', 4)
      .attr('fill', 'red')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select('#tooltip');
        tooltip
          .style('visibility', 'visible')
          .html(
            `<strong>${d.Month}</strong><br/>LA: ${d.LA}&deg;F`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select('#tooltip').style('visibility', 'hidden');
      });
  
    svg
      .selectAll('.dot-Chicago')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot-Chicago')
      .attr(
        'cx',
        (d) => xScale(d.Month) + xScale.bandwidth() / 2,
      )
      .attr('cy', (d) => yScale(d.Chicago))
      .attr('r', 4)
      .attr('fill', 'green')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select('#tooltip');
        tooltip
          .style('visibility', 'visible')
          .html(
            `<strong>${d.Month}</strong><br/>Chicago: ${d.Chicago}&deg;F`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select('#tooltip').style('visibility', 'hidden');
      });
  
    svg
      .selectAll('.dot-Houston')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot-Houston')
      .attr(
        'cx',
        (d) => xScale(d.Month) + xScale.bandwidth() / 2,
      )
      .attr('cy', (d) => yScale(d.Houston))
      .attr('r', 4)
      .attr('fill', 'orange')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select('#tooltip');
        tooltip
          .style('visibility', 'visible')
          .html(
            `<strong>${d.Month}</strong><br/>Houston: ${d.Houston}&deg;F`,
          )
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select('#tooltip').style('visibility', 'hidden');
      });
  

    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr(
        'transform',
        'translate(' + (width - 120) + ',' + 20 + ')',
      );
  
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'red')
      .text('LA');
  
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 20)
      .attr('fill', 'blue')
      .text('NYC');
  
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 40)
      .attr('fill', 'green')
      .text('Chicago');
  
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 60)
      .attr('fill', 'orange')
      .text('Houston');
  

    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('dy', '1em') 
      .style('text-anchor', 'end');
  
    svg.append('g').call(d3.axisLeft(yScale).ticks(11)); 
  

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      ;
  });