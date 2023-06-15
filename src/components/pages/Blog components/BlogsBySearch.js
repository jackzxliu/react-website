import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {request} from "graphql-request";
import Posts from "./Posts";
import Search from "../../Search";

const BlogsBySearch = () => {
    const {slug} = useParams()
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async () => {
            const { posts } = await request(
                'https://ca-central-1.cdn.hygraph.com/content/clin9ia78079n01ugb1jj7d3z/master',
                `
          {
          posts(where: {_search: "${slug}"}){
            id
            title
            datePublished
            slug
            content {
              html
            }
            coverPhoto {
              url
            }
            categories {
              name
              id
              slug
              color {css}
            }
            description
          }
        }
        `
            );

            setPosts(posts);
        };

        fetchPosts();
    }, [slug])

    return (
        <>
            <Posts posts={posts}/>
        </>
    );
}

export default BlogsBySearch;