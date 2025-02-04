const hide = (elements) => {
   elements.forEach((element) => {
      element.classList.add("hidden");
      element.classList.remove("visible");
   });
}

const show = (element) => {
   element.classList.add("visible");
   element.classList.remove("hidden");   
}

export const createNavigator = (parentElement,detailComp) => {
   const pages = Array.from(parentElement.querySelectorAll(".page"));
   
   const render = () => {
      const url = new URL(document.location.href);
      const pageName = url.hash.split("+")[0].replace("#", ""); 
      const pageId = url.hash.split("+")[1]; 
      console.log(pageId,pageName)
      const selected = pages.filter((page) => page.id === pageName)[0] || pages[0];
      console.log(selected)
      hide(pages); 
      show(selected); 

      if (pageName === "Posto" && pageId) {
         console.log(pageId)
          detailComp.navigateToDetail(pageId); 
      }
   }
   window.addEventListener('popstate', render); 
   render();   
}