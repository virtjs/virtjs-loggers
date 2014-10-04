import { NullInput }                        from 'virtjs/devices/inputs/NullInput';
import { NullScreen }                       from 'virtjs/devices/screens/NullScreen';
import { ImmediateTimer }                   from 'virtjs/devices/timers/ImmediateTimer';
import { formatAddress, formatHexadecimal } from 'virtjs/utils/FormatUtils';
import { fetch }                            from 'virtjs/tools';

import { Engine }                           from 'virtjs-gbjit/Engine';

export var main = ( [ rom ] ) => {

    if ( typeof rom === 'undefined' )
        throw new Error( 'Missing rom path in argument list' );

    var engine = new Engine( { events : [

        'instruction'

    ], devices : {

        screen : new NullScreen( ),
        input : new NullInput( ),
        timer : new ImmediateTimer( )

    } } );

    var register = ( name, size ) => formatHexadecimal( engine.environment[ name ], size );

    engine._interpreter.on( 'post-instruction', e => { console.log( [

        '[instruction]',

        formatAddress( e.address, 16 ),
        formatHexadecimal( e.opcode, 16 ),

        register( 'a', 8 ),
        register( 'f', 8 ),
        register( 'b', 8 ),
        register( 'c', 8 ),
        register( 'd', 8 ),
        register( 'e', 8 ),
        register( 'h', 8 ),
        register( 'l', 8 ),
        register( 'pc', 16 ),
        register( 'sp', 16 )

    ].join( ' ' ) ); } );

    return fetch( rom ).then( rom => {
        engine.loadArrayBuffer( rom );
    } );

};
