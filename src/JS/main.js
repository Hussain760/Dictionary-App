const word = document.querySelector("#word")
const btn = document.querySelector("#button-addon2")
const container = document.querySelector("ul")

btn.addEventListener("click", (e) => {
    e.preventDefault()
    container.innerHTML = ""
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
    .then(res => {
        if (res.status !== 200) {
                const element = document.createElement("li")
                element.className = "list-group-item list-group-item-secondary"
                element.innerHTML = "<strong>Message: </strong> Sorry Something went wrong Please try again"
                return container.appendChild(element)
            } else {
                return res.json()
            }
        })
        .then(data => {
            container.insertAdjacentHTML("beforeend", `
            <li class="list-group-item list-group-item-secondary">
            <strong>Word:</strong> ${data[0].word}
          </li>
          <li class="list-group-item list-group-item-secondary">
            <strong>Definition:</strong> ${data[0].meanings[0].definitions[0].definition}
          </li>
          ${
          data[0].meanings[0].definitions[0].example ?
            `<li class="list-group-item list-group-item-secondary">
            <strong>Example:</strong> ${data[0].meanings[0].definitions[0].example}
          </li>` : ""
          }
          <li
            class="d-flex align-items-center gap-3 flex-wrap list-group-item list-group-item-secondary"
          >
            <strong>Pronunciation:</strong>
            <audio controls="true" name="media">
              <source
                src=${data[0].phonetics[0].audio}
                type="audio/mpeg"
              />
            </audio>
          </li>
            `)
        })
})