import RequireAuth from '@/components/layout/RequireAuth';

export default function ProtectedLayout({ children }) {
    return <RequireAuth>{children}</RequireAuth>;
}
