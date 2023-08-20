import { NextPage } from "next";
import SortableTable from "../../app/components/table/SortableTable";
import axios from 'axios';
import { useState, useEffect } from 'react';

interface ArticlesInterface {
    id: string;
    title: string;
    authors: string;
    source: string;
    pubyear: string;
    doi: string;
    claim: string;
    evidence: string;
}

const Articles: NextPage = () => {
    const [articles, setArticles] = useState<ArticlesInterface[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/article");
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData();
    }, []);

    const headers: { key: keyof ArticlesInterface; label: string }[] = [
        { key: "title", label: "Title" },
        { key: "authors", label: "Authors" },
        { key: "source", label: "Source" },
        { key: "pubyear", label: "Publication Year" },
        { key: "doi", label: "DOI" },
        { key: "claim", label: "Claim" },
        { key: "evidence", label: "Evidence" },
    ];

    return (
        <div className="container">
            <h1>Articles Index Page</h1>
            <p>Page containing a table of articles:</p>
            <SortableTable headers={headers} data={articles} />
        </div>
    );
};

export default Articles;
