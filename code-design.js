import $ from "jquery";
import pdfIconHoverPng from "./images/pdf-icon-hover.png";
import pdfIconPng from "./images/pdf-icon.png";

const mailTooltip = {
  id: ".heroMail",
  show() {
    $(".heroMail").text("Копировать");
  },
  hide() {
    $(".heroMail").text("hello@berov.me");
  },
  copy() {
    navigator.clipboard.writeText("hello@berov.me");
    $(".heroMail").text("Скопировано!");
  }
}

const pdfIcon = {
  id: ".summaryUrl img",
  over() {
    $(".summaryUrl img").attr("src", pdfIconHoverPng);
  },
  out() {
    $(".summaryUrl img").attr("src", pdfIconPng);
  }
}

function MenuItem(page, url) {
  this.id = "a[data-url='" + url + "']";
  this.select = () => {
    event.preventDefault();
    const $id = $(page);
    const $idSection = $(page + " > .sectionContent");
    const idPosition = $id.offset().top;
    if ($idSection.hasClass("animate")) {
      $idSection.removeClass("animate");
    }
    setTimeout((id) => {
      $(id).addClass("animate");
    }, 10, $idSection);
    $("html").scrollTop(idPosition, 0);
  }
  this.hover = () => {
    const $id = $("a[data-url='" + url + "']");
    const left = Math.ceil($id.position().left);
    const width = Math.ceil($id.width());
    const $block = $(".navBlock");
    $block.css("left", left).css("width", width);
  }
}

function AddWorks(section) {
  this.id = ".addWorksButton[data-works='" + section + "']";
  this.show = () => {
    const $button = $(".addWorksButton[data-works='" + section + "']");
    const $section = $(".addWorks[data-works='" + section + "']");
    $button.hide();
    $section.addClass("animate");
    $section.css("display", "flex");
  }
}

function scrollUp() {
  $("html").scrollTop(0, 0);
}

const menuPrint = new MenuItem("#pagePrint", "print");
const menuWeb = new MenuItem("#pageWeb", "web");
const menuGraphic = new MenuItem("#pageGraphic", "graphic");
const menuContact = new MenuItem("#pageContact", "contact");

const addWorksPrint = new AddWorks("print");
const addWorksWeb = new AddWorks("web");

$(menuPrint.id)
  .click(menuPrint.select)
  .hover(menuPrint.hover);
$(menuWeb.id)
  .click(menuWeb.select)
  .hover(menuWeb.hover);
$(menuGraphic.id)
  .click(menuGraphic.select)
  .hover(menuGraphic.hover);
$(menuContact.id)
  .click(menuContact.select)
  .hover(menuContact.hover);

$(mailTooltip.id)
  .click(mailTooltip.copy)
  .hover(mailTooltip.show, mailTooltip.hide);

$(pdfIcon.id).hover(pdfIcon.over, pdfIcon.out);

$(addWorksPrint.id).click(addWorksPrint.show);
$(addWorksWeb.id).click(addWorksWeb.show);

$(".goUp").click(scrollUp);
$(".goUpText").click(scrollUp);