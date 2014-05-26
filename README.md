Classical Chinese for Node.js
=============================

This is the beginning of a hopefully vast project that will make the content of Classical Chinese texts available within any Node.js app. I hope you will frequently check for updates and, if you have any ideas or want to contribute, will open issues and pull requests on the github repository.

The examples below assume we have required the module thusly:

    var classical = require('classical-chinese');

##Load the Texts

You can load all of the texts

    classical.loadAll();

Or just some of them

    classical.loadSome('laozi','libai','dufu');

These functions parse the texts and load them from a local JSON file. See the list at the bottom of currently available texts.

##Get Information from Texts
```javascript
classical.getTitles('zhuangzi', function (titles) {
	console.log(titles) //returns an array of all the chapter/poem titles in the text
})

classical.getText('zhuangzi', '逍遙游', function (result) {
	console.log(result) // returns an object: {title: '逍遙游', body: '...'}
})

classical.findIn('zhuangzi', '聖知之法', function (results) {
	console.log(results) // returns matches from all chapters in a text: [ { matchTitle: '胠篋', matchLine: '并其聖知之法而盜之' },{ matchTitle: '胠篋', matchLine: '并與其聖知之法' } ]

})

classical.searchAll('饿死', function (results) {
	console.log(results) // returns matches in all texts: { laozi: [ 'No matches.' ], libai: [ { matchTitle: '笑歌行（以下二首，苏轼云是伪作）', matchLine: '夷齐饿死终无成' } ], dufu: [ { matchTitle: '奉赠韦左丞丈二十二韵', matchLine: '纨袴不饿死' }, { matchTitle: '醉时歌（赠广文馆博士郑虔）', matchLine: '焉知饿死填沟壑' }, { matchTitle: '奉赠鲜于京兆二十韵（鲜于仲通，天宝末为京兆尹）', matchLine: '有儒愁饿死' } ], zhuangzi: [ 'No matches.' ] }	
})
```
##Currently available texts:

'laozi' - The Dao De Jing (aka Tao Te Qing). A warring states era text on philosophy and statecraft.    
'zhuangzi' - The Zhuangzi is another warring states era text, very rich and colorful in its language.    
'dufu' - The complete works of the Tang poet Du Fu.    
'libai' - Complete works of Tang poet Li Bai.    

###License
MIT
