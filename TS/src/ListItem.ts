type Item = {
    id: number,
    name: string,
    age: number,
  }

export class ListItem {
    ListArr=[];

    setItem(item: Item) {
    let obj={id: Number, name: String, age: Number};
    obj.id=item.id,
    obj.name=item.name,
    obj.age=item.age,
    this.ListArr.push(obj);
  }

  editItem(data, id) {
    this.removeItem(id);
    this.ListArr.push(data);
  }

  removeItem(rowId: number) {
    this.ListArr=this.ListArr.filter((itm)=>itm.id != rowId)
  }

  getItem() {
    let result="<table><tr><th>Id</th><th>Name</th><th>Age</th><th colspan='2'>Action</th></tr>";
      if(this.ListArr) {
        for(let i in this.ListArr) {
          result+=`<tr class=${i} contenteditable>`;
          for(const [j,k] of Object.entries(this.ListArr[i])) {
            result+=`<td><span>${k}</span></td>`;
          }
          result+=`<td class="button"><button class="delete">Delete</button></td>`;
          result+=`<td class="button"><button class="edit">Edit</button></td></tr>`;
         }
         result+='</table>';
         return result;
      } else {
        return "No Items";
      }
    }
  }
