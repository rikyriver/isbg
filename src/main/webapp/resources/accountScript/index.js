const TABLE_ID = 'table';
 
var table;	 
const switch_bool = function () {
}
const on_input = function ( cell ) {
}  
function deleteUser (m) {
	
	if(confirm('Наистина ли искате да изтриете юзъра?')){

		var resultToSave = new Object();

 	    $.ajax({
 	        type: "POST",
 	        beforeSend: setHeader,
 	        crossDomain: true,
 	        contentType: "application/json; charset=utf-8",
 	        url: url + "/deleteUsesrInfo" ,
 	        dataType: 'json',
 	        data: m,
 	        async: "false",
 	        success: function (data) {
 	        	console.log(data);
 	        	if (data=="2"||data==2){
 	        		alert ("Възникна проблем.");
 	        	} else {
 	        		confirm("Успешно изтрихте записа!");
 	        		printTable();
 	        	}

 	        },
 	        error: function (error) {
 	        	alert ("Възникна проблем.");
 	        	console.log("error====>" + error);
 	        }
 	    });
		
	}
}

function setHeader(xhr) {
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
}
const sync_data = function () {
	if(confirm('Наистина ли искате да запишете промените?')){
		let data = $( '#' + TABLE_ID ).DataTable().data();
		let result = [];
		Object.keys( data ).forEach( ( key ) => {
			if ( !isNaN( Number( key ) ) )
				result.push( data[ key ] )
		} );
		let json = JSON.stringify( {
			hall_id: "",
			info: result
		} );
		return saveUserInfo( JSON.stringify(result));
	}
}

const submit = {
			text: 'Запис',
			className: 'btn btn-info',
			action: function () {
				this.processing( true );	
				sync_data()
			}
};

 function printChart() {	
	 var searchUser=$('#userName').val();
	 if(searchUser.length === 0){
	    	alert("Моля, попълнете полето 'Въведете име или част от името'");
	    	return;
	}
    bootbox.alert(
	    		'<div  class="select-all-c" style="margin-left: 2px; margin-top: 55px; " ></div>'
	    		, function() {  }).find("div.modal-dialog").css({ "width": "62%", "height": "82%" }
	 );
    printTable();
};

function printTable() {	 
	
	var searchUser=$('#userName').val();

	$.ajax({
		type : 'GET',
		url : url+"/getRestChart",
		dataType : "json",
		contentType: "application/json; charset=utf-8",
	    headers : {
	    	'userName' : ''+ searchUser +''
		},
	
		success : function(allUsers) {
	
		$(".select-all-c").empty();
		$(".select-all-c").append(	
	               '  c.	Редактиране на съществуващ запис '+
	               '<div  id="usersList" style="margin-left: 20px; margin-top: 5px; " >'+
		           '</div><img style="margin-left: 40px; margin-top: -5px; height:30px;"  src="resources/pictures/up.gif" >Полетата са редактируеми(Може да се пише вътре в тях след това се натиска запис)<br>'+
		           '   ' )
			const TABLE_PARENT = $( '#usersList' );
	         allUsers = allUsers || {};
						var table = Table( {
							id: TABLE_ID,
							params: TABLE_PARAMS,
							parent: TABLE_PARENT
						} );

						table.render( allUsers );
		},       
		error: function (error) {
			console.log(error);
	    }
	});
}

const TABLE_PARAMS = {
 	                			dom: 'Bfrtip',
 	                			columns: [
 	                				{
 	                					data: 'name',
 	                					title: 'Име'
 	                				},
 	                				{
 	                					data: 'email',
 	                					title: 'Имейл'
 	                				},
 	                				{
 	                					data: 'address',
 	                					title: 'Aдрес'
 	                				},
 	                				{
 	                					data: 'pin',
 	                					title: 'Пин'
 	                				} ,
 	                				{
 	                					data: 'userId',
 	                					title: 'd.Изтриване на избран запис'
 	                				}
 	                			],
 	                			events: {
 	                				cell:  switch_bool, //calcInOutP
 	                				input: on_input//on_input 
 	                			},
 	                			columnDefs: [	 	                			
 	                				{
	                					targets: 0,
 	                					 
 	                					render: DTRenderers.input 
 	                			    },	
	 	                			{
	 	                				targets: 1,
	 	                				 
	 	                				render: DTRenderers.input 
	 	                			},			
	 	                			{
	 	                				targets: 2,
	 	                			 
	 	                				render: DTRenderers.input 
	 	                			},		
	 	                			{
 	                					targets: 3,
 	                					sortable: false,
 	                					render: DTRenderers.input 
 	                				},
	 	                			{
	 	                				targets: 4, 
	 	                				render: function ( data, type, row, meta ) {
	 	                					return '<img style="height:30px;" onclick="deleteUser(\''+row.userId+'\');" src="resources/pictures/trashCircle.png" >';
	 	                				}
	 	                			}  
 	                			],
 
 	                			rowCallback: function(row, data, index) {
 
 	                		    },
 	                			buttons: [
 	       
 	                				{
 	                					extend: 'excel',
 	                					exportOptions: {	
 	                						orthogonal: null
 	                					}
 	                				},
 	                				{
 	                					extend: 'csv',
 	                					exportOptions: {
 	                						orthogonal: null 
 	                					}
 	                				}, 
 	                				submit
 	                			],
 	                			responsive: false,
 	                			paging: false,
 	                			info: false,
 	                			order: [[1, 'asc']],
 	                			fixedHeader: true,
 	                			orderCellsTop: true,
 	                			destroy: true
}

