/* field label insets */
$(document).ready(function(){
  init_form();
});

function getRealField(promptField){
  var form = $(promptField).closest("form")
  var form_field_prefix = $(form).attr("id").match(/^([^_]+)_(.+)/)[2];
  var prompt_field_name = $(promptField).attr("id");
  var real_field = $("#" + form_field_prefix + "_" + prompt_field_name)

  return real_field;
}

function getPromptField(realField){
  var prompt_field_name = $(realField).attr("name").match(/^[^\[]+\[([^\[]+)\]/)[1];
  var prompt_field = $("#" + prompt_field_name);

  return prompt_field;
}

function init_form(){
  $("#pay-pal").click(function(){
    var form = $(this).closest("form");
    $(form).submit();
  });

  $("#new_beta_provider_directory_request .pay-pal, form.edit_beta_provider_directory_request .pay-pal").click(function(){
    var form = $(this).closest("form");
    //var jqxhr = $.post($(form).attr("action"), JSON.stringify({data: $(form).serialize()}), function(data){}, 'json')
    //var jqxhr = $.post($(form).attr("action"), {data: $(form).serialize()}, function(data){}, 'json')
    //var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'json')
    var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'html')
    .done(function(data) {
      $("#express-pay-order").submit();
      })
    .fail(function() { 
      data = jqxhr.responseText;
      $("#form-content").html(data);
      setTimeout("init_form()", 150);
      })
    .always(function() {})
  });
}

function xinit_form(){
  $(".inset input.real[type='text']").each(function(i, item){
    if($(item).val().length > 0){
      var prompt_field = getPromptField(item);
      $(item).removeClass("hidden");
      $(prompt_field).hide();
    }
  });

  $(".inset input.real[type='text']").focus(function(){
  });

  $(".inset input.prompt[type='text']").focus(function(){
    var real_field = getRealField(this);
    $(real_field).removeClass("hidden");
    $(real_field).focus();
    $(this).hide();
  });

  $(".inset input.real[type='text']").blur(function(){
    if($(this).val().length < 1){
      var prompt_field = getPromptField(this);
      $(prompt_field).show();
      $(this).addClass("hidden");
    }
  });

  $(".inset input.prompt[type='text']").blur(function(){
  });

  $("#pay-pal").click(function(){
    var form = $(this).closest("form");
    $(form).submit();
  });

  $("#new_beta_provider_directory_request .pay-pal").click(function(){
    var form = $(this).closest("form");
    var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'json')
    //var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'html')
    .done(function(data) {
      //var md = data.match(/^redirect_to:(.+)/);
      //var redirect_to = md[1];
      $(form).attr("action", data.redirect_to);
      //alert(data.redirect_to);
      $(form).submit();
      })
    .fail(function() { 
      data = jqxhr.responseText;
      $("#form-content").html(data);
      setTimeout("init_form()", 150);
      })
    .always(function() {})
  });
}

function getInput(label){
  var assoc_input;
  if($(label).nextAll("input").length > 0){
    assoc_input = $(label).nextAll("input");
  } else {
    assoc_input = $(label).parent().next().find("input");
  }

  return assoc_input;
}

function getLabel(input){
  var assoc_label;
  var content = $(this).prevAll("label").text();

  if($(input).prevAll("label").length > 0){
    assoc_label = $(input).prevAll("label");
  } else {
    assoc_label = $(input).parent().prev().find("label");
  }

  return assoc_label;
}

function xinit_form(){
  var content, assoc_input, out = [];
  //$("label:not(:hidden)").each(function(i, item){
  //$(".inset label:hidden").each(function(i, item){
  $(".inset label").each(function(i, item){
    content = $(item).text();

    $(getInput(item)).val(content);
    out[out.length] = assoc_input;
    $(item).hide();
  });

  $(".inset input[type='text']").addClass("prompt");

  $(".inset input[type='text']").focus(function(){
    var content = $(getLabel(this)).text();
    if($(this).val() == content){
      $(this).removeClass("prompt");
      $(this).val("");
    }  
  });

  $(".inset input[type='text']").blur(function(){
    var content;
    if($(this).val().length == 0){
      content = $(getLabel(this)).text();
      $(this).addClass("prompt");
      $(this).val(content);
    }
  });

  $("#pay-pal").click(function(){
    var form = $(this).closest("form");
    $(form).submit();
  });

  $("#new_beta_provider_directory_request .pay-pal").click(function(){
    var form = $(this).closest("form");
    //var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'json')
    var jqxhr = $.post($(form).attr("action"), $(form).serialize(), function(data){}, 'html')
    .done(function(data) {
      alert(data);
      var md = data.match(/^redirect_to:(.+)/);
      var redirect_to = md[1];
      $(form).attr("action", redirect_to);
      $(form).submit();
      })
    .fail(function() { 
      data = jqxhr.responseText;
      $("#form-content").html(data);
      setTimeout("init_form()", 150);
      })
    .always(function() {})
  });
}

function design(selector, container, color, axis){
  if(arguments.length < 1){
    return "Usage: design('#keypoints', 'main', 'blue'); design('#keypoints', 'main'); design('#keypoints'); ";
  }
  container = (arguments.length > 1) ? container : "parent";
  color = (arguments.length > 2) ? color : "red";
  axis = (arguments.length > 3) ? axis : "x,y";
  $(selector).css("border", "1px solid " + color).draggable({containment: container, axis: axis}).resizable();
}
