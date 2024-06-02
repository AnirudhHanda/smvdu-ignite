import React from 'react';
import { FaEnvelope, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { Card, CardContent, CardHeader } from "@/components/ui/card.jsx";

const About = () => {
    return (
        <div className="container mx-auto px-5 lg:px-0 py-5">
            <div className="mx-auto max-w-5xl">
                <Card className="w-full pt-4">
                    <CardHeader>
                        <h1 className="text-3xl font-semibold mb-4">About SMVDU IGNITE</h1>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            SMVDU IGNITE is a cutting-edge resource sharing platform tailored for the needs of Shri Mata Vaishno Devi University (SMVDU) students, faculty, and staff. It simplifies the process of sharing and accessing educational resources, promoting collaboration, and enhancing the learning experience.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                        <ul className="list-disc list-inside mb-4">
                            <li>User Authentication and Authorization: Secure user registration and login via email.</li>
                            <li>Streamlined Resource Sharing: Effortlessly upload and download notes, previous year questions (PYQs), and other study materials.</li>
                            <li>Organized Content Display: Browse departments and courses to easily find relevant resources.</li>
                            <li>Engagement and Collaboration: Share insights, ask questions, and engage in discussions through a dedicated QNA section.</li>
                            <li>Community-driven Learning: Contribute to the platform by sharing your own study materials and expertise.</li>
                        </ul>
                        <p className="mb-4">
                            Built in 2 months time as a part of Mini-project by Anirudh Handa pursuing B.Tech during the 6th semester at Shri Mata Vaishno Devi University.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
                        <div className="flex gap-4">
                            <a href="mailto:smvduignite@mgmail.com" className="text-gray-600 hover:text-gray-900">
                                <FaEnvelope size={32} />
                            </a>
                            <a href="https://wa.me/7889853755" className="text-gray-600 hover:text-gray-900">
                                <FaWhatsapp size={32} />
                            </a>
                            <a href="https://www.linkedin.com/in/anirudh-handa-138088237/" className="text-gray-600 hover:text-gray-900">
                                <FaLinkedin size={32} />
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default About;
