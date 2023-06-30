function initMap(){
    var map = L.map('map').setView([0, 0], 2);

var Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
   subdomains: 'abcd',
   minZoom: 0,
   maxZoom: 20,
   ext: 'jpg'
    });
    map.addLayer(Stamen_Toner);
    /*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);*/
    map.on("click", function(e){
        hideCard();
        if(currentMarker!=null){currentMarker.attr("stroke","")}
    })
    return map;
}

function addMarkers(d){
    //data.then(function(d){
    minDate = 0;
    maxDate = 0;
    for(let i = 0;i<d.length;i++){
        circleSize = getCircleSize(d[i].monumentsCount)
        markerGroup = getClusterGroupByStatus(d[i].civicStatus)
        if(d[i].civicStatus == "Capital of the Empire"){
          console.log("capital?")
          console.log(d[i].modernName)
        }
        var marker = L.marker([parseFloat(d[i].lat), parseFloat(d[i].lng)],{icon: new L.DivIcon({
            className: 'my-div-icon',
            html: '<div class="cityIconDiv" >'+
                   '<svg width="20" height="20" onclick = pointClick("'+d[i].id+'")>'+
                   '<circle id="'+d[i].id+'"class="'+getClusterGroupByStatus(d[i].civicStatus)+'" cx="10" cy="10" r="'+ circleSize +'"  /*stroke-width="2"*/ fill='+getCityColor(d[i].civicStatus)+' />'+
                    '</svg>'+
                  ((d[i].monumentsCount >= 15)?'<span class="svg_city_name">'+ d[i].oldName +'</span>':"")+
                  /*'<span class="svg_city_name">'+ d[i].monumentsCount +'</span>'+*/
                  '</div>'
        }) });//.addTo(map);
        marker.onMap = true;
        marker.year = d[i].startDate;
        marker.coords = [parseFloat(d[i].lat), parseFloat(d[i].lng)]
        allMarkers.push(marker);
        //markers.addLayer(marker);
        if(markerGroup=="group1"){
            marker.group = 1;
            group1.addLayer(marker);
            //console.log("circleSize 12")
        }else if(markerGroup=="group2"){
            marker.group = 2;
            group2.addLayer(marker);
        }else{

            marker.group = 3;
            //console.log("group3")
            group3.addLayer(marker);
        }
         
        if(d[i].startDate<minDate){
            minDate = d[i].startDate;
        }
        if(d[i].startDate>maxDate){
            maxDate = d[i].startDate;
        }
       // console.log(d[i].startDate)
    }
    document.getElementById("myRange").min = minDate;
    document.getElementById("myRange").max = maxDate;

    //document.getElementById("upper").min = minDate;
    //document.getElementById("upper").max = maxDate;

    //document.getElementById("lower").value = minDate;
    //document.getElementById("upper").value = maxDate;
    //console.log(minDate);
    //console.log(maxDate)
    //})

}

