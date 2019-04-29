const func = (inMsg = 'hello new project') => {
	let msg = inMsg
	console.log(msg)
}

(function() {
	func()
}).call(this)
