let calendar_width = "100";
let calendar_height = "85"; // *** originally 88
let month_year_width = "100";
let month_year_height = "10";
let day_view_width = "100";
let day_view_height = "97";
let scroll_height = "3";
let scroll_width = "100";
let search_bar_height = "15%";
let stock_details_height = "80%";
let date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_date = date.getDate();

let live_year = date.getFullYear();
let live_month = date.getMonth() + 1;
let live_date = date.getDate() - 1;
let actual_net_worths = [];
let growth_rates = [];
let avg_growth_rate;
let forecast_net_worths = [];
let growth_rates_SDs = [];


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
let background_day_clear = "rgba(109,189,181,0.75)";
let background_teal = "rgba(214, 192, 133)";
let background_teal_clear = "rgba(214, 192, 133, 0.75)";
let background_todo = "rgba(220, 232, 232, 0.95)";
let background_charcoal = "rgba(43, 44, 46, 0.5)";
let background_add_todo = "rgba(219, 237, 21, 0.65)";
let background_delete_todo = "rgba(207, 62, 62, 0.65)";
let background_update_todo = "rgba(20, 184, 113, 0.65)";
let background_search_news = "rgba(20, 92, 181, 0.65)";
let background_add_todo_hover = "rgba(219, 237, 21, 0.95)";
let background_delete_todo_hover = "rgba(207, 62, 62, 0.95)";
let background_update_todo_hover = "rgba(20, 184, 113, 0.95)";
let background_search_news_hover = "rgba(20, 92, 181, 0.95)";

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

    



     
    //$(".main_container").append(userID);


    $(".nav_container").append(createNav("net_worth"));

    /*
    let search_bar = createSearchBar();
    $(".main_container").append(search_bar);
    let stock_details = createStockDetails();
    $(".main_container").append(stock_details);
    let buy_div = createDiv("100%", "25%", "", "buy_div");
    $(".main_container").append(buy_div);
    */
    let menu_div = createDiv("100%", "5%", "", "menu_div");
    menu_div.css({"margin-bottom": "0%"});
    //menu_div.css({"background": "yellow"});
    menu_div.append(createMenuBar());
    //sort_div.append(createSortBar());
    $(".main_container").append(menu_div);
    //let stocks_list_div = createDiv("100%", "90%", "", "stocks_list_div");
    //stocks_list_div.append(createStocksList());

    let net_worth_summary_div = createDiv("100%", "95%", "", "net_worth_summary_div");
    $(".main_container").append(net_worth_summary_div);

    let net_worth_container = createDiv("100%", "94%", "", "net_worth_container");
    let growth_rate_container = createDiv("100%", "94%", "", "growth_rate_container");

    let net_worth_div = $("<canvas></canvas>");
    net_worth_div.css({"width": "100%", "height": "100%", "background": background_todo});
    net_worth_div.attr({"id": "net_worth_div"});
    net_worth_container.append(net_worth_div);
    $(".main_container").append(net_worth_container);
    let growth_rate_div = $("<canvas></canvas>");
    growth_rate_div.css({"width": "100%", "height": "100%", "background": background_todo});
    growth_rate_div.attr({"id": "growth_rate_div"});
    growth_rate_container.append(growth_rate_div);
    $(".main_container").append(growth_rate_container);
    growth_rate_container.hide();
    net_worth_container.hide();


    $.ajax({
        url: "/net_worth/summary",
        async: true,
        type: 'POST', 
        data: {userID: user_id},
        success: function(result){
            console.log("CALLBACK of POST NET_WORTH_SUMMARY AJAX");
            console.log(result);
            $("#net_worth_summary_div").append(createNetWorthSummary(result));
        }
            
    });


    $.ajax({
        url: "/net_worth",
        async: true,
        type: 'POST', 
        data: {userID: user_id},
        success: function(result){
            console.log("CALLBACK of POST NET_WORTH AJAX");
            console.log(result);
            /*
            for (let index in result) {
                stocks_list.append(createOwnedStocks(result[index]));
            }
            */

            actual_net_worths = result.map(mapActualNetWorths);
            console.log("actual_net_worths: ", actual_net_worths);
            growth_rates = mapGrowthRates(actual_net_worths);
            console.log("growth_rates: ", growth_rates);
            avg_growth_rate = getAverageGrowthRate(growth_rates);
            console.log("avg_growth_rate: ", avg_growth_rate);
            forecast_net_worths = getForecastNetWorths(actual_net_worths, avg_growth_rate);
            console.log("forecast_net_worths: ", forecast_net_worths);

            let net_worth_x = actual_net_worths.map(function(point) { return point["date"]});
            //console.log(net_worth_x);
            let net_worth_y_1 = actual_net_worths.map(function(point) { return point["net_worth"]});
            let net_worth_y_2 = forecast_net_worths.map(function(point) { return point["net_worth"]});
            let net_worth_l_1 = "Within past 60 days";
            let net_worth_l_2 = "7 day forecast based on average historical daily growth rate of " + avg_growth_rate.toString();
            let net_worth_title = "Historical Net Worth";
            createGraph_1("net_worth_div", net_worth_x, net_worth_y_1, net_worth_l_1, net_worth_title);
            let growth_x = growth_rates.map(function(point) { return point["date"]});
            let growth_y_1 = growth_rates.map(function(point) { return point["growth_rate"]});
            let growth_y_2 = growth_rates.map(function(point) { return avg_growth_rate});
            let growth_l_1 = "Within past 60 days";
            let growth_l_2 = "Average";
            let growth_title = "Daily Growth Rates of Net Worth";
            createGraph_2("growth_rate_div", growth_x, growth_y_1, growth_y_2, growth_l_1, growth_l_2, growth_title);
        }
            
    });

  });

