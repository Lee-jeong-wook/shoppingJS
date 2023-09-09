const $tag = document.getElementById('item-tag');
const $listWrap = document.querySelector('.item-contents');
const list = $listWrap.querySelectorAll('li');
//리스트를 변경하는 함수
const updateListVisibility = (selectedTag) => {
    list.forEach(element => {
        const hasSelectedTag = selectedTag === 'all' || element.classList.contains(selectedTag);
        element.classList.toggle('active', hasSelectedTag);
    });
};
//option 요소 변경 시에 보이는 리스트를 변경
$tag.addEventListener('change', () => {
    const selectedTag = $tag.value;
    updateListVisibility(selectedTag);
});
//첫 렌더링 시 모두 보이기
if($tag.value==='all'){
    list.forEach(element => {
        element.classList.add('active');
    });
}