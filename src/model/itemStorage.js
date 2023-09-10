"use strict";

const fs = require('fs').promises;

class ItemStorage {
    //이름으로 정보를 json파일에서 이름에 맞는 정보를 가져옴
    static #getItemInfo(data, name){
        const items = JSON.parse(data);
        const idx = items.name.indexOf(name);
        const itemKey = Object.keys(items);
        const itemInfo = itemKey.reduce((newItem, info)=>{
            newItem[info] = items[info][idx];
            return newItem;
        }, {});
        return itemInfo;
    }
    //ID으로 정보를 json파일에서 ID에 맞는 정보를 가져옴
    static #getItemInfoID(data, id){
        const items = JSON.parse(data);
        const idx = items.id.indexOf(id);
        const itemKey = Object.keys(items);
        const itemInfo = itemKey.reduce((newItem, info)=>{
            newItem[info] = items[info][idx];
            return newItem;
        }, {});
        return itemInfo;
    }
    //아이템 그 자체를 가져옴
    static #getItems(data, isAll, field){
        const items = JSON.parse(data);
        if(isAll) return items;
        //newItems에는 filed 초기값, 다음은 field에 들어감
        const newItems = field.reduce((newItems, field)=>{
            // hasOwnProperty는 키 값이 있는가? 나타내는 함수
            if (items.hasOwnProperty(field)) {
                newItems[field] = items[field];
            }
            return newItems;    
            // {}은 new items임
        },{})
        return newItems;
    }
    //아이템 그 자체를 가져옴
     static getItems(isAll ,...field){
        return fs
        .readFile('./src/databases/item.json')
        .then((data)=>{
            return this.#getItems(data, isAll, field);
        })
        .catch((err)=>{
            console.log(`${err}`)
        });
    }
    //이름으로 정보를 가져옴
    static getItemsInfo(name) {
        return fs
        .readFile('./src/databases/item.json')
        .then((data)=>{
            return this.#getItemInfo(data, name);
        })
        .catch((err)=>{
            console.log(`${err}`)
        });
    }
    //ID로 정보를 가져옴
    static getItemsInfoID(ID) {
        return fs
        .readFile('./src/databases/item.json')
        .then((data)=>{
            return this.#getItemInfoID(data, ID);
        })
        .catch((err)=>{
            console.log(`${err}`)
        });
    }
    //장바구니에 포함시키는 함수
    static async includeBasket(name) {
        try {
            const itemsData = await fs.readFile('./src/databases/item.json', 'utf8');
            const items = JSON.parse(itemsData);
      
            const itemIndex = items.name.indexOf(name);
            if(items.amount[itemIndex]<1){
                items.amount[itemIndex] += 1;
            }
      
            // 변경된 아이템 데이터를 JSON 파일에 다시 쓰기
            await fs.writeFile('./src/databases/item.json', JSON.stringify(items, null, '\t'));
            return {success:true}
        } catch (err) {
          console.error(err);
        }
    }
    //장바구니 안에 수량을 조절하는 함수
    static async handleBasket(item) {
      try {
          const itemsData = await fs.readFile('./src/databases/item.json', 'utf8');
          const items = JSON.parse(itemsData);
    
          // 아이템을 찾아 inBasket 값을 true로 변경
          const itemIndex = items.name.indexOf(item.name);
          items.amount[itemIndex] += item.amount;
    
          // 변경된 아이템 데이터를 JSON 파일에 다시 쓰기
          await fs.writeFile('./src/databases/item.json', JSON.stringify(items, null, '\t'));
          return {success:true}
      } catch (err) {
        console.error(err);
      }
    }
    //장바구니 안에 요소를 삭제시키는 함수
    static async deleteBasket(name) {
      try {
          const itemsData = await fs.readFile('./src/databases/item.json', 'utf8');
          const items = JSON.parse(itemsData);
    
          const itemIndex = items.name.indexOf(name);
          items.amount[itemIndex] = 0;
    
          // 변경된 아이템 데이터를 JSON 파일에 다시 쓰기
          await fs.writeFile('./src/databases/item.json', JSON.stringify(items, null, '\t'));
          return {success:true}
      } catch (err) {
        console.error(err);
      }
    }
    static async create(item){
      try{
          const itemsData = await fs.readFile('./src/databases/item.json', 'utf8');
          const items = JSON.parse(itemsData);

          items.name.push(item.name);
          items.id.push(item.id);
          items.amount.push(item.amount);
          items.tag.push(item.tag);
          items.cost.push(item.price);
          items.img.push(item.image);
          items.description.push(item.description);
          await fs.writeFile('./src/databases/item.json', JSON.stringify(items, null, '\t'));
          return { success: true, message: '새로운 아이템이 추가되었습니다.' };
      } catch (err) {
        console.error(err);
        return { success: false};
    }

      
    }
}

module.exports = ItemStorage;