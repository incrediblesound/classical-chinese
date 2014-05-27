Classical Chinese for Node.js
=============================

This is the beginning of a hopefully vast project that will make the content of Classical Chinese texts available within any Node.js app. I hope you will frequently check for updates and, if you have any ideas or want to contribute, will open issues and pull requests on the github repository.

<strong>0.0.4 Updates:</strong> Fix incomplete texts. Add "Art of War" by Sunzi. Add concordance function.
<strong>0.0.5</strong> Add mengzi. Change language in findIn return data.

The examples below assume we have required the module thusly:

    var classical = require('classical-chinese');

##Load the Texts

You can load all of the texts

    classical.loadAll();

Or just some of them

    classical.loadSome('laozi','libai','dufu');

These functions parse the texts and load them from a local JSON file. See the list at the bottom of currently available texts.

##Get Information from Texts

If you want a list of titles within a given text:
```javascript
classical.getTitles('zhuangzi', function (titles) {
	console.log(titles) //returns an array of all the chapter/poem titles in the text
})
```
If you want a specific chapter of a text, getText takes a book name, a chapter name and a callback:
```javascript
classical.getText('zhuangzi', '逍遙游', function (result) {
	console.log(result) // returns an object: {title: '逍遙游', body: '...'}
})
```
If you want to find specific characters in a text, use findIn with the book name and the characters you want to search for:
```javascript
classical.findIn('zhuangzi', '聖知之法', function (results) {
	console.log(results) // returns matches from all chapters in a text: [ { section: '胠篋', line: '并其聖知之法而盜之' },{ section: '胠篋', line: '并與其聖知之法' } ]

})
```
If you want to search the entire library from a string of characters use searchAll:
```javascript
classical.searchAll('饿死', function (results) {
	console.log(results) // returns matches in all texts: { laozi: [ 'No matches.' ], libai: [ { section: '笑歌行（以下二首，苏轼云是伪作）', line: '夷齐饿死终无成' } ], dufu: [ { section: '奉赠韦左丞丈二十二韵', line: '纨袴不饿死' }, { section: '醉时歌（赠广文馆博士郑虔）', line: '焉知饿死填沟壑' }, { section: '奉赠鲜于京兆二十韵（鲜于仲通，天宝末为京兆尹）', line: '有儒愁饿死' } ], zhuangzi: [ 'No matches.' ] }	
})
```
If you want a list of every character in a text and the lines where they occur, use the concordance function:
```javascript
classical.concordance('laozi', function (results) {
		console.log(results); // returns an object with a property for each character and an array of occurances: {'败': [ '为者败之', '故无败', '常于几成而败之', '则无败事' ],'嘘': [ '或嘘或吹' ],'吹': [ '或嘘或吹' ],'羸': [ '或强或羸' ],'隳': [ '或载或隳' ],}
	})
```
##Currently available texts:

'laozi' - The Dao De Jing (aka Tao Te Qing). A warring states era text on philosophy and statecraft.    
'zhuangzi' - The Zhuangzi is another warring states era text, very rich and colorful in its language.    
'dufu' - The complete works of the Tang poet Du Fu.    
'libai' - Complete works of Tang poet Li Bai.    
'lunyu' - The collected sayings of Confucius compliled during the warring states period.    
'sunzi' - The Art of War by the famous general Sunzi, early warring states (~500bc).
'mengzi' - Canonical confucian philosopher, late warring states.

###License
MIT
