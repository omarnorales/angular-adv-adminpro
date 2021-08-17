interface _hospitalUSer{
    _id: string;
    name: string;
    img: string;
}

export class Hospital{

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _hospitalUSer,
    ){
        
    }

}