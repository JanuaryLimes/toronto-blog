export type LoginPayload = {
  loggedUser: string;
};

export type AuthState = {
  loggedUser: string | undefined;
};

export type BlogPostComment = {
  _id: string;
  blogPostId: string;
  commentUsername: string;
  commentText: string;
  commentDate: string;
  asGuest: boolean;
};

export type UserBlogPost = {
  _id: string;
  title: string;
  content: string;
  blogName: string;
  postDate: string;
  comments: BlogPostComment[];
};

export type BlogPostStateItem = {
  user: string;
  userBlogPosts: UserBlogPost[];
};

export type BlogPostsState = BlogPostStateItem[];

export type SetBlogPostByIdPayload = {
  id: string;
  blogPost: UserBlogPost;
};

export type DeleteBlogPostByIdPayload = {
  id: string;
  blogName: string;
};

export type TopBlogItem = {
  _id: string;
  blogName: string;
  viewCount: number;
};

export type TopBlogsState = TopBlogItem[];

export type SetTopBlogsPayload = {
  topBlogs: TopBlogItem[];
};

export type AnimationComponentProps = {
  condition: boolean;
  duration?: number;
};

export type HeightAnimationComponentProps = {
  height: number;
  duration: number;
};
