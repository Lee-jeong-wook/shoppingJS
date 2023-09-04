"use strict";

const fs = require('fs').promises;

class ItemStorage {
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
}

module.exports = ItemStorage;