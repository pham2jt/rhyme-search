// get relevant dom elements
const queryInputElem = document.getElementById('query');

const frigginForm = document.getElementById('vestigial');

frigginForm.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

// add event listener to know when to search

let count = 0;

queryInputElem.addEventListener('keyup', async function (ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter');
    fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`)
      .then((results) => results.json())
      .then((result) => {
        const div = document.getElementById('results');
        result.forEach((word) => {
          const resultScore = parseInt(word.score, 10);
          const child = div.appendChild(document.createElement('span'));
          child.innerText = word.word + ' ';
          child.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
          count += 1;
          if (count <= 10) {
            dictionary(word.word, child);
          }
        }
        )
        
      })
      .catch(console.error);
  };
});

async function dictionary(word, child) {
  fetch(`https://rhymebrain.com/talk?function=getWordInfo&word=${word}`)
    .then((results) => results.json())
    .then((result) => {
      const keys = Object.keys(result);
      for (const key of keys) {
        const list = child.appendChild(document.createElement('dl'));
        const title = list.appendChild(document.createElement('dt'));
        title.innerText = key + ':'
        title.style.fontSize = '20px'
        const stuff = list.appendChild(document.createElement('dd'));
        stuff.innerText = result[key]
        stuff.style.fontSize = '12px'
      }
    })
  
}
