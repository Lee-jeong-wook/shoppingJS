const $plus = document.querySelectorAll('.plus');
const $minus = document.querySelectorAll('.minus');
const $deleteBtn = document.querySelectorAll('.delete');

function handleButtonClick(element, action, amount) {
    const $li = element.parentElement.parentElement;
    const $name = $li.querySelector('.name');
    const name = $name.textContent;
    const req = {
        name: name,
        type: action,
        amount: amount
    };

    fetch('/basket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    .then((res) => res.json())
    .then((res) => {

    })
    .catch((err) => {
        console.error(new Error(`${err} 에러 발생`));
    });
}

$plus.forEach((element) => {
    element.addEventListener('click', () => {
        handleButtonClick(element, 'handle', 1);
    });
});

$minus.forEach((element) => {
    element.addEventListener('click', () => {
        handleButtonClick(element, 'handle', -1);
    });
});

$deleteBtn.forEach((element) => {
    element.addEventListener('click', () => {
        handleButtonClick(element, 'delete', 0);
    });
});
