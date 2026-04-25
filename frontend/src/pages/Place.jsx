import { useState } from "react";
import PlaceInfo from "../components/place/PlaceInfo";
import PlaceReviews from "../components/place/PlaceReview";

export default function Place() {
  return (
    <div>

      <PlaceInfo />
      <PlaceReviews />

    </div>
  );
}