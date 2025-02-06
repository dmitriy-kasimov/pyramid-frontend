
const getResults = (time, countQueries, queries) => {
    const dateStart = [2011, 0, 1]
    const dateStartNextDay = [2011, 0, 2]

    time = new Date(...dateStart, ...time.split(':'))

    const map = new Map();
    for(const query of queries){

        const [_, team, another] = query.split('\"')
        const [timeQuery, server, status] = another.trimLeft().split(' ')

        const hhStart = time.getHours()
        const [hh, mm, ss] = timeQuery.split(':')
        const currentDay = hh < hhStart ? dateStartNextDay : dateStart
        const init = { timeQuery: new Date(...currentDay, ...[hh, mm, ss]), status }

        if(!map.has(team)){
            map.set(team, {[server]: {
                attempts: [ init ],
                scores: 0,
                penaltyTime: 0
            } })
        } else {
           map.get(team)[server] ?
                map.get(team)[server].attempts.push(init) :
                map.get(team)[server] = {attempts: [init], scores: 0, penaltyTime: 0};
        }
    }


    //const map = new Map()
    for(const [team, servers] of map){
        map.set(team, {scores: 0, penaltyTime: 0})

        for( const server of Object.keys(servers) ){
            for( const attempt of servers[server].attempts ){
                if(attempt.status === 'FORBIDDEN' || attempt.status === 'DENIED'){
                    servers[server].penaltyTime += 20;
                }
                else if( attempt.status === 'ACCESSED' ) {
                    servers[server].scores = 1;

                    const timeCurrent = +new Date(attempt.timeQuery).getTime()
                    const timeStart = +new Date(time).getTime()
                    servers[server].penaltyTime += Math.floor((timeCurrent - timeStart)/60/1000)
                    console.log(servers[server].penaltyTime)
                }
            }

            if( servers[server].scores === 0 )
                servers[server].penaltyTime = 0

            map.get(team).scores += servers[server].scores
            map.get(team).penaltyTime += servers[server].penaltyTime
        }
    }



    const tmp=[];
    for(const [team, result] of map){
        tmp.push({team, ...result})
        map.delete(team)
    }

    const result = tmp.sort((team1, team2) => {
        if(team1.scores > team2.scores) return -1
        else if(team1.scores < team2.scores) return 1

        if(team1.penaltyTime > team2.penaltyTime) return 1
        else if(team1.penaltyTime < team2.penaltyTime) return -1

        return team1.team - team2.team
    })

    for(const team of result){
        let k = 0;
        for(const anotherTeam of result){

            if(team.scores < anotherTeam.scores || (team.scores === anotherTeam.scores && team.penaltyTime > anotherTeam.penaltyTime)){
                ++k;
            }

        }
        team.k = k+1
    }


    let str = ``;
    for(const team of result){
        str += `${team.k} "${team.team}" ${team.scores} ${team.penaltyTime}\n`
    }
    return str
}

console.log( getResults(
    '15:00:00', 5,
    [
        "\"Avast\" 15:05:10 A FORBIDDEN",
        "\"Doctor Web\" 16:07:32 B ACCESSED",
        "\"Avast\" 17:09:01 C PING",
        "\"Windows Defender\" 18:15:59 C FORBIDDEN",
        "\"Doctor Web\" 19:21:00 A ACCESSED",
        "\"Windows Defender\" 20:23:59 B ACCESSED",
        "\"Avast\" 21:27:17 A DENIED",
        "\"Doctor Web\" 22:30:58 C DENIED",
        "\"Windows Defender\" 23:31:59 D ACCESSED",
        "\"Avast\" 00:40:15 A ACCESSED",
        "\"Doctor Web\" 01:47:22 C ACCESSED"
    ])
)

// console.log( getResults(
//     '15:29:59', 5,
//     [
//         "Avast 15:05:10 A FORBIDDEN",
//         "DoctorWeb 16:07:32 B ACCESSED",
//         "Avast 17:09:01 C PING",
//         "WindowsDefender 18:15:59 C FORBIDDEN",
//         "DoctorWeb 19:21:00 A ACCESSED",
//         "WindowsDefender 20:23:59 B ACCESSED",
//         "Avast 21:27:17 A DENIED",
//         "DoctorWeb 22:30:58 C DENIED",
//         "WindowsDefender 23:31:59 D ACCESSED",
//         "Avast 00:40:15 A ACCESSED",
//         "DoctorWeb 01:47:22 C ACCESSED"
//     ])
// )

