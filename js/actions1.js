
$(function(){
	update_dim();
	click_options();
	click_options_();
	click_options_tri();
	//deplacerLigne(this.parentNode.rowIndex, this.parentNode.rowIndex+1);
    $(".s2").click(function(){
 
    console.log("click on "+$(this).html());
    var w =$(this).width();
    var h =$(this).height();
    $(this).css("position","relative")
    $(this).append('<div class="position" ><svg height="'+h+'" width="'+w+'"> <circle cx="'+(w/2)+'" cy="'+(h/2)+'" r="8" stroke="black" stroke-width="3" fill="red" /></svg></div>');
  });
});

	
function update_dim(){
	var border =  parseInt($($("#tableau")[0]).attr("border"));
	var tab_w = [];
	var tab_h = [];
	var tab_h_thead;
	tab_h_thead = $($("#tableau thead th")[0]).height()+border;
	$("#tableau tbody tr:first td").each(function(){
		tab_w.push($(this).width()+border);
		tab_h.push($(this).height()+border);
	});
	$("#tab_options_hor tr").each(function(){
		$("td",$(this)).each(function(){
			var i = $("td", $(this).parent()).index($(this));
			$(this).attr("width",tab_w[i]);
		});
	});
	$("#tab_options_ver thead tr").attr("height",tab_h_thead);
	$("#tab_options_ver tr").each(function(){
		$(this).attr("height",tab_h_thead);
	});
	
}

function click_options(){
	$("#tab_options_hor .cercle").click("live",function(){
		var i = $("td",$($(this).parents("tr")[0])).index($($(this).parents("td")[0]));
		var min = Number.MAX_VALUE;
		var max = Number.MIN_VALUE;
		$("#tableau tbody tr").each(function(){
			var me = parseFloat($($("td span",$(this))[i]).text());
			if(me > max) max = me;
			if(me < min) min = me;
		});
		$("#tableau tbody tr").each(function(){
			var me = $($("td",$(this))[i]);
			me.addClass("position");
			me.attr("width",me.width());
			me.attr("height",me.height());
			var rayon = me.height()*((parseFloat($('span',me).text())-min)/(max-min));
			if(rayon<=0) rayon = 4;
			me.addClass("hide");
			me.append('<div class="position" ><svg height="'+me.height()+'" width="'+me.width()+'"><circle cx="'+me.width()/2+'" cy="'+me.height()/2+'" r="'+rayon/2+'" stroke="black" stroke-width="0" fill="red" /></svg></div>');
		});
	});
}


//carree
function click_options_(){
	$("#tab_options_hor .carre").click("live",function(){
		var i = $("td",$($(this).parents("tr")[0])).index($($(this).parents("td")[0]));
		var min = Number.MAX_VALUE;
		var max = Number.MIN_VALUE;
		$("#tableau tbody tr").each(function(){
			var me = parseFloat($($("td span",$(this))[i]).text());
			if(me > max) max = me;
			if(me < min) min = me;
		});
		$("#tableau tbody tr").each(function(){
			var me = $($("td",$(this))[i]);
			me.addClass("position");
			me.attr("width",me.width());
			me.attr("height",me.height());
			var rayon = me.height()*((parseFloat($('span',me).text())-min)/(max-min));
			if(rayon<=0) rayon = 4;
			me.addClass("hide");
			me.append('<div class="position" ><svg height="'+me.height()+'" width="'+me.width()+'"><rect x="'+me.width()/2+'" y="'+me.height()/2+'" width="'+rayon/2+'" height="'+rayon/2+'" style="fill:rgb(0,0,255);stroke-width:0;stroke:rgb(0,0,0)" /></svg></div>');
		});
		
	});
}


function click_options_tri(){
	$("#tab_options_hor .triangle").click("live",function(){
		var i = $("td",$($(this).parents("tr")[0])).index($($(this).parents("td")[0]));
		var min = Number.MAX_VALUE;
		var max = Number.MIN_VALUE;
		$("#tableau tbody tr").each(function(){
			var me = parseFloat($($("td span",$(this))[i]).text());
			if(me > max) max = me;
			if(me < min) min = me;
		});
		$("#tableau tbody tr").each(function(){
			var me = $($("td",$(this))[i]);
			me.addClass("position");
			me.attr("width",me.width());
			me.attr("height",me.height());
			var rayon = me.height()*((parseFloat($('span',me).text())-min)/(max-min));
			if(rayon<=0) rayon = 4;
			me.addClass("hide");
			me.append('<div class="position" ><svg  height="'+me.height()+'" width="'+me.width()+'"> <rect x="'+me.width()/2+'" y="'+me.height()/2+'" width="'+rayon/2+'" height="'+rayon/2+'" style="stroke: #ff00ff; fill: none;" >  <animateTransform  attributeName="transform" type="scale" from="1 1" to="2 3" begin="0s" dur="8s" repeatCount="indefinite" /></rect></svg></div>');
		});
		
	});
}


$(document).ready(function() {

    $("#tableau").tableDnD();
    // $("#tableau").dragtable();
});



$(document).ready(function(){
    $(".header-left").click(function(){
                var row = $(this).parents("tr:first");
                 console.log(row);
                if ($(this).is(".up")) {
                    row.insertBefore(row.prev());
                } else {
                    row.insertAfter(row.next());
                }
    });
});
 
 
 
 
 
 
 
 
