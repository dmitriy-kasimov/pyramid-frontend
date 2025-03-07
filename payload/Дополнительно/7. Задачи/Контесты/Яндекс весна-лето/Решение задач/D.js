function isIntersect(a, b){
	const min = a.start < b.start ? a : b
	const max = (min === a ? b : a)

	return ( min.end <= max.start )	
}


function createMeeting(config){
	const {meetings, params} = config;
	const mapMeetings = new Map();
	for(const meeting of meetings){
		mapMeetings.set(meeting.person, {from: meeting.from, to: meeting.to})
	}

	const {from, to, persons} = params
	const reason = [];
	for(const person of persons){
		console.log(`current person ${person}`)
		console.log(`a: {start: ${from}, end: ${to}; b: {start: ${mapMeetings.get(person).from}, end: ${mapMeetings.get(person).to}}`)
		if(!isIntersect({start: from, end: to}, {start: mapMeetings.get(person).from, end: mapMeetings.get(person).to})){
			console.log('status: rejected')
			reason.push(person)
		}
console.log('status: ok')
			
	}
	if(!reason.length)
		return {status: 'CREATED', reason: null}
	return {status: 'REJECTED', reason: reason.sort()}
}

/*const config = {
	meetings: [{
		from: 1,
		to: 3,
		person: 'Петя'
	},{
		from: 2,
		to: 4,
		person: 'Вася'
	},{
		from: 4,
		to: 6,
		person: 'Костя'
	},{
		from: 2,
		to: 4,
		person: 'Женя'
	}],
	params: {
		from: 3,
		to: 5,
		persons: ["Петя", "Костя", "Женя"]
	}
}*/
	const config = {
	meetings: [{
		from: 1,
		to: 3,
		person: 'Петя'
	},{
		from: 2,
		to: 4,
		person: 'Вася'
	},{
		from: 4,
		to: 6,
		person: 'Костя'
	},{
		from: 2,
		to: 4,
		person: 'Женя'
	}],
	params: {
		from: 3,
		to: 4,
		persons: ["Петя", "Костя"]
	}
}
console.log(createMeeting(config))

/*
	const config = {
	meetings: [{
		from: 1,
		to: 3,
		person: 'Петя'
	},{
		from: 2,
		to: 4,
		person: 'Вася'
	},{
		from: 4,
		to: 6,
		person: 'Костя'
	},{
		from: 2,
		to: 4,
		person: 'Женя'
	}],
	params: {
		from: 3,
		to: 4,
		persons: ["Петя", "Костя"]
	}
}
*/