"use client";
import { useState, useEffect, useRef } from "react";
import CardItem from "./_components/CardItem";
import CardItemPromo from "./_components/CardItemPromo";
import LoaderOverlay from "@/app/_components/LoaderOverlay";
import { initSocket, registerSocketCallback, disconnectSocket, useSocketClientSession } from "@/app/_utils/SocketUtils";

export default function WebScraper() {
    const dummyProduct = [
        {
            name: "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport",
            img: "https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp",
            price: 599,
            product_rating: 5
        }
    ];

    // const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";
    const API_BASE_URL = "http://localhost/api";

    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const socket = useRef(null);
    const [clickCount, setClickCount] = useState(0);
    const [lasClickTime, setLastClickTime] = useState(null);
    // const maxClicksPerDay = 3;
    const maxClicksPerDay = 10;

    const [searchItems, setSearchItems] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchItems.slice(indexOfFirstItem, indexOfLastItem);

    const [todaysProductDeal, seTodaysProductDeal] = useState([]);

    // SOCKET UTILS
    const { clientID, setID, unsetID } = useSocketClientSession();
    const clientIDRef = useRef(clientID);

    useEffect(() => {
        socket.current = initSocket();
        const storeClickCount = localStorage.getItem("clickCount");
        const storedLastClickTime = localStorage.getItem("lastClickTime");

        if (storeClickCount) {
            setClickCount(storeClickCount);
        }

        if (storedLastClickTime) {
            setLastClickTime(new Date(storedLastClickTime));
        }

        const callback = (data) => {
            console.log("Web Scraper Page Callback: ", data);
            let emitID = data.session_id;
            console.log("emitID: ",emitID);
            console.log("clientID: ", clientIDRef.current);

           

            if (emitID == clientIDRef.current) {
                setSearchItems(data.results);
                setLoading(false);
            }

            
        };

        clientIDRef.current = clientID;

        registerSocketCallback(callback);


        // fetchTodaysProductDeals();

        return () => {
            disconnectSocket();
        };
    }, [socket, clientID]);

    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const fetchTodaysProductDeals = async () => {
        try {

            // const res = await fetch(API_BASE_URL+'/api/fetch-todays-deal', {
            const res = await fetch(API_BASE_URL+'/fetch-todays-deal', {
            method: 'GET',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ search_text: searchText }),
            });

            const data = await res.json();
            console.log("fetch_todays_deal", data);
            seTodaysProductDeal(data.data);

        } catch (error) {

        }
    };

    const onSearch = async (e) => {
        e.preventDefault();

        if (!socket.current || !socket.current.connected) {
            console.log("Socket not initialized, request stoped.");
            return;
        }

        const currentTime = new Date();
        const elapsedTime = lasClickTime ? currentTime - lasClickTime : null;

        if (elapsedTime === null || elapsedTime >= 24 * 60 * 60 * 1000) {
            setClickCount(1);
            setLastClickTime(currentTime);
            localStorage.setItem("clickCount", 1);
            localStorage.setItem("lastClickTime", currentTime.toString());
        } else if (clickCount < maxClicksPerDay) {
            const newClickCount = Number(clickCount) + 1;
            setClickCount(newClickCount);
            localStorage.setItem("clickCount", newClickCount);
        } else {
            alert("Max search times per day reached.");
            console.warn("Max search reached.");
            return;
        }

        console.warn("SOCKET: ", socket.current);

        try {
            setLoading(true);
            
            const res = await fetch(API_BASE_URL+'/search', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ search_text: searchText }),
            });

            if (res.ok) {
                const data = await res.json();
                setID(data.session_id)
                console.log("Session ID: ", data.session_id)
                setSearchText("");
            }

        } catch (error) {
            console.error(error)
            setLoading(false);
            setSearchText("");
        }
    };


    return (
        <main>
            <section className="intro-section">
                <h1 className="font-bold text-3xl mt-20 mb-7">Welcome to the Web Scraper</h1>
                <p className="text-lg mb-5">
                    This web scraper allows you to search for products from an online store. Simply enter a search term in the search bar below and hit the search button. The scraper will fetch the latest product information and display it for you. Note that you can perform up to {maxClicksPerDay} searches per day.
                </p>
                <p className="text-lg mb-5">
                    The products are scraped to provide you with a comprehensive list of options. Happy searching!
                </p>
            </section>

            <section className="todays-deal-section">
                <LoaderOverlay loading={loading} />

                {
                    todaysProductDeal.length > 0 && (
                        <div>
                            <h1 className="font-bold text-3xl mt-20 mb-7">Todays Deal</h1>
                            <div className="items-container bg-white flex overflow-x-auto w-full gap-2 scroll-smooth journal-scroll p-1 border rounded">
                                {todaysProductDeal.map((item, index) => (
                                    <CardItemPromo key={index} item={item} />
                                ))}
                            </div>
                        </div>
                    )

                }

            </section>

            <section className="scraper-section">
                <h1 className="font-bold text-3xl mt-20 mb-7">Scraper</h1>

                <div className="pt-2 relative mx-auto text-gray-600 w-3/4 mb-5">
                    <LoaderOverlay loading={loading} />
                    <form onSubmit={onSearch}>
                        <div className="relative">
                            <input
                                className="border-2 border-gray-300 bg-white h-10 w-full rounded-lg text-sm focus:outline-none pl-2 pr-10" // Adjust padding here
                                type="search"
                                name="search"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => { setSearchText(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-0 top-0 mt-3 mr-4"> {/* Adjust top margin here */}
                                <svg
                                    className="text-gray-600 h-4 w-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    version="1.1"
                                    id="Capa_1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 56.966 56.966"
                                    style={{ enableBackground: 'new 0 0 56.966 56.966' }}
                                    xmlSpace="preserve"
                                    width="512px"
                                    height="512px"
                                >
                                    <path
                                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>

                {searchItems.length > 0 && (
                    <div className="mt-10">
                        <div className="items-container bg-white w-full h-auto grid grid-cols-2 md:grid-cols-3 gap-2 p-1 border rounded">
                            {
                                currentItems.map((item, index) => (
                                    <CardItem key={index} item={item} />
                                ))
                            }
                        </div>
                        <div className="flex justify-between mt-7">
                            <button className={currentPage === 1 ? "cursor-not-allowed text-gray-500" : ""} onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                            <button className={currentItems.length < itemsPerPage ? "cursor-not-allowed text-gray-500" : ""} onClick={nextPage} disabled={currentItems.length < itemsPerPage}>Next</button>
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}