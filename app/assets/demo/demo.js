  var dialogOpen = false;
  var currentMousePos = {x: -1, y: -1};
  var currentTarget;
  var containLayers = true;
  var keyLayers = "#mid-section,#header-instructions,#header,#header-body,#body,#header-navigation,#border-login-profile,#left,#logo,#communications,#center-right,#footer, #content, #carousel, #banner, .button, #content img".split(/\s*,\s*/);
  //var keyLayers = "#content, #carousel, #banner".split(/\s*,\s*/);
  var captureKeys = false;
  

  function displayDetails(){
    return "<li>" + [displayCurrentMousePos(), displayTargetLayer()].join("<li>");
  }

  function displayCurrentMousePos(){
    return "(" + currentMousePos.x + ", " + currentMousePos.y + ")";
  }

  function displayTargetLayer(){
    return inspectLayer(currentTarget);
  }

  function inspectLayer(layer){
    var attrs = "id".split(",");
    var css_attrs = "width,height,top,right,bottom,left,position,z-index".split(",");
    var out = [];
    for(var i=0; i<attrs.length; i+=1){
      out[out.length] = attrs[i] + ":" + $(layer).attr(attrs[i]);
    }
    var css_out = [];
    for(var i=0; i<css_attrs.length; i+=1){
      css_out[css_out.length] = css_attrs[i] + ":" + $(layer).css(css_attrs[i]);
    }
    out[out.length] = css_out.join("; ") + ";";

    return out.join("<li>");
  }

  // http://stackoverflow.com/questions/2571514/is-detecting-scrollbar-presence-with-jquery-still-difficult
  function verticalScrollbarExists(mainContainer) {
      var viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();

      if (jQuery.browser.msie) {
          if(parseInt(jQuery.browser.version) == 7) {
              viewportHeight -= 3;
          }
      }

      if(viewportHeight <= $(mainContainer).height()) {
          return true;
      } else {
          return false;
      }
  }
    
  // Window load event used just in case window height is dependant upon images
  // http://css-tricks.com/snippets/jquery/jquery-sticky-footer/
  // this rendition hasn't yet been testing in IE
  function stickyFooter(mainContainer, footerContainer, adjustments) { 
         var footerHeight = 0,
             footerTop = 0,
             footerTopAjustmentScrolling = ((isNaN(adjustments['scrolling'])) ? 0 : adjustments['scrolling']),
             footerTopAjustmentDone = ((isNaN(adjustments['done'])) ? 0 : adjustments['done']),
             $footer = $(footerContainer);

         positionFooter();

         function positionFooter() {

                  footerHeight = $footer.height()-5;
                  footerTop = ($(window).scrollTop()+$(window).height()-footerHeight + footerTopAjustmentScrolling)+"px";

                 if ( ($(window).height() + $(window).scrollTop() - 0) < ($(mainContainer).height()) ) {
                     $footer.css({
                          position: "absolute", 
                          top: footerTop
                     })
                 } else if (verticalScrollbarExists(mainContainer)){
                     $footer.css({
                          position: "absolute", 
                          top: ($(mainContainer).height() - $(footerContainer).height() + footerTopAjustmentDone) + "px"
                     })
                 } else {
                     $footer.css({
                          position: "static"
                     })
                 }

         }

         $(window)
           .scroll(positionFooter)
           .resize(positionFooter)
           .bind("dom-update", positionFooter)
  };


  $(document).ready(function(){ 
    //$("#banner, #carousel").hide();
    //$(window).bind("load", function(){ stickyFooter("#canvas", "#footer", {scrolling: 1, done: 6}); });
    $("#blog-entry-sample").hover(function(){ $(this).css("cursor", "pointer"); }, function(){ $(this).css("cursor", "auto"); });
    
    $("#blog-entry-sample").click(function(){
      var href = $(this).children().first().attr('href');
      updateMidSection(href);
      return false;
    });
  });


  $(document).ready(function(){ //return false;
    if($("body").attr("mode") == "debug"){
      if(!($("body").attr("containLayers") == undefined)){
        containLayers = ($("body").attr("containLayers") == "true");
      }
    } else { 
      $(keyLayers.join(", ")).css("border", "0");
      return false; 
    }

    $("#canvas").draggable();
    $("#canvas").resizable();

    for(var i=0; i<keyLayers.length; i+=1){
      if(containLayers){
        $(keyLayers[i]).draggable({containment: "parent"});
        $(keyLayers[i]).resizable({containment: "parent"});
      } else {
        $(keyLayers[i]).draggable();
        $(keyLayers[i]).resizable();
      }
    }

    $("#details").dialog({autoOpen: false, width: 400, height: "auto"});

    $("#dimensions").dialog({autoOpen: false, width: 550, height: "auto", 
      open: function(event, ui){ dialogOpen = true; }, 
      close: function(event, ui){ dialogOpen = false; }
    });

    $("#zIndex").dialog({autoOpen: false, width: 400, height: "auto", 
      open: function(event, ui){ dialogOpen = true; }, 
      close: function(event, ui){ dialogOpen = false; }
    });

    $("#zIndex input[type='submit']").click(function(){
      zIndex = $("#zIndex input[type='text']").val();
      $(currentTarget).css("z-index", zIndex);
      $("#zIndex").dialog("close");

      return false;
    });

    $("#details input[type='submit']").click(function(){
      $("#details").dialog("close");
      return false;
    });

    $("#dimensions input[type='submit']").click(function(){
      $("#dimensions").dialog("close");
      return false;
    });


    function getCurrentTargetWidth(){
      var mdWidth, width; 
      mdWidth = $("#dimensions .dim-width input[type='text']").val().match(/\d+/);
      if(mdWidth){
        width = mdWidth[0];
      } else {
        width = $(currentTarget)[0].clientWidth;
      }
      return Number(width);
    }

    function getCurrentTargetHeight(){
      var mdHeight, height; 
      mdHeight = $("#dimensions .dim-height input[type='text']").val().match(/\d+/);
      if(mdHeight){
        height = mdHeight[0];
      } else {
        height = $(currentTarget)[0].clientHeight;
      }
      return Number(height);
    }

    $("#dimensions input[type='button'][value='fit'], #dimensions input[type='button'][value='auto']").click(function(){
      var newWidth, newHeight, value;

      value = $(this).attr("value");
      switch(value){
        case 'fit':
          value = '-moz-fit-content';
          break;

        default:
          break;
      }

      if($(this).parent().hasClass("dim-width")){
        $(currentTarget).css("width", "-moz-fit-content");
        newWidth = $(currentTarget)[0].clientWidth;
        $("#dimensions .dim-width input[type='text']").val(newWidth);
      } else if($(this).parent().hasClass("dim-height")){
        $(currentTarget).css("height", "-moz-fit-content");
        newHeight = $(currentTarget)[0].clientHeight;
        $("#dimensions .dim-height input[type='text']").val(newHeight);
      }
      return false;
    });

    $("#dimensions input[type='button'][value='[-]']").click(function(){
      var offset, width, height, newWidth, newHeight, _top, newTop; 
      offset = Number($("#dimensions input[type='text'][name='offset']").val());
      width = Number($("#dimensions .dim-width input[type='text']").val().match(/\d+/));
      height = Number($("#dimensions .dim-height input[type='text']").val().match(/\d+/));
      _top = Number($("#dimensions .dim-top input[type='text']").val().match(/\d+/));

      if($(this).parent().hasClass("dim-width")){
        newWidth = width-offset;
        $("#dimensions .dim-width input[type='text']").val(newWidth);
        $(currentTarget).css("width", newWidth);
      } else if($(this).parent().hasClass("dim-height")){
        newHeight = height-offset;
        $("#dimensions .dim-height input[type='text']").val(newHeight);
        $(currentTarget).css("height", newHeight);
      } else if($(this).parent().hasClass("dim-top")){
        newTop = _top-offset;
        $("#dimensions .dim-top input[type='text']").val(newTop);
        $(currentTarget).css("top", newTop);
      }
      return false;
    });

    $("#dimensions input[type='button'][value='[+]']").click(function(){
      var offset, width, height, newWidth, newHeight, _top, newTop; 
      offset = Number($("#dimensions input[type='text'][name='offset']").val());
      width = Number($("#dimensions .dim-width input[type='text']").val().match(/\d+/));
      height = Number($("#dimensions .dim-height input[type='text']").val().match(/\d+/));
      _top = Number($("#dimensions .dim-top input[type='text']").val().match(/\d+/));

      if($(this).parent().hasClass("dim-width")){
        newWidth = width+offset;
        $("#dimensions .dim-width input[type='text']").val(newWidth);
        $(currentTarget).css("width", newWidth);
      } else if($(this).parent().hasClass("dim-height")){
        newHeight = height+offset;
        $("#dimensions .dim-height input[type='text']").val(newHeight);
        $(currentTarget).css("height", newHeight);
      } else if($(this).parent().hasClass("dim-top")){
        newTop = _top+offset;
        $("#dimensions .dim-top input[type='text']").val(newTop);
        $(currentTarget).css("top", newTop);
      }
      return false;
    });

    $(document).mousemove(function(event) {
        currentMousePos = {
            x: event.pageX,
            y: event.pageY
        };
    });

    $(document).mousedown(function (event) {
      if(!dialogOpen && event.target){
        currentTarget = event.target;
      }
    });

    $(document).keydown(function(event) {
      switch(event.which){
        case 81:
          $("#details, #dimensions, #zIndex").dialog("close");
          break;

        case 83:
          if(event.shiftKey){
            captureKeys = (captureKeys) ? false : true;
            if(!captureKeys){ alert("stopped capturing keys"); }

          } else {
            $("#details .info").html(displayDetails());
            $("#details").dialog("open");
          }
          break;

        case 68:
          $("#dimensions .info").html("currentTarget: " + currentTarget + "<br/>id: " + $(currentTarget).attr("id"));
          $("#dimensions .dim-width input[type='text']").val($(currentTarget).css("width").match(/\d+/)[0]);
          $("#dimensions .dim-height input[type='text']").val($(currentTarget).css("height").match(/\d+/)[0]);
          var _top = $(currentTarget).css("top").match(/\d+/);
          _top = (isNaN(_top)) ? 0 : _top;
          $("#dimensions .dim-top input[type='text']").val(_top);
          $("#dimensions").dialog("open");
          return false;
          break;

        case 90:
          var position = $(currentTarget).css("position");
          if(position == "absolute" || position == "relative"){
          } else {
            position = "relative";
            $(currentTarget).css("position", position);
          }

          if(event.shiftKey){
            $("#zIndex .info").html("currentTarget: " + currentTarget);
            $("#zIndex").dialog("open");
            return false;
          } else {
            var zIndex = $(currentTarget).css("z-index");
            zIndex = Number((zIndex && zIndex.match(/^\d+$/)) ? zIndex : 0) + 10;
            $(currentTarget).css("z-index", zIndex);
          }
          break;

        case 66:
          if($(keyLayers.join(", ")).first().hasClass("debug-layer")){
            $(keyLayers.join(", ")).removeClass("debug-layer");
          } else {
            $(keyLayers.join(", ")).addClass("debug-layer");
          }
          break;

        case 84:
          return true; // done with my test of sticky footer
          if($("#banner").css("display") == "none"){
            $("#banner, #carousel").show();
          } else {
            $("#banner, #carousel").hide();
          }

          $(window).trigger("dom-update");
          break;

        default: 
          if(captureKeys){ alert(event.which); }
          break;
      }
    });
  });

