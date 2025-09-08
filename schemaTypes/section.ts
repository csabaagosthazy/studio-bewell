// schemas/section.js
import { defineType, defineField } from "sanity";

export default defineType({
    name: "section",
    title: "Section",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "localeString", // so you can translate section names
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title.hu",
                maxLength: 96,
            },
        }),
    ],
    preview: {
        select: {
            title: "title.hu",
        },
    },
});
