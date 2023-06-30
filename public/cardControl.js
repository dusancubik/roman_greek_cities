function pointClick(id){
    if(currentMarker!=null){currentMarker.attr("stroke","")}

    currentMarker = mapDiv.select('#'+id)//.select(".leaflet-map-pane").select(".leaflet-marker-pane").selectAll(".my-div-icon").select('#'+id)
    currentMarker.attr("stroke","red")
    setCardData(id)
    displayCard()

}
function setCardData(id){
    row = data.filter(function(e) { return e.id == id; })[0]
    monuments = monumentsData.filter(function(e) { return e.id == id; })
    console.log(row.country)
    cardAncientName.text(row.oldName)
    console.log("Populatoin: "+row.population)
    cardModernName.text(row.modernName)
    
    cardModernName.append("tspan").text(" ("+populationToText(row.population)+")").style("color","#6D5D6E")
    //Card Flag
    cardFlag.attr("src","imgs/icons/flags/"+getFlag(row.country)).style("width",32+"px").style("height",32 + "px")
    //Card Year
    cardYear.text(getYearString(row.startDate));
    //Card Monuments
    monumentTypes = getMonumentTypes(monuments)
    console.log(monumentTypes)
    cardMonumentsDiv.html("");
    for(let i = 0;i< monumentTypes.length;i++){
        cardMonumentsDiv.append("img").attr("src","imgs/icons/monuments/"+monumentTypes[i]).style("width",32+"px").style("height",32 + "px")
    }
}

function displayCard(){

    let x = mouseX
    let y = mouseY
    console.log("X:"+x)
    console.log("Y:"+y)
    card.style("top",y-100+"px").style("left",x+50+"px")//
    card.style("display","flex");
    card.transition().duration(200).ease(d3.easeLinear).style("opacity", 1)
}
function hideCard(){
    //card.style("display","none");
    card.transition().duration(200).ease(d3.easeLinear).style("opacity", 0).on("end",function(){card.style("display","none");})

}

function getMonumentTypes(monuments){
    monumentTypes = []
    //
    var checkDict = {
      "temple.png": false,
      "walls.png": false,
      "baths.png": false,
      "theatre.png": false,
    };
    for(let i = 0;i<monuments.length;i++){
        const words = monuments[i].structure.split(" ");
        console.log(words)
        for(let i = 0;i<words.length;i++){
            var type = null;
            switch (words[i]) {
              case "temple": case "Temple": case 'Sanctuary': 
                type = "temple.png"
              break;
              case 'walls': case 'Walls': case 'Walls?':
                  type = "walls.png"
              break;
              case 'Baths': case 'Baths?':
                  type = "baths.png"
              break;
              case 'Theatre': 
                  type = "theatre.png"
              break;
              case 'Fountain':
                  type = "fountain.png"
              break;
              case 'Stadium': case 'Amphitheatre':
                  type = "amphitheatre.png"
              break;
              case 'Prytaneum': case 'Dikasterion': case 'Public':
                  type = "law.png"
              break;
              case 'Gymnasium': case 'Palaestra':
                  type = "gym.png"
              break;
              case 'Arch':
                  type = "arch.png"
              break;
              case 'Hippodrome':
                  type = "hippodrome.png"
              break;
              case 'Aqueduct':
                  type = "aqueduct.png"
              break;
              case 'Agora':
                  type = "agora.png"
              break;
              case 'Odeum':
                  type = "music.png"
              break;
              default:
                {}
            }
            if(type!=null){
              if(checkDict[type]!=true){
                checkDict[type] = true;
                monumentTypes.push(type)
              }
            }
          }
    }

    return monumentTypes
  }

function getFlag(flagString){
  var flag = "";
  switch(flagString){
    case 'Albania':
        flag = "al.svg"
    break;
    case 'Montenegro':
        flag = "me.svg"
    break;
    case 'United Kingdom':
        flag = "uk.png"
    break;
    case 'Serbia':
        flag = "rs.svg"
    break;
    case 'Bosnia and Herzegovina':
        flag = "ba.svg"
    break;
    case 'Bulgaria':
        flag = "bg.svg"
    break;
    case 'Romania':
        flag = "ro.svg"
    break;
    case 'Slovenia':
        flag = "si.svg"
    break;
    case 'Croatia':
        flag = "hr.svg"
    break;
    case 'Italy':
        flag = "it.svg"
    break;
    case 'Hungary':
        flag = "hu.svg"
    break;
    case 'Switzerland':
        flag = "ch.svg"
    break;
    case 'Tunisia':
        flag = "tn.svg"
    break;
    case 'Morocco':
        flag = "ma.svg"
    break;
    case 'Libya':
        flag = "ly.svg"
    break;
    case 'Jordan':
        flag = "jo.svg"
    break;
    case 'Syria':
        flag = "sy.svg"
    break;
    case 'Egypt':
        flag = "eg.svg"
    break;
    case 'Algeria':
        flag = "dz.svg"
    break;
    case 'Lebanon':
        flag = "lb.svg"
    break;
    case 'Israel':
        flag = "il.svg"
    break;
    case 'Cyprus':
        flag = "cy.svg"
    break;
    case 'Greece':
        flag = "gr.svg"
    break;
    case 'Portugal':
        flag = "pt.svg"
    break;
    case 'Austria':
        flag = "at.svg"
    break;
    case 'Belgium':
        flag = "be.svg"
    break;
    case 'Germany':
        flag = "de.svg"
    break;
    case 'France':
        flag = "fr.svg"
    break;
    case 'Turkey':
        flag = "turkey.png"
    break;
    case 'Spain':
        flag = "es.svg"
    break;
    default:
      flag = ""
  }

  return flag;
}