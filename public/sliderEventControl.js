eventArrows = null;
const eventsData = [
    { id:0,year: -58, label: "Ceasar in Galia", 
      text:"Gallic Wars, (58–50 BCE), campaigns in which the Roman proconsul Julius Caesar conquered Gaul. Caesar led his troops to victories throughout the province, his major triumph being the defeat of the Gallic army led by the chieftain Vercingetorix, in 52 BCE.", zoom: 6, latLng:[41.01384, 28.94966],flyPoint: [47.892658, 1.300102],
      arrows: [[[[45.132203, 7.673812],[46.263849, 4.244970]],"#ff0000","Ceasar enters Galia",[45.8830,6.6824]],[[[46.419725,5.637335],[47.664318,7.664619]],"#ff0000","",[45.8830,6.6824]]
      ,[[[48.659845,2.826976],[46.090849, 2.304168],[47.464837, 4.767333]],"#520101","Vercingetorix's revolt",[47.8721, 3.7156]],[[[47.778918, 0.097279],[47.651660, -2.607461]],"#dc0000","Veneti Campaign",[ 47.2642,-1.8003]],
      [[[49.261566, 3.562772],[51.444486, 6.170664]],"#a60000","The Belgae tribes",[50.0641,  5.2320]],[[[50.736752, 5.554326],[50.289686, 7.780003]],"#a60000","",[45.8830,6.6824]],[[[50.569346, 2.325003],[51.765489, -0.834518]],"#840000","Invading Britain",[50.4994, -1.3168]]],

    },
    { id:1,year: -800, label: "GR Colonization", 
      text:"The Great Greek colonization was a significant period in ancient history when Greek city-states embarked on vast maritime expeditions, spreading their culture, language, and commerce throughout the Mediterranean and Black Sea regions.", zoom: 5, latLng:[36.8986, 17.2283],flyPoint: [35.5321, 14.4174],
      arrows: [[[[37.9614, 20.3075],[42.3259, 17.8461]],"#ff0000","",[45.8830,6.6824]],[[[37.9614, 20.3075],[43.7392, 8.2206]],"#ff0000","West Mediterranean",[40.8802, 7.0779]]
      ,[[[43.7392, 8.2206],[37.3001, -1.4927]],"#ff0000","",[47.8721, 3.7156]],[[[38.6167, 24.2192],[44.3708, 35.1633]],"#ff0000","Black Sea",[42.42333, 29.1858]],
      [[[36.1732, 22.1535],[32.8794, 23.1204]],"#ff0000","East Mediterranean",[34.4883, 23.9555]],[[[36.1732, 22.1535],[31.5784, 29.7132]],"#ff0000","",[45.8830,6.6824]],[[[35.1018, 22.9886],[35.0298, 31.7790]],"#ff0000","",[50.4994, -1.3168]]],

    },
  ];


function initSlider(){
addYearsToSlider()
addEventsToSlider()
}

function addYearsToSlider(){
//-900...200
const xScale = d3.scaleLinear()
.domain([-900, 244])
.range([0, 100]);



for(let i = -900;i<=200;i=i+100){
    console.log(i)
    svg.append("rect")
    .attr("x", xScale(i) + "%")
    .attr("y", "12%")
    .attr("fill","blue")
    .attr("width", 5)
    .attr("height", 15)
    svg.append("text").attr("class", "heavy").attr("text-anchor","middle").attr("y","50%").attr("x",xScale(i) + "%").text(getYearString(i));
}
}
  
function addEventsToSlider(){




const xScale = d3.scaleLinear()
    .domain([-900, 244])
    .range([0, 100]);

const dots = svg.selectAll(".dot")
    .data(eventsData)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("cx", d => xScale(d.year) + "%")
    .attr("cy", "22%")
    .attr("r", 5)
    .on("mouseover",handleMouseOver)
    .on("click",handleClick)
    .on("mouseout", handleMouseOut);

    
    rangeInput.addEventListener("input", () => {
    const value = rangeInput.value;
    
    dots.attr("fill", d => (d.year == value) ? "blue" : "red")
        .classed("active", d => d.year == value);
    
    });
}
function handleMouseOver(d) {
    console.log("event: "+d.year)
    showYearEvent(d.id);
    d3.select(this).attr("fill", "green");
   // map.flyTo(d.latLng, 10);
  }
  function handleClick(d) {
    showEventOnMap(d)
    
  }
  function handleMouseOut(d) {
    const value = rangeInput.value;
    hideYearEvent()
    d3.select(this).attr("fill", d => (d.year == value) ? "blue" : "red");
    isAnimationRunning = false
  }

  function showYearEvent(id){
    let x = mouseX;
    let y = mouseY;
    yearEvent.style("top",y-200+"px").style("left",x+200+"px")//
    yearEvent.style("display","flex");
    yearEvent.transition().duration(200).ease(d3.easeLinear).style("opacity", 1)
    yearEventName.text(eventsData[id].label)
    yearEventText.text(eventsData[id].text)
    yearEventYear.text(getYearString(eventsData[id].year))
    runAnimation()
}

function hideYearEvent(){
  yearEvent.transition().duration(200).ease(d3.easeLinear).style("opacity", 0).on("end",function(){card.style("display","none");})
}

function runAnimation(){
    if(!isAnimationRunning){
      const frames = document.getElementById("animation").children;
      const frameCount = frames.length;
      let i = 0;
      setInterval(function () { 
          frames[i /*% frameCount*/].style.display = "none";
          if(i==frameCount-2){
            frames[frameCount-1].style.display = "block";
            return;
          }
          frames[++i /*% frameCount*/].style.display = "block";
      }, 150);
    }
  }

  function showEventOnMap(d){
    map.flyTo(d.flyPoint, d.zoom);
    arrows = getArrows(d.arrows)
    arrows.addTo(map)
    console.log(arrows)
    setTimeout(function () {
      eventArrows = arrows
    }, 5000)
    //eventArrows = arrows
  }
  
  function getArrows(arrowData){
      var arrowsGroup = L.layerGroup([])
      for(let i = 0;i<arrowData.length;i++){
        let arrowCoords = arrowData[i]
        console.log(arrowCoords[0][0])
        console.log(arrowCoords[1])
        console.log("Arrow Label: "+arrowCoords[2])
        arrowsGroup.addLayer(L.polyline(arrowCoords[0],{ color: arrowCoords[1] }).arrowheads({ 
          size: '25%', 
          frequency: 'endonly',
          color: arrowCoords[1]
        }));
        let c = arrowCoords[3]
        if(arrowCoords[2] != ""){
          var marker = L.marker(c,{icon: new L.DivIcon({
            className: 'my-div-icon',
            html: '<div class="arrow_note" >'+
                  '<p style="color:'+arrowCoords[1]+'">'+arrowCoords[2]+'</p>' +
                  '</div>'
          }),zIndexOffset: 100 });
          arrowsGroup.addLayer(marker)
        }


      }
      return arrowsGroup;
  }

  function hideEventOnMap(){
    if(eventArrows != null){
      eventArrows.remove();
    }
  }

function lowerChanged(newValue){
    
    sliderVal = newValue;
    console.log(sliderVal)
    reset();
}


function upperChanged(newValue){
    console.log(newValue);
}