const graphHeight = 520;
const graphWidth = 920;

const xBuffer = 104;
const hoursWidth = graphWidth - xBuffer;
const hourWidth = hoursWidth / 24;

const yBuffer = 35;
const dayHeight = 67

const lineBase = 60;

const append = b => a => a + b;
const makeHourNames = ch => [12].concat(d3.range(1, 12)).map(append(ch));
const hourNames = makeHourNames('a').concat(makeHourNames('p'));

const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function makeGraph(data) {
  const dataPoints = _.pluck(data, 2);
  const dataByDay = _.zip(dayNames, _.chunk(dataPoints, 24));

  d3.select('svg').remove();
  const palette = makePalette('#graph', graphWidth, graphHeight);

  const dayRows = makeDayRows(palette, dataByDay);

  const dayLabels = makeDayLabels(dayRows);
  const lowerLines = makeLowerLines(dayRows);
  const hours = makeHours(dayRows);
  const ticks = makeTicks(hours);
  const circles = makeCircles(hours, dataPoints);

  const hourLabels = makeHourLabels(palette.append('g'));
}

function makePalette(sel, width, height) {
  return d3.select(sel).append('svg').attr({width, height});
}

function makeDayRows(sel, data) {
  return construct(sel, data, 'g')
    .attr('class', 'day-row')
    .attr('transform', (d, i) => translate(0, i * dayHeight + 9));
}

function makeDayLabels(sel) {
  return sel.append('text')
    .attr('class', 'day-label')
    .attr('dy', 30)
    .text(d => d[0]);
}

function makeLowerLines(sel) {
  return sel.append('line')
    .attr({ x1: 0, x2: graphWidth, y1: lineBase, y2: lineBase });
}

function makeHours(sel, data) {
  return construct(sel, d => d[1], 'g')
    .attr('class', 'hour')
    .attr('transform', (d, i) => translate(i * hourWidth + xBuffer, 0));
}

function makeTicks(sel) {
  return sel.append('line')
    .attr({ x1: 0, x2: 0, y1: (d, i) => i % 2 == 0 ? 45 : 50, y2: lineBase });
}

function makeHourLabels(sel) {
  return construct(sel.append('g'), hourNames, 'text')
    .attr('class', 'hour-label')
    .attr('text-anchor', 'middle')
    .attr('transform', (d, i) => translate(i * hourWidth + xBuffer, graphHeight - 20))
    .text(d => d);
}

function makeCircles(sel, data) {
  const scale = d3.scale.linear()
    .domain([1, d3.max(data)])
    .range([1, 15]);

  return sel.append('circle')
    .attr('r', d => scale(d))
    .attr('cy', 25);
}

// Utilities

function construct(sel, data, tag) {
  return sel.selectAll(tag).data(data).enter().append(tag);
}

function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}
