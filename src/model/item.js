const ItemStorage = require('./itemStorage');
class Item {
    constructor(body) {
        this.body = body;
    }

    async home() {
        const client = this.body;
        const {id, name, cost, tag, description, img, isBasket} = await ItemStorage.getItemsInfo(client.name);
        return {id, name, cost, tag, description, img, isBasket };
    }

    async product(productID) {
        const {id, name, cost, tag, description, img, isBasket} = await ItemStorage.getItemsInfoID(productID);
        return {id, name, cost, tag, description, img, isBasket };
    }

    async register() {
        const item = this.body;
        const id = Math.floor(Math.random()*10000000);
        return { id: id, name: item.name, cost: item.cost, description: item.description, tag: item.tag };
    }

    async basket() {
        const item = this.body;
        await ItemStorage.includeBasket(item.name)
    }

    async basketList() {
        const item = this.body;
        if (item.type === 'handle'){
            await ItemStorage.handleBasket(item);
        } else if (item.type === 'delete'){
            await ItemStorage.deleteBasket(item.name);
        }
        return {success:true}
    }
}

module.exports = Item;