function reset(){
    map.removeLayer(allGroups)
    map.removeLayer(allGroupsDivided)
    //allGroups.clearLayers();
    var group1s = L.markerClusterGroup({ clusterId: 'big' });
    var group2s = L.markerClusterGroup({ clusterId: 'medium' });
    var group3s = L.markerClusterGroup({ clusterId: 'small' });
  
    var allGroups2 = L.markerClusterGroup({
  
        });
    //allGroups.removeLayer(allGroups.getLayerId(group1));
    //allGroups.removeLayer(allGroups.getLayerId(group2));
    //allGroups.removeLayer(allGroups.getLayerId(group3));
  
    
    for(let i = 0;i<allMarkers.length;i++){
      let marker =  allMarkers[i]
      let group = marker.group;
      let date = marker.year;
      let onMap = marker.onMap;
      console.log(date);
      console.log(typeof(date))
      if(date<=sliderVal ){
        console.log("addabck1");
        //if(!onMap){
          console.log("addabck2");
          switch(group){
            case 1:
              group1s.addLayer(marker)
            break;
            case 2:
              group2s.addLayer(marker)
            break;
            default:
              group3s.addLayer(marker)
          }
          //allGroups.addLayer(marker);
          
       // }
        marker.onMap = true;
      }
    }
    group1 = group1s
    group2 = group2s
    group3 = group3s
    allGroups = allGroups2
    allGroups2.addLayers([group1s, group2s, group3s]);
    map.addLayer(allGroups2);
    checkForClustering()
    return;
  }

  function checkForClustering(){
    var zoomLevel = map.getZoom();
      console.log(zoomLevel)
      map.removeLayer(allGroups)
      map.removeLayer(allGroupsDivided)
      if (zoomLevel >= GROUP1_ZOOM && zoomLevel < GROUP2_ZOOM) {
        //allGroups.clearLayers();
        console.log("zoomLevel <= GROUP1_ZOOM")
        //map.removeLayer(allGroups)
        //map.removeLayer(allGroupsDivided)
        allGroupsVisible = L.markerClusterGroup({
          disableClusteringAtZoom:  GROUP1_ZOOM
          });
        allGroupsTmp = L.markerClusterGroup();
        //group1.disableClustering()
        allGroupsVisible.addLayers([group1])
        allGroupsTmp.addLayers([group2,group3])
        allGroups = allGroupsTmp
        allGroupsDivided = allGroupsVisible
        //map.addLayer(allGroups)
        //map.addLayer(allGroupsDivided)
        
      }else if((zoomLevel >= GROUP2_ZOOM && zoomLevel < GROUP3_ZOOM)){
        //scaleMarkers()
        //map.removeLayer(allGroups)
        //map.removeLayer(allGroupsDivided)
        allGroupsVisible = L.markerClusterGroup({
          disableClusteringAtZoom: GROUP2_ZOOM
          });
        allGroupsTmp = L.markerClusterGroup();
        //group1.disableClustering()
        allGroupsVisible.addLayers([group1,group2])
        allGroupsTmp.addLayers([group3])
        allGroups = allGroupsTmp
        allGroupsDivided = allGroupsVisible
        //map.addLayer(allGroups)
        //map.addLayer(allGroupsDivided)
      }else if(zoomLevel >= GROUP3_ZOOM){
       // map.removeLayer(allGroups)
        //map.removeLayer(allGroupsDivided)
        allGroupsVisible = L.markerClusterGroup({
          disableClusteringAtZoom: GROUP3_ZOOM
          });
        allGroupsTmp = L.markerClusterGroup();
        //group1.disableClustering()
        allGroupsVisible.addLayers([group1,group2,group3])
        //allGroupsTmp.addLayers([group3])
        allGroups = allGroupsTmp
        allGroupsDivided = allGroupsVisible
        //map.addLayer(allGroups)
        //map.addLayer(allGroupsDivided)
      }else{
        allGroupsVisible = L.markerClusterGroup({
          //disableClusteringAtZoom: 5
          });
        allGroupsTmp = L.markerClusterGroup();
        //group1.disableClustering()
        allGroupsVisible.addLayers([group1,group2,group3])
        //allGroupsTmp.addLayers([group3])
        allGroups = allGroupsTmp
        allGroupsDivided = allGroupsVisible
      }
      map.addLayer(allGroups)
      map.addLayer(allGroupsDivided)
  
      //scaleMarkers(zoomLevel,prevZoom);
  
  
      prevZoom = zoomLevel;
  }


function getCircleSize(monumentsCount){
    if(monumentsCount > 20)
        return group1_size ;
    /*if(monumentsCount > 12)
        return 7;*/
    if(monumentsCount > 5)
        return group2_size ;
    if(monumentsCount >= 0)
        return group3_size ;
}


const civicRank = new Map([
    ["Capital of the Empire",10],
    ["Metropolis capital",9],
    ["Provincial capital",8],
    ["Conventus capital",7],
    ["Municipium",6],
    ["Colonia",5],
    ["City of the Syrian Decapolis",10],
    ["Metropolis (nome) capital",10],
  
  ])


  //civic status priority
function civisStatusPriority(current, news){
    let currentR = civicRank.has(current)?civicRank.get(current):4
    let newsR = civicRank.has(news)?civicRank.get(news):4
  
    if(newsR<currentR){
      return current
    }else{
      return news
    }
  }