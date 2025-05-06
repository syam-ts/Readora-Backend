"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleError = void 0;
const articleError = (article, modifyType) => {
    const { title, subtitle, description, image, tags, category } = article;
    let id;
    if (modifyType === "create") {
        const { userId } = article;
        if (!userId)
            throw new Error("User id is missing");
        id = userId;
        if (!userId)
            throw new Error("UserId id is missing");
    }
    else {
        const { _id } = article;
        if (!_id)
            throw new Error("Article id is missing");
        id = _id;
    }
    if (title.length < 10 || title.length > 80)
        throw new Error("Title should be between 10 to 80 characters");
    if (subtitle.length < 10 || subtitle.length > 50)
        throw new Error("Subtitle should be between 10 to 50 characters");
    if (description.length < 80 || description.length > 450)
        throw new Error("Description should be between 80 to 450 characters");
    if (!image)
        throw new Error("Image need to be provided");
    if (tags.length < 3 || tags.length > 5)
        throw new Error("Tags should be between 3 to 5 ");
    if (category.length < 3 || category.length > 10)
        throw new Error("Category should be between 3 to 10 characters");
    return;
};
exports.articleError = articleError;
