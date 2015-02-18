
$(document).ready(function(){
	addCellule();
	//deplaceRow();
	deplaceCellule();
	selecMult();
	
});



//628 46 00 62 


function addCellule(){
	var w=$($("table tbody tr >td")[0]).width();
	
	var h=$($("table tbody tr")[0]).height();
	
	var baliseSvg='<svg height="'+h+'"  width="'+h+'">';
	var rangeh ='<input class="rng" type="range" min="'+h+'" max="'+4*h+'" value="0" step=1 orient="horizontal">';
	var rangeV ='<input class="rng" type="range" min="'+w+'" max="'+3*w+'" value="0" step=1 orient="verticals" />';
	var butomCercle =(baliseSvg
					+'<circle cx="'+h/2+'" cy="'+h/2+'" r="8" '
					+'stroke="black" stroke-width="0" fill="black" /></svg>');
	
	var butomCarre =(baliseSvg
					+'<rect  width="'+h+'" height="'+h+'" '
					+'rgb(128, 128, 128)" /></svg>');
	var butomLine = ('<svg height="'+h+'" width="'+h+'">'
					+'<line x1="2" y1="10" x2="17" y2="10" stroke-width="2"stroke="black"/></svg>');

	var butomText = ('<img src="img/text.png">');		
	var tab  = {cercle: butomCercle, carre: butomCarre , line:butomLine, rangev :rangeV };

	$("table tbody tr ").each(function(){
		  $(this,"td:last").append(cellule(butomCercle,"cercle" ));
		  $(this,"td:last").append(cellule(butomCarre,"carre" ));
		  $(this,"td:last").append(cellule(butomLine,"line" ));
		   $(this,"td:last").append(cellule(butomText,"text" ));
		  $(this,"td:last").append(cellule(rangeh,"rangeh" ));
	});
	for(var k in tab){
		$('<tr/><td/>'
		+'<td class="'+k+'" align="center">'+tab[k]+'</td>'
		+'<td class="'+k+'" align="center">'+tab[k]+'</td>'
		+'<td class="'+k+'"  align="center">'+tab[k]+'</td>'
		+'<td/>').insertBefore('table > thead > tr:first');
	}
	
	click_options();
}


function cellule(figure, classe){
	var fig=('<td class="'+classe+'">'+figure+'</td>') ;
   	return fig;
}


//
function click_options(){
	$("table thead tr td.cercle svg, table thead tr td.carre svg, table thead tr td.line svg, table thead tr td.rangev input").bind("click change",function(){
		click_options_sub_h($(this));
	});
	$("table tbody tr td.cercle svg, table tbody tr td.carre svg, table tbody tr td.line svg, table tbody tr td.rangeh input").bind("click change",function(){
		click_options_sub_v($(this));
	});
}

function click_options_sub_h(_this){
	var i = $("td",$(_this.parents("tr")[0])).index($(_this.parents("td")[0]));
	if(_this.hasClass('rng')){
		var val = _this.val();
		$("table tbody tr").each(function(){
			var me = $($("td",$(this))[i-1]);
			// la tete
			me.attr("width",val);
		});
	}
	else{
		var min = Number.MAX_VALUE;
		var max = Number.MIN_VALUE;
		$("table tbody tr").each(function(){
			var txt = $($("td",$(this))[i-1]).text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			if(txt > max) max = txt;
			if(txt < min) min = txt;
		});
		$('td').removeClass('size');
		$('div.position').remove();
		$("table tbody tr").each(function(){
			var me = $($("td",$(this))[i-1]);
			//me.addClass("position");
			me.attr("width",me.width());
			me.attr("height",me.height());
			var txt = me.text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			//tete
			var rayon = me.width()*((parseFloat(txt)-min)/(max-min));
			
			me.addClass('size');
			if(_this.parent().hasClass('cercle')){
				me.append('<div class="position">'
				+'<svg height="'+me.height()+'" width="'+me.width()+'">'
				+'<circle cx="'+me.width()/2+'" cy="'+me.height()/2+'" r="'+rayon/2+'"'
				+' stroke="black" stroke-width="0" fill="black" /></svg></div>');
			}
			if(_this.parent().hasClass('carre')){
				me.append('<div class="position" >'
				+'<svg  height="'+me.height()+'" width="'+me.width()+'">'
				+' <rect x="'+me.width()/2+'" y="'+me.height()/2+'" '
				+'width="'+rayon/2+'" height="'+rayon/2+'"'
				+' stroke="black" stroke-width="0" fill="black" /></rect></div>');
			}
			if(_this.parent().hasClass('line')){
				me.append('<div class="position">'
				+'<svg height="'+me.height()/2+'" width="'+me.height()/2+'">'
					+'<line x1="2" y1="10" x2="17" y2="10"'
					+' stroke-width="2"stroke="black"/><svg>></div>');
			}
		});
	}
}

