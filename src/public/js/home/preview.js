const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');


const imagePreview = () => {
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

fileInput.addEventListener('change', imagePreview);