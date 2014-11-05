var Path = require( 'path' );
var System = require( 'systemjs' );

System.paths[ 'virtjs/*' ] = __dirname + '/../node_modules/virtjs/libraries/virtjs/virtjs/*.js';
System.paths[ 'virtjs-gb/*' ] = __dirname + '/../node_modules/virtjs/libraries/virtjs-gb/virtjs-gb/*.js';

System.paths[ 'main' ] = __dirname + '/' + process.argv[ 2 ] + '.js';

System.import( 'main' ).then( function ( m ) {
    debugger ; return m.main( process.argv.slice( 3 ) );
} ).catch( function ( err ) {
    console.error( err.stack );
} );
