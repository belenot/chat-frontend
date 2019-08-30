const host = ""

export const api = {
    sendMessage: (message, callback) => {
        var xhr = new XMLHttpRequest();
        xhr.open("post", `${host}/message`)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback(xhr.responseText)
            } else {
                console.log(xhr.responseText);
            }
        }
        xhr.send(message)
    },
    getMessages: (callback, last, size) => {
        last = encodeURIComponent(last);
        size = encodeURIComponent(size);
        var xhr = new XMLHttpRequest();
        xhr.open("get", `${host}/message`)
        xhr.setRequestHeader("ContentType", "application/json")
        xhr.onload = () => {
            if (xhr.status === 200) {
                callback(xhr.responseText)
            } else {
                console.log(xhr.responseText);
            }
        }
        xhr.send(`last=${last}&size=${size}`);
    }
}