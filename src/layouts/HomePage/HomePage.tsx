import React from "react";
import { Carousel } from "./components/Carousel";
import { TopBook } from "./components/TopBook";
import { Heros } from "./components/Heros";
import { LibraryService } from "./components/LibraryService";

export const HomePage = () => {
    return (
        <>
            <TopBook></TopBook>
            <Carousel></Carousel>
            <Heros></Heros>
            <LibraryService></LibraryService>
        </>
    )
}