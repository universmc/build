const ffmpeg = require('ffmpeg');

try {
	var process = new ffmpeg('/path/to/your_movie.avi');
	process.then(function (video) {
		// Video metadata
		console.log(video.metadata);
		// FFmpeg configuration
		console.log(video.info_configuration);
	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}