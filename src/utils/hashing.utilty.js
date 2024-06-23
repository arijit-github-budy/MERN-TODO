import Bcrypt from 'bcrypt';

class HashingUtils{
    constructor(){}

    static HashContentService = async (content) => {
        try {
            if (!content) return false;

            let hashContent = await Bcrypt.hash(content, 10);
            
            if (!hashContent) return false
    
            return hashContent;
        } catch (error) {
            console.log(error);
            throw new Error(error)
        }
    }
    
    static CompareHashedContentService = async (requestContent, savedHashContent) => {
        try {
            if (!requestContent || !savedHashContent) return false
            
            let compareStatus = await Bcrypt.compare(requestContent, savedHashContent);
            
            if (!compareStatus) return false
    
            return {
                status: "success",
            };
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    } 
}

export default HashingUtils;