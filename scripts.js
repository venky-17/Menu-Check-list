const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

const items = JSON.parse(localStorage.getItem("items") )|| [];



function addItem(e){
   e.preventDefault()
   const text = (this.querySelector('[name=item]')).value; // entered text
const item = {
    text:text, //just text also fine in es6
    done: false
};
items.push(item)
populateList(items, itemsList)
localStorage.setItem('items', JSON.stringify(items))
this.reset();
//console.log(items);


//setupDeleteButtons();
}

// function populateList(items = [], list) {
//     list.innerHTML = items.map((item, i) => {
//       return `
//         <li>

//         <input type="checkbox"  data-index=${i} id="item${i}" ${item.done ? 'checked' :''}/>
//           <label for="item${i}"> ${item.text}</label>
//         </li>
//       `;
//     }).join(''); // Added '.join('')' to convert the array to a string
//   }
  

function populateList(items = [], list) {
    list.innerHTML = items.map((item, i) => {
      let checkboxHTML = '';
      if (item.done) {
        checkboxHTML = `<input type="checkbox" data-index=${i} id="item${i}" checked>`;
      } else {
        checkboxHTML = `<input type="checkbox" data-index=${i} id="item${i}">`;
      }
      return `
        <li>
          ${checkboxHTML}
         
          <label for="item${i}">${item.text}</label>
          <button class="deleteButton" data-index=${i} style="float:right;">Del</button>
        </li>
       
      `;
    }).join('');
  }


  
function toggleDone(e){
    if(!e.target.matches('input')) return
  //console.log(e);
  const el= e.target;
  let index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}




// function deleteItem(){
//    let index = parseInt(this.dataset.index);
//    console.log(index);
//    items.splice(index, 1)
//    localStorage.setItem('items', JSON.stringify(items));
//    populateList(items, itemsList);
// }

// function deleteItem() {
//     const index = parseInt(this.dataset.index);
//     items.splice(index, 1);
//     localStorage.setItem('items', JSON.stringify(items));
//     populateList(items, itemsList);
//     setupDeleteButtons(); // Call the function to setup delete button event listeners
//   }

  // function setupDeleteButtons() {
  //   const deleteButtons = document.querySelectorAll('.deleteButton');
  //   deleteButtons.forEach(button => {
  //     button.removeEventListener('click', deleteItem);
  //     button.addEventListener('click', deleteItem);
  //   });
  // }

  addItems.addEventListener('submit', addItem)
  itemsList.addEventListener('click', toggleDone)
  populateList(items, itemsList)
setupDeleteButtons()