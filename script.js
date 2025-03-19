const bttn = document.querySelector(".btn");
const videoContainer = document.querySelector("#videoContainer");
const search = document.querySelector(".search-bar");
console.log(search);


const apiCall = async () => {
  try {
    const data = await fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos"
    );
    const fetchedData = await data.json();
    return fetchedData;
  } catch (error) {
    alert("Cannot fetched data");
  }
};

const createElements = (myData) => {
  const myMap = myData.data.data.map((element) => {
    const video = document.createElement("div");
    const thumbnail = document.createElement("img");
    const videoInfo = document.createElement("div");
    const videoTitle = document.createElement("div");
    const channelName = document.createElement("div");

    const metaInfo = document.createElement("div");
    const viewSpan = document.createElement("span");
    const likeSpan = document.createElement("span");
    const commentSpan = document.createElement("span");
    const dateSpan = document.createElement("span");

    video.classList.add("video");
    thumbnail.classList.add("thumbnail");
    videoInfo.classList.add("video-info");
    videoTitle.classList.add("title");
    channelName.classList.add("channel");

    metaInfo.classList.add("meta-info");
    viewSpan.classList.add("views");
    likeSpan.classList.add("likes");
    commentSpan.classList.add("comments");
    dateSpan.classList.add("date");

    channelName.innerText = element.items.snippet.channelTitle;
    videoTitle.innerText = element.items.snippet.localized.title;
    thumbnail.setAttribute("alt", "thumbnail");
    thumbnail.setAttribute("src", element.items.snippet.thumbnails.medium.url);

    viewSpan.innerText = `${element.items.statistics.viewCount} views`;
    likeSpan.innerText = `${element.items.statistics.likeCount} likes`;
    commentSpan.innerText = `${element.items.statistics.commentCount} comments`;

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelName);
    video.appendChild(thumbnail);
    video.appendChild(videoInfo);

    metaInfo.appendChild(viewSpan);
    metaInfo.appendChild(likeSpan);
    metaInfo.appendChild(commentSpan);
    video.appendChild(metaInfo);

    videoContainer.appendChild(video);

    return { videoTitle: element.items.snippet.localized.title };
  });
  return myMap;
};

bttn.addEventListener("click", async () => {
  const myData = await apiCall();

  let titles = createElements(myData);
  console.log(titles);

  search.addEventListener("input", (i) => {
    console.log(i.target.value);
  });
});
