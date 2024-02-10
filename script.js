let searchBtn = document.getElementById("search-btn");
let generateGif = () => {
  // Display loader until GIFs load
  let loader = document.querySelector(".loader");
  loader.style.display = "block";
  document.querySelector(".wrapper").style.display = "none";

  // Get search value (default => laugh)
  let q = document.getElementById("search-box").value;
  // We need 10 GIFs to be displayed in result
  let gifCount = 10;
  // API URL with your actual API key
  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=obUT8jD4YDqjaPDWDU5INiugssQcqWs6&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML = "";

  // Make a call to API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data);
      // All GIFs
      let gifsData = info.data;
      gifsData.forEach((gif) => {
        // Generate cards for every GIF
        let container = document.createElement("div");
        container.classList.add("container");
        let img = document.createElement("img");
        let copyBtn = document.createElement("Button");
        img.setAttribute("src", gif.images.downsized_medium.url);
        img.onload = () => {
          // If image has loaded correctly, reduce the count when each GIF loads
          gifCount--;
          if (gifCount == 0) {
            // If all GIFs have loaded, hide loader and display GIFs UI
            loader.style.display = "none";
            document.querySelector(".wrapper").style.display = "grid";
          }
        };
        container.append(img);
        let newBtn = document.createElement("button");
        newBtn.innerHTML = "Copy Link";

        container.append(newBtn);
        document.querySelector(".wrapper").append(container);
      });
    })
    .catch((error) => {
      console.error("Error fetching GIFs:", error);
      // Display an error message or handle the error as needed
    });
  // copy link button
  let copyBtn = document.createElement("button");
  copyBtn.innerText = "Copy Link";
  copyBtn.onclick = () => {
    //Append the obtained ID default URL
    let copyLink = "https://media4.giphy.com/media/${gif.id}/giphy.mp4";
    //copy text inside the text field
    navigator.clipboard
      .write(copyLink)
      .then(() => {
        alert("GIF copied to clipboard");
      })
      .catch(() => {
        //if navigator is not supported
        alert("GIF coppied to clipboard");
        //create temporary input
        let hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("type", "text");
        Document.body.appendChild(hiddenInput);
        hiddenInput.value = copyLink;
        //Select input
        hiddenInput.select();
        //Copy the value
        document.execCommand("copy");
        //remove input
        document.body.removeChild(hiddenInput);
      });
  };
};

// Add event listener to search button to trigger GIF generation
searchBtn.addEventListener("click", generateGif);
