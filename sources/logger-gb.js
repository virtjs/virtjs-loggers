import { NullInput }                        from 'virtjs/devices/inputs/NullInput';
import { NullScreen }                       from 'virtjs/devices/screens/NullScreen';
import { ImmediateTimer }                   from 'virtjs/devices/timers/ImmediateTimer';
import { formatAddress, formatHexadecimal } from 'virtjs/utils/FormatUtils';
import { fetch }                            from 'virtjs/tools';

import { Engine }                           from 'virtjs-gb/Engine';
import { inputs }                           from 'virtjs-gb/constants';

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

    var register = ( name, size ) => name + ':' + formatHexadecimal( engine.environment[ name ], size );
    var memory = ( address ) => formatHexadecimal( address, 16, false ) + ':' + formatHexadecimal( engine.mmu.readUint8( address ), 8 );

    var o = memory;
    memory = ( address ) => {
        try {
            return o( address );
        } catch ( e ) {
            return 'NaN';
        }
    };

    engine.interpreter.on( 'post-instruction', e => { console.log( [

        '[instruction]',

        formatAddress( e.address, 16 ),
        formatHexadecimal( e.opcode, 16 ),

        'rom:' + formatHexadecimal( engine.environment.mbcRomBank, 8 ),
        'ram:' + formatHexadecimal( engine.environment.mbcRamBank, 8 ),
        'ime:' + formatHexadecimal( engine.environment.cpuInterruptFeature, 8 ),
        register( 'af', 16 ),
        register( 'bc', 16 ),
        register( 'de', 16 ),
        register( 'hl', 16 ),
        register( 'pc', 16 ),
        register( 'sp', 16 ),
        memory( 0x9190 )

    ].join( ' ' ) ); } );

    return fetch( rom ).then( rom => {
        engine.loadArrayBuffer( rom );
    } );

};
