const http = require("https");
const cheerio = require("cheerio");

const url = "https://www.imooc.com/learn/348";

function filtersHtml(html) {
  let courseData = [];

  let $ = cheerio.load(html);
  let chapters = $(".chapter");
  chapters.each(function(item) {
    let chapter = $(this);
    let chapterTitle = chapter.find("strong").text(); //找到章节标题
    let videos = chapter.find(".video").children("li");

    let chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    };

    videos.each(function(item) {
      let video = $(this).find(".studyvideo");
      let title = video.text();
      let id = 0;

      chapterData.videos.push({
        title: title,
        id: id
      });
    });

    courseData.push(chapterData);
  });

  return courseData;
}  


http.get(url,(res)=>{
    let html = ''
    res.on('data', (data)=>{
        html += data
    })

    res.on('end',()=>{
        // console.log(html)
        filtersHtml(html);
    })
}).on('error',()=>{
    console.log('获取失败')
})