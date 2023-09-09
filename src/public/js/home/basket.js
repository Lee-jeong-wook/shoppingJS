const $plus = document.querySelectorAll('.plus');
const $minus = document.querySelectorAll('.minus');
const $deleteBtn = document.querySelectorAll('.delete');

$plus.forEach(element => {
    element.addEventListener('click', () => {
        const $li = element.parentElement.parentElement;
        const $name= $li.querySelector('.name');
        console.log($li);
        console.log($name);
        const name = $name.textContent;
        req = {
            name : name,
            amount : 1,
            type: 'handle'
        }
        fetch('/basket', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(req)
        }).then((res)=>res.json()).then((res)=>{
            if(res.success){
                // location.href = '/basket';
            }
        })
        .catch((err)=>{
            console.error(new Error(`${err}에러 발생`));
        })
    })
});
$minus.forEach(element => {
    element.addEventListener('click', () => {
        const $li = element.parentElement.parentElement;
        const $name= $li.querySelector('.name');
        const name = $name.textContent;
        req = {
            name : name,
            amount : -1,
            type: 'handle'
        }
        fetch('/basket', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(req)
        })
    })
});
$deleteBtn.forEach(element => {
    element.addEventListener('click', () => {
        const $li = element.parentElement.parentElement;
        const $name= $li.querySelector('.name');
        console.log($li);
        console.log($name);
        const name = $name.textContent;
        req = {
            name : name,
            type: 'delete'
        }
        fetch('/basket', {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(req)
        }).then((res)=>res.json()).then((res)=>{
            if(res.success){
                // location.href = '/basket';
            }
        })
        .catch((err)=>{
            console.error(new Error(`${err}에러 발생`));
        })
    })
});