function click_options_sub_v(_this){

	var i = $("tr",$(_this.parents("tbody")[0])).index($(_this.parents("tr")[0]));
	
	var monTR = $($("table tbody tr")[i]);
	if(_this.hasClass('rng')){
		var val = _this.val();
		monTR.attr("height",val);
	}
	else{
		var min = Number.MAX_VALUE;
		var max = Number.MIN_VALUE;
		//cherche le ieme tr et boucle sur ses td
		$('td', $($("table tbody tr")[i])).each(function(){
			var txt = $(this).text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			if(txt > max) max = txt;
			if(txt < min) min = txt;
		});
		$('td').removeClass('size');
		//$('div.position').remove();
		$('td:not(.cercle):not(.carre):not(.line):not(.rangeh):not(.text)', monTR).each(function(){
			$(this).attr("width",$(this).width());
			$(this).attr("height",$(this).height());
			var txt = $(this).text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			// a ce niveau je recupere la couleur de la cellule 
			//et je l'attribut au color du text
			var color = $( this ).css( "background-color" );
			$(this).css("color", color); 

			var min_Size= Math.min($(this).height(),$(this).width());
			var hypo = Math.sqrt( min_Size*min_Size + min_Size*min_Size ) / 2;
			var rayon = 4+hypo*((parseFloat(txt)-min)/(max-min));
			var h_carre =3+ ($(this).height())*((parseFloat(txt)-min)/(max-min));
			var h_line = $(this).height()*((parseFloat(txt)-min)/(max-min));
			$(this).addClass('size');
			
			if(_this.parent().hasClass('cercle')){
				$(this).append('<div class="position">'
				+'<svg height="'+$(this).height()+'" width="'+$(this).width()+'">'
				+'<circle cx="'+$(this).height()/2+'" cy="'+$(this).height()/2+'" '
				+'r="'+rayon/2+'" stroke="black" stroke-width="0" fill="black" />'
				+'</svg></div>');
			}
			if(_this.parent().hasClass('carre')){
				$(this).append('<div class="position" >'
				+'<svg height="'+$(this).height()+'" width="'+$(this).width()+'"> '
				+'<rect x="1" y="0" width="'+$(this).width()+'" height="'+h_carre+'" '
				+' stroke="black" stroke-width="0" fill="black" /></rect></div>');
			
			}
			if(_this.parent().hasClass('line')){
				$(this).append('<div class="position">'
				+'<svg height="'+$(this).height()+'" width="'+$(this).width()+'">'
				+'<line x1="0" y1="'+h_line+'" x2="'+$(this).width()+'" y2="'+h_line+'" '
				+' stroke-width="2"stroke="red"/><svg>></div>');
			}
		});
	}
}


function deplaceRow() {

  var fixHelper = function(e, ui) { ui.children().each(function() { $(this).width($(this).width()); }); return ui; };

$("table tbody").sortable({ 
    update: function(event, ui) {  
        
    },
    helper: fixHelper
}).disableSelection();

}


function deplaceCellule(){
$('#beautifyme').dragtable({items:'th:has(.dragtable-drag-handel)'});
}



function selecMult(){

  $( "#beautifyme" ).selectable({ filter: '.cercle, .carre, .line', selecting: function( event, ui ) {click_options_sub_v($($(ui.selecting).children()[0]));}} );
  
  
}

function tri(){


}


