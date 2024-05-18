

export default function CardItem({ item }) {
    return (


        <div className="bg-white shadow-md rounded-lg max-w-xs dark:bg-gray-800 dark:border-gray-700">
            <a className="">
                {/* <img className="rounded-t-lg p-8" src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image" /> */}
                <img className="mx-auto max-h-full lg:max-h-52 rounded-t-lg p-3 lg:p-3" src={item.img} alt="product image" />
            </a>
            <div className="px-5 pb-5">
                <div className="group flex relative">
                    <a className="text-gray-900 font-semibold text-xs md:text-lg lg:text-xl dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis block">
                        {item.name}
                    </a>
                    {/* <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 px-2 text-sm text-gray-100 rounded-md absolute bottom-full  transform -translate-x-1/2"> */}
                    <span className="hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity bg-gray-900 p-2 text-sm text-gray-100 rounded-md absolute left-10 transform translate-y-10">
                        {item.name}
                    </span>
                </div>

                <div className="flex items-center mt-2.5 mb-5">
                    {[...Array(item.product_rating)].map((_, index) => (
                        <svg key={index} className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    ))}
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{item.product_rating}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs md:text-m lg:text-3xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                    <a target="_blank" rel="noopener noreferrer nofollow" href={item.url} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-2 py-1 lg:px-5 lg:py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                </div>
            </div>
        </div>


    )
}