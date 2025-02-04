const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
                <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound('${
                      data[0].phonetics[0].audio
                    }')">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>${data[0].phonetic}</p>
                </div>
                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${
                      data[0].meanings[0].definitions[0].example ||
                      "No example available"
                    }
                </p>
            `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      result.innerHTML =
        "<p>Sorry, something went wrong. Please try again.</p>";
    });
});

function playSound(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}
