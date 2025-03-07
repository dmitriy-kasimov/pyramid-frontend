/*
	Реализация поиска в ширину на ориетированном графе
*/

class DirectedGraph{
    vertexes = []
    constructor(vertexes){
        this.vertexes = vertexes
    }

    queue = []
    visited = []
    pathExists(from, to){
        if(this.vertexes[from].includes(to))
            return true

        this.visited.push(from)
        this.queue.push(...this.vertexes[from])

        while(this.queue.length){
            const current = this.queue.shift()
            this.visited.push(current)

            if(this.vertexes[current].includes(to))
                return true

            this.queue.push(...this.vertexes[current].filter(item => !this.visited.includes(item)))
        }
        return false
    }

    getShortestPath(from ,to){

    }
}

const vertexes = {
    A: ['B', 'D'],
    B: ['A', 'F', 'E'],
    C: ['A'],
    D: ['H', 'K'],
    E: [],
    F: [],
    G: ['C'],
    H: [],
    K: [],

}

const graph = new DirectedGraph(vertexes)
const result = graph.pathExists('G', 'H')
console.log(result)