const bttn = document.querySelector(".btn");
const videoContainer = document.querySelector("#videoContainer");
const search = document.querySelector(".search-bar");
// const next = document.querySelector(".nextBttn");
// const pgNumber = document.querySelector(".pgNumber");

const createElements = (element) => {
  const div = document.createElement("div");
  div.classList.add("video");
  div.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${element.items.id}" target="_blank" class="linkTag">
          <img src="${element.items.snippet.thumbnails.medium.url}" class="thumbnail" alt="Thumbnail" />
          <div class="video-info">
            <div class="title">${element.items.snippet.localized.title}</div>
            <div class="channel">${element.items.snippet.channelTitle}</div>
            <div class="meta-info">
              <span class="views">${element.items.statistics.viewCount} views</span>
              <span class="likes">${element.items.statistics.likeCount} likes</span>
              <span class="comments">${element.items.statistics.commentCount} comments</span>
            </div>
          </div>
        </a>`;

  videoContainer.appendChild(div);
  const videoTitle = document.querySelector(".title");

  return {
    videoTitleElement: videoTitle.parentElement,
  };
};

const apiCall = async () => {
  try {
    const data = await fetch(
      `https://api.freeapi.app/api/v1/public/youtube/videos?page=1&limit=200`
    );
    const fetchedData = await data.json();
    return fetchedData;
  } catch (error) {
    throw new Error("Cannot fetched data");
  }
};

const searchElement = (key, titles) => {
  titles.map((element) => {
    const searchText =
      element.videoTitleElement.firstChild.innerText.toLowerCase();
    const isVisible = searchText.includes(key.target.value.toLowerCase());
    element.videoTitleElement
      .closest(".video")
      .classList.toggle("hide", !isVisible);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let myData = await apiCall();

  let titles = myData.data.data.map((element) => {
    const returnedObject = createElements(element);
    return returnedObject;
  });

  search.addEventListener("input", (key) => {
    searchElement(key, titles);
  });
});
