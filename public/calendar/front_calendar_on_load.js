let calendar_width = "100";
let calendar_height = "700";
let month_year_width = "100";
let month_year_height = "90";
let day_view_width = "100";
let day_view_height = "700";
let date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_date = date.getDate();
let forecast = {};
let historic = {};
let temp_unit = '\u2103';
let hist_start = "2020-11-25"; 
let hist_end = "2020-12-20"

let background_blue = "rgba(52, 195, 235,0.95)";
let background_day = "rgba(109,189,181,0.95)";
let background_teal = "rgba(214, 192, 133)";
$(document).ready(function(){

    //let date_string = "12252020"
    //console.log(parseInt(date_string.slice(4,8), 10));

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
    
    $.ajax({
        url: "https://api.weatherbit.io/v2.0/forecast/daily?key=54ca63d4a7474c57a1879b3c4f71291b&postal_code=94501&country=US",
        async: false,
        success: function(result){
            //console.log(result);
            //forecast["data"] = result["data"];
            for (let day in result["data"]) {
                forecast[result["data"][day]["datetime"]] = result["data"][day];
                //console.log(result["data"][day]);
            }
      }});

    console.log(forecast);
    

    let month_year_div = $("<div></div>");
    month_year_div.css({"width": `${month_year_width}`+ "%", "height": `${month_year_height}`+ "px"})
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
    day_div.css({"width": "0%", "height": "0px"});
    day_div.attr("id", "day_div");
    let day_view = createDayView(current_date, current_month, current_year);
    day_div.append(day_view);
    $(".main_container").append(day_div);


    let calendar_div = $("<div></div");
    calendar_div.css({"width": `${calendar_width}` + "%", "height": `${calendar_height}` + "px"})
    calendar_div.attr("id", "calendar_div");
    let current_calendar = createCalendar(current_month, current_year);
    calendar_div.html(current_calendar);
    $(".main_container").append(calendar_div);

  
  });