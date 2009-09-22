## Image replacement gallery

Suppose you have a portfolio where you want to showcase multi 
images without jumping to another page, you can load the JPG 
into the target element.

<%= image_tag "/images/ui-image-gallery.jpg", :alt => "[image gallery]" %>

First append an empty `<em>` to `h2`.

When a link within the `<p class=thumbs>` is clicked:

- store its href attribute into a variable „largePath”
- store its title attribute into a variable „largeAlt”
- replace the `<img id="largeImg">` scr attribute with the variable 
  „largePath” and replace the alt attribute with the variable „largeAlt”
- set the `em` content (within the `h2`) with the variable 
  largeAlt (plus the brackets)

Kod:

    $(document).ready(function(){
    	$("h2").append('<em></em>')
    	$(".thumbs a").click(function(){
    	  var largePath = $(this).attr("href");
    	  var largeAlt = $(this).attr("title");
    	  $("#largeImg").attr({ src: largePath, alt: largeAlt });
    	  $("h2 em").html(" (" + largeAlt + ")"); return false;
    	});
    });
{:lang=js}

Link do przykładu: 
[Image Replacement Gallery](/ti/doc/examples/javascript/ui-image-replacement-gallery.html)


### Code Magnets

Takie przykłady są w książkach z serii *Head First*.

Link: [draggable](http://jqueryui.com/demos/draggable/)


### Źródła przykładów
    
1. *Image replacement gallery*, [jQuery Tutorials for 
Designers](http://www.webdesignerwall.com/tutorials/jquery-tutorials-for-designers/)
   
