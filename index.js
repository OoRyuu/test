const ws = require ( "ws" );
const wss = new ws.Server( { port : 3000 } );

console.log( "Funziona!" );

all_users = { };
// utente1 : conn,
// utente2 : conn,
// ...

wss.on( "connection", conn => { 
    console.log( "Nuovo Utente Conesso!" );


    conn.on( "message", e => {
        var msg_intero = JSON.parse( e );
        if( msg_intero[ "destination" ] == "" && msg_intero[ "message" ] == "" )
        {
            all_users[ msg_intero[ "origin" ] ] = conn;
        }else{
            if ( all_users.hasOwnProperty( msg_intero["destination" ] ) ){
                all_users[ msg_intero[ "destination" ] ].send( msg_intero[ "message" ] );
            }
        }
    } );
} );
