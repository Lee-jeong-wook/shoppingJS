const $basketBtn = document.querySelector('.basketBtn');
const $name = document.querySelector('.name');
const name =$name.textContent;
$basketBtn.addEventListener('click', () => {
    req = {
        name : name
    }
    fetch('/product', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res)=>res.json()).then((res)=>{
        if(res.success){
            location.href = '/basket';
        }
    })
    .catch((err)=>{
        console.error(new Error(`${err}에러 발생`));
    })
})