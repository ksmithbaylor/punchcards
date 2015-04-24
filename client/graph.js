const graphHeight = 520;
const graphWidth = 920;

const append = b => a => a + b;
const hours = ch => [12].concat(d3.range(1, 12)).map(append(ch));
const allHours = hours('a').concat(hours('p'));

const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
               'Thursday', 'Friday', 'Saturday' ];

const graph = d3.select('#graph')
                .append('svg')
                .attr('width', graphWidth)
                .attr('height', graphHeight);

function makeGraph(graph, data) {
  console.log(allHours);
  console.log(days);
  console.log(JSON.stringify(data));
}
