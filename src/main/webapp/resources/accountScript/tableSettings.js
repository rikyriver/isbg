/*******************************************************************************
* CONFIGURATION
******************************************************************************/

const CLASS = 'table table-sm table-striped table-bordered';
const STYLE = 'width: 100%';
const INPUT_CLASS = 'field_input';

/*******************************************************************************
* DTRENDERERS
******************************************************************************/

const DTRenderers = Object.freeze( {

	//
    // Replaces all the keys in vals
	// with their coresponding values,
	// makes no change if the value of
	// the cell is not in vals
	//
	replace: function ( vals ) {
		return function( data ) {
			return ( data in vals ) ?
			vals[ data ] :
			data
		}			
	},

	input: function ( data, type ) {
		return '<input class="' + 
			INPUT_CLASS + 
			'" value="' + 
			data + '">' + 
			'</input>'; 
	}

} );
 
const DTRenderersMin = Object.freeze( {
 
	replace: function ( vals ) {
		return function( data ) {
			return ( data in vals ) ?
			vals[ data ] :
			data
		}			
	},

	input: function ( data, type, row ) {
		
		let minP   = Number(row.min);
		let maxP   = Number(row.max);
		let valueP = Number(row.value);
		let hidValueP = Number(row.hidValue);
		let baseP = Number(row.base);
		let percP = Number(row.perc);
		let hidPercP = Number(row.hidPerc);
		let activeP =  row.active;
		let globalIdP =  row.globalId;
		
		if (valueP !=0 && maxP!=0 && minP !=0 && activeP==true && globalIdP == 0 ) {
			 
			if(maxP<=minP) {
				// alert("Грешни данни max <= min ");
				 console.log("Грешни данни max <= min ");
				 $( "#alertData" ).empty();
				 $( "#alertData" ).append( '<b><h10>Грешно въведени данни max > = min <h10></b>' );
				 
				 return  '<input class="' + 
					INPUT_CLASS + 
					'" value="' + 
					(maxP-500) + '">' + 
					'</input>';  
			}
		}
		
		
		return '<input class="' + 
			INPUT_CLASS + 
			'" value="' + 
			data + '">' + 
			'</input>'; 
		
		
	}

} );

const DTRenderersMax = Object.freeze( {
	 
	replace: function ( vals ) {
		return function( data ) {
			return ( data in vals ) ?
			vals[ data ] :
			data
		}			
	},

	input: function ( data, type, row ) {
		
		let minP   = Number(row.min);
		let maxP   = Number(row.max);
		let valueP = Number(row.value);
		let hidValueP = Number(row.hidValue);
		let baseP = Number(row.base);
		let percP = Number(row.perc);
		let hidPercP = Number(row.hidPerc);
		let activeP =  row.active;
		let globalIdP =  row.globalId;
		
		if (valueP !=0 && maxP!=0 && minP !=0 && activeP==true && globalIdP == 0 ) {
			 
			if(maxP<=minP) {
				
				 console.log("Грешни данни max <= min ");
				 
				 $( "#alertData" ).empty();
				 $( "#alertData" ).append( '<b><h10>Грешно въведени данни Max > = Min<h10></b>' );
				 
				 return  '<input class="' + 
					INPUT_CLASS + 
					'" value="' + 
					(minP+500) + '">' + 
					'</input>';  
			}
		}
		
		
		return '<input class="' + 
			INPUT_CLASS + 
			'" value="' + 
			data + '">' + 
			'</input>'; 
		
		
	}

} );

const DTRenderersPerc = Object.freeze( {
	 
	replace: function ( vals ) {
		return function( data ) {
			return ( data in vals ) ?
			vals[ data ] :
			data
		}			
	},

	input: function ( data, type, row ) {
		
		let minP   = Number(row.min);
		let maxP   = Number(row.max);
		let valueP = Number(row.value);
		let hidValueP = Number(row.hidValue);
		let baseP = Number(row.base);
		let percP = Number(row.perc);
		let hidPercP = Number(row.hidPerc);
		let activeP =  row.active;
		let globalIdP =  row.globalId;
		
		if (valueP !=0 && maxP!=0 && minP !=0 && activeP==true && globalIdP == 0 ) {
			 
			if(percP<=hidPercP ) {
				// alert("Грешни данни max <= min ");
				 console.log("Грешни данни Perc >= Hid.Perc ");
				 console.log("hidPercP +1  "+hidPercP);
				 $( "#alertData" ).empty();
				 $( "#alertData" ).append( '<b><h10>Грешно въведени данни Perc >= Hid.Perc.<h10></b>' );
				 
				 return  '<input class="' + 
					INPUT_CLASS + 
					'" value="' + 
					(hidPercP+1) + '">' + 
					'</input>';  
			}
		}
		
		
		return '<input class="' + 
			INPUT_CLASS + 
			'" value="' + 
			data + '">' + 
			'</input>'; 
		
		
	}

} );
 
