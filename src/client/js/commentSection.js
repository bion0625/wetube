const videoContainer = document.getElementById('videoContainer');
const form = document.getElementById('commentForm');

const handleSubmit = (event) => {
    const textarea = form.querySelector('textarea');
    event.preventDefault();
    const text = textarea.value;
    const video = videoContainer.dataset.id;
};

if(form){
    form.addEventListener("submit", handleSubmit);
}