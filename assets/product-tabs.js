function keepScrollPosition(target, distanceFromTop) {

  const distanceFromPageTop = target.offsetTop;
  const targetPos = distanceFromPageTop - distanceFromTop;


  window.scrollTo({
    top: targetPos
  });
}


function observerSpecs() {
  const targetNode = document.querySelector('.app__easy-specs-container');
  const config = { childList: true };


  const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        // Check if content was added to the div
        if (mutation.addedNodes.length > 0) {
          // Call your function here
          showSpecs();
        }
      }
    }
  };


  const observer = new MutationObserver(callback);


  observer.observe(targetNode, config);
}

function showDownloads() {
  const container = document.querySelector('.tigren-attachments');
  const hiddenElems = document.querySelectorAll('.js__product-files-hidden');

  if (container.childNodes.length > 0) {
    hiddenElems.forEach((elem) => {
      elem.classList.remove('js__product-files-hidden');
    });
  }
}

function showSpecs() {
  const container = document.querySelector('.easyspecs-table');
  const hiddenElems = document.querySelectorAll('.js__product-specs-hidden');

  if (container.childNodes.length > 0) {
    hiddenElems.forEach((elem) => {
      elem.classList.remove('js__product-specs-hidden');
    });
  }
}


function simulateScroll() {
  window.scrollBy(0, 1);
  window.scrollBy(0, -1);
}

function deselectOther(links, contents, className) {

  links.forEach(function(link) {
    link.classList.remove(className);
  });

  contents.forEach(function(link) {
    link.classList.remove(className);
  });
}


function doSelect(target, links, mobileLinks, contents) {
  const mobile = target.classList.contains('product-tab-link-m');
  const contentTarget = document.getElementById(target.dataset.targetid);
  const linkTarget = document.querySelector('.product-tab-link[data-targetid=' + target.dataset.targetid + ']');
  const linkTargetMobile = document.querySelector('.product-tab-link-m[data-targetid=' + target.dataset.targetid + ']');
  const currentPos = window.scrollY || window.pageYOffset;
  const className = mobile ? 'active-m' : 'active';
  const linksForDeselct = mobile ? mobileLinks : links;


  const distanceFromScreenTop = target.getBoundingClientRect().top;



  if(target.classList.contains('active-m')) {
    target.classList.remove('active-m');
    contentTarget.classList.remove('active-m');
    return;
  }

  deselectOther(linksForDeselct, contents, className);


  if(mobile){
    linkTargetMobile.classList.add(className);
  } else {
    linkTarget.classList.add(className);
  }

  contentTarget.classList.add(className);

  if (mobile) {
    keepScrollPosition(target, distanceFromScreenTop);
  }

  simulateScroll();
}

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.product-tab-link');
  const mobileLinks = document.querySelectorAll('.product-tab-link-m');
  const contents = document.querySelectorAll('.product-tab-content');
  const allLinks = Array.from(links).concat(Array.from(mobileLinks));
  showDownloads();
  observerSpecs();



  allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      doSelect(e.currentTarget, links, mobileLinks, contents);
    });
  });
});