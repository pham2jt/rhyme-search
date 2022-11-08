// get relevant dom elements
const queryInputElem = document.getElementById('query');

const frigginForm = document.getElementById('vestigial');

frigginForm.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

// add event listener to know when to search

queryInputElem.addEventListener('keyup', async function (ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter');
    // const rhymeResultsResp = await fetch(
    //   `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
    // console.log(rhymeResultsResp);
    
    // fetch(rhymeResultsResp)
    //   .then((results) => results.json())
    //   .then(
    //       results.forEach((result) => {
    //       result.style = parseInt(result.dataset.score, 10);
    //       result.style.fontSize = '$(.5 + (3.5 * resultScore / 300}.rem';
    //       resultElem.classList.add(result);
    //     })
    //   )
    //   .catch((error) => {
    //     console.error(`there was an error ${error}`);
    //   });
    // }
    fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`)
      .then((results) => results.json())
      .then((result) => {
        const div = document.getElementById('results');
        result.forEach((word) => {
            const resultScore = parseInt(word.score, 10);
            const child = div.appendChild(document.createElement('span'));
            child.innerText = word.word + ' ';
            child.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
          }
        )
        
      })
      .catch(console.error);
      
    
  };
});

// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)


// write function that:
//  1. expects array of word object results 
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
