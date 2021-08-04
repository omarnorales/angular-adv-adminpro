export class User{

    

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,        
        public google?: string,
        public role?: string,
        public uid?: string){
        
    }

}