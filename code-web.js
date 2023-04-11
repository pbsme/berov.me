import $ from "jquery";

function ObjCarousel(id) {
  const $images = $(".carousel[data-id='" + id + "'] img");
  const max = $images.length - 1;
  let prev = 0;
  let next = 1;

  function setrow() {
    const $w = $(".work.w" + id);
    const row = id;
    $($w).css("grid-row", row);
  }
  function remove() {
    $($images[prev]).removeClass("carImgPrev");
    $($images[next]).removeClass("carImgNext");
  }
  function add() {
    $($images[prev]).addClass("carImgPrev");
    $($images[next]).addClass("carImgNext");
  }
  function count() {
    if ((prev + 1) > max) { prev = 0; }
      else { prev++; }
    if ((next + 1) > max) { next = 0; }
      else { next++; }
  }

  this.update = () => {
    remove();
    count();
    add();
  }

  setrow();
  this.update();
}

function scrollUp() {
  $("html").scrollTop(0, 0);
}

function MenuItem(page, url) {
  this.id = "a[data-url='" + url + "']";
  this.select = () => {
    event.preventDefault();
    const $idSection = $(page);
    const idPosition = $idSection.offset().top;
    if ($idSection.hasClass("animate")) {
      $idSection.removeClass("animate");
    }
    setTimeout((id) => {
      $(id).addClass("animate");
    }, 10, $idSection);
    $("html").scrollTop(idPosition - 80, 0);
  }
}

const caroW1 = new ObjCarousel(1);
const caroW2 = new ObjCarousel(2);
const caroW3 = new ObjCarousel(3);
const caroW4 = new ObjCarousel(4);

let caroAuto = setInterval(() => {
  caroW1.update();
  caroW2.update();
  caroW3.update();
  caroW4.update();
}, 3000);

const menuContact = new MenuItem(".summaryWrap", "contact");

$(menuContact.id).click(menuContact.select);
$(".goUp").click(scrollUp);