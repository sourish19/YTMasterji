const bttn = document.querySelector(".btn");
const videoContainer = document.querySelector("#videoContainer");
const search = document.querySelector(".search-bar");


const createElements = (myData) => {
  const myMap = myData.data.data.map((element) => {
    const id = element.items.id;

    const video = document.createElement("div");
    const thumbnail = document.createElement("img");
    const videoInfo = document.createElement("div");
    const videoTitle = document.createElement("div");
    const channelName = document.createElement("div");
    const linkTag = document.createElement("a");

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
    linkTag.classList.add("linkTag");

    metaInfo.classList.add("meta-info");
    viewSpan.classList.add("views");
    likeSpan.classList.add("likes");
    commentSpan.classList.add("comments");
    dateSpan.classList.add("date");

    channelName.innerText = element.items.snippet.channelTitle;
    videoTitle.innerText = element.items.snippet.localized.title;
    thumbnail.setAttribute("alt", "thumbnail");
    thumbnail.setAttribute("src", element.items.snippet.thumbnails.medium.url);
    linkTag.setAttribute("href", `https://www.youtube.com/watch?v=${id}`);
    linkTag.setAttribute("target", "_blank");

    viewSpan.innerText = `${element.items.statistics.viewCount} views`;
    likeSpan.innerText = `${element.items.statistics.likeCount} likes`;
    commentSpan.innerText = `${element.items.statistics.commentCount} comments`;

    metaInfo.appendChild(viewSpan);
    metaInfo.appendChild(likeSpan);
    metaInfo.appendChild(commentSpan);

    videoInfo.appendChild(videoTitle);
    videoInfo.appendChild(channelName);
    videoInfo.appendChild(metaInfo);
    linkTag.appendChild(thumbnail);
    linkTag.appendChild(videoInfo);

    video.appendChild(linkTag);

    videoContainer.appendChild(video);

    return {
      videoTitleElement: videoTitle.parentElement,
    };
  });
  return myMap;
};

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

const searchElement = (key, titles) => {
  titles.map((element) => {
    const searchText =
      element.videoTitleElement.firstChild.innerText.toLowerCase();
    const isVisible = searchText.includes(key.target.value);
    element.videoTitleElement
      .closest(".video")
      .classList.toggle("hide", !isVisible);
  });
};

bttn.addEventListener("click", async () => {
  const myData = await apiCall();

  let titles = createElements(myData);

  search.addEventListener("input", (key) => {
    searchElement(key, titles);
  });
});
