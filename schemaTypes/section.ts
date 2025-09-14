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
            type: "localeString",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Order",
            type: "number",
            description: "Defines the order of the sections on the webpage"
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: 'Press "generate" to create from title',
            options: {
                source: "title.hu",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: "title.hu",
        },
    },
});
