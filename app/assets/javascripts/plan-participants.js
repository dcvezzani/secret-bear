// which page is currently loaded in div#content?
var currentLoadedPage;

$(document).ready(function(){
  $("li#summary-plan-blog-entries a").click(function(){
    var href = $(this).attr("href");
    updateMidSection(href);

    return false; 
  });
});
