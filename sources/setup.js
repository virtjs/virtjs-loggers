var Path = require( 'path' );
var System = require( 'systemjs' );

System.paths[ 'virtjs/*' ] = __dirname + '/../node_modules/virtjs/libraries/virtjs/virtjs/*.js';
System.paths[ 'virtjs-gbjit/*' ] = __dirname + '/../node_modules/virtjs/libraries/virtjs-gbjit/virtjs-gbjit/*.js';

System.import( Path.relative( '.', __dirname + '/' + process.argv[ 2 ] ) ).then( function ( m ) {
    debugger ; return m.main( process.argv.slice( 3 ) );
} ).catch( function ( err ) {
    console.error( err.stack );
} );
