import { redirect } from 'next/navigation';

export default function AdminBlogPage() {
  redirect('/admin/blogs/posts');
}