const DTRenderersHidPerc = Object.freeze( {
	 
	replace: function ( vals ) {
		return function( data ) {
			return ( data in vals ) ?
			vals[ data ] :
			data
		}			
	},

	input: function ( data, type, row ) {
		
		let minP   = Number(row.min);
		let maxP   = Number(row.max);
		let valueP = Number(row.value);
		let hidValueP = Number(row.hidValue);
		let baseP = Number(row.base);
		let percP = Number(row.perc);
		let hidPercP = Number(row.hidPerc);
		let activeP =  row.active;
		let globalIdP =  row.globalId;
		
		if (valueP !=0 && maxP!=0 && minP !=0 && activeP==true && globalIdP == 0 ) {
			 
			if(percP<=hidPercP ) {
				// alert("Грешни данни max <= min ");
				 console.log("Грешни данни Perc >= Hid.Perc ");
				 console.log("percP-1 "+percP);
				 $( "#alertData" ).empty();
				 $( "#alertData" ).append( '<b><h10>Грешно въведени данни Perc >= Hid.Perc.<h10></b>' );
				 
				 return  '<input class="' + 
					INPUT_CLASS + 
					'" value="' + 
					(percP-1) + '">' + 
					'</input>';  
			}
		}
		
		
		return '<input class="' + 
			INPUT_CLASS + 
			'" value="' + 
			data + '">' + 
			'</input>'; 
		
		
	}

} );


/*******************************************************************************
* TABLE
******************************************************************************/ 

//  table table-sm table-striped table-bordered dataTable no-footer dtr-inline collapsed fixedHeader-floating
const Table = function ( conf ) {

	let { id, 
	      params,
              parent } = conf;
	
	function get_table() {
		return $( '<table>', {
			'id': id,
			'class': CLASS,
			'style': STYLE 
		} );
	}

	function render ( data ) {
		data = data || {};
	
		let columns = [];
		let $table = get_table();	
	
		if ( !( columns in params ) )	
			for ( let prop in data[0] )
				columns.push( { 
					data: prop, 
					title: prop 
				} );


		$( '#table_wrapper' ).remove();
		$( '#' + id ).remove();
		parent.append( $table );

		const initComplete = function () {

			if ( params.events === undefined )
				return;

			if ( 'cell' in params.events )
				$( id + ' tbody' ).on( 'click', 'td', params.events[ 'cell' ] );

			
			const on_input = function () {
				let cellNode = $( this ).parent().get()[0];
				let cell = getCell( cellNode );
				let val = $( this ).val();
				cell.data( val );
				$( cellNode ).children( 'input' ).change( on_input );
				if ( 'input' in params.events )
					params.events[ 'input' ]( cell );
			}
	
			$( '.' + INPUT_CLASS ).change( on_input ); 
			 
		}	
		
		let table_init = Object.assign( { 
			  data, 
			  columns, 
			  initComplete 
 		}, params );
		$table.DataTable( table_init );
	}

	function getCell( node ) {
		return $( '#' + id ).DataTable().cell( node );
	}

	return Object.freeze( {
		render,
	} );	

}
 
const component = function ( conf ) {
	let { 
		mst, 
		view 
	} = conf; 

	function render () {
		view = view || {};
		mst = mst || " ";
		Mustache.parse( mst );
		mst = Mustache.render( mst, view );	
		return $.parseHTML( $.trim( mst ) );
	}

	return Object.freeze( {
		render
	} );

}

const select = function ( spec ) {

	let {
		params,
		options
	} = spec;

	let {
		render
	} = component( spec );

	return function ( conf ) {
		let {
			initial,
			parent,
			name
		} = conf;

		let $el = $( render() );

		parent.append( $el );
		
		$el.selectpicker( params );

		initial = initial.split(',').map( function ( initial ) {
			for ( opt in options )
				if ( options[ opt ].id === initial )
					return options[ opt ].alias;
		} );

		$el.selectpicker( 'val', initial );

		if ( options.length == 1 ) {
			$el.attr( 'disabled', true );
			$el.selectpicker( 'refresh' );	
		}	

		$el.on( 'change.bs.select', function () {
			let selected = $( this ).val();

			if ( typeof selected === 'string' )
				selected = [ selected ];
	
			let val = selected.map( function ( entry ) {
				for ( opt in options )
					if ( options[ opt ].alias === entry )
						return options[ opt ].id;	
			} );
			let ev = new CustomEvent( 'cp.change', { detail: {
				name,
				value: val.join(',') 
			} } );
			document.dispatchEvent( ev );
		} );

		return Object.freeze( $el );
	}	

}

const query = Object.freeze( {

	stringify: function ( obj, sep, eq ) {
		sep = sep || '&';
		eq = eq || '=';

		const escape = encodeURIComponent;

		if ( obj != null && typeof obj == 'object' ) {
			return Object.keys( obj )
			 	     .map( key => escape( key ) + eq + escape( obj[ key ] ) )
				     .join( sep );
		}

		return '';
	},

	parse: function ( query, sep, eq ) {
		sep = sep || '&';
		eq = eq || '=';

		const segments = query.split( sep ),
		      decode = decodeURIComponent;

		var obj = {},
    		    val, name;
		

		for ( let seg of segments ) {
			[ name, val ] = decode( seg ).split( eq );
			obj[ name ] = val;
		}

		return obj; 	
	}

} );


const Toolbox = function ( conf ) {
	

	let { $el,  components } = conf;
	
	function render( data ) {
		
		$el.empty();

		Object.keys( data ).forEach( function ( key ) {
			if ( key in components ) {
				components[ key ]( {
					parent: $el,
					initial: data[ key ],
					name: key 
				} );
			}
		} );

 								
	} 	

	return Object.freeze( {
		render
	} );

}

//var nameType = $.fn.dataTable.absoluteOrder( { value: 'all', position: 'top' } );