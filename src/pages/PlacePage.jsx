import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../placeGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  /* -------- fetch place data -------- */
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/places/${id}`, { withCredentials: true })
      .then(res => setPlace(res.data))
      .catch(err => console.error("Error fetching place:", err));
  }, [id]);

  if (!place) return <div>Loading...</div>;

  /* -------- full‑screen photo overlay -------- */
  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 bg-black text-white z-50 h-screen w-screen overflow-y-scroll">
        {/* close button */}
        <button
          onClick={() => setShowAllPhotos(false)}
          className="fixed top-4 right-4 flex gap-1 py-2 px-4 bg-white text-black rounded-2xl shadow"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Close photos
        </button>

        <div className="p-8 pt-20">
          <h2 className="text-3xl mb-8">Photos of {place.title}</h2>
          <div className="grid gap-4">
            {place.photos?.map((photo, i) => (
              <img key={i} src={`http://localhost:4000/uploads/${photo}`} alt="" className="w-full rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* -------- normal page -------- */
  return (
    <div className="mt-4 bg-gray-200 -mx-8 px-8 pt-8">
      {/* title & address */}
      <h1 className="text-3xl mr-36">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>

      {/* photo grid */}
      <PlaceGallery place={place}/>

      {/* description & booking widget */}
      <div className="mt-8 grid gap-8 mb-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold mt-4">Description</h2>
          <p>{place.description}</p>

          <p className="mt-4">
            <strong>Check‑in:</strong> {place.checkIn} <br />
            <strong>Check‑out:</strong> {place.checkOut} <br />
            <strong>Max guests:</strong> {place.maxGuests}
          </p>
        </div>

        <BookingWidget place={place} />
      </div>

      {/* extra info */}
      <div className="bg-white -mx-8 px-8 py-8">
        <h2 className="text-2xl font-semibold">Extra info</h2>
        <p className="text-sm text-gray-700 leading-5 mt-2">{place.extraInfo}</p>
      </div>
    </div>
  );
}
