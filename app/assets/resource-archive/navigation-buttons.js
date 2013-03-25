// which page is currently loaded in div#content?
var currentLoadedPage;

function bind_left_navigation(){
  $("div.left-navigation ul li.button").click(function(){
      var href = $(this).children().first().attr("href");
      updateMidSection(href);
      return false;
  });
}

$(document).ready(function(){
  $("div#header-navigation ul li.button, div#logo").click(function(){
    var href = $(this).children().first().attr("href");
    //alert($(this).html());
    //alert($(this).hasClass("test-drive"));
    if(true || $(this).hasClass("test-drive")){
      //alert(href);
      updateMidSection(href)

      var tools_href = $(this).find("a.tools").first().attr("href");
      //alert(tools_href);
      updateTools(tools_href, bind_left_navigation);

      return false;

    } else if(!$(this).hasClass("easy-browse")){
      location.href = href;
    }
  });

  bind_left_navigation();
//$("div.left-navigation ul li.button").click(function(){
//    var href = $(this).children().first().attr("href");
//    updateMidSection(href);
//    return false;
//});

  $("div#header-navigation ul li.button.easy-browse, div#logo.easy-browse").click(function(){
    return false;
  });

//$("div.left-navigation ul li.button, div#header-navigation ul li.button, div#logo").hover(
//  /* in */
//  function(event){
//    $(this).css("cursor", "pointer");
//  }, 

//  /* out */
//  function(event){
//    $(this).css("cursor", "auto");
//  }
//);

  $("div#header-navigation ul li.button.easy-browse, div#logo.easy-browse").hover(
    /* in */
    function(event){
      var href = $(this).children().first().attr("href");
      updateMidSection(href);
    }, 

    /* out */
    function(event){
    }
  );
});
