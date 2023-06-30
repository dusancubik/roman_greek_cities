const legendMonumentData = new Map([
    ["agora",{head: "Agora", text:"An open public space in ancient Rome used for assemblies, markets, and social gatherings.",imgPath:"public/imgs/photos/monuments/agora.jpg"}],
    ["amph",{head: "Amphitheatre", text:"A grand circular structure where gladiatorial contests and other public spectacles took place.",imgPath:"public/imgs/photos/monuments/amph.jpg"}],
    ["aqua",{head: "Aquaduct", text:"A magnificent system of arched channels that transported water over long distances to supply cities and towns.",imgPath:"public/imgs/photos/monuments/aqua.jpg"}],
    ["arch",{head: "Arch", text:"A graceful architectural feature consisting of a curved structure supported by two vertical pillars.",imgPath:"public/imgs/photos/monuments/arch.jpg"}],
    ["bath",{head: "Baths", text:"Lavish communal bathing complexes featuring heated rooms, cold plunge pools, and various other amenities for relaxation and socializing.",imgPath:"public/imgs/photos/monuments/baths.jpg"}],
    ["fountain",{head: "Fountain", text:"Ornate water features often adorned with sculptures, providing a refreshing and decorative element to public spaces.",imgPath:"public/imgs/photos/monuments/fountain.jpg"}],
    ["gym",{head: "Gymnasium", text:"A training facility for physical exercises, including sports, wrestling, and other athletic activities.",imgPath:"public/imgs/photos/monuments/palaestra.jpg"}],
    ["hippodrome",{head: "Hippodrome", text:"The Hippodrome was a massive ancient Roman/Greek stadium used for chariot racing, athletic contests, and public spectacles.",imgPath:"public/imgs/photos/monuments/hippodrome.jpg"}],
    ["lib",{head: "Library", text:"Repositories of knowledge and culture, where scrolls and books were housed and made available to scholars and the educated elite.",imgPath:""}],
    ["music",{head: "Odeum", text:"A small covered theater or concert hall used for musical performances, recitations, and other cultural events in ancient Rome.",imgPath:"public/imgs/photos/monuments/odeum.jpg"}],
    ["law",{head: "Prytareum", text:"A public building where civic and religious authorities gathered, often serving as the official residence for a city's magistrates.",imgPath:""}],
    ["temple",{head: "Temple", text:"Sacred structures dedicated to the worship of Roman gods and goddesses, characterized by their imposing architecture and ornate decorations.",imgPath:"public/imgs/photos/monuments/temple.jpeg"}],
    ["walls",{head: "Fort", text:"Military installations designed for defense and strategic control, often featuring defensive walls, towers, and barracks to house Roman soldiers.",imgPath:"public/imgs/photos/monuments/fort.jpg"}],
  ])
  
  const legendCityData = new Map([
    ["rome",{text:"Rome"}],
    ["metro",{text:"administrative, cultural or economic center"}],
    ["prov",{text:"administrative capital of a province"}],
    ["conve",{text:"administrative, cultural or economic center"}],
    ["muni",{text:"mostly italic, self-governing city - typically with a certain level of autonomy and local administrative authority."}],
    ["col",{text:"originally a Roman outpost established in conquered territory to secure it"}],
    ["syria",{text:"group of Hellenistic cities. Most of them are in today's Syria"}],
    ["greek",{text:""}],
  ])
  
//show monument legend
function showMonumentLegend(monument){
    let info = legendMonumentData.get(monument)
    console.log(legendMonumentData)
    console.log(info.head)
    let x = mouseX;
    let y = mouseY;
    monumentLegend.style("top",y-200+"px").style("left",x-600+"px")//
    monumentLegend.style("display","flex");
    monumentLegend.transition().duration(200).ease(d3.easeLinear).style("opacity", 1)
    monumentLegendName.text(info.head)
    monumentLegendPhoto.attr("src",info.imgPath)
    monumentLegendText.text(info.text)
    //yearEventYear.text(getYearString(eventsData[id].year))
  }
  function hideMonumentLegend(){
    monumentLegend.transition().duration(200).ease(d3.easeLinear).style("opacity", 0).on("end",function(){monumentLegend.style("display","none");})
  }
  //show city legend
  function showCityLegend(city){
    let info = legendCityData.get(city)
    console.log(info.text)
    let x = mouseX;
    let y = mouseY;
    cityLegend.style("top",y+"px").style("left",x-600+"px")////("top",y+20+"px").style("left",x-200+"px")//
    cityLegend.style("display","flex");
    cityLegend.transition().duration(200).ease(d3.easeLinear).style("opacity", 1)
    cityLegendText.text(info.text)
  
    //yearEventYear.text(getYearString(eventsData[id].year))
  }
  function hideCityLegend(){
    cityLegend.transition().duration(200).ease(d3.easeLinear).style("opacity", 0).on("end",function(){cityLegend.style("display","none");})
  }
  