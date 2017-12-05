const http = require("https");

const url = "https://www.imooc.com/learn/348";

http.get(url,(res)=>{
    let html = ''
    res.on('data', (data)=>{
        html += data
    })

    res.on('end',()=>{
        console.log(html)
    })
})