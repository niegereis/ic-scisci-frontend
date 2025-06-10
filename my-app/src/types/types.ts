export interface AuthorImage {
    url: string;
}

export interface Author {
    id: number;
    documentId: string;
    authorName: string;
    authorDescription: string;
    authorImage: AuthorImage;
}

export interface CoverImage {
    url: string;
}

export interface Blog {
    id: number;
    documentId: string;
    articleTitle: string;
    blogDescripition: string;
    blogContent: any;
    coverImage: CoverImage;
    author: Author;
}

export interface FetchResponse {
    data: Blog[];
}

export interface BlogsProps {
    blogs: {
        data: Blog[];
    };
    blogId?: number;
}

export interface BlogContentProps {
    blog: Blog | null;
}

export interface Author {
    id: number;
    authorName: string;
    academicStatus: string;
}

export interface Publication {
    id: number;
    academicPublicationTitle: string;
    academicPublicationJornal: string;
    academicPublicationLink: string;
    academicPublicationYear: string;
    authors: Author[];
}

export interface ProjectContentProps {
    project: {
        projectTitle: string;
        projectDescription: any;
        projectImage: {
            url: string;
        } | null;
        authors: Author[];
        blog_articles: Blog[];
    };
}

export interface Projects {
    id: number;
    projectTitle: string;
    projectDescription: any;
    projectImage: {
        url: string;
    } | null;
    authors: Author[];
    blog_articles: Blog[];
}


export interface ProjectPostPageProps {
    params: { id: string };
}

export interface TeamMembers {
    id: number;
    authorName: string;
    authorDescription: string;
    academicStatus: "Professor" | "Aluno" | "mestrando" | "doutorando";
    authorImage: {
        url: string;
    };
}