// обработка сабмита
const form = document.getElementById("search");
form.onsubmit = (e) => {
    clear()

    const payload = e.target.value
    const search = payload.value;
    if(!search)return false

    const list = document.getElementById("list");
    const ul = list.children

    for(const li of ul ){
        domRangeHighlight(li, search)
    }

    return false;
}

// крафтим подсветку для искомых подстрок
function domRangeHighlight(node, search) {
    const root = node.firstChild;
    const content = root.nodeValue.toLowerCase();

    const text = search === ' ' ? search : search.toLowerCase().trim();
    const ranges = []
    for(const index of getListIdx(content, text)){
        const rng = document.createRange();
        rng.setStart(root, index);
        rng.setEnd(root, index + text.length);
        ranges.push(rng)

    }
    for(let i = ranges.length-1; i >= 0; i--){
        const highlightDiv = document.createElement('span');
        highlightDiv.style.backgroundColor = 'yellow';
        highlightDiv.className = 'highlight'
        ranges[i].surroundContents(highlightDiv);
    }
}

// получить массив индексов вхождений искомой подстроки
function getListIdx(str, substr) {
    let listIdx = []
    let lastIndex = -1
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex)
    }
    return listIdx
}

// удаление подсветки по предыдущему поиску
function clear(){
    document.querySelectorAll('li').forEach(el => {
        const spans = el.querySelectorAll('.highlight')
        for(const span of spans){
            el.innerText = el.getAttribute('data-value')
        }
    })
}