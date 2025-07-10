import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext } from "react";


export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [redirect, setRedirect] = useState("");
    const { user } = useContext(UserContext);
    useEffect(() => {
        if(user){
            setName(user.name);
        }
    }, [user]);
    const numberOfNights =
        checkIn && checkOut
            ? differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
            : 0;
    async function bookThisPlace(){
        const response= await axios.post('/bookings', {
            place: place._id,
            price:numberOfNights*place.price,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / night
            </div>

            {/* DATE & GUESTS INPUTS */}
            <div className="border border-amber-50 mt-4">
                <div className="flex">
                    {/* Check‑in */}
                    <div className="px-3 py-4 rounded-2xl">
                        <label>Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    {/* Check‑out */}
                    <div className="px-3 py-4 rounded-2xl">
                        <label>Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            /* can’t check out before check in */
                            min={checkIn || new Date().toISOString().split("T")[0]}
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input
                        type="number"
                        min={1}
                        value={numberOfGuests}
                        onChange={(e) =>
                            setNumberOfGuests(Math.max(1, parseInt(e.target.value) || 1))
                        }
                    />
                </div>
                {numberOfNights>0 && (
                    <div className="py-3 px-4 border-t">
                    <label>Your full Name:</label>
                    <input
                        type="text"
                        min={1}
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />
                    <label>phone number:</label>
                    <input
                        type="tel"
                        value={phone}
                        className="w-full border my-1 py-2 px-3 rounded-2xl"
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />
                </div>
                    
                    )}
            </div>

            {/* BOOK NOW BUTTON */}
            <button onClick={bookThisPlace} className="primary mt-4 w-full">
                Book&nbsp;Now
                {numberOfNights > 0 && (
                    <span className="ml-2">
                        ${numberOfNights * place.price}
                    </span>
                )}
            </button>
        </div>
    );
}
