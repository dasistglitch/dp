var dataUrl = 'data/data.csv';  //путь к файлу с сотрудниками
var fieldSeparator = '|';
var baseUrl = 'img/{z}-{x}-{y}.jpg'; //папка с тайлами
var baseAttribution = 'Usolcev I. D.';
var subdomains = '1234';
var clusterOptions = {showCoverageOnHover: false, maxClusterRadius: 20};
var labelColumn = "Name";
var opacity = 1.0;

	/*Задаём размеры карты*/
var width = 2203;
var height = 2366;
	/*Задаём максимальный и минимальный зум*/
var maxLevel = 4; //максимальный зум
var minLevel = 3; //минимальный зум
var orgLevel = 4;
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