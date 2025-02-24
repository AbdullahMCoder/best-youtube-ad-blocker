
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f') {
      if(document.querySelector("input[name='search_query']") === document.activeElement){
        return
      }
      if(location.href.match('https://www.youtube.com/watch*')){
        e.preventDefault();
        e.stopImmediatePropagation(); 
        
        targetVideo = ''
        try{
            targetVideo = document.querySelector('#boobs').contentDocument.querySelector('#movie_player')
        }catch(error){
            return
        }
        
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            targetVideo.requestFullscreen().catch(console.error);
        }
    }
    }
  }, true);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        if(document.querySelector("input[name='search_query']") === document.activeElement){
            return
          }
        console.log('spaced')
        if(location.href.match('https://www.youtube.com/watch*')){
            e.preventDefault();
            e.stopImmediatePropagation(); 
            
            targetVideo = ''
            try{
                targetVideo = document.querySelector('#boobs').contentDocument.querySelector('video')
                if (targetVideo.paused) {
                    targetVideo.play();
                } else {
                    targetVideo.pause()
                }
            }catch(error){
                return
            }
    }
    }
  }, true);
async function main(){
    width = 1
    height = 1
    let oldUrl = '';
    while(true){      
        if(!location.href.match('https://www.youtube.com/shorts*')){
            try{
                document.querySelector('video').pause()
                console.log('pause 1')
            } catch(error){

            }
        }
            if(!location.href.match('https://www.youtube.com/watch*')){
                try{
                    document.querySelector('#boobs').contentDocument.querySelector('video').pause()
                    console.log('pause 2')
                }catch(error){

                }
            } else{
                console.log('not pause')
            }
            

            if (oldUrl!=location.href)
            {
                
                
                try{    
                    doc = document
                    if(document.querySelector('#boobs'))
                    {
                        doc = document.querySelector('#boobs').contentDocument
                    }
                }catch(error){
                    console.log(error)
                }
                

                if (location.href.match('https://www.youtube.com/watch*'))
                {
                    state = true
                    videoId = ''
                    try{
                        vid = await waitForElm('ytd-watch-flexy');
                        observer = new MutationObserver((mutations) => {
                        state = true
                        for (const mutation of mutations) {
                            if (mutation.type === 'attributes' && mutation.attributeName === 'video-id') {
                            videoId = vid.getAttribute('video-id');
                            console.log("Video ID (via observer):", videoId); 
                            state = false
                            observer.disconnect();
                            break;
                            }
                        }
                        });
                        observer.observe(vid, { attributes: true });


                        
                        doc = document
                        if(document.querySelector('#boobs'))
                        {
                            doc = document.querySelector('#boobs').contentDocument
                        }

                        while(state){
                            await new Promise(resolve => setTimeout(resolve, 100))
                        }

                        try{
                            element = document.querySelector('[id="primary-inner"]>[id="player"]')
                            element.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important;'
                        }catch(error)
                        {
                            console.log(error)
                        }

                        if(!document.querySelector('#boobs')){
                            const containerDiv = document.createElement('div');
                            Object.assign(containerDiv.style, {
                                position: 'relative',
                                width: '100%',
                                height: '0',
                                paddingBottom: '56.25%'
                            });
                            const iframe = Object.assign(document.createElement('iframe'), {
                                id: "boobs",
                                src: "https://www.youtube.com/embed/" + videoId + "?si=M8WkggqWcLh7-xB5&autoplay=1",
                                title: "YouTube video player",
                                frameborder: "0",
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                                referrerpolicy: "strict-origin-when-cross-origin",
                                allowfullscreen: true
                            });
                            Object.assign(iframe.style, {
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                            });
                            containerDiv.appendChild(iframe);
                            document.querySelector("#primary-inner").prepend(containerDiv);
                        } else{
                            const containerDiv = document.createElement('div');
                            Object.assign(containerDiv.style, {
                                position: 'relative',
                                width: '100%',
                                height: '0',
                                paddingBottom: '56.25%'
                            });
                            const iframe = Object.assign(document.createElement('iframe'), {
                                id: "boobs",
                                src: "https://www.youtube.com/embed/" + videoId + "?si=M8WkggqWcLh7-xB5&autoplay=1",
                                title: "YouTube video player",
                                frameborder: "0",
                                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
                                referrerpolicy: "strict-origin-when-cross-origin",
                                allowfullscreen: true
                            });
                            Object.assign(iframe.style, {
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '100%',
                                height: '100%',
                                border: 'none' //
                            });
                            containerDiv.appendChild(iframe);
                            document.querySelector("[id='boobs']").replaceWith(containerDiv)
                        }
                        console.log('height='+height+'width='+width)
                    }catch(error)
                    {
                        console.log(error)
                    }
                    oldUrl = location.href

            }
        }
        await new Promise(resolve => setTimeout(resolve, 100)); 
    }
}

main();
