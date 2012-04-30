require.config( {
	paths : {
		text : "libs/text",
		backbone : 'libs/backbone',
		underscore : 'libs/underscore',
		app : 'infrastructure/app'
	},
	baseUrl : 'js'
} );

// This first require statement is pulling in foundational libraries
require( ['backbone', 'jquery', 'underscore', 'infrastructure/resource-mocks'],
	function ( Backbone, $, _ ) {

		require( ['app'], function ( app ) {
			window.app = app;
			app.init();
		} );

	} );