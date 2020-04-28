import { v4 as uuidv4 } from 'uuid';
import * as Constant from "./Constant";

export default {
    initializePost: () => {
        return {
            id: uuidv4(),
            contentType: Constant.ContentType.IMAGE,
            contentData: { images: [] },
            publishDate: null,
            publishNow: true,
            status: Constant.PostStatus.ADD
        };
    },

    isValidDate: (date) => {
        return date instanceof Date && !isNaN(date);
    },
    
    initContentDataByType: (type) => {
        switch (type) {
            case Constant.ContentType.IMAGE:
                return { images: [] };
            case Constant.ContentType.LINK:
                return {};
            default:
                return {};
        }
    },
    
    validateData: (post) => {
        if (post.contentType === Constant.ContentType.IMAGE) {
            return post.contentData.images && post.contentData.images.length > 0;
        }
        return false;
    }
}