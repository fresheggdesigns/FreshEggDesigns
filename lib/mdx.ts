import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export async function serializeMdx(source: string): Promise<MDXRemoteSerializeResult> {
  return serialize(source, {
    parseFrontmatter: true,
  });
}

