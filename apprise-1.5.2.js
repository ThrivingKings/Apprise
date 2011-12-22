/*
 Apprise 1.5.2 - The attractive alert alternative for jQuery.
 http://thrivingkings.com/apprise

 @license Creative Commons Attribution-ShareAlike 2.5 Generic (CC BY-SA 2.5)
 <http://creativecommons.org/licenses/by-sa/2.5/>
 @author Daniel Raftery <info@thrivingkings.com>
*/
(function(a,g,l){g.apprise=function(e,d,m){var b=a.extend({textOk:"OK",textCancel:"Cancel",textYes:"Yes",textNo:"No"},d),d=a(l),f=a(g),c=a("<div/>").addClass("appriseOuter"),h=a("<div/>").addClass("appriseOverlay"),i=a("<div/>").addClass("appriseInner");h.css({height:d.height(),width:d.width()}).appendTo("body").fadeIn(100,function(){a(this).css("filter","alpha(opacity=70)")});i.append(e).appendTo(c);c.appendTo("body");if(b.input){var n=a('<input type="text" class="aTextbox"/>').appendTo(i).val("string"==
typeof b.input?b.input:"").wrap('<div class="aInput">');g.setTimeout(function(){n.focus().select()},0)}var e=function(){(m||a.noop)(this.returnValue&&b.input?a(".aTextbox").val():this.returnValue);h.remove();c.remove()},j=a.proxy(e,{returnValue:!0}),k=a.proxy(e,{returnValue:!1}),e=a('<div class="aButtons"/>').appendTo(i);a("<button/>").val("ok").text(b.verify?b.textYes:b.textOk).click(j).appendTo(e);if(b.confirm||b.verify||b.input)a("<button/>").val("cancel").text(b.verify?b.textNo:b.textCancel).click(k).appendTo(e);
d.keydown(function(a){h.is(":visible")&&(13===a.keyCode?j():27===a.keyCode&&k())});c.css("left",(f.width()-c.width())/2+f.scrollLeft()+"px");d=b.position?(f.height()-c.height())/2:100;(f=b.animate)?c.css("top","-"+(c.height()+10)+"px").show().animate({top:d},isNaN(parseInt(f,10))?400:f):c.css("top",d).fadeIn(200)}})(jQuery,window,document);