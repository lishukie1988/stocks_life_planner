let calendar_width = "100";
let calendar_height = "88";
let month_year_width = "100";
let month_year_height = "10";
let day_view_width = "100";
let day_view_height = "100";
let date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_date = date.getDate();

let live_year = date.getFullYear();
let live_month = date.getMonth() + 1;
let live_date = date.getDate() - 1;


/*
let live_year = 2021;
let live_month = 12;
let live_date = 30;
*/

let forecast = {};
let historic = {};
let temp_unit = '\u2103';
let hist_start = "2020-11-25"; 
let hist_end = "2020-12-20";
let user_id;
let user_unit = 0;
let user_country;
let user_city; 

let background_blue = "rgba(52, 195, 235,0.95)";
let background_day = "rgba(109,189,181,0.95)";
let background_teal = "rgba(214, 192, 133)";
let background_todo = "rgba(220, 232, 232, 0.95)"
$(document).ready(function(){



    user_id = $(".main_container").data("userid");
    user_unit = $(".main_container").data("tempunit");
    user_country = $(".main_container").data("country");
    user_city = $(".main_container").data("city");
    
    console.log(live_month, live_date, live_year);
    //console.log(pastOneMonth(11,30,2021));

    // free trial only allows 1 day
    /*
    $.ajax({
        url: "https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2020-11-21&end_date=2020-11-22&key=54ca63d4a7474c57a1879b3c4f71291b",
        async: false,
        success: function(result){
            //console.log(result);
            //forecast["data"] = result["data"];
            for (let day in result["data"]) {
                historic[result["data"][day]["datetime"]] = result["data"][day];
                //console.log(result["data"][day]);
            }
      }});

      console.log(historic);
      */
    
    //user_id = $(".main_container").data("userid");
    

    // test api
    
    console.log("test newsapi");
    $.ajax({
        //url: "https://api.weatherbit.io/v2.0/forecast/daily?key=54ca63d4a7474c57a1879b3c4f71291b&city=San%20Diego&country=United%20States",
        url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=c059c3dae2b74394b71ec1136390998a",
        async: true,
        success: function(result){
            //console.log("test news api");
            console.log(result);
            //forecast["data"] = result["data"];
            
      }});
      

      

    $.ajax({
        url: "https://api.weatherbit.io/v2.0/forecast/daily?key=54ca63d4a7474c57a1879b3c4f71291b&city=San%20Diego&country=United%20States",
        //url: "https://newsapi.org/v2/everything?q=bitcoin&apiKey=c059c3dae2b74394b71ec1136390998a",
        async: false,
        success: function(result){
            //console.log(result);
            //forecast["data"] = result["data"];
            for (let day in result["data"]) {
                forecast[result["data"][day]["datetime"]] = result["data"][day];
                //console.log(result["data"][day]);
            }
      }});
    

    // - TODO: 
    //   - assign user values in main container data values to global vars
    //   - change references to country, city, temp_unit in ajax calls to weather API to global vars containing user's values



    console.log(forecast);
    
    //$(".main_container").append(userID);

    let month_year_div = $("<div></div>");
    month_year_div.css({"width": `${month_year_width}`+ "%", "height": `${month_year_height}`+ "%"})
    month_year_div.attr("id", "month_year_div");
    let month_div = createMonth(current_month);
    month_year_div.append(month_div);
    let year_div = createYear(current_year);
    month_year_div.append(year_div);
    $(".main_container").append(month_year_div);


    let months_div = createMonths();
    $(".main_container").append(months_div);
    let years_div = createYears(current_year);
    $(".main_container").append(years_div);


    let day_div = $("<div></div>");
    day_div.css({"width": "0%", "height": "0%"});
    day_div.attr("id", "day_div");
    let day_view = createDayView(current_date, current_month, current_year);
    day_div.append(day_view);
    $(".main_container").append(day_div);


    let calendar_div = $("<div></div");
    calendar_div.css({"width": `${calendar_width}` + "%", "height": `${calendar_height}` + "%"})
    calendar_div.attr("id", "calendar_div");
    let current_calendar = createCalendar(current_month, current_year);
    calendar_div.html(current_calendar);
    $(".main_container").append(calendar_div);

  
  });