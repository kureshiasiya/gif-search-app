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
        document.querySelector(".wrapper").append(container);

        let newBtn = document.createElement("button");
        newBtn.innerHTML = "Copy Link";

        // Add click event listener to the button
        newBtn.addEventListener("click", function () {
          // Get the link text
          let link = "htexts"; // Replace this with your actual link

          // Copy link to clipboard
          navigator.clipboard
            .writeText(link)
            .then(() => {
              // If successful, provide feedback
              alert("Link copied to clipboard: " + link);
            })
            .catch((err) => {
              // If an error occurs, log it to console
              console.error("Failed to copy: ", err);
            });
        });

        // Append the button to the container (assuming "container" is defined somewhere)
        container.appendChild(newBtn);
      });
    })
    .catch((error) => {
      console.error("Error fetching GIFs:", error);
      // Display an error message or handle the error as needed
    });
};

// Add event listener to search button to trigger GIF generation
searchBtn.addEventListener("click", generateGif);
