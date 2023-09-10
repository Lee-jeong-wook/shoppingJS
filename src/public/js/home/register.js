const submitBtn = document.getElementById('submit');
const name = document.getElementById('item-name');
const tag = document.getElementById('item-tag');
const img = document.getElementById('fileInput');
const price = document.getElementById('item-price');
const description = document.getElementById('item-description');

const register = (e) => {
    e.preventDefault();
    console.log(name.value, tag.value, price.value, description.value);
    if (!name.value) return alert('이름을 입력해주세요');
    if (!tag.value) return alert('분류를 입력해주세요');
    if (!img.value) return alert('이미지를 넣어주세요');
    if (!price.value) return alert('가격을 입력해주세요');
    if (!description.value) return alert('설명을 입력해주세요');
    console.log(img.value);
    req = {
        id: '',
        name: name.value,
        price: price.value,
        tag: tag.value,
        img: img.value,
        description: description.value,
        amount: 0,
    }
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res) => res.json()).then((res) => {
        location.href = '/';
        alert(res.cost)
    })
    .catch((err) => {
        console.error(new Error(`${err}에러 발생`));
    });
}

submitBtn.addEventListener('click', register);
