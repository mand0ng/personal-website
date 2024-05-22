import "./_styles/home.css";

export default function Home() {

  const imageCount = 12;
  const imageRange = Array.from({ length: imageCount }, (_, index) => index + 1);

  return (
    <main className="theme-container">
      <div className="">
        <div className="max-w-7xl mx-auto items-center mt-7 z-10 py-5">
          <section className="greetings-content">
            Hi I'm
            <span className="text-primary font-bold text-lg"> Emmanuel!</span>
          </section>

          <section className="body-content p-5 lg:p-10">
            <p className="text-secondary">
              A passionate <span className="font-bold">Information Communications Technology</span> graduate of the {" "}
              <span className="btn rounded bg-button align-middle p-0.5">
                <img src="/profile/usc-logo.png" alt="USC Logo" className="w-5 h-5 mr-2 inline-block" />
                <a
                  className="underline underline-offset-2 font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.usc.edu.ph/">
                  University of San Carlos
                </a>
              </span> in the Philippines, Experienced in{" "}
              <span className="btn rounded bg-button align-middle p-0.5">
                <span className="font-bold">
                  <i className="fa-solid fa-laptop ps-1" /> Web {" "}
                </span>
                and
                <span className="font-bold">
                  <i className="fa-solid fa-mobile-screen ps-1" /> Android
                </span>
              </span>
              {" "} <span className="font-bold">application software development. </span>
              I enjoy solving problems and tackling real-world challenges using technology.
              Apart from{" "}
              <span className="font-bold btn rounded bg-button align-middle p-0.5">
                <i className="fa-solid fa-code ps-1" /> Coding
              </span>
              , I have a passion in Cycling, Photography, and Videography.
            </p>
          </section>

          <section className="container mx-auto mt-3 p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
              {imageRange.map((index) => (
                <div key={index} className="
                rounded-lg 
                transition-transform 
                duration-300 
                ease-in-out 
                transform 
                hover:scale-[2.5] 
                hover:overflow-visible 
                hover:flex
                hover:z-10 
                ">
                  <img
                    className="h-auto max-w-full border-gray-400 border rounded-lg"
                    src={`/bike/gallery_${index}.jpg`}
                    alt={`Gallery Image ${index}`}
                  />
                </div>
              ))}
            </div>
          </section> 

          <section className="my-10">
            <span className="font-bold text-xl">
              Here are some of my Links:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
              <a
                href="https://www.youtube.com/@mandongpedroza7486/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center max-w-xs rounded-md bg-link m-5 p-3 text-link-text font-bold px-10 md:px-20">
                <i className="fab fa-youtube mr-2"></i> Youtube
                <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
              </a>
              <a
                href="https://www.instagram.com/_man_ding_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center max-w-md rounded-md bg-link m-5 p-3 text-link-text font-bold px-10 md:px-20">
                <i className="fab fa-instagram mr-2"></i> Instagram
                <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
              </a>
            </div>

            <div className="grid grid-cols-1 justify-items-center">
              <a
                href="https://github.com/mand0ng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center max-w-md rounded-md bg-link m-5 p-3 text-link-text font-bold px-12 md:px-20">
                <i className="fab fa-github mr-2"></i> GitHub
                <i className="fa-solid fa-arrow-up-right-from-square ml-2"></i>
              </a>
            </div>
          </section>

          <section className="mt-40">
            You can{" "}
            <span className="btn rounded bg-button align-middle p-0.5 px-2">
              <i className="fa fa-eye mr-2"></i>
              <a
                className="underline underline-offset-2 font-bold"
                target="_blank"
                rel="noopener noreferrer"
                href="/resume"
              >
                view
              </a>
            </span>{" "}
            or{" "}
            <span className="btn rounded bg-button align-middle p-0.5 px-2">
              <i className="fa fa-download mr-2"></i>
              <a
               className="underline underline-offset-2 font-bold"
               href="/Emmanuel%20Pedroza%20-%20Resume.pdf" // Encode the whitespace in the href
               download="Emmanuel Pedroza - Resume.pdf" // Set the download attribute with the original filename
              >
                download
              </a>
            </span>{" "}
            my{" "}
            <span className="font-bold"><i className="fa-regular fa-file"></i> resume</span>{" "}
            through these links.
          </section>
        </div>
      </div>
    </main>
  );
}