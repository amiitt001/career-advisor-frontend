import type { Recommendation } from '@/types';

export const mockRecommendations: Recommendation[] = [
  {
    title: "DevOps Engineer",
    overview: "A role focused on automating and streamlining the software development and deployment lifecycle.",
    whyGoodFit: "This aligns perfectly with your stated interest in DevOps. Your programming skills in C++ and Python provide a solid foundation for scripting and automation, which are crucial in DevOps roles.",
    keySkillsRequired: ["Linux", "Cloud Computing (AWS, Azure, GCP)", "CI/CD", "Docker", "Kubernetes", "Scripting (Bash, Python)", "Terraform"],
    skillGapsForUser: ["Cloud Computing (AWS, Azure, GCP)", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    howToGetStarted: ["Start with online courses on Linux administration and cloud platforms.", "Practice using tools like Docker and Kubernetes.", "Contribute to open-source projects."],
    averageSalaryIndiaLPA: "₹6-10 Lakhs p.a.",
    dayInTheLifeSummary: "A typical day involves monitoring CI/CD pipelines, writing automation scripts, managing cloud infrastructure, and collaborating with development teams to resolve issues."
  },
  {
    title: "IoT Security Engineer",
    overview: "A specialized cybersecurity role focused on securing Internet of Things devices and networks.",
    whyGoodFit: "Given your interest in ethical hacking and skills in low-level programming like C++, IoT Security is a natural fit. It combines hardware understanding with network security principles.",
    keySkillsRequired: ["Network Security", "IoT Protocols (MQTT, CoAP)", "Embedded Systems", "Penetration Testing", "Cloud Computing (AWS, Azure)", "Cryptography"],
    skillGapsForUser: ["IoT Protocols (MQTT, CoAP)", "Embedded Systems", "Cryptography"],
    howToGetStarted: ["Begin with a certification like CompTIA Security+ to build a strong foundation.", "Learn about common IoT protocols and their vulnerabilities.", "Set up a home lab with devices like Raspberry Pi to practice."],
    averageSalaryIndiaLPA: "₹5-9 Lakhs p.a.",
    dayInTheLifeSummary: "Your day would involve conducting vulnerability assessments on IoT devices, analyzing network traffic for threats, developing security protocols, and working with hardware and software teams to implement secure designs."
  }
];