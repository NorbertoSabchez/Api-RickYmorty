export interface Character {
    id : number;
    name : string;
    image : string;
    species: string;
    gender: string;
    created: string;
    status: string;
    location: {
        name: string;
    }
    origin:{
        name:string;
    }
}