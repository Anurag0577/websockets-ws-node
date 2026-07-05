import { WebSocketServer, WebSocket } from "ws";

export function initWebsocketServer(server){
    const wss = new WebSocketServer({server});

    wss.on('connection', function connection(socket){
        console.log('WS server connected successfully!')
        socket.on('error', function error(error){
            console.log('Error in the websocket server: ', error)
        })

        socket.on('message', function message(data){
            try {
                const parseData = JSON.parse(data.toString());
                console.log(`Recieved message from ${parseData.senderName}: ${parseData.message}`)
                const textMessage = data.toString()
                console.log('Recieved:', textMessage)
                // broadcast message to every client including itself
                wss.clients.forEach(client => {
                    if(client.readyState === WebSocket.OPEN && socket !== client){
                        client.send(textMessage)
                    }
                })
            } catch (error) {
                console.log('failed to parse payload from the data', error)
            }
            
        })

        
    })
}