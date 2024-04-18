import video from "./videos.json" with { type: 'json' };

const vidContainer = document.querySelector(".videoContainer")
const vidTemp = document.querySelector("template")

const showPlaylist=(video)=>{

    if (!video){
        return false;
    }

    video.forEach(curVid => {
        let {id,duration, title , viewers, thumbnail,channel_name,howOld} = curVid;
        const videoClone = document.importNode(vidTemp.content,true )

        if(viewers > 1000 && viewers < 1000000){
            viewers = (viewers/1000) + "k" 
        }
        else if(viewers > 1000000){
            viewers = (viewers/1000000) +"m"
        }

        videoClone.querySelector(".vidTitle").textContent= title;
        videoClone.querySelector(".views").textContent= viewers + " views";
        videoClone.querySelector(".channel").textContent= channel_name;
        videoClone.querySelector(".old").textContent= howOld;
        videoClone.querySelector(".duration").textContent= duration;
        videoClone.querySelector(".thumbnail").src= thumbnail;
        vidContainer.appendChild(videoClone)
    });
    
}

showPlaylist(video)