function forEach(collection, cb){
  for (var i = 0; i < collection.length; i++) {
    cb(collection[i])
  }
}

const textMap = {
  'Laozi': laozi,
  'Mengzi': mengzi,
  'Sunzi Bingfa': sunzi,
  'Lunyu': lunyu,
  'Zhuangzi': zhuangzi,
  'Li Bai': libai,
  'Du Fu': dufu
}
const makeSelect = (name) => `<a class="select" id="${name}-select">${name}</a>`
const makeHeader = (name) => `<h2 class="title-header">${name}</h2>`
const makeTitle = (text) => `<h3 class="chapter-title">${text}</h3>`
const makeParagraph = (text) => `<p class="text-block">${text}</p>`

const box = document.getElementsByClassName('right-box')[0]

const makeNode = (text) => {
  const node = document.createElement('div')
  node.innerHTML = text
  return node
}

const makeChapter = (chapter) => {
  let html = ''
  html += makeTitle(chapter.title)
  chapter.body.forEach(p => html += makeParagraph(p))
  return html
}

const makeResult = (result) => {
  let html = ''
  let textName = result.text ? `(${result.text})` : ''
  html += `<p>${textName} Chapter #${result.chapterNum+1}: ${result.chapter}<p>`
  html += `<p> Line #${result.lineNum+1}: ${result.line}<p><br>`
  return html
}

const clearNode = (node) => { while(node.firstChild){ node.removeChild(node.firstChild) } }

const displayText = (name, text) => {
  clearNode(box)
  box.appendChild(makeNode(makeHeader(name)))
  const contents = text.data
  let html = ''
  text.data.forEach(chapter => html += makeChapter(chapter))
  const textBodyNode = makeNode(html)
  box.appendChild(textBodyNode)
}


const displayResults = (results) => {
  clearNode(box)
  const searchVal = results.shift()
  box.appendChild(makeNode(makeHeader(`Search results for: ${searchVal}`)))
  let html = ''
  results.forEach(result => html += makeResult(result))
  const textBodyNode = makeNode(html)
  box.appendChild(textBodyNode)
}


window.state = {
  selectedName: null,
  selectedText: null
}

const leftBox = document.getElementsByClassName('left-box')[0]
leftBox.appendChild(makeNode('<h3>Select a Text</h3>'))
leftBox.appendChild(makeNode(makeSelect('Laozi')))
leftBox.appendChild(makeNode(makeSelect('Mengzi')))
leftBox.appendChild(makeNode(makeSelect('Sunzi Bingfa')))
leftBox.appendChild(makeNode(makeSelect('Lunyu')))
leftBox.appendChild(makeNode(makeSelect('Zhuangzi')))
leftBox.appendChild(makeNode(makeSelect('Li Bai')))
leftBox.appendChild(makeNode(makeSelect('Du Fu')))

const selects = document.getElementsByClassName('select')
forEach(selects, sel => {
  sel.onclick = function(e) {
    const id = e.target.id
    const name = id.split('-')[0]
    const text = textMap[name]
    window.state.selectedText = text
    window.state.selectedName = name
    displayText(name, text)
  }
})

const searchBtn = document.getElementById('search-button')
const searchAllBtn = document.getElementById('search-all-button')
const input = document.getElementById('search-field')
searchBtn.onclick = (e) => {
  const searchVal = input.value
  if(!window.state.selectedName){
    alert('You must select a text or click "search all".')
  } else {
    const results = [searchVal]
    const regex = new RegExp(searchVal)
    window.state.selectedText.data.forEach((chapter, chpI) => {
      searchText(results, regex, chapter, chpI)
    })
    displayResults(results)
  }
}

searchAllBtn.onclick = (e) => {
  const searchVal = input.value
  const results = [searchVal]
  const regex = new RegExp(searchVal)
  Object.keys(textMap).forEach(key => {
    const text = textMap[key]
    text.data.forEach((chapter, chpI) => {
      searchText(results, regex, chapter, chpI, key)
    })
  })
  displayResults(results)
}

const searchText = (results, regex, chapter, chpI, text) => {
  chapter.body.forEach((line, linI) => {
    if(regex.test(line)){
      results.push({
        text: text || '',
        chapter: chapter.title,
        chapterNum: chpI,
        lineNum: linI,
        line: line
      })
    }
  })
}
