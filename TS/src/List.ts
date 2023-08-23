import './style.css'
import { ListItem } from './ListItem.ts'

let list1=new ListItem();
list1.setItem({id:1, name:'Aerin',age:31});
list1.setItem({id:2, name:'John', age:32});
list1.setItem({id:3, name:'Alan', age:52});
let result = list1.getItem();
let rowId;

if(rowId) {
  list1.removeItem(rowId);
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    ${result}
  </div>`

function deleteRow(evt: any){
    rowId=evt.target.parentElement.parentElement.classList.value;
    evt.target.parentElement.parentElement.innerHTML = "";
    list1.removeItem(rowId);
}

function editRow(evt: any) {
  let rows = [];
  let id = evt.target.parentElement.parentElement.classList.value;;
  evt.target.parentElement.parentElement.querySelectorAll('span').forEach((row)=>{
  rows.push(row.innerHTML);
  list1.editItem(rows, id);
  });
}

const deleteButton = document.querySelectorAll('.delete');
const editButton = document.querySelectorAll('.edit');

editButton.forEach(edit => {
  edit.addEventListener('click', function handleClick(event) {
    return editRow(event);
  });
});

deleteButton.forEach(del => {
  del.addEventListener('click', function handleClick(event) {
    return deleteRow(event)
  });
});
