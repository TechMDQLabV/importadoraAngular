export class Product {
    name:string;
    description:string;
    long_description:string;
    price:number;

    constructor(name:string, description:string, long_description:string, price:number){
        this.name = name;
        this.description = description;
        this.long_description = long_description;
        this.price = price;
    }
}