(function(a){a.ScrollToFixed=function(d,g){var j=this;j.$el=a(d);j.el=d;j.$el.data("ScrollToFixed",j);var c=false;var y=j.$el;var z;var w=0;var m=0;var h=-1;var e=-1;var o=null;var t;function p(){i();e=-1;w=y.offset().top;m=y.offset().left+(y.offset().left-y.position().left);if(h==-1){h=m}z=y.css("position");c=true;if(j.options.bottom!=-1){r()}}function l(){return z==="fixed"}function s(){return z==="absolute"}function f(){return !(l()||s())}function r(){if(!l()){o.css({display:y.css("display"),width:y.outerWidth(true),height:y.outerHeight(true),"float":y.css("float")});y.css({width:y.width(),position:"fixed",top:j.options.bottom==-1?n():"",bottom:j.options.bottom==-1?"":j.options.bottom});z="fixed"}}function b(){y.css({width:y.width(),position:"absolute",top:j.options.limit,left:m});z="absolute"}function i(){if(!f()){e=-1;o.css("display","none");y.css({width:"",position:"",left:"",top:""});z=null}}function q(A){if(A!=e){y.css("left",m-A);e=A}}function n(){return j.options.marginTop}function u(){var B=c;if(!c){p()}var A=a(window).scrollLeft();var C=a(window).scrollTop();if(j.options.minWidth&&a(window).width()<j.options.minWidth){if(!f()||!B){k();y.trigger("preUnfixed");i();y.trigger("unfixed")}}else{if(j.options.bottom==-1){if(j.options.limit>0&&C>=j.options.limit-n()){if(!s()||!B){k();y.trigger("preAbsolute");b();y.trigger("unfixed")}}else{if(C>=w-n()){if(!l()||!B){k();y.trigger("preFixed");r();e=-1;y.trigger("fixed")}q(A)}else{if(!f()||!B){k();y.trigger("preUnfixed");i();y.trigger("unfixed")}}}}else{if(j.options.limit>0){if(C+a(window).height()-y.outerHeight(true)>=j.options.limit-n()){if(l()){k();y.trigger("preUnfixed");i();y.trigger("unfixed")}}else{if(!l()){k();y.trigger("preFixed");r()}q(A);y.trigger("fixed")}}else{q(A)}}}}function k(){var A=y.css("position");if(A=="absolute"){y.trigger("postAbsolute")}else{if(A=="fixed"){y.trigger("postFixed")}else{y.trigger("postUnfixed")}}}var v=function(A){c=false;u()};var x=function(A){u()};j.init=function(){j.options=a.extend({},a.ScrollToFixed.defaultOptions,g);if(navigator.platform==="iPad"||navigator.platform==="iPhone"||navigator.platform==="iPod"){if(!navigator.userAgent.match(/OS 5_.*\ like Mac OS X/i)){return}}j.$el.css("z-index",j.options.zIndex);o=a("<div />");z=y.css("position");if(f()){j.$el.after(o)}a(window).bind("resize.ScrollToFixed",v);a(window).bind("scroll.ScrollToFixed",x);if(j.options.preFixed){y.bind("preFixed.ScrollToFixed",j.options.preFixed)}if(j.options.postFixed){y.bind("postFixed.ScrollToFixed",j.options.postFixed)}if(j.options.preUnfixed){y.bind("preUnfixed.ScrollToFixed",j.options.preUnfixed)}if(j.options.postUnfixed){y.bind("postUnfixed.ScrollToFixed",j.options.postUnfixed)}if(j.options.preAbsolute){y.bind("preAbsolute.ScrollToFixed",j.options.preAbsolute)}if(j.options.postAbsolute){y.bind("postAbsolute.ScrollToFixed",j.options.postAbsolute)}if(j.options.fixed){y.bind("fixed.ScrollToFixed",j.options.fixed)}if(j.options.unfixed){y.bind("unfixed.ScrollToFixed",j.options.unfixed)}if(j.options.spacerClass){o.addClass(j.options.spacerClass)}y.bind("resize",function(){o.height(y.height())});y.bind("scroll.ScrollToFixed",function(){i();u()});y.bind("remove.ScrollToFixed",function(){i();a(window).unbind("resize",v);a(window).unbind("scroll",x);y.unbind(".ScrollToFixed")});if(j.options.bottom!=-1){if(!l()){k();y.trigger("preFixed.ScrollToFixed");r()}}};j.init()};a.ScrollToFixed.defaultOptions={marginTop:0,limit:0,bottom:-1,zIndex:1000};a.fn.scrollToFixed=function(b){return this.each(function(){(new a.ScrollToFixed(this,b))})}})(jQuery);