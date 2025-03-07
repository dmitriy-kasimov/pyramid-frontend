/*
	Реализация поиска в ширину на неориентированном графе
*/

class UndirectedGraph{
    vertexes = []
    constructor(vertexes){
        this.vertexes = vertexes
    }

    queue = []
    visited= []
    pathExists(from, to){
        if(this.vertexes[from].includes(to))
            return true

        const neighbors = this.vertexes[from]
        this.queue.push(...neighbors)
        this.visited.push(from)

        while(this.queue.length){
            const current = this.queue.shift()
            this.visited.push(current)

            if(this.vertexes[current].includes(to))
                return true

            this.queue.push(...this.vertexes[current].filter(item => !this.visited.includes(item)))
        }
        return false
    }
}

const vertexes = {
    A: ['B', 'C', 'D'],
    B: ['A', 'F', 'E'],
    C: ['A', 'G'],
    D: ['A', 'H', 'K'],
    E: ['B'],
    F: ['B'],
    G: ['C'],
    H: ['D'],
    K: ['D'],
}

const graph = new UndirectedGraph(vertexes)
const result = graph.pathExists('A', 'G')
console.log(result)