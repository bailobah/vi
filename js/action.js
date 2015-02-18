
$(document).ready(function(){
	addCellule();
	deplaceRow();
	deplaceCellule();
	init();
	selecMult();
	selecMulthead();
	
	
});

/***
* Cette function addCellule permet d'ajouter les TD du tbody et theader 

*/

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
	var butomFleche = ('<img src="img/fleche.png">');
	
// ajout des td du thead
	$("#beautifyme tbody tr ").each(function(){
		  $(this,"td:last").append(cellule(butomCercle,"cercle" ));
		  $(this,"td:last").append(cellule(butomCarre,"carre" ));
		  $(this,"td:last").append(cellule(butomLine,"line" ));
		 
		  $(this,"td:last").append(cellule(butomText,"text" ));
		  $(this,"td:last").append(cellule(butomFleche,"fleche" ));
		  $(this,"td:last").append(cellule(rangeh,"rangeh" ));
	});
	
	//tableau head qui contient les td du thead
	var tab  = {cercleh: butomCercle, text: butomText, fleche: butomFleche, rangev :rangeV };

	for(var k in tab){
		$('<tr/><td/>'
		
		+'<td class="'+k+'"  align="center">'+tab[k]+'</td>'
		+'<td class="'+k+'"  align="center">'+tab[k]+'</td>'
		+'<td class="'+k+'"  align="center">'+tab[k]+'</td>'
		+'<td/>').insertBefore('table > thead > tr:first');
	}
	// on appel la function click_option une fois les cellules crée
	click_options();

}

/***
*
* Cette fonction prend une figure et le nom de la class 
* puis creer un td
*/
function cellule(figure, classe){
	var fig=('<td class="'+classe+'">'+figure+'</td>') ;
   	return fig;
}

/***
*Initialisation de le function gestion d'evenement du thead click_options_sub_h et
* de la funtion gestion de click du tbody click_options_sub_v
*
*/
function click_options(){
	$("table thead tr td.cercleh svg, table thead tr td.rangev input, table thead tr td.text img").bind("click change",function(){
		click_options_sub_h($(this));
	});
	$("table tbody tr td.cercle svg, table tbody tr td.carre svg, table tbody tr td.line svg, table tbody tr td.rangeh input, table tbody tr td.text img").bind("click change",function(){
	     
		click_options_sub_v($(this));
	});
	
}
/**
*function qui gère les evenement 
*
*
*/
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
	
		
		$("table tbody tr").each(function(){
			var me = $($("td",$(this))[i-1]);
			//me.addClass("position");
			me.attr("width",me.width());
			me.attr("height",me.height());
			var txt = me.text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			
			var color = me.css( "background-color" );
			if(!_this.parent().hasClass('fleche')){
				me.css("color", color);
			}
						
			var min_Size= Math.max(me.height(),me.width());
			var hypo = Math.sqrt( min_Size*min_Size + min_Size*min_Size ) ;
			var rayon = 4+hypo*((parseFloat(txt)-min)/(max-min));
			//me.addClass('size');
			if(_this.parent().hasClass('cercleh')){
				me.append('<div class="position">'
				+'<svg height="'+me.height()+'" width="'+me.width()+'">'
				+'<circle cx="'+me.width()/2+'" cy="'+me.height()/2+'" r="'+rayon/2+'"'
				+' stroke="black" stroke-width="0" fill="black" /></svg></div>');
			}
			
			if(_this.parent().hasClass('text')){
				$('div.position',me).remove();
				me.css("color", "black"); 
			}
		});
	}
}

