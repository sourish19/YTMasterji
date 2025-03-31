const bttn = document.querySelector(".btn");
const videoContainer = document.querySelector("#videoContainer");
const search = document.querySelector(".search-bar");
const next = document.querySelector(".nextBttn");
const prev = document.querySelector(".prevBttn");
const pgNumber = document.querySelector(".pgNumber");
const noElement = document.querySelector("#no-element");
const noElementContainer = document.querySelector("#no-element-container");

let totalItems = null;

const createElements = (element) => {
  let { viewCount, likeCount, commentCount } = element.items.statistics;

  viewCount = new Intl.NumberFormat("en", {
    // convert 1000 - 1K
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

const apiCall = async (pgNumber) => {
  try {
    const data = await fetch(
      `https://api.freeapi.app/api/v1/public/youtube/videos?page=${pgNumber}&limit=20`
    );
    const fetchedData = await data.json();
    // totalItems = fetchedData.data.totalItems;
    // console.log(totalItems);

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
    console.log(isVisible);
    let hide = document.querySelectorAll(".hide");
    hide = Array.from(hide).length;
    if (hide == 20) {
      noElement.classList.toggle("active");
    } else {
      noElement.classList.toggle("hide");
    }
    console.log(hide);
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  let myData = await apiCall(pgNumber.innerText);
  totalItems = myData.data.totalItems;

  myData.data.data.map((element) => {
    // create yt cards
    createElements(element);
  });
});

search.addEventListener("input", (key) => {
  const videoTitle = document.querySelectorAll(".title"); // get the title
  const arrayTitles = Array.from(videoTitle).map((element) => {
    // loop over to get parent element
    return element.parentElement;
  });
  searchElement(key.target.value, arrayTitles);
});

next.addEventListener("click", async () => {
  const flag = Number(pgNumber.textContent);
  if (flag == Math.ceil(totalItems / 20)) {
    pgNumber.textContent = 1;
  } else {
    pgNumber.textContent = Number(pgNumber.textContent) + 1;
  }
  // change video based on pagination
  const myData = await apiCall(pgNumber.innerText);
  videoContainer.innerHTML = "";

  myData.data.data.map((element) => {
    // create yt cards
    createElements(element);
  });
});

prev.addEventListener("click", async () => {
  const flag = Number(pgNumber.textContent);
  if (flag == 1) {
    pgNumber.textContent = Math.ceil(totalItems / 20);
  } else {
    pgNumber.textContent = Number(pgNumber.textContent) - 1;
  }
  // change video based on pagination
  const myData = await apiCall(pgNumber.innerText);
  videoContainer.innerHTML = "";

  myData.data.data.map((element) => {
    // create yt cards
    createElements(element);
  });
});
