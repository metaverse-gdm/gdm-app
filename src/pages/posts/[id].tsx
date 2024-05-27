// src/pages/posts/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ContentCard from '../../components/ContentCard';
import path from 'path';
import fs from 'fs';

interface PostProps {
  post: {
    id: string;
    image: string;
    title: string;
    description: string;
    categories?: string[];
    likes: number;
    currentDevelopers: number;
    maxDevelopers: number;
  };
}

const PostPage: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <ContentCard
      image={post.image}
      title={post.title}
      description={post.description}
      categories={post.categories}
      likes={post.likes}
      currentDevelopers={post.currentDevelopers}
      maxDevelopers={post.maxDevelopers}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'public/data/content.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(jsonData);

  const paths = posts.map((post: { id: string }) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), 'public/data/content.json');
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const posts = JSON.parse(jsonData);

  const post = posts.find((p: { id: string }) => p.id === params?.id);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 10, // データが古くなる前に再生成する時間（秒）
  };
};

export default PostPage;
