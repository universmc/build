const ffmpeg = require('ffmpeg');

try {
	var process = new ffmpeg('/path/to/your_movie.avi');
	process.then(function (video) {
		console.log('The video is ready to be processed');
	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}