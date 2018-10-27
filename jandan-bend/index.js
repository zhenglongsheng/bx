const conf = require("./config");
// console.log(conf.url);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var request = require("request");
const cheerio = require("cheerio");

// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
//   });


app.use(express.static("img"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  if (req.method == "OPTIONS") res.sendStatus(200);
  /*让options请求快速返回*/ else next();

});

/**
 * 获取煎蛋网，段子内容
 * 访问地址：http://127.0.0.1:8080/index?page=70
 * 获取段子评论：http://jandan.net/tucao/3984420
 */
app.get("/index", function(req, res) {
  var pageid = req.query.page;
  //   res.send("Hello World!");
  request(`${conf.url}${pageid}`, function(error, response, body) {
    // console.log(body); // Print the HTML for the Google homepage.
    const $ = cheerio.load(body);
    //获取到要爬取的页面父级元素
    let list = $(".commentlist li");
    //定义一个空数组接受页面标签里的内容
    let dzlist = [];
    //遍历list数组
    list.each(function(index, ele) {
      dzlist.push({
        id: index + 1,
        //向数组中添加dom元素中的内容
        postid: $(this)
          .find(".text a")
          .text(),
        photo: `${conf.domain}${index + 1}.jpg`,
        author: $(this)
          .find(".author strong")
          .text(),
        like: $(this)
          .find(".tucao-like-container span")
          .text(),
        unlike: $(this)
          .find(".tucao-unlike-container span")
          .text(),
        content: $(this)
          .find(".text p")
          .text()
      });
    });
    //向前端输出json数据
    res.json(dzlist);
    // console.log(dzlist);
  });
});
/**
 * 获取吐槽
 * 访问地址：http://jandan.net/tucao/3984420
 */
app.get("/tucao", function(req, res) {
  let postid = req.query.postid;
  request(`${conf.TuCaoUrl}${postid}`, function(error, response, body) {
    res.json(JSON.parse(body));
  });
});
/**
 * 获取评论
 * 访问地址：http://127.0.0.1:8080/comment
 */
app.post("/comment", function(req, res) {
  var formData = {
    author: req.body.author,
    email: req.body.email,
    comment: req.body.comment,
    comment_post_ID: "55592"
  };
  request.post(
    { url: `${conf.commentUrl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        return console.error("upload failed:", err);
      }
      res.json({
        status: 200,
        postid: body
      });
    }
  );
});
/**
 * 实现点赞功能
 * 访问地址：http://127.0.0.1:8080/comment
 */
app.post("/like", function(req, res) {
  //前端传过来的数据类型，like表示喜欢，其他都是不喜欢
  let type = req.body.type
  var formData = {
    comment_id: req.body.postid,
    data_type: "comment"
  };
  if(type == "like"){
    formData.like_type = "pos"
  }else {
    formData.like_type = "neg"
  }

  request.post(
    { url: `${conf.LikeUrl}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        // console.log(err)
        return console.error("upload failed:", err);
      }
      res.json({
        status: 200,
        postid: body
      });
    }
  );
});

/**
 * 实现评论功能
 * 访问地址：http://127.0.0.1:8080/comment
 */
app.post("/SetPostcomment", function(req, res) {
  var formData = {
    author:req.body.author,
    email:req.body.email,
    content: req.body.comment,
    comment_id: req.body.postid
  };

  request.post(
    { url: `${conf.TuCaoComment}`, formData: formData },
    function optionalCallback(err, httpResponse, body) {
      if (err) {
        // console.log(err)
        return console.error("upload failed:", err);
      }
      res.json({
        status: 200,
        postid: body
      });
    }
  );
});

/**
 * 获取快手主播主页的数据
 * 访问地址：http://127.0.0.1:8080/comment
 */
app.get("/profile", function(req, res) {
  var userid = req.query.userid;
  request(`${conf.kuaiShou}${userid}`, function(error, response, body) {
    var data = body.match(/VUE_MODEL_INIT_STATE\[\'profileGallery\'\]=([\s\S]*?);/)[1]
    res.json(JSON.parse(data));
    // console.log(res)
  });
});

/**
 * 获取花瓣网图片数据
 * 访问地址：http://127.0.0.1/picture
 */
app.get("/picture", function(req, res) {
  // var p = req.query.p;
var options = {
  url:`${conf.PictureUrl}`,
  headers: {
   
    'Accept': 'application/json',
    'Host': 'huaban.com',
   'Referer': 'http://huaban.com/favorite/beauty/',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    'X-Request': 'JSON',
    'X-Requested-With': 'XMLHttpRequest'
  }
}; 
request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    // console.log(info)
    res.json(info)
  }
});
});

/**
 * 获取纵横网的数据
 * 
 */
app.get("/zh", function(req, res) {
  request(`${conf.Zh}`, function(error, response, body) {
    const $ = cheerio.load(body);
    // console.log(body)
    let list = $(".container");
    console.log(list)
    let dzlist = [];
    list.each(function(index, ele) {
      dzlist.push({
        id: index + 1,
        postid: $(this)
          .find(".book-meta h1")
          .text(),
        // content: $(this)
        // .find(".volume-list .chapter-list . col-4 a")
        // .text()
      });
    });
    //向前端输出json数据
    res.json(dzlist);
    // console.log(dzlist);
  });
});


// app.get("/zh", function(req, res) {
//   // var p = req.query.p;
// var options = {
//   url:`${conf.PictureUrl}`,
//   headers: {
   
//     'Accept': 'application/json',
//     'Host': 'huaban.com',
//    'Referer': 'http://huaban.com/favorite/beauty/',
//     'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
//     'X-Request': 'JSON',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// }; 
// request(options, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var info = JSON.parse(body);
//     // console.log(info)
//     res.json(info)
//   }
// });
// });


app.listen(80, function() {
  console.log("Example app listening on port 8080!");
});

