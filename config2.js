var dataUrl = 'data/data2.csv';
var fieldSeparator = '|';
var baseUrl = 'img/mt/{z}-{x}-{y}.jpg';
var baseAttribution = 'Usolcev I. D.';
var subdomains = '1234';
var clusterOptions = {showCoverageOnHover: false, maxClusterRadius: 20}; //радиус, при котором маркеры объединяются в кластер
var labelColumn = "Name";
var opacity = 1.0;
    /*Задаём размеры карты*/
var width = 4290;
var height = 1976;
    /*Задаём максимальный и минимальный зум*/
var maxLevel = 5;
var minLevel = 2;
var orgLevel = 5;


    /*Рассчитываем координаты для границ и начального положения карты при открытии*/
var tileWidth = 256 * Math.pow(2, orgLevel);
var radius = tileWidth / 2 / Math.PI;
var rx = width - tileWidth / 2;
var ry = -height + tileWidth / 2;
var west = -180;
var east = (180 / Math.PI) * (rx / radius);
var north = 85.05;
var south = (360 / Math.PI) * (Math.atan(Math.exp(ry / radius)) - (Math.PI / 4));
var rc = (tileWidth / 2 + ry) / 2;
    /*Координаты используются для указания центра карты*/
var centerLat = (360 / Math.PI) * (Math.atan(Math.exp(rc / radius)) - (Math.PI / 4));
var centerLon = (west + east) / 2;

var bounds = [[south, west], [north, east]]; //границы