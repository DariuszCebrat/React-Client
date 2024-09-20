import { User } from "./users";

export interface IProfile{
    userName:string;
    displayName:string;
    image?:string;
    bio?:string;
}
export class Profile implements IProfile{
    userName: string;
    displayName: string;
    image?: string | undefined;
    bio?: string | undefined;
    constructor(user:User) {
        this.userName = user.userName
        this.displayName = user.displayName
        this.image = user.image
    }

}