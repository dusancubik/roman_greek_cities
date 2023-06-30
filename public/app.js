//globals
const GROUP1_ZOOM = 4
const GROUP2_ZOOM = 6
const GROUP3_ZOOM = 6
var group1_size = 5
var group2_size = 3
var group3_size = 2
var prevZoom = 0;
var isAnimationRunning = false
var currentMarker = null




//constants
//MAX_MONUMENTS = 236
//MEDIAN_MONUMENTS = 5

let mouseX = 0;
let mouseY = 0;
var sliderVal = 0;
//Card
card = d3.select("#card");
cardAncientName = d3.select("#card_ancient_name");
cardModernName =  d3.select("#card_modern_name");
cardMonumentsDiv = d3.select("#card_monuments_div");
cardFlag = d3.select("#card_flag");
cardYear = d3.select("#card_year");
yearEvent = d3.select("#year-container")
yearEventName = d3.select("#event-name")
yearEventText = d3.select("#event-text")
yearEventYear = d3.select("#event-year")
monumentLegend = d3.select("#monument_legend")
monumentLegendName = d3.select("#monument_name")
monumentLegendPhoto =  d3.select("#monument_photo")
monumentLegendText = d3.select("#monument_text")
cityLegend = d3.select("#city_legend")
cityLegendText = d3.select("#city_legend_text")

mapDiv = d3.select("#map")
const svg = d3.select("#slider-svg");
const rangeInput = document.getElementById("myRange");
console.log(d3.select("#wrapper").select("#legend").select("#rome_dot"))
d3.select("#wrapper").select("#legend").select("#rome_dot").style("background-color",getCityColor("Capital of the Empire"))
d3.select("#wrapper").select("#legend").select("#metro_dot").style("background-color",getCityColor("Metropolis capital"))
d3.select("#wrapper").select("#legend").select("#prov_dot").style("background-color",getCityColor("Provincial capital"))
d3.select("#wrapper").select("#legend").select("#conve_dot").style("background-color",getCityColor("Conventus capital"))
d3.select("#wrapper").select("#legend").select("#muni_dot").style("background-color",getCityColor("Municipium"))
d3.select("#wrapper").select("#legend").select("#col_dot").style("background-color",getCityColor("Colonia"))
d3.select("#wrapper").select("#legend").select("#syria_dot").style("background-color",getCityColor("City of the Syrian Decapolis"))
d3.select("#wrapper").select("#legend").select("#greek_dot").style("background-color",getCityColor("Metropolis (nome) capital"))
d3.select("#wrapper").select("#legend").select("#undef_dot").style("background-color",getCityColor("undefined"))

//Monument Legend
document.getElementById("agora").addEventListener("mouseenter", function(  ) {showMonumentLegend("agora")});
document.getElementById("agora").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("stadium").addEventListener("mouseenter", function(  ) {showMonumentLegend("amph")});
document.getElementById("stadium").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("aqua").addEventListener("mouseenter", function(  ) {showMonumentLegend("aqua")});
document.getElementById("aqua").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("arch").addEventListener("mouseenter", function(  ) {showMonumentLegend("arch")});
document.getElementById("arch").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("bath").addEventListener("mouseenter", function(  ) {showMonumentLegend("bath")});
document.getElementById("bath").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("fountain").addEventListener("mouseenter", function(  ) {showMonumentLegend("fountain")});
document.getElementById("fountain").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("gym").addEventListener("mouseenter", function(  ) {showMonumentLegend("gym")});
document.getElementById("gym").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("hippodrome").addEventListener("mouseenter", function(  ) {showMonumentLegend("hippodrome")});
document.getElementById("hippodrome").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("lib").addEventListener("mouseenter", function(  ) {showMonumentLegend("lib")});
document.getElementById("lib").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("music").addEventListener("mouseenter", function(  ) {showMonumentLegend("music")});
document.getElementById("music").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("law").addEventListener("mouseenter", function(  ) {showMonumentLegend("law")});
document.getElementById("law").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("temple").addEventListener("mouseenter", function(  ) {showMonumentLegend("temple")});
document.getElementById("temple").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
document.getElementById("walls").addEventListener("mouseenter", function(  ) {showMonumentLegend("walls")});
document.getElementById("walls").addEventListener("mouseout", function(  ) {hideMonumentLegend()});
//City Legend
document.getElementById("rome_leg").addEventListener("mouseenter", function(  ) {showCityLegend("rome")});
//document.getElementById("rome_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("info").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("metro_leg").addEventListener("mouseenter", function(  ) {showCityLegend("metro")});
//document.getElementById("metro_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("prov_leg").addEventListener("mouseenter", function(  ) {showCityLegend("prov")});
//document.getElementById("prov_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("conve_leg").addEventListener("mouseenter", function(  ) {showCityLegend("conve")});
//document.getElementById("conve_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("muni_leg").addEventListener("mouseenter", function(  ) {showCityLegend("muni")});
//document.getElementById("muni_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("col_leg").addEventListener("mouseenter", function(  ) {showCityLegend("col")});
//document.getElementById("col_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});
document.getElementById("syria_leg").addEventListener("mouseenter", function(  ) {showCityLegend("syria")});
//document.getElementById("syria_leg").addEventListener("mouseout", function(  ) {hideCityLegend()});

