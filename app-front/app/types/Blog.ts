export type Blog = {
  _id: number;          
  title: string;         
  description: string;   
  image?: string | null; 
  category: string;     
  postedBy: string;    
  postDate: string;      
  isNew: boolean;       
};
