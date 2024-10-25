"use client";

import React from "react";
import Image from "next/image";
import BlogPost from "@/components/BlogPost"; // Adjust the import path as necessary
import logo from "@/public/brand-logo.png"; // Adjust the import path as necessary
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { client } from "@/sanity/client";
import { defineQuery, PortableText } from "next-sanity";
import { UrlObject } from "url";
import useTranslation from "next-translate/useTranslation";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const options = { next: { revalidate: 60 } };

const POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
]{_id, title, body, publishedAt, link}|order(publishedAt desc)`);

const posts = await client.fetch(POSTS_QUERY, {}, options);

export default function Home() {
  const { t, lang } = useTranslation("common");

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-8 overflow-scroll">
      <Image src={logo} width={200} alt="Evan Hoizey Logo"></Image>
      <div className="flex flex-col gap-4 items-center w-[90%]">
        <h2 className="text-center font-bold text-3xl font-heading text-emerald-950">
          {t("title")}
        </h2>
        {posts.map(
          (post: {
            _id: React.Key | null | undefined;
            publishedAt: string | number | Date;
            body: string | any[];
            link: string | UrlObject;
            title:
              | string
              | number
              | bigint
              | boolean
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.ReactPortal
              | Promise<React.AwaitedReactNode>
              | Iterable<React.ReactNode>
              | null
              | undefined;
          }) => (
            <BlogPost
              key={post._id}
              title={new Date(post.publishedAt)
                .toLocaleDateString("fr-FR")
                .toString()}
              content={
                <>
                  <div>
                    {post.body && post.body.length > 0 && (
                      <div className="prose max-w-none">
                        <PortableText value={post.body} />
                      </div>
                    )}
                  </div>
                  {post.link && (
                    <Link
                      href={post.link ? post.link : "/"}
                      style={{ transition: "all 0.2s ease-in-out" }}
                      className="bg-emerald-800 flex gap-2 items-center h-fit w-fit text-nowrap p-4 text-white hover:text-emerald-200 font-black rounded-lg font-heading shadow-xl hover:-translate-y-1"
                    >
                      <Icon icon="mdi:file-document" />
                      <span>{post.title}</span>
                    </Link>
                  )}
                </>
              }
            />
          )
        )}
      </div>
    </div>
  );
}
