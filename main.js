 const api={
  key:"5317732ab62bdd8fc30299f35bd283f5",
  base:"https://api.openweathermap.org/data/2.5/"
}

  var iconn=document.querySelector('.iconn');
  let lat;
  let lon;
  let icon=document.getElementById('icon');
 icon.addEventListener("click",()=>{
if(navigator.geolocation)
 {
  navigator.geolocation.getCurrentPosition(position=>{
    
     lat=position.coords.latitude;
     lon=position.coords.longitude;
     CurrentLocation(lat,lon);
   function CurrentLocation(lat,lon){ var city="Mumbai";
 fetch(`${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
   .then(weather=>weather.json())
   .then(displayResults);
       
     };
     });
   }
  else{
    alert("Switch-On your location");
  }
 });
  

 const searchbox=document.querySelector('.search-box');
 searchbox.addEventListener('keypress',setQuery);
 
function setQuery(e){
   if(e.keyCode==13)
      getResults(searchbox.value);
 };
 
 function getResults(query){
   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
   .then(weather=> weather.json())
   .then(displayResults);
 };
 
 function displayResults(weather){
   let city=document.querySelector('.location .city');
   city.innerText=`${weather.name},${weather.sys.country}`;
   
   let temp=document.querySelector('.current .temp');
   temp.innerHTML=`${Math.round(weather.main.temp)}<span>°c</span>`;
   
   let iconId=weather.weather[0].icon;
   iconn.src=`http://openweathermap.org/img/wn/${iconId}@2x.png`;
   
   let now=new Date();
   const date=document.querySelector('.location .date');
   date.innerText=dateBuilder(now);
   
   
   const weather_el=document.querySelector('.current .weather');
   weather_el.innerText=`${weather.weather[0].main}`;
   
   const hilow=document.querySelector('.current .hi-low');
   hilow.innerText=`${Math.round(weather.main.temp_min)}°c/${Math.round(weather.main.temp_max)}°c`;
   
 };
 
function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
