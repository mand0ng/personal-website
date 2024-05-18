"use client"
import { useRouter } from 'next/navigation';


export default function Projects() {

    const router = useRouter();
    const projects = [
        {
            title: "Web Scraper",
            imageUrl: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
            url: "/projects/web-scraper",
            clickable: true
        },
        {
            title: "Python Script YT Video Downloader",
            imageUrl: "https://images.unsplash.com/photo-1511376777868-611b54f68947?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
            // imageUrl: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            url: "/projects/python-script-yt-video-downloader",
            clickable: false
        },
        {
            title: "Chess Game",
            // imageUrl: "https://images.unsplash.com/photo-1521185496955-15097b20c5fe?q=80&w=1950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            imageUrl: "https://images.unsplash.com/photo-1588412079929-790b9f593d8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            url: "/projects/chess-game",
            clickable: false
        }
    ];

    const navigate = (project) => {
        if(project.clickable) {
            router.push(project.url);
        }
    };

    return (
        <main>
            <section>
                <h1 className="mt-20 text-xl font-bold">Personal Projects</h1>

                <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7">
                    {projects.map((project, index) => (
                        <article key={index}
                            onClick={(e) => navigate(project)}
                            className={`relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out ${project.clickable ? 'hover:cursor-pointer' : 'cursor-not-allowed'}`}
                            style={{ backgroundImage: `url('${project.imageUrl}')` }}>

                            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out"></div>
                            <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex justify-center items-center">
                                <h3 className="text-center">
                                    {/* <Link href={project.clickable ? project.url : ""} className="text-white text-2xl font-bold text-center">
                                            {project.title}
                                        </Link> */}
                                    <span className="text-white text-2xl font-bold text-center">
                                        {project.title}
                                    </span>
                                </h3>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}