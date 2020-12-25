$(document).ready(function(){

    $.ajax({
        url: "https://api.teleport.org/api/cities/?search=san",
        async: true,
        success: function(result){
            console.log(result);
            
      }});


    //console.log("reached load");
    let login_div = createLogin();
    //login_div.toggle();
    let create_account_div = createCreate();
    $("#main_container").append(login_div);

});


function createLogin() {
    let login_div = $("<div></div>");
    login_div.css({"font-size": "25%", "background": "rgba(109,189,181,0.5)", "width": "80%", "height": "80vh",
                    "position": "absolute", "top": "10vh", "bottom": "10vh"
                });
    login_div.attr("id", "login_div");


    let title_div = $("<div></div>");
    title_div.css({"width": "80%", "height": "auto", "height": "20vh", 
                    "position": "absolute", "margin-left": "10%", "top": "18vh",
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

    let username_div = $("<div></div>");
    username_div.css({"width": "80%", "height": "auto", "font-size": "500%"});
    let input_username = $("<input/>").attr({type: "text", id: "input_username", name: "input_username", placeholder: "enter username", required : "true"});
    
    input_username.autocomplete({
        source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
    });


    /*
    $( ".selector" ).autocomplete({
        source: [ "c++", "java", "php", "coldfusion", "javascript", "asp", "ruby" ]
      });

    */

    input_username.css({"background": "rgba(109,189,181,0.75)", "border": "0px",
                    "text-align": "center", "margin-left": "25%", "margin-top": "35vh",
                    "width": "50%", "height": "auto"         
                    });
    let username_text = $("<div></div>");
    username_text.css({"width": "50%", "position": "absolute", "margin": "auto"});
    //username_text.append("Username:");
    //username_div.append(username_text);
    username_div.append(input_username);
    let password_div = $("<div></div>");
    //password_div.append(password_text);
    password_div.css({"width": "80%", "height": "auto", "font-size": "500%"});
    let input_password = $("<input/>").attr({type: "text", id: "input_password", name: "input_password", placeholder: "enter password", required : "true"});
    input_password.css({"background": "rgba(109,189,181,0.75)", "border": "0px",
                    "text-align": "center", "margin-left": "25%", "margin-top": "10px",
                    "width": "50%", "height": "auto"         
                    });
    username_div.append(input_password);
    
    let buttons_div = $("<div></div>");
    buttons_div.css({"width": "40%", "height": "auto", "font-size": "250%"});
    let login = $("<div></div>");
    buttons_div.append(login);
    login.css({"position": "relative", "width": "auto", "height": "auto", "background": "rgba(214, 192, 133, 0.7)", "float": "right"});
    login.append("<b>LOGIN</b>");
    let create = $("<div></div>");
    buttons_div.append(create);
    create.css({"position": "relative", "width": "auto", "height": "auto", "background": "rgba(214, 192, 133, 0.7)", "float": "left"});
    create.append("<b>CREATE ACCOUNT</b>");
    addHover(login, {"background": "rgba(214, 192, 133, 1)"}, {"background": login.css("background")});
    addHover(create, {"background": "rgba(214, 192, 133, 1)"}, {"background": create.css("background")});

    login_div.append(title_div);
    login_div.append(username_div);
    login_div.append(password_div);
    login_div.append(buttons_div);

    return login_div;
};


function createCreate() {

    let login_div = $("<div></div>");
    login_div.css({"font-size": "25%", "background": "rgba(109,189,181,0.5)", "width": "80%", "height": "80vh",
                    "position": "absolute", "top": "10vh", "bottom": "10vh"
                });
    login_div.attr("id", "login_div");


    let title_div = $("<div></div>");
    title_div.css({"width": "80%", "height": "auto", "height": "20vh", 
                    "position": "absolute", "margin-left": "10%", "top": "18vh",
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

    let username_div = $("<div></div>");
    username_div.css({"width": "80%", "height": "auto", "font-size": "500%"});
    let input_username = $("<input/>").attr({type: "text", id: "input_username", name: "input_username", placeholder: "enter username", required : "true"});
    input_username.css({"background": "rgba(109,189,181,0.75)", "border": "0px",
                    "text-align": "center", "margin-left": "25%", "margin-top": "35vh",
                    "width": "50%", "height": "auto"      
                    });
    let username_text = $("<div></div>");
    username_text.css({"width": "50%", "position": "absolute", "margin": "auto"});
    //username_text.append("Username:");
    //username_div.append(username_text);
    username_div.append(input_username);
    let password_div = $("<div></div>");
    //password_div.append(password_text);
    password_div.css({"width": "80%", "height": "auto", "font-size": "500%"});
    let input_password = $("<input/>").attr({type: "text", id: "input_password", name: "input_password", placeholder: "enter password", required : "true"});
    input_password.css({"background": "rgba(109,189,181,0.75)", "border": "0px",
                    "text-align": "center", "margin-left": "25%", "margin-top": "10px",
                    "width": "50%", "height": "auto"        
                    });
    username_div.append(input_password);
    
    let buttons_div = $("<div></div>");
    buttons_div.css({"width": "40%", "height": "auto", "font-size": "250%"});
    let login = $("<div></div>");
    buttons_div.append(login);
    login.css({"position": "relative", "width": "auto", "height": "auto", "background": "rgba(214, 192, 133, 0.7)", "float": "right"});
    login.append("<b>LOGIN</b>");
    let create = $("<div></div>");
    buttons_div.append(create);
    create.css({"position": "relative", "width": "auto", "height": "auto", "background": "rgba(214, 192, 133, 0.7)", "float": "left"});
    create.append("<b>CREATE ACCOUNT</b>");
    addHover(login, {"background": "rgba(214, 192, 133, 1)"}, {"background": login.css("background")});
    addHover(create, {"background": "rgba(214, 192, 133, 1)"}, {"background": create.css("background")});

    login_div.append(title_div);
    login_div.append(username_div);
    login_div.append(password_div);
    login_div.append(buttons_div);

    return login_div;

}


function addHover(element, on_css, off_css) {

    //let old_css = element.attr("style");
    $(element).hover(function() {
        $(this).css(on_css);
    },
    function() {
        $(this).css(off_css);
    });
}

