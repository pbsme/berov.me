import $ from "jquery";

import pdfIconHoverPng from "./images/pdf-icon-hover.png";
import pdfIconPng from "./images/pdf-icon.png";

function ObjCarousel(id) {
  const $images = $(".carousel[data-id='" + id + "'] img");
  const max = $images.length - 1;
  let prev = 0;
  let next = 1;

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

  this.update();
}

const mailCopy = {
  id: ".btnHello",
  copy() {
    navigator.clipboard.writeText("hello@berov.me");
    $(".btnHello").text("скопировано!");
    setTimeout(() => {
      $(".btnHello").text("hello@berov.me");
    }, 3000);
  }
}

const pdfIcon = {
  id: ".summaryDlIcon",
  over() {
    $(".summaryDlIcon").attr("src", pdfIconHoverPng);
  },
  out() {
    $(".summaryDlIcon").attr("src", pdfIconPng);
  }
}

function HeroText(id) {
  const $id = $(id);

  function splitToWords(hero) {
    return $(hero).text()
      .trim().split(" ");
  }
  function wrapCharsWithSpan(word) {
    let chr = word.split("");
    $(chr).each((j, ch) => {
      chr[j] = "<span>" + ch + "</span>";
    });
    return chr.join("");
  }

  this.doWrap = () => {
    let idWords = splitToWords($id);
    $(idWords).each((i, word) => {
      idWords[i] = wrapCharsWithSpan(word);
    });
    $id.empty();
    $(idWords.join(" ")).appendTo($id);
  }
}

function MenuItem(page, url) {
  this.id = "a[data-url='" + url + "']";
  this.select = () => {
    event.preventDefault();
    const $id = $(page);
    const idPosition = $id.offset().top;
    if ($id.hasClass("animate")) {
      $id.removeClass("animate");
    }
    setTimeout((id) => {
      $(id).addClass("animate");
    }, 10, $id);
    $("html").scrollTop(idPosition - 100, 0);
  }
  this.hover = () => {
    const $id = $("a[data-url='" + url + "']");
    const left = Math.ceil($id.position().left);
    const width = Math.ceil($id.width());
    const $block = $(".navBlock");
    $block.css("left", left).css("width", width);
  }
}

function scrollUp() {
  $("html").scrollTop(0, 0);
}

const heroF = new HeroText(".frontendChars");
heroF.doWrap();

const caroW1 = new ObjCarousel(101);
const caroW2 = new ObjCarousel(201);
const caroW3 = new ObjCarousel(202);
const caroW4 = new ObjCarousel(203);
const caroW5 = new ObjCarousel(204);

let caroAuto = setInterval(() => {
  caroW1.update();
  caroW2.update();
  caroW3.update();
  caroW4.update();
  caroW5.update();
}, 3000);

const menuWorks = new MenuItem(".worksWrap", "works");
const menuContacts = new MenuItem(".summaryWrap", "contacts");

$(menuWorks.id)
  .click(menuWorks.select)
  .hover(menuWorks.hover);
$(menuContacts.id)
  .click(menuContacts.select)
  .hover(menuContacts.hover);

$(mailCopy.id).click(mailCopy.copy);

$(pdfIcon.id).hover(pdfIcon.over, pdfIcon.out);
$(".goUp").click(scrollUp);