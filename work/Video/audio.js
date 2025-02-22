const ffmpeg = require('ffmpeg');

try {
	var process = new ffmpeg('/path/to/your_movie.avi');
	process.then(function (video) {
		// Callback mode
		video.fnExtractSoundToMP3('/path/to/your_audio_file.mp3', function (error, file) {
			if (!error)
				console.log('Audio file: ' + file);
		});
	}, function (err) {
		console.log('Error: ' + err);
	});
} catch (e) {
	console.log(e.code);
	console.log(e.msg);
}