function click_options_sub_v(_this){

	var i = $("tr",$(_this.parents("tbody")[0])).index($(_this.parents("tr")[0]));
	var monTR = $($("table tbody tr")[i]);
	if(_this.parent().hasClass('fleche')){
		monTR.addClass('mark');
	}
	else monTR.removeClass('mark');
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
		if(!_this.parent().hasClass('fleche')){
			$('div.position',monTR).remove();
		}
		$('td:not(.cercle):not(.carre):not(.line):not(.rangeh):not(.text):not(.fleche)', monTR).each(function(){
			$(this).attr("width",$(this).width());
			$(this).attr("height",$(this).height());
			// a ce niveau je recupere la couleur de la cellule 
			//et je l'attribut au color du text
			var color = $( this ).css( "background-color" );
			if(!_this.parent().hasClass('fleche')){
				$(this).css("color", color);
			}
			var txt = $(this).text();
			txt = parseFloat(txt.replace(/\s/g, ''));
			
			var min_Size= Math.max($(this).height(),$(this).width());
			var hypo = Math.sqrt( min_Size*min_Size + min_Size*min_Size ) ;
			var rayon = 4+hypo*((parseFloat(txt)-min)/(max-min));
			var h_carre =3+ ($(this).height())*((parseFloat(txt)-min)/(max-min));
			var h_line = $(this).height()*((parseFloat(txt)-min)/(max-min));
			
			if(_this.parent().hasClass('cercle')){
				$(this).append('<div class="position">'
				+'<svg height="'+$(this).height()+'" width="'+$(this).width()+'">'
				+'<circle cx="'+$(this).width()/2+'" cy="'+$(this).height()/2+'" '
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
			
			if(_this.parent().hasClass('text')){
				
				$(this).css("color", "black"); 
			}
		});
	}
}


function deplaceRow() {
	
$("table tbody").sortable({ 
    items:'tr',
    handle:'th',
}).disableSelection();

}


function deplaceCellule(){
$('table t').dragtable();
}

function init(){
	$('.cercle, .carre, .line, .rangeh, .text, .fleche').mousedown(function(){
		$('tr').removeClass('mark');
	});
}
/**
*cette function permet la selection multiple des colonnes
*
*/

function selecMulthead(){
$( "table thead" ).selectable({ filter: '.cercleh, .text, .fleche, .rangev',
	selecting: function( event, ui ) {
	
		click_options_sub_h($($(ui.selecting).children()[0]));
		}
	});
}

/**
*cette function permet la selection multiple des lignes
*
*/
function selecMult(){
$( "table tbody" ).selectable({ filter: '.cercle, .carre, .line, .text, .fleche, .rangeh',
	selecting: function( event, ui ) {
		click_options_sub_v($($(ui.selecting).children()[0]));
		
	},
	stop: function( event, ui ) {
		if($('.mark').length){
			var TD = 'td:not(.cercle):not(.carre):not(.line):not(.rangeh):not(.text):not(.fleche)';
			var firstTR = $($('.mark')[0]);
			//index du 1er tr
			var indexFirstTR = $('table tbody tr').index(firstTR);
			var arrayTR = [];
			var cmpNbrLine = 0;
			$('.mark').each(function(){
				var elem = $(TD,$(this));
				var arrayTD = [];
				var cmpNbrCol = 0;
				$(elem).each(function(){
					var txt = $(this).text();
					txt = parseFloat(txt.replace(/\s/g, ''));
					arrayTD[cmpNbrCol] = txt;
					cmpNbrCol++;
				});
				arrayTR[cmpNbrLine] = arrayTD;
				cmpNbrLine++;
			});
			  var leafOrder = reorder.leafOrder().distance(science.stats.distance.manhattan)( arrayTR);
			  //console.log(leafOrder.length);
			  var reorderedRows = [];
			  var cmp = 0;
			  for (i in leafOrder){
				reorderedRows[cmp] = $($('table tbody tr')[leafOrder[i]+indexFirstTR]);
				cmp++;
			}
			$('.mark').remove();
			cmp = 0;
			for(j in reorderedRows){
			
				reorderedRows[j].insertBefore($($('table tbody tr')[indexFirstTR+cmp]));
				cmp++;
			}
		}
	}
  } );
  
  
}


