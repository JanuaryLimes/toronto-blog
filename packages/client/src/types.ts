import { AxiosRequestConfig } from 'axios';
import { rootReducer } from './reducers/rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

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
  duration?: number;
};

export type BlogEditorProps = {
  title: string;
  setTitle: (value: string) => void;
  content: string;
  setContent: (value: string) => void;
};

export type DefaultButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onContextMenu?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  disabled?: boolean;
};

export type TorontoTippyProps = {
  appendTarget: React.RefObject<Element>;
  tooltipColor?: string;
};

export enum InputType {
  Input = 'Input',
  TextArea = 'TextArea'
}

export type InputControlProps = {
  type?: 'text' | 'password';
  caption?: string;
  value: string;
  onChange?: (e: string) => void;
  validationStatus?: string; // TODO enum
  placeholder?: string;
  style?: React.CSSProperties;
};

export type CheckboxControlProps = {
  label?: string;
  checked?: boolean;
  onChange?: (e: boolean) => void;
};

export type LoadableDivProps = {
  isLoading: boolean;
  className?: string;
};

export type BouncingLoaderProps = {
  backgroundClassName?: string;
  foregroundClassName?: string;
};

export type DonutSpinnerLoaderProps = {
  foregroundClassName?: string;
  height?: 'h-5'; // | 'h-4'
  width?: 'w-5'; //
};

export type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export type RestCallProps = {
  path?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  config?: AxiosRequestConfig;
};

export type RestCallWithBodyProps = RestCallProps & {
  body?: any;
};

export type BlogPageProps = { blogName: string };

export type BlogPostPageProps = {
  blogName: string;
  blogPostId: string;
};
