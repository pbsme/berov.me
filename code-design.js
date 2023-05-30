import $ from "jquery";

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

function MenuItem(page, nav) {
  this.id = ".nav a[data-nav='" + nav + "']";
  this.idf = ".footer-nav a[data-nav='" + nav + "']";
  this.select = () => {
    event.preventDefault();
    const $id = $(page);
    const idPosition = $id.offset().top;
    $("html").scrollTop(idPosition, 0);
  }
  this.hover = () => {
    const $id = $(".nav a[data-nav='" + nav + "']");
    const left = Math.ceil($id.position().left);
    const width = Math.ceil($id.width());
    const $block = $(".nav-block");
    $block.css("left", left).css("width", width);
  }
}

function MoreWorks(section) {
  this.idShow = ".work-btn-showmore[data-works='" + section + "']";
  this.idClose = ".more-back-image[data-more='" + section + "']";
  this.show = () => {
    const $section = $(".more-works[data-more='" + section + "']");
    $("body").css("overflow-y", "hidden");
    $section.show();
  }
  this.close = () => {
    const $section = $(".more-works[data-more='" + section + "']");
    $("body").css("overflow-y", "initial");
    $section.hide();
  }
}

function CreateObserver(id, handler) {
  const getIDs = $(id).get();
  const options = { rootMargin: "0px 0px -100px 0px" }
  const newObserver = new IntersectionObserver(load, options);
  getIDs.forEach((img) => {
    newObserver.observe(img);
  });

  function load(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const t = entry.target;
        handler(t);
        newObserver.unobserve(t);
      }
    });
  }
}

function scrollUp() {
  $("html").scrollTop(0, 0);
}

const LazyImageLoad = new CreateObserver(".lazy", (t) => {
  const src = t.dataset.src;
  $(t).attr("src", src);
});

const ObsAnimFromLeft = new CreateObserver("[data-anim='fromleft']", (t) => {
  const anim = t.dataset.anim;
  $(t).css("visibility", "visible").addClass("animate-from-left");
});

const ObsAnimFromRight = new CreateObserver("[data-anim='fromright']", (t) => {
  const anim = t.dataset.anim;
  $(t).css("visibility", "visible").addClass("animate-from-right");
});

const ObsAnimFromDown = new CreateObserver("[data-anim='fromdown']", (t) => {
  const anim = t.dataset.anim;
  $(t).css("visibility", "visible").addClass("animate-from-down");
});

const heroD = new HeroText(".me-chars");

heroD.doWrap();

const menuAbout = new MenuItem("#nav-about", "about");
const menuWorks = new MenuItem("#nav-works", "works");
const menuResume = new MenuItem("#nav-resume", "resume");

const moreWorksWebsites = new MoreWorks("websites");
const moreWorksPrints = new MoreWorks("prints");
const moreWorksBanners = new MoreWorks("banners");
const moreWorksGraphics = new MoreWorks("graphics");

$(menuAbout.id)
  .click(menuAbout.select)
  .hover(menuAbout.hover);
$(menuWorks.id)
  .click(menuWorks.select)
  .hover(menuWorks.hover);
$(menuResume.id)
  .click(menuResume.select)
  .hover(menuResume.hover);

$(menuAbout.idf).click(menuAbout.select);
$(menuWorks.idf).click(menuWorks.select);
$(menuResume.idf).click(menuResume.select);

$(moreWorksWebsites.idShow).click(moreWorksWebsites.show);
$(moreWorksPrints.idShow).click(moreWorksPrints.show);
$(moreWorksBanners.idShow).click(moreWorksBanners.show);
$(moreWorksGraphics.idShow).click(moreWorksGraphics.show);

$(moreWorksWebsites.idClose).click(moreWorksWebsites.close);
$(moreWorksPrints.idClose).click(moreWorksPrints.close);
$(moreWorksBanners.idClose).click(moreWorksBanners.close);
$(moreWorksGraphics.idClose).click(moreWorksGraphics.close);

$(".top-image").click(scrollUp);