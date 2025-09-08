import { defineType, defineField } from "sanity";

export default defineType({
    name: "imageBlock",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [
        defineField({
            name: "shortDescription",
            type: "string",
            title: "Short text about the picture",
            description: "Important for SEO and accessibility",
        }),
    ],
});