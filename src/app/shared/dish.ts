import { Comment } from './comments';


export class Dish {
    id: string;
    name: string;
    image: string;
    category: string;
    featured: boolean;
    label: string;
    price: string;
    description: string;

    comments: Comment[];


    constructor() {
        this.id = "";
        this.name = "Dish Name";
        this.image = "/assets/images/uthappizza.png";
        this.category = "Dish Category";
        this.featured = false;
        this.label = "Dish Label";
        this.price = "Dish Price";
        this.description = "DIsh Description";
        this.comments = [{
                rating: 5,
                comment: 'Imagine all the eatables, living in conFusion!',
                author: 'John Lemon',
                date: '2012-10-16T17:57:28.556094Z'
            },
            {
                rating: 4,
                comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
                author: 'Paul McVites',
                date: '2014-09-05T17:57:28.556094Z'
            }];
        
      }
}