// console.log( getResults(
//     '15:30:00', 5,
//     [
//         "Avast 15:05:10 A FORBIDDEN",
//         "DoctorWeb 16:07:32 B ACCESSED",
//         "Avast 17:09:01 C PING",
//         "WindowsDefender 18:15:16 C FORBIDDEN",
//         "DoctorWeb 19:21:00 A ACCESSED",
//         "WindowsDefender 20:23:45 B ACCESSED",
//         "Avast 21:27:17 A DENIED",
//         "DoctorWeb 22:30:58 C DENIED",
//         "WindowsDefender 23:31:19 D ACCESSED",
//         "Avast 00:40:15 A ACCESSED",
//         "DoctorWeb 01:47:22 C ACCESSED"
//     ])
// )



// console.log( getResults(
//     '15:00:00', 5,
//     [
//         "Avast 15:05:10 A FORBIDDEN",
//         "DoctorWeb 16:07:32 B ACCESSED",
//         "Avast 17:09:01 C PING",
//         "WindowsDefender 18:15:16 C FORBIDDEN",
//         "DoctorWeb 19:21:00 A ACCESSED",
//         "WindowsDefender 20:23:45 B ACCESSED",
//         "Avast 21:27:17 A DENIED",
//         "DoctorWeb 22:30:58 C DENIED",
//         "WindowsDefender 23:31:19 D ACCESSED",
//         "Avast 00:40:15 A ACCESSED",
//         "DoctorWeb 01:47:22 C ACCESSED"
//     ])
// )

/*

console.log( getResults(
    '00:00:00', 5,
    [
        "Avast 01:05:10 A FORBIDDEN",
        "DoctorWeb 02:07:32 B ACCESSED",
        "Avast 03:09:01 C PING",
        "WindowsDefender 04:15:16 C FORBIDDEN",
        "DoctorWeb 05:21:00 A ACCESSED",
        "WindowsDefender 06:23:45 B ACCESSED",
        "Avast 07:27:17 A DENIED",
        "DoctorWeb 08:30:58 C DENIED",
        "WindowsDefender 09:31:19 D ACCESSED",
        "Avast 10:40:15 A ACCESSED",
        "DoctorWeb 11:47:22 C ACCESSED"
    ])
)

*/


/*

console.log( getResults(
    '00:00:00', 5,
    [
        "Avast 00:05:10 A FORBIDDEN",
        "DoctorWeb 00:07:32 B ACCESSED",
        "Avast 00:09:01 C PING",
        "WindowsDefender 00:15:16 C FORBIDDEN",
        "DoctorWeb 00:21:00 A ACCESSED",
        "WindowsDefender 00:23:45 B ACCESSED",
        "Avast 00:27:17 A DENIED",
        "DoctorWeb 00:30:58 C DENIED",
        "WindowsDefender 00:31:19 D ACCESSED",
        "Avast 00:40:15 A ACCESSED",
        "DoctorWeb 00:47:22 C ACCESSED"
    ])
)

*/







console.log( getResults(
    '00:00:00', 5,
    ["\"VK\" 00:10:21 A FORBIDDEN",
    "\"T\" 00:00:23 A DENIED",
    "\"T\" 00:20:23 A ACCESSED",
    "\"VK\" 00:30:23 A ACCESSED",
    "\"YA\" 00:40:23 B ACCESSED"])
)

// console.log( getResults(
//     '01:00:00', 3,
//     [
//         "\"Team1\" 01:10:00 A FORBIDDEN",
//         "\"Team1\" 01:20:00 A ACCESSED",
//         "\"Team2\" 01:40:00 B ACCESSED",
//     ])
// )

// console.log( getResults(
//     '23:00:00', 2,
//     [
//         "\"Team1\" 23:59:59 A PONG",
//         "\"Team1\" 00:00:00 A ACCESSED",
//     ])
// )
