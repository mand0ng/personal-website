import React from "react";
import "./_style/resume.css";

export default function Resume() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-8 bg-[url('/profile/me_2.png')] bg-no-repeat bg-right-top bg-resize">

            <section className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Emmanuel Pedroza</h1>
                <p>Calgary, AB</p>
                <p>+1 (431) 990-4804</p>
                <p>pedrozaemmanuel16@gmail.com</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Summary</h2>
                <p>
                    Proficient in Web and Android Application development, equipped with a Bachelors of Science in Information and Communications Technology from the University of San Carlos in the Philippines.
                    Recently relocated as a Permanent Resident to Canada, I am committed to exploring various technologies and am driven by the satisfaction of tackling practical problems through technical expertise.
                    Eager to leverage my skills and embrace new challenges within the Canadian landscape.
                </p>
            </section>

            {/* <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Skills</h2>
                <ul className="list-disc pl-6">
                    <li>Time Management: Proficient in managing schedules, prioritizing tasks, and meeting deadlines effectively.</li>
                    <li>Attention to Detail: Meticulous and thorough in tasks, ensuring accuracy and precision in all aspects of work.</li>
                    <li>Problem-solving: Adept at identifying problems, analyzing situations, and implementing practical solutions.</li>
                    <li>Teamwork: Collaborative and cooperative in team environments, contributing to group success and fostering positive working relationships.</li>
                    <li>Adaptability: Quick to adapt to new situations, environments, and responsibilities, ensuring flexibility in diverse work settings.</li>
                </ul>
            </section> */}

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Education</h2>
                <div className="mb-4">
                    <h3 className="font-bold">University of San Carlos / Bachelor of Science in Information and Communications Technology </h3>
                    <p className="text-sm">2013 - 2017, Cebu, Philippines</p>
                    <p>Studied various aspects of Information Technology, gaining skills in web development, programming, and problem-solving. Involved in projects focusing on application development and system analysis.</p>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">Experience</h2>
                <h2 className="text-xl font-bold mb-3">Professional & Software Development Experience</h2>
                <div className="ml-2 mb-4">
                    <h3 className="font-bold">Forty Degrees Celsius Inc. / Android Application Developer</h3>
                    <p className="text-sm">JUNE 2020 - NOVEMBER 2023, Cebu, Philippines</p>
                    <ul className="list-disc pl-6">
                        <li>Responsible for the maintaining and updating of a streaming application aimed for the Japanese audience </li>
                        <li>Resolving issues in Firebase Crashlytics and version bugs.</li>
                        <li>Implementing innovative features, including revamped UI designs, streamer missions, and customization of in-stream gifts and stickers.</li>
                        <li>Was responsible on updating Bluetooth implementation to cater android 12 phones </li>
                    </ul>
                </div>
                <div className="ml-2 mb-4">
                    <h3 className="font-bold">Time River Design Inc. / Website Developer</h3>
                    <p className="text-sm">JULY 2019 - MARCH 2020, Cebu, Philippines</p>
                    <ul className="list-disc pl-6">
                        <li>Responsible for maintaining a WordPress website for models from Japan. </li>
                        <li>Added functionalities such as search filter and optimized the pagination of data to improve loading times.</li>
                        <li>Developed custom-built frontend in HTML and CSS, augmented with JavaScript, to ensure optimal performance with a page speed score</li>
                    </ul>
                </div>
            </section>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-2">Technology Stack</h2>
                <ul className="list-disc pl-6">
                    <li>Android Studio, Java, XML, Lottie Files</li>
                    <li>HTML, CSS, JavaScript, jQuery, Node.js, Express.js, Next.js, PHP, MySQL, PostgresSQL CakePHP, Laravel, WordPress, Python, Vue.js, Ionic,</li>
                    <li>GitHub, Jira, Figma, Adobe XD, Docker, VirtualBox</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-3">Work & Volunteer Experience</h2>
                <div className="ml-1 mb-4">
                    <h3 className="font-bold">Seafood City Winnipeg / Grill City Staff</h3>
                    <p className="text-sm">November 2023 - March 2024, Winnipeg, Canada</p>
                    <ul className="list-disc pl-6">
                        <li>Prepared and packed customer orders with meticulous attention to detail.</li>
                        <li>Skillfully cooked a variety of grilled items.</li>
                        <li>Maintained a clean and organized workspace, ensuring the proper sanitation of all cooking equipment during and after shifts.</li>
                        <li>Assisted in produce packing, ensuring freshness and quality.</li>
                        <li>Provided cashier services, handling transactions accurately and efficiently.</li>
                        <li>Served customers in a friendly and attentive manner, ensuring a positive dining experience.</li>
                        <li>Restocked supplies and managed inventory levels, ensuring optimal stock levels for a smooth operation.</li>
                        <li>Worked with team members to ensure a clean and organized store environment, including sweeping and mopping floors, cleaning equipment, and restocking shelves.</li>
                    </ul>
                </div>
                <div className="ml-1 mb-4">
                    <h3 className="font-bold">Library Staff / Technical Support Staff</h3>
                    <p className="text-sm">2017-2019, University of San Carlos (Part-time/Student)</p>
                    <ul className="list-disc pl-6">
                        <li>Assisted students in checking out & book returns.</li>
                        <li>Assisted students/teachers in any technical questions or any troubleshooting required in library’s computer system.</li>
                        <li>Assisted students in document editing, printing, and photocopying.</li>
                        <li>Maintained clean area in computer and other library areas.</li>
                    </ul>
                </div>
            </section>

            



        </main>
    );
}
