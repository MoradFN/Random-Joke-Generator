const jokeContainer = document.getElementById("joke");

let url = "https://v2.jokeapi.dev/joke/Any?";

function getRandomJoke(number, search) {
  jokeContainer.innerHTML = "";

  fetch(`${url}&contains=${search}&amount=${number}`)
    .then((data) => data.json())
    .then((item) => {
      console.log(item);

      if (item.error) {
        throw new Error(`${item.message}`);
      } else {
        if (item.jokes) {
          item.jokes.forEach((e) => {
            if (e.type === "single") {
              newJoke = document.createElement("p");
              newJoke.textContent = e.joke;
              jokeContainer.appendChild(newJoke);
            } else {
              newJoke = document.createElement("p");
              newJoke.innerHTML = `${e.setup}<br>${e.delivery}`;
              jokeContainer.appendChild(newJoke);
            }
          });
        } else {
          newJoke = document.createElement("p");
          newJoke.innerHTML = item.joke
            ? `${item.joke}`
            : `${item.setup}<br>${item.delivery}`; //ternary
          jokeContainer.appendChild(newJoke);
        }
      }
    })

    .catch((error) => {
      console.log(error.message);
      document.getElementById(
        "joke"
      ).innerHTML = `<h1 id="errorTitle">ERROR IN TRYING TO LOAD JOKE</h1> <br> ${error.message} <p id="errorJoke">If the problem persists, just look in the mirror.</p>`;
    });
}

// } else if (item.error) {
//   throw new Error(`${message}`);
// }

// if (item.error) {
//   throw new Error((document.getElementById("joke").innerHTML = `${message}`));
// }
