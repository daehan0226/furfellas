
import React from 'react'
import {LocationContextProvider, ActionContextProvider} from "../contexts"
import { Desc, RecentPhotoGallery, Gallery } from "../components";

export default function Home() {
  return (
    <LocationContextProvider>
      <ActionContextProvider>
        <Desc />
        <RecentPhotoGallery />
        <Gallery />
      </ActionContextProvider>
    </LocationContextProvider>
  );
}