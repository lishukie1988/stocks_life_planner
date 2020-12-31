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


    $(".nav_container").append(createNav());

    /*
    let search_bar = createSearchBar();
    $(".main_container").append(search_bar);
    let stock_details = createStockDetails();
    $(".main_container").append(stock_details);
    let buy_div = createDiv("100%", "25%", "", "buy_div");
    $(".main_container").append(buy_div);
    */
    let sort_div = createDiv("100%", "10%", "", "sort_bar");
    sort_div.append(createSortBar());
    $(".main_container").append(sort_div);
    let stocks_list_div = createDiv("100%", "90%", "", "stocks_list_div");
    stocks_list_div.append(createStocksList());
    $(".main_container").append(stocks_list_div);

  });
