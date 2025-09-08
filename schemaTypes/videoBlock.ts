import { defineType, defineField } from "sanity";

export default defineType({
    name: "videoBlock",
    title: "Video",
    type: "object",
    fields: [
        defineField({
            name: "video",
            title: "Video file",
            type: "file",
            options: { accept: "video/*" },
        }),
        defineField({
            name: "caption",
            title: "Short text about the video",
            type: "string",
        }),
    ],
});