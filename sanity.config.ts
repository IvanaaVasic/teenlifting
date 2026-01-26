import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { colorInput } from "@sanity/color-input";
import schemas from "./src/sanity/schemas";

const config = defineConfig({
    projectId: "wtkk9yjn",
    dataset: "production",
    title: "Teenlifting",
    apiVersion: "2021-01-15",
    basePath: "/admin",
    plugins: [structureTool(), colorInput()],
    schema: { types: schemas },
});

export default config;
