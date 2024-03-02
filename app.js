class VideoUrl {
  #currentPageUrl;
  get currentPageUrl(){
    return this.#currentPageUrl;
  }
  constructor(){
    this.setPageUrl();
  }
  setPageUrl(){
    this.#currentPageUrl=window.location.href;
  }
  insertInUrl(){
    if(this.#currentPageUrl.includes("youtube.com/watch?v")){
      const partArray = this.#currentPageUrl.split("?"); 
      const newUrl=partArray[0]+"_popup?"+partArray[1];
      window.location.href=newUrl;
      this.#currentPageUrl=newUrl;
    }
    else if(this.#currentPageUrl.includes("www.youtube.com/embed/")){
      const partArray = this.#currentPageUrl.split("/embed/");
      const newUrl= partArray[0] + "/watch?v=" + partArray[1];
      window.location.href=newUrl;
      this.#currentPageUrl=newUrl;
    }
    else{
      console.log("Url Error");
    }
  }

}

class InputListener{
  urlHandler;
  constructor(){
    this.urlHandler = new VideoUrl;
  }
  listenKeys(){
    window.addEventListener("keydown",(eventName)=>{
      switch(eventName.key){
        case "b":
        case "B":
          this.urlHandler.setPageUrl();
          this.urlHandler.insertInUrl();
          break;
      }
    })
  }
}

const listenInputs= new InputListener;
listenInputs.listenKeys();





const rightPlayerButtons = document.querySelector(".ytp-right-controls");
const maximizeButton= document.createElement("img");
maximizeButton.setAttribute("src","assets/images/maximize.png");
maximizeButton.setAttribute("style","width:48px; height:48px;");
rightPlayerButtons.append(maximizeButton);
console.log(rightPlayerButtons);  

