const bttn = document.querySelector(".btn");
const videoContainer = document.querySelector("#videoContainer");
const search = document.querySelector(".search-bar");
// const next = document.querySelector(".nextBttn");
// const pgNumber = document.querySelector(".pgNumber");

const createElements = (element) => {
  let { viewCount, likeCount, commentCount } = element.items.statistics;

  viewCount = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(viewCount);

  likeCount = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(likeCount);

  const div = document.createElement("div");
  div.classList.add("video");
  div.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${element.items.id}" target="_blank" class="linkTag">
          <img src="${element.items.snippet.thumbnails.medium.url}" class="thumbnail" alt="Thumbnail" />
          <div class="video-info">
            <div class="title">${element.items.snippet.localized.title}</div>
            <div class="channel">${element.items.snippet.channelTitle}</div>
            <div class="meta-info">
              <span class="views">${viewCount} views</span>
              <span class="likes">${likeCount} likes</span>
              <span class="comments">${commentCount} comments</span>
            </div>
          </div>
        </a>`;

  videoContainer.appendChild(div);
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
    const searchText = element.firstElementChild.innerText.toLowerCase();

    const isVisible = searchText.includes(key.toLowerCase());
    element.firstElementChild
      .closest(".video")
      .classList.toggle("hide", !isVisible);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const myData = await apiCall();

  const titles = myData.data.data.map((element) => {
    createElements(element);
  });

  videoTitle = document.querySelectorAll(".title");

  const arrayTitles = Array.from(videoTitle).map((element) => {
    return element.parentElement;
  });

  search.addEventListener("input", (key) => {
    searchElement(key.target.value, arrayTitles);
  });
});
