
var widgetlib = (function WidgetModule() {

  var widgets = [];



  function FindAndBuild() {
    
    var elems = document.querySelectorAll('[data-widget-id]');
    for(var i = 0; i < elems.length; i++) {

      var id = elems[i].getAttribute("data-widget-id");
      var type = elems[i].getAttribute("data-widget-type");
      var color = elems[i].getAttribute("data-widget-color");
      
      if( id && type ) {

        if( !color || color == "" ) {
          color = "#A2B0B9";
        }

        var widget = {
          id: id,
          type: type,
          color: color,
          root: elems[i],
          html: "",
          create: BuildWidget
        };

        widget.create();
        widgets.push(widget);

        if( widgets.length == 1 ) {
          var ss = document.createElement("link");
          ss.rel = "stylesheet";
          ss.type = "text/css";
          ss.href = "londregan-widgets.css";
          document.getElementsByTagName("head")[0].appendChild(ss);
        }
      }
    }
  } //END findAndBuild



  function SetIncrease(widget) {
    if( widget.type == "gauge" ) {
      var one = document.getElementById("semi1_" + widget.id);
      var two = document.getElementById("semi2_" + widget.id);
      var fixed = document.getElementById("semi3_" + widget.id);

      var r1 = GetRotation(one);
      var r2 = GetRotation(two);

      if( r1 != 180 ) {
        r1 = parseInt(r1) + 36;
        var percent = toPercent(r1) + "%";
        r1 = "rotate(" + r1 + "deg)";
        one.style.transform = r1;
        two.style.transform = r1;
      }
      else if( r1 == 180 && r2 != 360 ) {
        r2 = parseInt(r2) + 36;
        var percent = toPercent(r2) + "%";
        r2 = "rotate(" + r2 + "deg)";
        two.style.transform = r2;
        two.style.zIndex = "3";
        fixed.style.zIndex = "2";
      }

      if(percent) {
        var indicator = document.getElementById("indicator_" + widget.id);
        indicator.innerHTML = percent;
      }
    }
    else if( widget.type == "progbar" ) {
      var bar = document.getElementById("progline_" + widget.id);
      var status = document.getElementById("progbar-status_" + widget.id);

      var w = GetWidth(bar);
      if(w != 100) {
        w = parseInt(w) + 10;
        status.innerHTML = w;
        w = w + "%";
      }
      bar.style.width = w;
    }
  } //END setIncrease



  function SetDecrease(widget) {
    if( widget.type == "gauge" ) {
      var one = document.getElementById("semi1_" + widget.id);
      var two = document.getElementById("semi2_" + widget.id);
      var fixed = document.getElementById("semi3_" + widget.id);

      var r1 = GetRotation(one);
      var r2 = GetRotation(two);

      if( r2 == 180 ) {
        two.style.zIndex = "2";
        fixed.style.zIndex = "3";
      }

      if( r2 != 0 && r2 <= 180) {
        r2 = parseInt(r2) - 36;
        var percent = toPercent(r2) + "%"; 
        r2 = "rotate(" + r2 + "deg)";
        one.style.transform = r2;
        two.style.transform = r2;
      }
      else if( r2 > 180 ) {
        r2 = parseInt(r2) - 36;
        var percent = toPercent(r2) + "%";
        r2 = "rotate(" + r2 + "deg)";
        two.style.transform = r2;
      }

      if(percent) {
        var indicator = document.getElementById("indicator_" + widget.id);
        indicator.innerHTML = percent;
      }
    }
    else if( widget.type == "progbar" ) {
      var bar = document.getElementById("progline_" + widget.id);
      var status = document.getElementById("progbar-status_" + widget.id);

      var w = GetWidth(bar);
      if(w != 0) {
        w = parseInt(w) - 10;
        status.innerHTML = w;
        w = w + "%";
      }
      bar.style.width = w;
    }
  } //END setDecrease



  function SetPercent(widget, p) {
    if( widget.type == "gauge" ) {
      var one = document.getElementById("semi1_" + widget.id);
      var two = document.getElementById("semi2_" + widget.id);
      var fixed = document.getElementById("semi3_" + widget.id);

      var target = toRotation(parseInt(p));

      if( target <= 180 ) {
        var percent = toPercent(target) + "%";
	target = "rotate(" + target + "deg)";
        one.style.transform = target;
        two.style.transform = target;
        two.style.zIndex = "2";
        fixed.style.zIndex = "3"; 
      }
      else if( target > 180 ) {
	var percent = toPercent(target) + "%"; 
        target = "rotate(" + target + "deg)";
        one.style.transform = "rotate(180deg)";
        two.style.transform = target;
        two.style.zIndex = "3";
        fixed.style.zIndex = "2";
      }

      if(percent) {
        var indicator = document.getElementById("indicator_" + widget.id);
        indicator.innerHTML = percent;
      }
    }
    else if( widget.type == "progbar" ) {
      var bar = document.getElementById("progline_" + widget.id);
      var status = document.getElementById("progbar-status_" + widget.id); 

      var w = p; 
      status.innerHTML = w; 
      w = w + "%"; 
      bar.style.width = w; 
    }
  } //END setPercent



  return {
    FindAndBuild: FindAndBuild,
    widgets: widgets,
    SetIncrease: SetIncrease,
    SetDecrease: SetDecrease,
    SetPercent: SetPercent
  };



  //Other Functions................
  function BuildWidget() {
  //the actual work of injecting the HTML onto the page in place of the user-generated div
    if( this.type == "gauge" ) {
      this.html = "<div class='gauge-container'><div id='semi1_" + this.id + "' class='semicircle in-motion-1' style='background-color: " + this.color + ";'></div>";
      this.html = this.html + "<div id='semi2_" + this.id + "' class='semicircle in-motion-2' style='background-color: " + this.color + ";'></div>";
      this.html = this.html + "<div id='semi3_" + this.id + "' class='semicircle fixed'></div><div class='gauge-inner'><p id='indicator_" + this.id + "'></p></div></div>";
      this.root.innerHTML = this.html;
    }
    else if( this.type == "progbar" ) {
      this.html = "<div class='progbar'><div id='progline_" + this.id + "' style='background-color: " + this.color + ";'>";
      this.html = this.html + "<p id='progbar-status_" + this.id + "'></p></div></div>";
      this.root.innerHTML = this.html;
    }
  }

  function GetRotation(elem) {  
    //for gauge, get the number of degrees the gauge curently fills 
    var x = elem.style.transform;
    if(x) {
      return x.split("(")[1].split("deg")[0];
    }
    else {
      return 0;
    }
  }

  function GetWidth(elem) {  
    //for progbar, get the percentage as a whole number that the bar currently fills
    var x = elem.style.width;
    if(x) {
      return x.split("%")[0];
    }
    else {
      return 0;
    }
  }

  function toPercent(rot) {
    //for gauge, what the percentage should read given its degrees of rotation
    return Math.round(rot / 360 * 100); 
  }

  function toRotation(p) {
    //for gauge, what the degrees of rotation should be given the percentage passed in
    return Math.round(p * 360 / 100); 
  }



})(); //END WidgetModule
