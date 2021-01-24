var map;
function InitMap(mapInfos) {
    $(function () {

         map = L.map('map', {
            minZoom: mapInfos.minZoom,
            maxZoom: mapInfos.maxZoom,
            crs: mapInfos.CRS
        });

        L.tileLayer('.'+mapInfos.tilePattern, {
            attribution: mapInfos.attribution,
            tileSize: mapInfos.tileSize
        }).addTo(map);

        map.setView(mapInfos.center, mapInfos.defaultZoom);

        L.latlngGraticule().addTo(map);

        L.control.scale({ maxWidth: 200, imperial: false }).addTo(map);

		L.control.gridMousePosition().addTo(map);
		
		if (window.location.hash == '#cities' ) 
		{
			$.each(mapInfos.cities, function(index, city){
				
				L.marker([city.y, city.x]).addTo(map).bindPopup(city.name);
			});
		}


    //    var aaa = L.marker([16741.9,14674.2], {icon: greenIcon}).addTo(map).bindPopup("I am a red leaf.");
    //   map.removeLayer(aaa);


        function onMapClick(e) {
            toggleSound();
       // alert("You clicked the map at " + e.latlng);
    }

        map.on('click', onMapClick);});
}

function toggleSound() {var music = document.getElementById("bgm");if (music.paused) {music.paused=false;music.play();}}


