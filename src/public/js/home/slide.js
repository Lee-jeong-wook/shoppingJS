//슬라이드 콘텐츠
const slide = document.querySelector('.slide');
const slide_contents = slide.querySelectorAll('li');
//슬라이드 밑 표시 버튼
//ul
const slide_mark = document.querySelector('.slide_mark');
//li
let slide_mark_contents;

class Slide {
  constructor(slide_state, slide_contents, slide_mark, slide_mark_contents) {
    this.slide_state = slide_state;
    //현재 슬라이드가 움직이는가 판단 변수
    this.slide_contents = slide_contents;
    //슬라이드 안에 콘텐츠를 나타내는 변수
    this.interval = 0;
    //setInterval을 위하여 만든 변수
    this.pos = 0;
    //현재 슬라이드 위치를 나타낼 변수
    this.slide_mark = slide_mark;
    this.slide_mark_contents = slide_mark_contents;

    this.startSlide();

    this.addButtonClickEvent();

  }
//처음 슬라이드 시작 함수
startSlide() {
  this.interval = setInterval(() => {
    this.pos++;
    this.pos = this.pos % this.slide_contents.length;
    this.slideNext(this.pos);
  }, 5000);
}
//다음 넘어가는 함수
  slideNext(pos) {
    if (pos !== 0) {
      this.slide_mark_contents[pos].classList.add('slide_mark_active');
      this.slide_mark_contents[pos - 1].classList.remove('slide_mark_active');
      this.slide_contents[pos].classList.add('active');
      this.slide_contents[pos - 1].classList.remove('active');
      this.slide_contents[pos].style.marginLeft = (-1310) + 'px';
    } else if (pos === 0) {
      this.slide_mark_contents[pos].classList.add('slide_mark_active');
      this.slide_mark_contents[this.slide_contents.length - 1].classList.remove('slide_mark_active');
      this.slide_contents[pos].classList.add('active');
      this.slide_contents[this.slide_contents.length - 1].classList.remove('active');
    }
  }

  addButtonClickEvent() {
    this.slide_mark_contents.forEach((element, index) => {
      element.addEventListener('click', () => {
        this.buttonClick(index);
      });
    });
  }

  buttonClick(index) {
    this.slide_mark_contents[this.pos].classList.remove('slide_mark_active');
    this.slide_contents[this.pos].classList.remove('active');
    console.log(this.pos)
    this.slide_mark_contents[index].classList.add('slide_mark_active');
    this.slide_contents[index].classList.add('active');
    this.slideNext(index);
    this.pos = index;
  }
}
//slide contents에 따라 slide_mark가 생성됨
const add_slide_mark = (slide_mark, slide_contents) => {
  for (let i = 0; i < slide_contents.length; i++) {
    if (i === 0) {
      slide_mark.innerHTML += '<li class="slide_mark_active">•</li>';
    } else {
      slide_mark.innerHTML += '<li>•</li>';
    }
  }
}

add_slide_mark(slide_mark,slide_contents);

slide_mark_contents = slide_mark.querySelectorAll('li');

let shopping_slide = new Slide(true, slide_contents, slide_mark, slide_mark_contents);
