// schemas/post.js
import { defineType, defineField } from "sanity";

export default defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localeString",
        }),
        defineField({
            name: "visibleLanguages",
            title: "Visible in Languages",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Hungarian", value: "hu" },
                    { title: "English", value: "en" },
                    { title: "German", value: "de" }
                ],
            },
            initialValue: ["hu", "en", "de"], // by default post is visible in all languages
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "localeBlockContent",
            validation: (Rule) =>
                Rule.custom((value: { hu?: string | undefined; en?: string | undefined; de?: string | undefined }, context) => {
                    const { parent } = context as { parent: { mainImage?: any; mainVideo?: any; body?: string; visibleLanguages?: ['hu' | 'en' | 'de'] } };
                    const hasContent = !!value || !!parent.mainImage || !!parent.mainVideo;
                    const hasOnlyBody = !!value && !parent.mainImage && !parent.mainVideo;

                    if (!hasContent) {
                        return "Please add body in HU, EN, or DE, or upload an image or a video.";
                    }
                    // if the post has a body it has to match with the selected languages
                    if (hasOnlyBody && parent.visibleLanguages) {
                        const bodyLanguages = Object.keys(value);
                        const missingLanguages = parent.visibleLanguages.filter((lang: string) => !bodyLanguages.includes(lang));

                        if (missingLanguages.length > 0) {
                            return `The body content is provided in ${bodyLanguages.join(
                                ", "
                            )}, but these languages are not selected in "Visible in Languages": ${missingLanguages.join(", ")}. Please update the selection or remove the content in these languages.`;
                        }
                    }

                    return true;
                }),

        }),
        defineField({
            name: "section",
            title: "Section",
            type: "reference",
            description: "The section this post belongs to on the webpage",
            to: [{ type: "section" }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "textPosition",
            title: "Text Position",
            type: "string",
            description: "Where the body text should be shown relative to media.",
            hidden: ({ document }) => !document?.body || (!document?.mainVideo && !document?.mainImage),
            options: {
                list: [
                    { title: "Above", value: "above" },
                    { title: "Left", value: "left" },
                    { title: "Right", value: "right" },
                    { title: "Below", value: "below" },
                ],
                layout: "radio",
            },
            initialValue: "above",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "mainImage",
            title: "Main image(s)",
            description: "The main image for the post. You can upload multiple images.",
            type: "array",
            of: [{ type: "imageBlock" }],
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const { parent } = context as { parent: { mainImage?: any; mainVideo?: any; body?: any } };

                    if (value && parent.mainVideo) {
                        return "You can only upload one type of media. Remove the video or the image.";
                    }

                    if (!value && !parent.mainVideo && !parent.body) {
                        return "Please provide content: add text, an image, or a video.";
                    }

                    return true;
                }),
        }),
        defineField({
            name: "mainVideo",
            title: "Main video",
            type: "videoBlock",
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const { parent } = context as { parent: { mainImage?: any; mainVideo?: any; body?: any } };

                    if (value && parent.mainImage) {
                        return "You can only upload one type of media. Remove the image or the video.";
                    }

                    if (!value && !parent.mainImage && !parent.body) {
                        return "Please provide content: add text, an image, or a video.";
                    }

                    return true;
                }),
        }),
        defineField({
            name: "extraContent",
            title: "Extra content",
            type: "localeBlockContent",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            readOnly: true,
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
    ],
    initialValue: () => ({
        slug: {
            current: `post-${Date.now()}`, // fallback slug
        },
    }),
    preview: {
        select: {
            title: "title.hu",
            media: "mainImage",
            section: "section.title.hu",
            textPosition: "textPosition",
        },
        prepare(selection) {
            const { title, media, section, textPosition } = selection;
            return {
                title,
                media,
                subtitle: `${section ? `Section: ${section}` : "No section"} • ${textPosition || "below"
                    }`,
            };
        },
    },
});
