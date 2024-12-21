
const isFabricated = (measurementsResult) => {
    let max = -1;
    for(const measurement of measurementsResult) {
        const measurementNotBroken = measurement !== -1

        if ( measurementNotBroken && max === -1)
            max = measurement;

        if(measurement > max)
            max = measurement

        if(measurementNotBroken && measurement < max)
            return true

    }
    return false;
}

const getRecoveredMeasurementsResult = (measurementsResult) => {
    for(let i = 0; i < measurementsResult.length; i++) {
        if(measurementsResult[i] === -1){
            measurementsResult[i] = i === 0 ? 1 : measurementsResult[i-1]+1
        }
    }
    return measurementsResult
}

const getMeasurementsOnDays = (measurementsResult) => {
    const result=[]

    for(let i = 0; i< measurementsResult.length; i++){
        result.push(i === 0 ? measurementsResult[i] : measurementsResult[i]-measurementsResult[i-1])
    }

    return result
}

const main = (countDays, measurementsResult) => {
    if( isFabricated(measurementsResult) ) return "NO"

    const recoveredMeasurementsResult = getRecoveredMeasurementsResult(measurementsResult)
    const measurementsOnDays= getMeasurementsOnDays(recoveredMeasurementsResult)

    if( measurementsOnDays.includes(0) ) return "NO"

    const result =
    `YES
${measurementsOnDays.join(' ')}`
    return result
}


console.log(main(5, [1, 3, -1, 10, -1]))
console.log(main(5, [1, 3, -1, 4, -1]))
console.log(main(3, [10, -1, 4]))