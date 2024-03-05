class VideoUrl {
  #currentPageUrl;
  get currentPageUrl() {
    return this.#currentPageUrl;
  }
  constructor() {
    this.setPageUrl();
  }
  setPageUrl() {
    this.#currentPageUrl = window.location.href;
  }
  calculateCurrentSec(){
    let inSeconds=0;
    const currentTimeVal=document.querySelector(".ytp-time-current").innerHTML;
    const currentTimeArray= currentTimeVal.split(":");
    switch (currentTimeArray.length) {
      case 4:
        inSeconds=parseInt(currentTimeArray[0]*86,400)+parseInt(currentTimeArray[1]*3600)+parseInt(currentTimeArray[2]*60)+parseInt(currentTimeArray[3]);
        break;
      case 3:
        inSeconds=parseInt(currentTimeArray[0]*3600)+parseInt(currentTimeArray[1]*60)+parseInt(currentTimeArray[2]);
        break;
      case 2:
        inSeconds=parseInt(currentTimeArray[0]*60)+parseInt(currentTimeArray[1]);
    }
    return inSeconds;
  }
  insertInUrl() {
    this.#currentPageUrl=this.currentPageUrl.split("&")[0];
    if (this.#currentPageUrl.includes('youtube.com/watch?v')) {
      const partArray = this.#currentPageUrl.split('?');
      const newUrl = partArray[0] + '_popup?' + partArray[1] +"&start="+this.calculateCurrentSec()+"&autoplay=1";
      window.location.href = newUrl;
      this.#currentPageUrl = newUrl;
    } else if (this.#currentPageUrl.includes('www.youtube.com/embed/')) {
      const partArray = this.#currentPageUrl.split('/embed/');
      const newUrl = partArray[0] + '/watch?v=' + partArray[1]+"&t="+this.calculateCurrentSec();
      window.location.href = newUrl;
      this.#currentPageUrl = newUrl;
    } else {
      console.log('Url Error');
    }
  }
}

class InputListener {
  urlHandler;
  constructor() {
    this.urlHandler = new VideoUrl();
  }
  listenKeys() {
    window.addEventListener('keydown', (eventName) => {
      switch (eventName.key) {
        case 'b':
        case 'B':
          this.urlHandler.setPageUrl();
          this.urlHandler.insertInUrl();
          break;
      }
    });
  }
}

// const rightPlayerButtons = document.querySelector('.ytp-right-controls');
// const maximizeButton = document.createElement('img');
// maximizeButton.setAttribute(
//   'src',
//   chrome.runtime.getURL('assets/images/maximize.png')
// );
// maximizeButton.setAttribute('style', 'width:48px; height:48px;');
// rightPlayerButtons.append(maximizeButton);
// maximizeButton.addEventListener('click', () => {
//   listenInputs.urlHandler.setPageUrl();
//   listenInputs.urlHandler.insertInUrl();
// });


const listenInputs = new InputListener();
listenInputs.listenKeys();
