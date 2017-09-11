Some examples of Confirmit integration work (DEMO FOR CLIENTS).

   all vanilla JS, some bootstrap 

(Home) - example of a web intercept survey with cookies to manage who will see the popup

(postexample) - example of posting data to a Confirmit Survey via Ajax and utilizing CORS

(widgetexample) - example of using the 'widget library' module to add a styled gauge or progress bar onto your report page

(cloudexample) - using vanilla javascript and CSS to change the size of the words, this will analyze a large corpus of text and output the most commonly used words found in that text


.WIDGET-LIBRARY USAGE.

1. Point to the external JS file which contains the widget module.
  
	<script src="londregan-widgets.js"></script>
  
2. Insert a div onto the page and include two (or three) attributes.
  
    	data-widget-id="some unique id" and data-widget-type="gauge||progbar"
	data-widget-color="#2196F3" is optional
 
3. In your JS call the method to search for the added divs on the page and build them into the widgets.

	widgetlib.FindAndBuild();
 
4. Afterwards, the module will contain an array of widgets on the page that you can use.

	var arr = widgetlib.widgets;
 
5. In your JS you can call methods to move the gauge or progress bar up or down.

	widgetlib.SetIncrease(widget);
	widgetlib.SetDecrease(widget);
 
6. Or call this method if you just want to set the widget directly.

 	widgetlib.SetPercent(widget, percent);
  