function printChartViewer() {	
	 var searchUser=$('#userName').val();
	 if(searchUser.length === 0){
	    	alert("Моля, попълнете полето 'Въведете име или част от името'");
	    	return;
	}
    bootbox.alert(
	    		'<div  class="select-all-c" style="margin-left: 2px; margin-top: 55px; " ></div>'
	    		, function() {  }).find("div.modal-dialog").css({ "width": "62%", "height": "82%" }
	);

	$.ajax({
		type : 'GET',
		url : url+"/getRestChart",
		dataType : "json",
		headers : {
			'userName' : ''+searchUser +''
		},
		contentType : "application/json; charset=utf-8",
		success : function(allUsers) {

		$(".select-all-c").empty();
		$(".select-all-c").append(

                   'Данни '+
                   '<div  id="usersList" style="margin-left: 20px; margin-top: 5px; " >'+
		           '</div> ' )
			const TABLE_PARENT = $( '#usersList' );
             allUsers = allUsers || {};
						var table = Table( {
							id: TABLE_ID,
							params: TABLE_PARAMS_viewer,
							parent: TABLE_PARENT
						} );
						
						table.render( allUsers );
						
						$(document).ready(function() {						
							$('#table thead tr').clone(true).appendTo( '#table thead' );
						    $('#table thead tr:eq(1) th').each( function (i) {
						    	if(i>-1 && i<3){
						        var title = $(this).text();
						        $(this).html( '<input type="text" placeholder="Търси" />' );
						 
						        $( 'input', this ).on( 'keyup change', function () {
						            if ( table.column(i).search() !== this.value ) {
						                table
						                    .column(i)
						                    .search( this.value )
						                    .draw();
						            }
						        } );
						    	} else {
							        var title = $(this).text();
							        $(this).html( ' ' );
						    	}
						    } );
						    
						    if ( $.fn.dataTable.isDataTable( '#table' ) ) {
						        table = $('#table').DataTable();
						    }
						    else {
							    $('#table').DataTable( {
							        orderCellsTop: true,
							        fixedHeader: true
							    } );
						    }
						});
		},       
		error: function (error) {
			console.log(error);
        }
	});
};

const TABLE_PARAMS_viewer = {
			dom: 'Bfrtip',
			columns: [
				{
					data: 'name',
					title: 'Име'
				},
				{
					data: 'email',
					title: 'Имейл'
				},
				{
					data: 'address',
					title: 'Aдрес'
				},
				{
					data: 'pin',
					title: 'Пин'
				}  
			],
			events: {
				cell:  switch_bool, //calcInOutP
				input: on_input//on_input 
			},
			columnDefs: [ 
 		  
			],

			rowCallback: function(row, data, index) {

		    },
			buttons: [

				{
					extend: 'excel',
					exportOptions: {	
						orthogonal: null
					}
				},
				{
					extend: 'csv',
					exportOptions: {
						orthogonal: null 
					}
				} 
			],
			responsive: false,
			paging: false,
			info: false,
			order: [[1, 'asc']],
			fixedHeader: true,
			orderCellsTop: true,
			destroy: true
}

function saveNewUser(json) {

			var fullName=$('#fullName').val();
			if(fullName.length === 0){
			    	alert("Моля, попълнете полето име");
			    	return;
			}
			var email=$('#email').val();
			if(email.length === 0){
			    	alert("Моля, попълнете полето имейл");
			    	return;
			}
			var address=$('#address').val();
			if(address.length === 0){
			    	alert("Моля, попълнете полето адрес");
			    	return;
			}	
			var pin=$('#pin').val();
			if(pin.length === 0){
			    	alert("Моля, попълнете полето пин");
			    	return;
			}	
			var resultToSave = new Object();
			let result = [];
			resultToSave.name= $('#fullName').val();	
			resultToSave.email= $('#email').val();	
			resultToSave.address= $('#address').val();	
			resultToSave.pin= $('#pin').val();	
			resultToSave.userId=3;	
			result.push(resultToSave);	
			saveNewUserServer( JSON.stringify(result));
}

function saveNewUserServer(json) {
	 
    $.ajax({
        type: "POST",
        beforeSend: setHeader,
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        url: url + "/saveUser" ,
        dataType: 'json',
        data: json,
        async: "false",
        complete: function () {
        //	return '';
        },
        success: function (data) {
        	
        	if (data=="3"||data==3){
        		alert ("Името което сте въвели, вече съществува в списъка. Моля, посочете друго.");
        	} else if (data=="2"||data==2){
        		alert ("Възникна проблем.");
        	} else {
        		confirm("Успешно записахте таблицата в базата!");
        	}

        },
        error: function (error) {
        	alert ("Възникна проблем.");
        	console.log("error====>" + error);
        }
    });
	return 'r';
}

function saveUserInfo(json) {
 	                		
 	                		var idUser=0;       		
	                		
 	                	    $.ajax({
 	                	        type: "POST",
 	                	        beforeSend: setHeader,
 	                	        crossDomain: true,
 	                	        contentType: "application/json; charset=utf-8",
 	                	        url: url + "/saveUserInfo" ,
 	                	        dataType: 'json',
 	                	        data: json,
 	                	        async: "false",
 	                	        success: function (data) {
 	                	 
 	                	        	if (data=="3"||data==3){
 	                	        		alert ("Името което сте въвели, вече съществува в списъка. Моля, посочете друго.");
 	                	        	} else if (data=="2"||data==2){
 	                	        		alert ("Възникна проблем.");
 	                	        	} else {
 	                	        		confirm("Успешно записахте таблицата в базата!");
 	                	        	}

 	                	        },
 	                	        error: function (error) {
 	                	        	alert ("Възникна проблем.");
 	                	        	console.log("error====>" + error);
 	                	        }
 	                	    });
 	                		return 'r';
}            