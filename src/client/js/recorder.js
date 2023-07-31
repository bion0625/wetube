import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById('startBtn');
const video = document.getElementById('preview');

let stream;
let recorder;
let videoFile;

const handleDownload = async() => {
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    await ffmpeg.run(
        "-i", 
        "recording.webm", 
        "-ss", 
        "00:00:01", 
        "-frames:v", 
        "1", 
        "thumbnail.jpg"
        );

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    const thumbnail = ffmpeg.FS("readFile", "thumbnail.jpg");

    const mp4Blob = new Blob([mp4File.buffer], {type:"video/mp4"});
    const thumbnailBlob = new Blob([thumbnail.buffer], {type:"image/jpg"});

    const mp4Url = URL.createObjectURL(mp4Blob);
    const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

    const a = document.createElement("a");
    a.href = mp4Url;
    a.download = "MyRecording.mp4";
    document.body.appendChild(a);
    a.click();

    const thumbnailA = document.createElement("a");
    thumbnailA.href = thumbnailUrl;
    thumbnailA.download = "MyThumbnail.jpg";
    document.body.appendChild(thumbnailA);
    thumbnailA.click();

    ffmpeg.FS("unlink", "recording.webm");
    ffmpeg.FS("unlink", "output.mp4");
    ffmpeg.FS("unlink", "thumbnail.jpg");

    URL.revokeObjectURL(mp4Url);
    URL.revokeObjectURL(thumbnailUrl);
    URL.revokeObjectURL(videoFile);
    
    startBtn.innerText = "Start Recording";
    startBtn.removeEventListener("click", handleDownload);
    startBtn.addEventListener("click", handleStart);
    init();
}

const handleStop = () => {
    startBtn.innerText = "Downloading Recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
};

const handleStart = () => {
    startBtn.innerText = "Stop Recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);

    recorder = new MediaRecorder(stream, {mimeType: "video/webm" });
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    }
    recorder.start();
};

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
    video.srcObject = stream;
    video.play();
};

init();

startBtn.addEventListener("click", handleStart);