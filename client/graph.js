const graphHeight = 520;
const graphWidth = 920;

const xBuffer = 110;
const hoursWidth = graphWidth - xBuffer;
const hourWidth = hoursWidth / 24;

const yBuffer = 35;
const daysHeight = graphHeight - yBuffer;
const dayHeight = daysHeight / 7;

const append = b => a => a + b;
const makeHourNames = ch => [12].concat(d3.range(1, 12)).map(append(ch));
const hourNames = makeHourNames('a').concat(makeHourNames('p'));

const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function makeGraph(data) {
  const palette = makePalette('#graph', graphWidth, graphHeight);
  const dayRows = makeDayRows(palette, dayNames);
  const dayLabels = makeDayLabels(dayRows);
  const lowerLines = makeLowerLines(dayRows);
  const hourLabels = makeHourLabels(palette.append('g'));
}

function makePalette(sel, width, height) {
  return d3.select(sel).append('svg').attr({width, height});
}

function makeDayRows(elm, data) {
  return construct(elm, data, 'g')
    .attr('class', 'day-row')
    .attr('transform', (d, i) => translate(0, i * dayHeight + yBuffer));
}

function makeDayLabels(sel) {
  return sel.append('text')
    .attr('class', 'day-label')
    .text(d => d);
}

function makeLowerLines(sel) {
  return sel.append('line')
    .attr({
      x1: 0, x2: graphWidth,
      y1: 30, y2: 30
    });
}

function makeHourLabels(elm) {
  return construct(elm, hourNames, 'text')
    .attr('class', 'hour-label')
    .attr('text-anchor', 'bottom')
    .attr('transform', (d, i) => translate(i * hourWidth + xBuffer, graphHeight - 5))
    .text(d => d);
}

// Utilities

function construct(sel, data, tag) {
  return sel.selectAll(tag).data(data).enter().append(tag);
}

function translate(x, y) {
  return 'translate(' + x + ',' + y + ')';
}
