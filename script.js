var hist = localStorage.getItem("lastSearch");
$("#history").prepend(hist);



$("#inputForm").submit(function(event) {
    event.preventDefault();
    // will grab the city from the input form.
    var city = $("#cityInput").val();

    localStorage.setItem("lastSearch", city)
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d73e16c126e3f1214d6b4bf3e6b7612c";

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
   // variables for city name, an icon representation of weather conditions, the temperature, the humidity, the wind speed.
    var cityName = $("<h2>").html(response.name);
    $("#cityName").html(cityName);

    var icon = response.weather[0].icon;
    var iconDiv = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon +"@2x.png")
    $("#icon").html(iconDiv);

    var temp = ((response.main.temp-273.15)*9/5+32).toFixed(2); //changing from K to farenheit
    var tempLi = $("<li>").text("Temperature(F): " + temp)

    var humid = response.main.humidity;
    var humidLi = $("<li>").text("Humidity: " + humid);

    var windSpeed = response.wind.speed;
    var windSpeedLi = $("<li>").text("Wind Speed: " + windSpeed);

    var listRow = $("<ul>");

   listRow.append(tempLi, humidLi, windSpeedLi);
   
   $("#weatherAPI").html(listRow);

   //this coming ajax will be used to exract the uv index and date.
   //variables for next ajax , and ajax itself, is placed within the first ajax to pull latitude and longitude info
   var lat =response.coord.lat;
   var lon = response.coord.lon;
   var queryURL ="https://api.openweathermap.org/data/2.5/uvi?appid=d73e16c126e3f1214d6b4bf3e6b7612c&lat=" + lat + "&lon=" + lon;

   $.ajax({
       url: queryURL,
       method: "GET"
     }).then(function(response) {

        var uv = response.value;

        //adding color to uv index
          if (uv < 3){
            var uvLiv = $("<li>");
            uvLiv.attr("class", "green")
            var uvLi = uvLiv.text("UV Index: " + uv)
            listRow.append(uvLi);
          }
          else if(uv > 3 && uv< 6)  {
            var uvLiv = $("<li>");
            uvLiv.attr("class", "orange")
            var uvLi = uvLiv.text("UV Index: " + uv)
            listRow.append(uvLi);
          }
          else if(uv > 6)   {
            var uvLiv = $("<li>");
            uvLiv.attr("class", "red")
            var uvLi = uvLiv.text("UV Index: " + uv)
            listRow.append(uvLi);
          }

          //places date for uv index since its only calculated at 1200 in the afternoon
        var date = response.date_iso;
        var dateDiv = $("<li>").text("Date and time of uv index: " + date);
        listRow.append(dateDiv);
   
        $("#weatherAPI").html(listRow);
     })

    })

    //this ajax will call up 5 weather forecast. 
    //it is placed within the "submit form" event listner but does not require any other past variable from prior ajax
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=d73e16c126e3f1214d6b4bf3e6b7612c";
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //date, img icon, temp, and humidity
        var currentDate = response.list[0].dt_txt;
        var currentDateDiv = $("<h5>").html(currentDate);
        $("#cityDate").html(currentDateDiv);

        //ajax call for 1 day later

        var date1= response.list[6].dt_txt;
        var date1Div= $("<li>").text(date1);

        var icon1 = response.list[6].weather[0].icon;
        var icon1Div = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon1 +"@2x.png")

        var temp1 = ((response.list[6].main.temp-273.15)*9/5+32).toFixed(2);
        var temp1Div= $("<li>").text("Temp: " + temp1);

        var humid1 = response.list[6].main.humidity;
        var humid1Div = $("<li>").text("Humidity: " + humid1);

        var day1 = $("<ul>").append(date1Div, icon1Div, temp1Div, humid1Div);

        $("#day1").html(day1);
        //this adds style to the div after the submit happens
        $("#day1").css("background-color", "rgb(168, 193, 240");
        $("#day1").css("border", "5px solid gray");

        //ajax call for 2 days later
        var date2= response.list[14].dt_txt;
        var date2Div= $("<li>").text(date2);

        var icon2 = response.list[14].weather[0].icon;
        var icon2Div = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon2 +"@2x.png")

        var temp2 = ((response.list[14].main.temp-273.15)*9/5+32).toFixed(2);
        var temp2Div= $("<li>").text("Temp: " + temp2);

        var humid2 = response.list[14].main.humidity;
        var humid2Div = $("<li>").text("Humidity: " + humid2);

        var day2 = $("<ul>").append(date2Div, icon2Div, temp2Div, humid2Div);

        $("#day2").html(day2);
        $("#day2").css("background-color", "rgb(168, 193, 240");
        $("#day2").css("border", "5px solid gray");

        //ajax call for 3 days later
        var date3= response.list[22].dt_txt;
        var date3Div= $("<li>").text(date3);

        var icon3 = response.list[22].weather[0].icon;
        var icon3Div = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon3 +"@2x.png")

        var temp3 = ((response.list[22].main.temp-273.15)*9/5+32).toFixed(2);
        var temp3Div= $("<li>").text("Temp: " + temp3);

        var humid3 = response.list[22].main.humidity;
        var humid3Div = $("<li>").text("Humidity: " + humid3);

        var day3 = $("<ul>").append(date3Div, icon3Div, temp3Div, humid3Div);

        $("#day3").html(day3);
        $("#day3").css("background-color", "rgb(168, 193, 240");
        $("#day3").css("border", "5px solid gray");

        //ajax call for 4 days later
        var date4= response.list[30].dt_txt;
        var date4Div= $("<li>").text(date4);

        var icon4 = response.list[30].weather[0].icon;
        var icon4Div = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon4 +"@2x.png")

        var temp4 = ((response.list[30].main.temp-273.15)*9/5+32).toFixed(2);
        var temp4Div= $("<li>").text("Temp: " + temp4);

        var humid4 = response.list[30].main.humidity;
        var humid4Div = $("<li>").text("Humidity: " + humid4);

        var day4 = $("<ul>").append(date4Div, icon4Div, temp4Div, humid4Div);

        $("#day4").html(day4);
        $("#day4").css("background-color", "rgb(168, 193, 240");
        $("#day4").css("border", "5px solid gray");

        //ajax call for 5 days later
        var date5= response.list[38].dt_txt;
        var date5Div= $("<li>").text(date5);

        var icon5 = response.list[38].weather[0].icon;
        var icon5Div = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon5 +"@2x.png")

        var temp5 = ((response.list[38].main.temp-273.15)*9/5+32).toFixed(2);
        var temp5Div= $("<li>").text("Temp: " + temp5);

        var humid5 = response.list[38].main.humidity;
        var humid5Div = $("<li>").text("Humidity: " + humid5);

        var day5 = $("<ul>").append(date5Div, icon5Div, temp5Div, humid5Div);

        $("#day5").html(day5);
        $("#day5").css("background-color", "rgb(168, 193, 240");
        $("#day5").css("border", "5px solid gray");


      })
    
});