  function close_open_dialogs(){
    $(".ui-dialog .ui-dialog-content").filter(function(){
      return ($(this).find(".sponsor").length > 0)
    }).dialog("close");
  }

  function sponsor_tiles_init(containment, icon, callback){
    $(containment + " .sponsor .empty-circle").click(function(){
      icon_container = $(this).find(".icon");
      icon_selected =  icon + "-selected";
      if($(icon_container).hasClass(icon_selected)){
        $(icon_container).removeClass(icon_selected);
      } else {
        $(icon_container).addClass(icon_selected);
      }
      return false;
    });

    if(callback){
      $(containment + " .sponsor .empty-circle").click(callback);
    }

    $(containment + " .sponsor .empty-circle").hover(
      function(){
        $(this).find(".icon").addClass(icon);
      },
      function(){
        $(this).find(".icon").removeClass(icon);
      }
    );
  }
