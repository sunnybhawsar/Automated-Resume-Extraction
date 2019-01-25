var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

var extract = require('pdf-text-extract')


var pdfUtil = require('pdf-to-text');
var pdf_path = "";
var namee = "";

var urlencodedParser = bodyParser.urlencoded({extended:false})

app.use(express.static('public'));					// serve 1st page
app.get('/',function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
})


app.post('/upload',urlencodedParser,function(req,res){		// 2nd page uploading

	var form = new formidable.IncomingForm();
		form.parse(req,function(err,fields,files){
			var oldpath = files.filetoupload.path;
			var newpath = 'C:/nodejs/uploads/'+files.filetoupload.name;
			namee = files.filetoupload.name;

			fs.rename(oldpath,newpath,function(err){
				if(err) throw err;

				res.writeHead(200,{'Content-Type': 'text/html'});

					res.write('<center> <br><br>');
					res.write('<h2 style="color:#BD2E2E;">Resume uploaded successfully!</h2> <br>');
						
								pdf_path=newpath;

					res.write('<form action="extract" method="post">');
					res.write('<input type="submit" value="Start Extraction">');
					res.write('</form>');
					res.write('</center>');
				res.end();
			});			
			
		});
})
															// end uploading



															//3rd page extraction
var str = "";
app.post('/extract',urlencodedParser,function(req,res){		

		 var option = {from: 0, to: 10}

		 extract(pdf_path, { splitPages: false }, function (err, text) {
  if (err) {
    console.dir(err)
    return
  }
  console.dir(text);
  str = text.toString();

  res.writeHead(200,{'Content-Type': 'text/html'});
  res.write(text.toString());


  		res.write('<center>');
  		res.write('<form action="segment" method="post">');
		res.write('<br><br><br><h1>Next</h1>');
		res.write('<input type="submit" value="Do Segments">');
		res.write('</form>');
		res.write('</center>');

  res.end();
})

})															// end 3rd page extr

			


														// 4th page segments

app.post('/segment',urlencodedParser,function(req,res){

	res.writeHead(200,{'Content-Type': 'text/html'});
	//res.write(str);
	res.write('<br>');
	res.write('Total length of Text : '+str.length);
	res.write('<br><br>');


	var ini_arr = [									// All keywords to search 'ini_arr'
	"OBJECTIVE","Objective",
	"CAREER OBJECTIVE","Career Objective",
	"AIM","Aim",

	"EDUCATION",
	"POSITIONS OF RESPONSIBILITY",
	"ACOMPLISHMENTS",
	"JOBS",
	"AREAS OF INTEREST",
	"TECHNICAL SKILLS",
	"ACHIEVMENTS",
	"STRENGTH",
	"INTERNSHIP",
	"TRAINING",
	"PERSONAL INFORMATION",
	"DECLARATION",
	"HOBBIES",
	"PROJECTS",
	"OFFERS",
	"EXPRIENCE"
	];

	var ini_arr1 = [];								// 'ini_arr1' holds index of keywrds


	var i=0;
	for(i=0;i<ini_arr.length;i++)
	{
		ini_arr1.push(str.indexOf(ini_arr[i]));			// adding index
	}

	res.write('-------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>Show All keywords - <br><br><br>');
	for(i=0;i<ini_arr.length;i++)
	{
		res.write(ini_arr[i]+" : "+ini_arr1[i]);			// show
		res.write('<br>');
	}


	var arr=[];										// got keywords array 'arr'
	for(i=0;i<ini_arr.length;i++)
	{
		if(ini_arr1[i]!=-1)
		{
			arr.push(ini_arr[i]);
		}
	}

	var arr1=[];									// index of got keywords 'arr1'
	for(i=0;i<arr.length;i++)
	{
		arr1.push(str.indexOf(arr[i]));
	}


	res.write('------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>');
	res.write('Got keywords -');
	res.write('<br><br><br>');
	for(i=0;i<arr.length;i++)
	{
		res.write(arr[i]+" : "+arr1[i]);			// show
		res.write('<br>');
	}



	var lasti=0;									// search for last index
	for(i=0;i<arr1.length;i++)
	{
		if(arr1[i]>lasti)
		{
			lasti=arr1[i];
		}
	}



	var arr2 = [];									// 'arr2' holds segment data

													// creating segments
	for(i=0;i<arr.length;i++)
	{
	

		var nxt;									// nxt for holding jst next index 
		var max=str.length;
		var cind = arr1[i];
		var j=0;
		for(j=0;j<arr.length;j++)
		{
			if(i!=j)
			{
				var min = arr1[j]-cind;
				if(min>0)
				{
					if(min<max)
					{
						max=min;
						nxt=arr1[j];
					}
				}
			}
		}


		var tmp ="";
		var z = arr[i].length;

		if(arr1[i]!=lasti)									// filling arr2 (segments)
		{
		tmp = str.slice(arr1[i]+z,nxt);
		arr2.push(tmp);
		}
		else
		{
		tmp = str.slice(arr1[i]+z,str.length);
		arr2.push(tmp);
		}
	}

	res.write('------------------------------------------------------------------------------------------------------------------------');
	res.write('<br><br>');
	res.write('Segments--------');
	res.write('<br><br><br>');
	for(i=0;i<arr.length;i++)
	{
		res.write(i+") "+arr[i]+" : <br>");				// showing segments sequentially
		res.write(arr2[i]);
		res.write('<br><br><br>');
	}

	res.end();

})														// end of segments 4th page

	



														//listen to port

var server = app.listen(8080,function(){
	var port = server.address().port

	console.log("Listening at http://localhost:%s",port)
})
