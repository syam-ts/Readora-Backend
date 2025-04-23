interface Article {
    articleId: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    tags: string[];
    category: string;
}

export const articleError = (article: Article): void => {
    const { articleId, title, subtitle, description, image, tags, category } =
        article;

    if (!articleId) throw new Error("Article id is missing");

    if (title.length < 10 || title.length > 40)
        throw new Error("Title should be between 10 to 40 characters");

    if (subtitle.length < 10 || subtitle.length > 20)
        throw new Error("Subtitle should be between 10 to 20 characters");

    if (description.length < 20 || description.length > 200)
        throw new Error("Description should be between 20 to 200 characters");

    if (!image) throw new Error("Image need to be provided");

    if (tags.length < 3 || tags.length > 5)
        throw new Error("Tags should be between 3 to 5 ");

    if (category.length < 3 || category.length > 10)
        throw new Error("Category should be between 3 to 10 characters");

    return;
};
