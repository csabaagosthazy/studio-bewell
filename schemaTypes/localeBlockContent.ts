// schemas/localeBlockContent.js
import { defineType, defineField } from "sanity";

export default defineType({
    name: "localeBlockContent",
    title: "Localized Block Content",
    type: "object",
    fields: [
        defineField({
            name: "hu",
            title: "Hungarian",
            type: "blockContent",
        }),
        defineField({
            name: "en",
            title: "English",
            type: "blockContent",
        }),
        defineField({
            name: "de",
            title: "German",
            type: "blockContent",
        }),
    ],
});
