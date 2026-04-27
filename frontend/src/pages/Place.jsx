import { useState } from "react";
import PlaceInfo from "../components/place-components/PlaceInfo/PlaceInfo";
import PlaceReviews from "../components/place-components/PlaceReview/PlaceReview";
import PlaceRecs from "../components/place-components/PlaceRecs/PlaceRecs";

export default function Place() {
  return (
    <div>

      <PlaceInfo />
      <PlaceReviews />
      <PlaceRecs />
      
    </div>
  );
}