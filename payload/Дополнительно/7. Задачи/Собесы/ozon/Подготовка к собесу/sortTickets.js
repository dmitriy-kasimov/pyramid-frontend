/*

Вася живёт в Пятигорске, объявили мобилизацию. Вася решил не рисковать и съебал из Пятигорска в Краснодар, допустим.
В краснодаре чет екму очково стало, тупанул внатуре, к хохлам тем более близко, купил билет из краснодара в москву.
В москве камер много и мусора на каждом углу, нахуй москву, купил билет из москвы до калининграда.
В калининграде побыл, услышал про проект великой польши и про то как они закупабтся вооружениями наступательными
и от греха подальше решил всё таки свалить за бугор, в Астану через Челябинск.
Купил блиет из калининграда в челябинск. А в челябинске купил билет из из челябы в астану.
Получается вот в каком порядке он купил билеты:
const tickets = [
        {from: 'Пятигорск', to: 'Краснодар'},
        {from: 'Краснодар', to: 'Москва'},
        {from: 'Москва', to: 'Калининград'},
        {from: 'Калининград', to: 'Челябинск'},
        {from: 'Челябинск', to: 'Астана'},
    ]


Написать алгос, который отсортирует объекты в массие, если там всё перемешать
*/

const tickets = [
    {from: 'Челябинск', to: 'Астана'},
    {from: 'Краснодар', to: 'Москва'},
    {from: 'Калининград', to: 'Челябинск'},
    {from: 'Пятигорск', to: 'Краснодар'},
    {from: 'Москва', to: 'Калининград'},
]

// по памяти - никак не ограничены
// сложность должны быть не выше O(N)
const sortTickets = (tickets) => {
    const result= tickets.splice(0, 1);

    const mapFromTo = new Map(tickets.map(ticket => [ticket.from, ticket.to]))
    const mapToFrom = new Map(tickets.map(ticket => [ticket.to, ticket.from]))

    for(let i = 0; i < tickets.length; i++){
        if(mapToFrom.has(result[0].from)){
            result.unshift({from: mapToFrom.get(result[0].from),to: result[0].from})
        }
        if(mapFromTo.has(result[result.length-1].to)){
            result.push({from: result[result.length-1].to, to: mapFromTo.get(result[length-1].to)})
        }
    }

    return result;
}

console.log(sortTickets(tickets))