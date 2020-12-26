$(document).ready(function(){

    /*
    let test_char = "san diego";
    let splitted = test_char.split(",");
    console.log(splitted[0]);
    */


    /*    
   $.ajax({
    url: "https://api.weatherbit.io/v2.0/history/daily?city=toronto&country=ca&start_date=2020-11-21&end_date=2020-11-22&key=54ca63d4a7474c57a1879b3c4f71291b",
    async: false,
    success: function(result){
        console.log(result);
        //forecast["data"] = result["data"];
        //for (let day in result["data"]) {
        //    historic[result["data"][day]["datetime"]] = result["data"][day];
            //console.log(result["data"][day]);
        //}
  }});
  
  */

    //console.log("reached load");
    let login_div = createLogin();
    login_div.toggle();
    let create_account_div = createNewAccount();
    $(".main_container").append(login_div);
    $(".main_container").append(create_account_div);


});

function createNewAccount() {
 
    let create_div = $("<div></div>");
    create_div.css({"font-size": "25%", "background": "rgba(109,189,181,0.5)", "width": "80%", "height": "80vh",
                    "position": "absolute", "top": "10vh", "bottom": "10vh"
                });
    create_div.attr("id", "create_div");
   
    center_div = createCenterDiv();

    let title_div = $("<div></div>");
    title_div.css({"width": "50%", "height": "auto", "height": "auto", 
                     "margin-left": "25%", "margin-bottom": "0%",
                    "text-align": "center"
                    });
    title_name = $("<div></div>");
    title_name.css({"width": "100%", "height": "auto", "text-align": "center", "font-size": "700%", "font-style": "italic", "font-family": "Arial"}); 
    title_name.append("Create account:");
    //slogan = $("<div></div>");
    //slogan.css({"width": "100%", "height": "auto", "text-align": "center", "font-size": "500%", "font-family": "Arial", "font-style": "italic"});
    //slogan.append("Any time, any where");
    title_div.append(title_name);
    //title_div.append(slogan);

    let form_div = createFormDiv();

    let input_username = createInputDiv();
    input_username.attr({type: "text", id: "new_username", name: "new_username", placeholder: "username", required : "true"});
    form_div.append(input_username);

    let input_email = createInputDiv();
    input_email.attr({type: "text", id: "new_email", name: "new_email", placeholder: "email", required : "true"});
    form_div.append(input_email);

    let input_password = createInputDiv();
    input_password.attr({type: "text", id: "new_password", name: "new_password", placeholder: "password", required : "true"});
    form_div.append(input_password);

    let input_city = createInputDiv();
    input_city.attr({type: "text", id: "new_city", name: "new_city", placeholder: "city", required : "true"});
    form_div.append(input_city);

    let input_zip = createInputDiv();
    input_zip.attr({type: "text", id: "new_zip", name: "new_zip", placeholder: "postal code", required : "true"});
    form_div.append(input_zip);

    let input_country = createInputDiv();
    input_country.attr({type: "text", id: "new_country", name: "new_country", placeholder: "country", required : "true"});
    form_div.append(input_country);

    input_city.autocomplete({
        source: function(request, response) {
            
            
            $.ajax({
                url: "https://api.teleport.org/api/cities/?search=" + request.term,
                //url: "https://api.teleport.org/api/cities/?search=" + request.term,
                success: function( data ) {
                  response( data["_embedded"]["city:search-results"][0]["matching_alternate_names"][0]);
                }
            });
            
            
        }
    });

    input_country.autocomplete({
        source: function(request, response) {
            
            
            $.ajax({
                //url: "https://api.teleport.org/api/countries/?embed=" + request.term,
                //url: "https://api.teleport.org/api/cities/?search=" + request.term,
                //url: "https://api.first.org/data/v1/countries?q=" + request.term,
                url: "https://restcountries.eu/rest/v2/name/" + request.term,
                success: function( data ) {
                  //response( data["_embedded"]["city:search-results"][0]["matching_alternate_names"][0]);
                  //response(data["_links"]["country:items"][0]);
                  //console.log(data["_links"]["country:items"][0]);
                  //console.log(Object.values(data["data"])[0]);
                  console.log(data[0]);
                  //console.log(data[0]);
                  let list = [data[0]['alpha3Code']];
                  response(list);
                }
            });
            
            
        }
    });
    
    let buttons_div = createButtonsDiv();
    //let login = createButton("LOGIN", "right");
    //buttons_div.append(login);
    let create = createButton("CREATE ACCOUNT", "left");
    create.css({"margin-left": "auto", "float": "", "width": "30%", "text-align": "center"});
    buttons_div.append(create);
    
    create.click(function() {

        console.log("clicked");
        
        //console.log(input_username.val());
        if (input_password.val() == "" || input_username.val() == "" || input_email.val() == "" || 
            input_city.val() == "" || input_zip.val() == "" || input_country.val() == "") {
            alert("Please fill in all the fields!");
        }
        else {
        
        $.ajax({
            url: "/create",
            async: true,
            type: 'POST', 
            data: {userID: input_username.val(), password: input_password.val(), email: input_email.val(), city: input_city.val(), postalCode: input_zip.val(), country: input_country.val()},
            success: function(result){
                console.log("CALLBACK of POST LOGIN AJAX")
                console.log(result);
                if (result === "creation_error") {
                    console.log(" *********************************error: username taken");
                    window.location.href="login?status=-2";

                }
                else {
                    window.location.href="/calendar";
                }
            }
                
        });

        }
        
    })

    center_div.append(title_div);
    center_div.append(form_div);
    center_div.append(buttons_div);
    create_div.append(center_div);

    return create_div;

}


