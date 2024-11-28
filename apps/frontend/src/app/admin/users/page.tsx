import { redirect } from 'next/navigation';

export default function AdminUsersPage() {
  redirect('/admin/users/list');
}
