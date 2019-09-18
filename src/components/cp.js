 const reloadRoom = (anotherRoom) => {
        if (anotherRoom.joined) {
            api.getMessagePage(anotherRoom.id, pageCount, data=>{
                setMessages(JSON.parse(data))
                setPageCount(pageCount+1);
            });
        } else {
            setMessages([]);
        }
        if (anotherRoom.id != room.id || anotherRoom.joined != room.joined) {
            setRoom(anotherRoom);
            if (ws.subscription) {
                ws.client.unsubscribe(ws.subscription);
                ws.subscription=false;
                setWs(ws);
            }
        }

    }