function createInputDiv () {

    let input = $("<input/>");
    input.css({"background": "rgba(109,189,181,0.75)", "border": "0px",
    "text-align": "center", "margin-left": "25%", "margin-top": "0.5%", "margin-bottom": "0.5%",
    "width": "50%", "height": "auto"         
    });

    return input; 

}

function createFormDiv() {
    let form_div = $("<div></div>");
    form_div.css({"background": "", "width": "100%", "height": "auto", "font-size": "500%", "margin-top": "0%", "margin-bottom": "0%"});
    return form_div;

}

function createButtonsDiv() {

    let buttons_div = $("<div></div>");
    buttons_div.css({"background": "", "width": "50%", "height": "10%", "font-size": "250%", "margin-top": "0.5%", "margin-bottom": "0.5%"});
    return buttons_div;
}


function createButton(label, float) {

    let button = $("<div></div>");
    button.css({"position": "relative", "width": "auto", "height": "auto", "background": "rgba(214, 192, 133, 0.7)", "float": float});
    button.append("<b>" + label + "</b>");
    addHover(button, {"background": "rgba(214, 192, 133, 1)"}, {"background": button.css("background")});
    return button;
}


function createCenterDiv() {

    let center_div = $("<div></div>");
    center_div.css({"background": "", "width": "100%", "height": "72%",
                    "position": "absolute", "top": "28%", "bottom": "0%", "left": "0%"
                });
    return center_div;
}


function createLogin() {
    let login_div = $("<div></div>");
    login_div.css({"font-size": "25%", "background": "rgba(109,189,181,0.5)", "width": "80%", "height": "80vh",
                    "position": "absolute", "top": "10vh", "bottom": "10vh"
                });
    login_div.attr("id", "login_div");
    // debug
    if ($(".main_container").data("status") == 0) {
        login_div.append("normal login");
    }
    if ($(".main_container").data("status") == -1) {
        login_div.append("wrong credentials");
    }
    if ($(".main_container").data("status") == 1) {
        login_div.append("new account just created");
    }

    center_div = createCenterDiv();

    let title_div = $("<div></div>");
    title_div.css({"width": "100%", "height": "auto", "height": "auto", 
                     "margin-left": "0%", "margin-bottom": "0%",
                    "text-align": "center"
                    });
    title_name = $("<div></div>");
    title_name.css({"width": "100%", "height": "auto", "text-align": "center", "font-size": "1500%", "font-style": "italic", "font-family": "Arial"}); 
    title_name.append("Plan your life");
    slogan = $("<div></div>");
    slogan.css({"width": "100%", "height": "auto", "text-align": "center", "font-size": "500%", "font-family": "Arial", "font-style": "italic"});
    slogan.append("Any time, any where");
    title_div.append(title_name);
    title_div.append(slogan);

    let form_div = createFormDiv();
    let input_username = createInputDiv();
    input_username.attr({type: "text", id: "input_username", name: "input_username", placeholder: "enter username", required : "true"});
    
    input_username.autocomplete({
        source: function(request, response) {
            
            /*
            $.ajax({
                url: "https://api.teleport.org/api/cities/?search=" + request.term,
                //url: "https://api.teleport.org/api/cities/?search=" + request.term,
                success: function( data ) {
                  response( data["_embedded"]["city:search-results"][0]["matching_alternate_names"][0]);
                }
            });
            */
            
        }
    });
    /*
    $( ".selector" ).autocomplete({
        source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
      });

    */
    
    form_div.append(input_username);
    let input_password = createInputDiv();
    input_password.attr({type: "text", id: "input_password", name: "input_password", placeholder: "enter password", required : "true"});
    form_div.append(input_password);
    
    let buttons_div = createButtonsDiv();
    let login = createButton("LOGIN", "right");
    buttons_div.append(login);
    let create = createButton("CREATE ACCOUNT", "left");
    buttons_div.append(create);
    
    login.click(function() {

        console.log("clicked");
        
        
        $.ajax({
            url: "/login",
            async: true,
            type: 'POST', 
            data: {username: $(input_username).val(), password: $(input_password).val()},
            success: function(result){
                console.log("CALLBACK of POST LOGIN AJAX")
                console.log(result);
                if (result === "invalid") {
                    window.location.href="login?status=-1";

                }
                else if (result === "valid") {
                    window.location.href="/calendar";
                }
            }
                
        });
        

        /*
       $.post("/login",
        {
            username: $(input_username).val(),
            password: $(input_password).val()
        },
        function(data, status){
            //console.log("sent POST to /login");
            console.log()
            window.location.href="/calendar";
        });
        */
    })

    center_div.append(title_div);
    center_div.append(form_div);
    center_div.append(buttons_div);
    login_div.append(center_div);

    return login_div;
};



function addHover(element, on_css, off_css) {

    //let old_css = element.attr("style");
    $(element).hover(function() {
        $(this).css(on_css);
    },
    function() {
        $(this).css(off_css);
    });
}

