const productsWrap = document.querySelector('.item-contents');
const products = productsWrap.querySelectorAll('li');

const product = (element) => {
    let nameSpan = element.querySelector('.name');
    let name = nameSpan.textContent;
    const req = {
        name: name,
        // name을 request 해서 name값을 바탕으로 정보를 찾음
    }
    fetch('/', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res)=>res.json()).then((res)=>{
        location.href = `/product?id=${res.id}`;
        //requst가 성공적이면 id값을 가져와서 특정 아이템 사이트로 옮김
    })
    .catch((err)=>{
        console.error(new Error(`${err}에러 발생`));
    })
}

products.forEach(element => {
    element.addEventListener('click', () => {
        product(element);
        //click하면 위에 함수가 실행됨
    });
});