function createDataNetWorth(array) {
    let labels = [];
    let data_actual


}


function mapActualNetWorths(database_entry) {
    //console.log(database_entry);
    let date_net_worth = {};
    date_net_worth["date"] = database_entry["date"].slice(0, 10);
    date_net_worth["net_worth"] = database_entry["worth"];
    return date_net_worth;
}

function mapGrowthRates(actual_net_worths) {
    //console.log(actual_net_worths.indexOf())
    
    let date_growth_rates = [];
    for (let x = 0; x < actual_net_worths.length; x++) {
        let current_growth_rate_entry = {};
        if (x == 0) {
            current_growth_rate_entry["growth_rate"] = 0;
        }
        else {
            let change = actual_net_worths[x]["net_worth"] - actual_net_worths[x-1]["net_worth"];
            //console.log("change: ", change);
            //console.log("actual net worth of prev day: ", actual_net_worths[x-1]["net_worth"] );
            let growth_rate = (change / actual_net_worths[x-1]["net_worth"]).toFixed(5);

            current_growth_rate_entry["growth_rate"] = growth_rate;
        }
        current_growth_rate_entry["date"] = actual_net_worths[x]["date"];
        date_growth_rates.push(current_growth_rate_entry);
    }

    return date_growth_rates;
    
   return 0;

}

function getAverageGrowthRate(growth_rates) {
    let accum = 0;
    let sample_size = growth_rates.length - 1;
    for (let x = 1; x < growth_rates.length; x++) {
        accum += parseFloat(growth_rates[x]["growth_rate"]);
        //console.log(growth_rates[x]["growth_rate"]);
        //console.log(accum);
    }
    accum = (accum / sample_size).toFixed(5);
    return accum;

}

function getForecastNetWorths(actual_net_worths, avg_growth_rate) {
    //console.log(avg_growth_rate);
    let forecast_array = [];
    for (let x = 0; x < actual_net_worths.length; x++) {
        forecast_array.push(actual_net_worths[x]);
    }

    let latest_date = new Date(actual_net_worths[actual_net_worths.length - 1]["date"]);
    let latest_net_worth = parseFloat(actual_net_worths[actual_net_worths.length - 1]["net_worth"]);
    //console.log("latest net worth: ", latest_net_worth);

    for (let x = 0; x < 7; x++) {
        let new_net_worth_date = {};
        let current_forecast_date = new Date(latest_date);
        current_forecast_date.setDate(current_forecast_date.getDate() + x + 1);
        current_forecast_date = formatDate(current_forecast_date);
        new_net_worth_date["date"] = current_forecast_date;
        let float_avg_growth_rate = parseFloat(avg_growth_rate);
        let net_growth = Math.pow(1.00 + float_avg_growth_rate, 1 + x);
        //console.log("net_growth: ", net_growth);
        let current_forecast_net_worth = (latest_net_worth * net_growth).toFixed(2);
        new_net_worth_date["net_worth"] = parseFloat(current_forecast_net_worth);
        forecast_array.push(new_net_worth_date);
    }

    //console.log(forecast_array);
    return forecast_array;

}

function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
