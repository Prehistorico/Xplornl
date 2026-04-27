import { useState } from "react";
import PlaceInfo from "../components/place/PlaceInfo";
import PlaceReviews from "../components/place/PlaceReview";
import PlaceRecs from "../components/place/PlaceRecs";

export default function Place() {
  return (
    <div>

      <PlaceInfo />
      <PlaceReviews />
      <PlaceRecs />
      
    </div>
  );
}