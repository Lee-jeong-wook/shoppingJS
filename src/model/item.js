const ItemStorage = require('./itemStorage');
class Item {
    constructor(body) {
        this.body = body;
    }

    async home() {
        const client = this.body;
        const {id, name, cost, tag, description, img} = await ItemStorage.getItemsInfo(client.name);
        return {id, name, cost, tag, description, img };
    }

    async product(productID) {
        const {id, name, cost, tag, description, img} = await ItemStorage.getItemsInfoID(productID);
        return {id, name, cost, tag, description, img };
    }

    async register() {
        const item = this.body;
        const id = Math.floor(Math.random()*10000000);
        return { id: id, name: item.name, cost: item.cost, description: item.description, tag: item.tag };
    }
}

module.exports = Item;