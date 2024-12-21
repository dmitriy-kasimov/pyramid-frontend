
const Processes =  [
  [10, 2, 3, 5],
  [5, 4],
  [0],
  [4],
  [15, 3],
];



const ThreadTimeEval = (processNumber) => {
    const currentRow = Processes[processNumber]
    let totalTime = currentRow[0]

    if(currentRow.length === 1)
        return totalTime

    const dependencyTimes = []
    for(let i = 1; i < currentRow.length; i++){
        dependencyTimes.push(ThreadTimeEval(currentRow[i] - 1))
    }

    totalTime += Math.max(...dependencyTimes)
    Processes[processNumber] = [totalTime]
    return totalTime
}

let max = Number.MIN_VALUE
for (let i = 0; i < Processes.length; i++)
{
    let time = ThreadTimeEval(i)
    if (time > max)
    {
        max = time;
    }
}

console.log(max)