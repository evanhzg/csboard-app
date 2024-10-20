import React from "react";

interface BlogPostProps {
  title: string;
  content: React.ReactNode;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content }) => {
  return (
    <div className="w-full h-fit p-4 flex flex-col items-start gap-4 bg-emerald-400 rounded-xl shadow-xl">
      <h3 className="font-heading font-black text-2xl text-emerald-950">
        {title}
      </h3>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex flex-col gap-4 w-full font-body text-lg text-emerald-700">
          {content}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