//getCityColor("Capital of the Empire")
init()
map = initMap();

map.on('click', function(e) {        
  console.log(e.latlng)
       
});
//var data;
var data; //= loadData();
var currentData;
var monumentsData;
allMarkers = [];

var group1 = L.markerClusterGroup({ clusterId: 'big'/*,disableClusteringAtZoom: 5*/ });
var group2 = L.markerClusterGroup({ clusterId: 'medium' });
var group3 = L.markerClusterGroup({ clusterId: 'small' });

var allGroups = L.markerClusterGroup({
    /*disableClusteringAtZoom: 5
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: false*/
    });
var allGroupsDivided = L.markerClusterGroup({
  /*disableClusteringAtZoom: 5
  spiderfyOnMaxZoom: false,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: false*/
  });
data = d3.csv("./public/data/roman_final.csv").row(function(d) { return {
    
    id: d["PrimaryKey"],
    lat: d["lat"],
    lng: d["lng"],
    startDate: +d["StartDate"],
    oldName: d["AncientToponym"],
    modernName: d["ModernToponym"],
    population: +d["ModernPopulation"],
    monumentsCount: d["MonumentsCount"],
    country: d["Country"],
    }; 
}).get(function(error, rows) { 
    //saving reference to data
    data = rows;
    addCivicStatus();
    //addMarkers(data);
    //allGroups.addLayers([ group1,group2, group3]);
});
currentData = data;

d3.csv("./public/data/monutents_cities.csv").row(function(d) { return {
    id: d["PrimaryKey"],
    structure: d["Structure"],
}; 
}).get(function(error, rows) { 
    //saving reference to data
    monumentsData = rows;

});

function addCivicStatus(){
  d3.csv("./public/data/civic_status.csv").row(function(d) { return {
    id: d["PrimaryKey"],
    civicStatus: d["CivicStatus"],
    rightType: d["Notes"],
  }; 
  }).get(function(error, rows) { 
    //saving reference to data
    console.log(rows)
    for (i = 0; i < data.length; i++) {
      data[i].civicStatus = "NaN";
      data[i].rightsList = [];
      for (j = 0; j < rows.length; j++) {
        if (data[i].id === rows[j].id) {
          if(rows[j].civicStatus == "Rights and privileges"){
            data[i].rightsList.push(rows[j].rightType);
          }else{
            if(data[i].civicStatus != "NaN"){
              data[i].civicStatus = civisStatusPriority(data[i].civicStatus,rows[j].civicStatus)

            }else{
              data[i].civicStatus = rows[j].civicStatus;

            }
          }
        }
      }
    }
    console.log(data)
    addMarkers(data);
    allGroups.addLayers([ group1,group2, group3]);

    
  });
}

/*var markers = L.markerClusterGroup({showCoverageOnHover:true
    })
map.addLayer(markers);*/

map.addLayer(allGroups);
//map.addLayer(group2);
//map.addLayer(group3);
map.on('zoomend', function() {
  checkForClustering()
  hideEventOnMap();
  });



function init(){
    
    //track mosue
    document.addEventListener('mousemove', function(e) { 
        mouseX = e.clientX
        mouseY = e.clientY
      
    });

    initSlider()
}


function loadData(){
    /*data = d3.dsv(";", "./public/data/roman_with_modern_pop.csv"), (d) => {
       data = d;
    });*/
    /*await*/ 
    var dd;
    d3.csv("./public/data/roman_with_modern_pop_colon.csv").row(function(d) { return {
      
        id : d["PrimaryKey"],
        
      }; 
    }).get(function(error, rows) { 
        //saving reference to data
        dd = rows;
        console.log(dd);
        return dd;
    });

}


function getClusterGroupByStatus(status){
  switch(status){
    case "Capital of the Empire": case "Metropolis capital": case "Provincial capital": case "Conventus capital":
        return "group1";
      case "Municipium": 
        return "group2";  
      default:
         return "group3"
  }
}

function getYearString(year){
  var result = year+" A.D.";
  if(parseInt(year)<0){
    result = (-1*year)+" B.C."
  }
  return result;
}

//Placeholder color
function getCityColor(civicStatus){
  //console.log(civicStatus)
  switch(civicStatus){
    case "Capital of the Empire":
      return "#7E1717"
    case "Municipium":
      return "#5F8D4E";
    break;
    case "Colonia":
      return "#99627A";
    break;
    case "Provincial capital":
      return "#E55807"
    break;
    case "Conventus capital": case "Conventus capital?":
      return "#E9A178"
    break;
    case "Metropolis capital":
      return "#8D7B68";
    break;
    case "City of the Syrian Decapolis":
      return "#EFA3C8"
    case "Metropolis (nome) capital":
      return "#BFDB38"
    
    default:
      return "#1A5F7A"
  }
}

//pop to text
function populationToText(pop){
  if(pop>1000000){
    return (pop/1000000).toFixed(1)+"M"
  }
  if(pop>1000){
    return (pop/1000).toFixed(1)+"K"
  }
}




