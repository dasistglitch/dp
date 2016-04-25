var dataUrl = 'data/data2.csv';
//var maxZoom = 9;
var fieldSeparator = '|';
var baseUrl = 'img/mt/{z}-{x}-{y}.jpg';
//var baseAttribution = 'Data, imagery and map information provided by <a href="http://open.mapquest.co.uk" target="_blank">MapQuest</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> and contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/" target="_blank">CC-BY-SA</a>';
var baseAttribution = 'Usolcev I. D.';
var subdomains = '1234';
var clusterOptions = {showCoverageOnHover: false, maxClusterRadius: 20}; //радиус, при котором маркеры объединяются в кластер
var labelColumn = "Name";
var opacity = 1.0;