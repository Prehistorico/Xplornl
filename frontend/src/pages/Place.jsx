import { useParams } from "react-router-dom";
import Navbar from "../components/Shared/Navbar-component/Navbar"
import PlaceInfo from "../components/place-components/PlaceInfo/PlaceInfo";
import PlaceReviews from "../components/place-components/PlaceReview/PlaceReview";
import PlaceRecs from "../components/place-components/PlaceRecs/PlaceRecs";

export default function Place() {
  const { id } = useParams();

  return (
    <>
      <Navbar/>
      <div>
        <PlaceInfo placeId={id} />
        <PlaceReviews placeId={id} />
        <PlaceRecs placeId={id} />
      </div>
    </>

  );
}