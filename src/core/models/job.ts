export interface Job {
    jobDescription: string;
    jobTitle: string;
    tags: string[];
    budget: string;
    id: string;
    userId: string;
    applications: [];
    location: Location;
}