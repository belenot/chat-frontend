export const state = {
    header: {
        avatarSrc: "",
        username: "Username",
        settings: {
            name: "name",
            age: "age"
        }
    },
    rooms: [
        {id: 2, title: "room1", icon:"/"},
        {id: 3, title: "room2", icon:"/"},
        {id: 4, title: "room3", icon:"/"}
    ],
    chat: {
        chatHeader: {
            roomTitle: "Room title",
            clients: [
                {id: 12, avatar: "/", username: "anotherClient"}
            ]
        },
        messages: [
            {id: 5, _own: true, text: "long text very very very very very very long text with cariege return", time: "00:01:00"},
            {id: 6, username: "user1", text: "long text very very very very very very long text with cariege return", time: "00:01:00"},
            {id: 7, username: "user1", text:"text", time: "00:02:00"},
            {id: 8, username: "user2", text:"text", time: "00:03:00"}
        ]
    }
}