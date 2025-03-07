//             1     1  2    2  1        1   1    2  1    2
//const str = "Hello my name is Vitaly! And what is your name?";
//                           0    1  2     3  4        5   6    7
const sorted_str = "name is Hello my Vitaliy! And what your";
const answer_str = "2 3 0 1 4! 5 6 1 7 0?";

// const str =
// `Привет, как у тебя дела?
// Да, вроде, хорошо, а у тебя?`

const str = 'Я всегда собаак! Всегда готов трахнуть 228 собаак!'




const pattern = /[а-яё\w#]+|^[.,!?]+/gi;
function getCompressedString(text){
    // Извлечь по паттерну все слова из text
    const words = text.toLowerCase().match(pattern)
    // Сформировать словарик [[слово, кол-во]]
    const map = new Map()
    for(const word of words){
        map.has(word) ?
            map.set(word, map.get(word)+1) :
            map.set(word, 1)
    }

    // Крафтим массив из словаря и сортируем массив по убыванию частоты встречаемости
    const sorted = [...map].sort((a,b)=> b[1]-a[1])
    map.clear()

    // Перегон отсортированных слов в отдельный массив
    const tmp = []
    for(const word of sorted){
        tmp.push(word[0])
    }
    sorted.length=0;
    console.log(tmp)

    let result = text.toLowerCase();
    for(let i = 0; i<tmp.length; i++)
        result = result.replace(new RegExp(tmp[i], "g"), `${i}`);

    return result
}

console.log(getCompressedString(str))