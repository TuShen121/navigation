const express = require('express')
const app = express()
var fs = require('fs')
var bodyParser = require('body-parser');//用于post解析数据
app.use(express.static('html'));

app.use(bodyParser.urlencoded({//用于post解析数据
	extended: false
}));

/***************************下发网址***********************************/
app.get('/addr', function(req, res) {
	console.log('GET___/addr下载数据')
	fs.readFile(__dirname + '/DB/master.json', function(err, data) {
		if (err) {
			console.log("读取文件出错")
		} else {
			res.send(JSON.parse(data.toString()).addrDate)			
		}
	});
})
/***************************上传网址***********************************/
app.post('/addAddr', function(req, res) {
	console.log('GET___/addAddr上传数据')

	fs.readFile(__dirname + '/DB/master.json', function(err, data) {
		if (err) {
			console.log("读取文件出错")
		} else {
			var newDate = JSON.parse(data.toString())
			
			
			newDate.addrDate = JSON.parse(req.body.data).addrArray

			fs.writeFile(__dirname + '/DB/master.json', JSON.stringify(newDate), function(err) {
				if (err) {
					console.log("数据写入出错！");
					return
				}
			});
			res.end("上传成功");
		}
	});
})


app.listen(80, () => console.log('网页服务器启动 端口 80!'));
