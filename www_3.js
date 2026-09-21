const http = require('http');
const dateET = require('./src/dateTimeET')
const url = require('url');
//moodul failitee haldamiseks
const path = require('path');
//moodul failide haldamiseks, ASYNC puhul on vaja seda toetavalt erilisemat moodulit
//const fs = require('fs')
const fs = require('fs').promises;
const pageHead = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Jaroslav Belkin, veevbiprogrammeerimine</title>\n</head>\n<body>\n';
const pageBody = '\t<h1>Jaroslav Belkin, veebiprogrammeerimine</h1>\n\t <p>See leht on loodud veebiprogrammeerimisekursusel <a href="https://www.tlu.ee">Tallinna أœlikoolis</a> ning ei sislda tأµsiseltvأµetavat sisu!</p>\n\t<p>Esialgu tutvusime lihtsalt HTML keelega, peatselt programmeerime.</p>\n\t<hr>';
const pageBanner = '<img src="/veebiprogrammeerimine_2026_TA.png" alt="">';
const pageFoot = '\n</body>\n</html>';

http.createServer(async function(req, res){
	//päring url-i
	console.log('Päring: ' + req.url);
	let currentURL = url.parse(req.url, true);
	console.log('Parsituna: ' + currentURL.pathname);
	
	//hakkame erinevaid lehti jaotama -> routes (maršruudid)
	
	if(currentURL.pathname === '/'){
	
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<p>' + 'Täna on ' + dateET.fullDate() + ', leht avati kell ' + dateET.fullTime() + '</p>');
		res.write('\n\t<ul>');
		res.write('\n\t\t<li><a href="/vanasonad">Tänane vanasõna</a></li>');
		res.write('\n\t</ul>');
		res.write(pageFoot);
		//res.write('Veeb läkski käima!');
		return res.end();
	}
	
	else if(currentURL.pathname === '/veebiprogrammeerimine_2026_TA.png'){
		//teeme pildi tegeliku asukoha programmile kättesaadavaks
		let picPath = path.join(__dirname, 'pic', currentURL.pathname);
		try {
			const data = await fs.readFile(picPath);
			res.writeHead(200, {"Content-type": "image/png"});
			res.end(data);
		} catch(err){
			res.writeHead(404, {"Content-type": "text/plain; charset=utf8"});
			return res.end('Pilti ei leitud!');
			}
	}
	
	else if(currentURL.pathname === '/vanasonad'){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write('\t<h1>Eesti vanasõnad</h1>\n\t<p>Siin näed tänase päeva vanasõna.</p>')
		res.write('\n\t<p><a href="/">Tagasi avalehele</a></p>');
		res.write(pageFoot);
		//res.write('Veeb läkski käima!');
		return res.end();
	}
	
	else {
		res.end('Viga 404, ei leia sellist lehte!');
	}
}).listen(5116);