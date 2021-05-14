$(document).ready(function(){
    let page_back = $(".page_back");
    let page_fwd = $(".page_fwd");

    let current_page = $("#current_page").text();
    let max_page = $("#max_page").text();


    current_page = parseInt( current_page );
    max_page = parseInt( max_page );


    
    let getUrl = window.location;
    let baseUrl = getUrl .protocol + "//" + getUrl.host;
    
    if( current_page !== 1 ) {
	// add p_back event

	page_back.on('click', function() {

	    window.location.href = baseUrl + "/graffiti?p=" + (current_page - 2).toString();

	})

    }else{
	// add unclickable style
	make_unclickable( page_back );

	
    }

    if ( current_page !== max_page ) {
	// add p_fwd event

	
	page_fwd.on('click', function() {

	    window.location.href = baseUrl + "/graffiti?p=" + (current_page).toString();

	})

    }else{
	// add unclickable style
	make_unclickable( page_fwd );
	console.log('unclick');
    }


    function make_unclickable( e ) {

	e.addClass('unclickable');
	
    }
	
})
