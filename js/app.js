    /*Задаём размеры карты*/
      var width = 2197;
      var height = 618;
    /*Задаём максимвльный и минимальный зум*/
      var maxLevel = 4;
      var minLevel = 3;
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


var basemap = new L.TileLayer(baseUrl, {bounds: bounds, minZoom: minLevel, maxZoom: maxLevel, attribution: baseAttribution, 
    subdomains: subdomains, opacity: opacity, noWrap: true});

var center = new L.LatLng(centerLat, centerLon); //центр карты

var map = new L.Map('map', {center: center, zoom: 2, maxZoom: maxLevel, layers: [basemap]});
//map.dragging.disable(); //click and dragging on map
   // Map.setMaxBounds([bounds]);

var popupOpts = {
    autoPanPadding: new L.Point(5, 50),
    autoPan: true
};

var points = L.geoCsv (null, {
    firstLineTitles: true,
    fieldSeparator: fieldSeparator,
    onEachFeature: function (feature, layer) {
        var popup = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
        for (var clave in feature.properties) {
            var title = points.getPropertyTitle(clave).strip();
            var attr = feature.properties[clave];
            if (title == labelColumn) {
                layer.bindLabel(feature.properties[clave], {className: 'map-label'});
            }
            if (attr.indexOf('http') === 0) {
                attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
            }
            if (attr) {
                if (title == 'Фото') {
                popup += '<tr><th>'+title+'</th><td>'+ '<img src="photos/'+ attr +'.png">' +'</td></tr>';
            } else
                if (attr) {
                    popup += '<tr><th>'+title+'</th><td>'+ attr +'</td></tr>'; 
                }
            }
        }
        popup += "</table></popup-content>";
        layer.bindPopup(popup, popupOpts);
    },
    filter: function(feature, layer) {
        total += 1;
        if (!filterString) {
            hits += 1;
            return true;
        }
        var hit = false;
        var lowerFilterString = filterString.toLowerCase().strip();
        $.each(feature.properties, function(k, v) {
            var value = v.toLowerCase();
            if (value.indexOf(lowerFilterString) !== -1) {
                hit = true;
                hits += 1;
                return false;
            }
        });
        return hit;
    }
});

var hits = 0;
var total = 0;
var filterString;
var markers = new L.MarkerClusterGroup();
var dataCsv;

var addCsvMarkers = function() {
    hits = 0;
    total = 0;
    filterString = document.getElementById('filter-string').value;

    if (filterString) {
        $("#clear").fadeIn();
    } else {
        $("#clear").fadeOut();
    }

    map.removeLayer(markers);
    points.clearLayers();

    markers = new L.MarkerClusterGroup(clusterOptions);
    points.addData(dataCsv);
    markers.addLayer(points);

    map.addLayer(markers);
    try {
        var bounds = markers.getBounds();
        if (bounds) {
            map.fitBounds(bounds);
        }
    } catch(err) {
        // pass
    }
    if (total > 0) {
        $('#search-results').html("Showing " + hits + " of " + total);
    }
    return false;
};

var typeAheadSource = [];

function ArrayToSet(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}

function populateTypeAhead(csv, delimiter) {
    var lines = csv.split("\n");
    for (var i = lines.length - 1; i >= 1; i--) {
        var items = lines[i].split(delimiter);
        for (var j = items.length - 1; j >= 0; j--) {
            var item = items[j].strip();
            item = item.replace(/"/g,'');
            if (item.indexOf("http") !== 0 && isNaN(parseFloat(item))) {
                typeAheadSource.push(item);
                var words = item.split(/\W+/);
                for (var k = words.length - 1; k >= 0; k--) {
                    typeAheadSource.push(words[k]);
                }
            }
        }
    }
}

if(typeof(String.prototype.strip) === "undefined") {
    String.prototype.strip = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

map.addLayer(markers);

$(document).ready( function() {
    $.ajax ({
        type:'GET',
        dataType:'text',
        url: dataUrl,
        contentType: "text/csv; charset=utf-8",
        error: function() {
            alert('Увы, но в вашей компании нет сотрудников :С Нам очень жаль. ');
        },
        success: function(csv) {
            dataCsv = csv;
            populateTypeAhead(csv, fieldSeparator);
            typeAheadSource = ArrayToSet(typeAheadSource);
            $('#filter-string').typeahead({source: typeAheadSource});
            addCsvMarkers();
        }
    });

    $("#clear").click(function(evt){
        evt.preventDefault();
        $("#filter-string").val("").focus();
        addCsvMarkers();
        
    });

});
/*Выпадающее меню*/
$(document).ready(function(){
    $('.topmenu ul li').hover(
        function() {
            $(this).addClass("active");
            $(this).find('ul').slideDown();
        },
        function() {
            $(this).removeClass("active");        
            $(this).find('ul').slideUp('fast');
        }
    );
});