const express=require('express')
const app=express()
const serverWS=require('express-ws')(app)
const aWss = serverWS.getWss()
const PORT=process.env.PORT|| 5000

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})



app.listen(PORT,'',0,()=>{
    console.log(`server start on ${PORT} port`)
})

const allClientsName=[]

const connectionHandler = (ws, msg) => {
    allClientsName.push(msg.userName)
    ws.id = msg.id
    if(allClientsName.length>10){
        allClientsName.length=0
    }
    broadcastConnection(ws, msg,allClientsName)
}

const broadcastConnection = (ws, msg, allClientsName) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id) {
            client.send(JSON.stringify({msg,allClientsName}))
        }
    })
}