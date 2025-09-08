import { defineType, defineField } from "sanity";

export default defineType({
    name: "localeString",
    title: "Localized String",
    type: "object",
    fields: [
        defineField({ name: "hu", type: "string", title: "Hungarian" }),
        defineField({ name: "en", type: "string", title: "English" }),
        defineField({ name: "de", type: "string", title: "German" }),
    ],
});